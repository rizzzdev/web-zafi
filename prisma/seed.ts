import 'dotenv/config';
import bcrypt from 'bcrypt';
import { prisma, UserRole, ModuleCategory } from '../src/lib/db';

async function seedDatabase(): Promise<void> {
	console.log('🌱 Memulai Idempotent Database Seeding (12 Modul IPO & Soal Kuis)...');

	// 1. Seed Super Admin User
	const adminEmail = 'super@admin.com';
	const hashedAdminPassword = await bcrypt.hash('admin1234', 12);
	const existingAdminUser = await prisma.user.findFirst({
		where: { email: adminEmail, deletedAt: null }
	});

	if (existingAdminUser) {
		await prisma.user.update({
			where: { id: existingAdminUser.id },
			data: {
				fullName: 'Super Administrator EduKomputer',
				passwordHash: hashedAdminPassword,
				role: UserRole.ADMIN,
				updatedAt: new Date()
			}
		});
		console.log(`✅ Admin user diperbarui: ${adminEmail}`);
	} else {
		await prisma.user.create({
			data: {
				email: adminEmail,
				fullName: 'Super Administrator EduKomputer',
				passwordHash: hashedAdminPassword,
				role: UserRole.ADMIN,
				createdBy: 'SEED_SCRIPT'
			}
		});
		console.log(`✅ Admin user dibuat: ${adminEmail}`);
	}

	// 2. Seed 12 Learning Modules (3 Modul per Kategori IPO)
	const learningModulesData = [
		// --- KATEGORI 1: INPUT DEVICES (Masukan) ---
		{
			code: 'MOD-01',
			title: 'Perangkat Masukan (Input Devices)',
			slug: 'input',
			category: ModuleCategory.INPUT,
			videoUrl: 'https://www.youtube.com/embed/Z_b_4Dfg7Q8',
			durationInMinutes: 6,
			orderIndex: 1,
			isPublished: true,
			summaryContent: `# 📥 Modul 1: Perangkat Masukan (Input Devices)

Perangkat masukan (*Input Devices*) merupakan subsistem perangkat keras yang bertindak sebagai **antarmuka transduser** antara fenomena fisik dunia nyata dengan sirkuit elektronik digital komputer.

---

## 1. Prinsip Kerja: Konversi Sinyal Analog ke Digital (ADC)
Komputer beroperasi secara eksklusif menggunakan representasi biner \`0\` dan \`1\` (tegangan tinggi/rendah). Namun, masukan manusia (suara, tekanan tombol, citra optik) bersifat kontinu (analog).
* **Sampling:** Pengambilan sampel sinyal analog pada interval waktu teratur.
* **Quantization:** Pemetaan amplitudo sinyal ke skala tingkat diskret terdekat.
* **Encoding:** Konversi nilai kuantisasi menjadi kode kata biner (*binary word*).

---

## 2. Klasifikasi Perangkat Masukan Komputer
* **Keyboard:** Matriks sakelar dengan mikrokontroler internal penghasil scan code biner (Make & Break code).
* **Pointing Devices:** Mouse optik berkecepatan ribuan frame per detik DSP dan touchscreen kapasitif.
* **Mikrofon & Kamera Digital:** Sensor CCD/CMOS yang mengubah getaran akustik dan foton cahaya menjadi sinyal digital.

> 💡 **Kunci Konseptual:** Perangkat input memastikan data fisik terstandarisasi ke dalam format biner yang sesuai dengan arsitektur bus sistem sebelum diteruskan ke unit pemrosesan.`
		},
		{
			code: 'MOD-02',
			title: 'Unit Pemrosesan Inti (Processing Unit)',
			slug: 'process',
			category: ModuleCategory.PROCESS,
			videoUrl: 'https://www.youtube.com/embed/FZGugFqDr60',
			durationInMinutes: 8,
			orderIndex: 2,
			isPublished: true,
			summaryContent: `# ⚙️ Modul 2: Unit Pemrosesan Inti (Processing Unit)

Unit Pemrosesan Inti (*Central Processing Unit* atau CPU) merupakan pusat kendali dan kalkulasi komputer yang bertugas menginterpretasikan serta mengeksekusi instruksi program perangkat lunak.

---

## 1. Tiga Komponen Internal Utama CPU
1. **Control Unit (CU):** Mengatur lalu lintas instruksi (*fetch*, *decode*, dan sinyal kendali *clock*).
2. **Arithmetic Logic Unit (ALU):** Melakukan komputasi aritmetika (+, -, *, /) dan logika boolean (AND, OR, NOT, XOR, perbandingan relasional).
3. **Register File:** Memori internal berkecepatan ultra tinggi (*Program Counter*, *Instruction Register*, *Accumulator*).

---

## 2. Siklus Instruksi Mesin
Setiap instruksi diproses melalui siklus:
\`\`\`text
[ Fetch ] ➔ [ Decode ] ➔ [ Execute ] ➔ [ Store / Write-back ]
\`\`\`

> 💡 **Kunci Konseptual:** CPU modern meningkatkan kecepatan komputasi melalui *pipelining* dan eksekusi instruksi paralel.`
		},
		{
			code: 'MOD-03',
			title: 'Perangkat Keluaran (Output Devices)',
			slug: 'output',
			category: ModuleCategory.OUTPUT,
			videoUrl: 'https://www.youtube.com/embed/4RPtJ9UYHS8',
			durationInMinutes: 5,
			orderIndex: 3,
			isPublished: true,
			summaryContent: `# 🖥️ Modul 3: Perangkat Keluaran (Output Devices)

Perangkat Keluaran (*Output Devices*) bertugas menerjemahkan bit-bit data biner hasil pemrosesan komputer menjadi representasi fisik visual, audio, cetak, atau mekanikal.

---

## 1. Prinsip Konversi Digital ke Analog (DAC)
* **Visual Framebuffer:** VRAM yang memetakan warna tiap piksel dalam matriks bit RGB ke layar monitor LCD/OLED.
* **DAC Audio:** Mengonversi aliran biner PCM menjadi getaran gelombang analog yang menggerakkan konus speaker.
* **Pencetak Laser & Inkjet:** Mengubah citra bitmap menjadi pola muatan statis toner atau semprotan tinta mikroskopis.

> 💡 **Kunci Konseptual:** Tanpa perangkat keluaran, seluruh hasil kalkulasi matematis di CPU tidak dapat diakses atau dimanfaatkan oleh manusia.`
		},
		{
			code: 'MOD-04',
			title: 'Media Penyimpanan & Perangkat Lunak',
			slug: 'storage-software',
			category: ModuleCategory.STORAGE_SOFTWARE,
			videoUrl: 'https://www.youtube.com/embed/p3q5zWCw8J4',
			durationInMinutes: 7,
			orderIndex: 4,
			isPublished: true,
			summaryContent: `# 💾 Modul 4: Media Penyimpanan & Perangkat Lunak

Komponen persistensi jangka panjang (*Secondary Storage*) dan lapisan logika instruksional (*Software*) memungkinkan komputer beroperasi mandiri melampaui siklus daya listrik.

---

## 1. Memori Volatile vs Non-Volatile
* **RAM (Volatile):** Memori kerja super cepat namun data hilang saat listrik mati.
* **Secondary Storage (Non-Volatile):** Mempertahankan integritas data permanen (SSD Flash NVMe & HDD magnetik).

---

## 2. Hierarki Perangkat Lunak
1. **System Software:** Sistem operasi (Windows, Linux, macOS) pengatur alokasi CPU, RAM, berkas, dan device driver.
2. **Application Software:** Program yang memfasilitasi kebutuhan produktivitas pengguna.

> 💡 **Kunci Konseptual:** Siklus IPO lengkap: Input diakuisisi ➔ CPU memproses di bawah instruksi Software ➔ RAM menampung sementara ➔ Storage menyimpan permanen ➔ Output menyajikan informasi.`
		},

		// --- MODUL PENDALAMAN (5 - 12) ---
		{
			code: 'MOD-05',
			title: 'Sensor Canggih & Akuisisi Multimedia Digital',
			slug: 'sensor-multimedia',
			category: ModuleCategory.INPUT,
			videoUrl: 'https://www.youtube.com/embed/1onXms-0v-s',
			durationInMinutes: 6,
			orderIndex: 5,
			isPublished: true,
			summaryContent: `# 📡 Modul 5: Sensor Canggih & Akuisisi Multimedia

Perkembangan komputasi modern memperluas perangkat masukan dari sekadar keyboard mekanik menuju ekosistem sensor cerdas dan multimedia digital.

---

## 1. Transduser Biosensor & Biometrik
* **Pemindai Sidik Jari Optik & Ultrasonik:** Mengukur pantulan gelombang suara frekuensi tinggi untuk memetakan alur dermis kulit.
* **Pengenalan Wajah 3D (Structured Light):** Memancarkan ribuan titik inframerah untuk membaca kontur geometri wajah.

---

## 2. Sensor Inersia & Spasial (IMU)
* **Akselerometer & Giroskop:** Sensor MEMS mikroskopis yang mendeteksi percepatan gravitasi dan rotasi spasial sudut pergerakan perangkat.
* **LiDAR (Light Detection and Ranging):** Mengukur waktu pantulan pulsa laser (*Time of Flight*) untuk rekonstruksi spasial 3D secara instan.

> 💡 **Kunci Konseptual:** Sensor mengubah variabel fisik lingkungan (suhu, jarak, orientasi) menjadi tegangan analog yang diubah oleh ADC menjadi data numerik biner.`
		},
		{
			code: 'MOD-06',
			title: 'Jalur Bus Sistem, Polling & Interupsi Perangkat',
			slug: 'bus-interupsi',
			category: ModuleCategory.INPUT,
			videoUrl: 'https://www.youtube.com/embed/R7p-nPg8t_g',
			durationInMinutes: 7,
			orderIndex: 6,
			isPublished: true,
			summaryContent: `# ⚡ Modul 6: Jalur Bus Sistem, Polling & Interupsi

Komunikasi antara perangkat masukan dan unit prosesor diatur oleh arsitektur bus dan mekanisme pensinyalan perangkat keras.

---

## 1. Tiga Komponen Bus Sistem
* **Data Bus:** Menghantarkan nilai data aktual (lebar bit: 32-bit, 64-bit).
* **Address Bus:** Menentukan lokasi alamat memori atau port I/O target.
* **Control Bus:** Mentransmisikan sinyal sinkronisasi baca/tulis (*Read/Write Control*) dan deteksi clock.

---

## 2. Polling vs Interrupt-Driven I/O
* **Programmed I/O (Polling):** CPU terus-menerus mengecek status register perangkat input dalam loop. Sangat boros siklus CPU!
* **Interrupt-Driven I/O:** Perangkat masukan mengirimkan sinyal Interupsi Hardware (IRQ) ke CPU saat data siap. CPU menunda tugasnya sejenak untuk melayani *Interrupt Service Routine (ISR)*.
* **DMA (Direct Memory Access):** Kontroler khusus memindahkan data dalam blok besar dari I/O langsung ke RAM tanpa melibatkan CPU.

> 💡 **Kunci Konseptual:** Interrupt dan DMA membebaskan prosesor dari keharusan menunggu lambatnya respon perangkat fisik.`
		},
		{
			code: 'MOD-07',
			title: 'Siklus Mesin CPU & Instruction Pipelining',
			slug: 'siklus-instruksi-cpu',
			category: ModuleCategory.PROCESS,
			videoUrl: 'https://www.youtube.com/embed/jFDMZpkUWCw',
			durationInMinutes: 8,
			orderIndex: 7,
			isPublished: true,
			summaryContent: `# 🏎️ Modul 7: Siklus Mesin CPU & Pipelining

Untuk meningkatkan kinerja eksekusi miliaran instruksi per detik, CPU modern mengadopsi teknik pipa instruksi (*Instruction Pipelining*).

---

## 1. Analogi Jalur Perakitan Pipelining
Tanpa pipelining, CPU menunggu instruksi selesai secara sekuensial penuh (Fetch ➔ Decode ➔ Execute ➔ Store) baru memulai instruksi kedua.
Dengan **Pipelining 5 Tahap (IF, ID, EX, MEM, WB)**:
* Saat instruksi #1 sedang di-*Execute*, instruksi #2 sedang di-*Decode*, dan instruksi #3 sedang di-*Fetch*!

---

## 2. Bahaya Pipelining (Pipeline Hazards)
1. **Structural Hazard:** Dua tahapan membutuhkan sumber daya perangkat keras yang sama secara bersamaan.
2. **Data Hazard:** Instruksi bergantung pada hasil kalkulasi instruksi sebelumnya yang belum selesai ditulis (*Write-After-Read*).
3. **Control / Branch Hazard:** Percabangan kode (IF/GOTO) menyebabkan instruksi yang sudah di-*fetch* harus dibuang (*Pipeline Flush*).

> 💡 **Kunci Konseptual:** *Branch Prediction* modern menggunakan kecerdasan probabilistik perangkat keras untuk menebak alur cabang kode guna mencegah hilangnya siklus instruksi.`
		},
		{
			code: 'MOD-08',
			title: 'Hirarki Memori Cache & Fenomena Memory Wall',
			slug: 'cache-dan-latensi',
			category: ModuleCategory.PROCESS,
			videoUrl: 'https://www.youtube.com/embed/6JpLD3PUAZk',
			durationInMinutes: 7,
			orderIndex: 8,
			isPublished: true,
			summaryContent: `# 🧱 Modul 8: Hirarki Memori Cache & Fenomena Memory Wall

Kesenjangan kecepatan antara unit pemrosesan CPU dan memori utama RAM melahirkan salah satu tantangan terbesar dalam arsitektur komputer: **Memory Wall**.

---

## 1. Memahami Memory Wall
Kecepatan komputasi CPU tumbuh eksponensial lebih cepat daripada waktu latensi pengambilan data dari RAM. Jika CPU harus selalu mengambil instruksi dari RAM, CPU akan sering terdiam (*stall*) menunggu data tiba.

---

## 2. Solusi: Hirarki Tiga Lapisan Cache (SRAM)
* **L1 Cache:** Terletak di dalam inti (*core*) CPU, bekerja pada kecepatan setara clock CPU (~0.5 - 1 ns latensi).
* **L2 Cache:** Berkapasitas lebih besar (512KB - 1MB per core) dengan latensi 3-5 ns.
* **L3 Cache:** Shared cache untuk seluruh multi-core CPU (16MB - 64MB+) dengan latensi 10-20 ns.
* **RAM (DRAM):** Memori utama berkapasitas gigabyte dengan latensi 60-100 ns.

---

## 3. Prinsip Lokalitas (Locality of Reference)
* **Temporal Locality:** Data yang baru saja diakses kemungkinan besar akan diakses kembali dalam waktu dekat.
* **Spatial Locality:** Data yang beralamat memori berdekatan dengan data yang sedang dibaca kemungkinan besar akan dibutuhkan berikutnya.

> 💡 **Kunci Konseptual:** Cache Hit menghemat ribuan siklus mesin; semakin tinggi rasio Cache Hit, semakin dekat CPU dengan performa puncaknya.`
		},
		{
			code: 'MOD-09',
			title: 'Teknologi Display, GPU Framebuffer & Refresh Rate',
			slug: 'display-gpu-framebuffer',
			category: ModuleCategory.OUTPUT,
			videoUrl: 'https://www.youtube.com/embed/Bks2XpG9a44',
			durationInMinutes: 6,
			orderIndex: 9,
			isPublished: true,
			summaryContent: `# 🎨 Modul 9: Teknologi Display & GPU Framebuffer

Perangkat keluaran visual mengandalkan unit pengolah grafis (*Graphics Processing Unit* / GPU) untuk menyajikan jutaan piksel berfrekuensi tinggi ke layar mata pengguna.

---

## 1. Anatomi Framebuffer Grafis
* Framebuffer adalah area memori VRAM khusus yang memegang representasi bitmap dua dimensi dari setiap piksel yang akan digambar di layar.
* **Double Buffering:** Menggunakan *Front Buffer* (yang sedang ditampilkan di layar) dan *Back Buffer* (tempat GPU merender frame berikutnya). Mencegah distorsi visual garis (*screen tearing*).

---

## 2. Refresh Rate vs Frame Rate (FPS)
* **FPS (Frames Per Second):** Kecepatan GPU menghasilkan gambar baru setiap detik.
* **Refresh Rate (Hz):** Frekuensi fisik panel layar merefresh gambar (60Hz, 120Hz, 144Hz).
* **Sinkronisasi Dinamis:** Teknologi G-Sync dan FreeSync menyinkronkan refresh rate layar dengan laju FPS GPU secara real-time.

> 💡 **Kunci Konseptual:** Output visual adalah hasil transformasi matriks koordinat matematika poligon 3D menjadi warna fotometrik RGB piksel 2D pada display.`
		},
		{
			code: 'MOD-10',
			title: 'Sistem Suara Akustik, DAC & Aktuator Mekatronika',
			slug: 'audio-dac-aktuator',
			category: ModuleCategory.OUTPUT,
			videoUrl: 'https://www.youtube.com/embed/nws_q_PjUcw',
			durationInMinutes: 6,
			orderIndex: 10,
			isPublished: true,
			summaryContent: `# 🔊 Modul 10: Sistem Audio, DAC & Aktuator Mekatronika

Keluaran komputer tidak hanya terbatas pada layar kaca, tetapi mencakup getaran akustik suara dan aksi kendali fisik motor di dunia nyata.

---

## 1. Digital to Analog Audio (DAC) & Filter Rekonstruksi
* Berkas audio digital tersimpan sebagai bilangan biner diskret (misal: 16-bit / 44.1 kHz).
* Chip DAC mengonversi bit-bit tersebut menjadi anak tangga tegangan listrik analog kontinu.
* **Low-Pass Filter:** Menghaluskan anak tangga tegangan untuk merekonstruksi gelombang sinusoidal murni yang menggetarkan konus speaker.

---

## 2. Aktuator & Output Mekatronika
* **Motor Servo & Stepper:** Mengonversi sinyal pulsa modulasi (*PWM - Pulse Width Modulation*) menjadi sudut presisi pergerakan lengan robot.
* **Relay & Solenoid:** Sakelar elektromagnetik yang memungkinkan sinyal logika mikrokomputer 5V mengendalikan daya listrik tegangan tinggi pada industri otomasi.

> 💡 **Kunci Konseptual:** Aktuator adalah perangkat keluaran yang menghubungkan logika program komputer ke dalam gerakan fisik mekanikal di dunia nyata.`
		},
		{
			code: 'MOD-11',
			title: 'Evolusi Storage: Dari HDD Magnetik ke NVMe PCIe',
			slug: 'evolusi-storage-nvme',
			category: ModuleCategory.STORAGE_SOFTWARE,
			videoUrl: 'https://www.youtube.com/embed/5U9v-Q3lV60',
			durationInMinutes: 7,
			orderIndex: 11,
			isPublished: true,
			summaryContent: `# 💽 Modul 11: Evolusi Media Penyimpanan Sekunder

Kecepatan transfer data penyimpanan sekunder telah berevolusi dari mekanisme putaran piringan mekanik menuju semikonduktor flash berkecepatan multi-gigabyte.

---

## 1. Keterbatasan Mekanis Hard Disk Drive (HDD)
* Piringan berputar (5400-7200 RPM) dengan head pembaca fisik.
* Memiliki **Seek Time** (waktu menggerakkan head ke silinder tertentu) dan **Rotational Latency** (waktu menunggu sektor berputar ke bawah head) rata-rata 5-10 milidetik.

---

## 2. Lompatan Arsitektur SSD NVMe (PCI Express)
* **SATA Interface:** Warisan HDD lama yang dibatasi jalur antrian tunggal (1 queue, kedalaman 32 instruksi) dengan batas transfer ~550 MB/s.
* **NVMe Interface:** Didesain khusus untuk memori flash semikonduktor, berjalan langsung di atas jalur bus PCIe dengan **64.000 antrian paralel** (masing-masing 64.000 perintah), menghasilkan laju transfer melampaui 7.000 MB/s dengan latensi mikrodetik!

> 💡 **Kunci Konseptual:** Paralelisme arsitektur NVMe memungkinkan penyimpanan sekunder mengimbangi kebutuhan komputasi CPU multi-core modern.`
		},
		{
			code: 'MOD-12',
			title: 'Arsitektur Sistem Operasi, Kernel & Virtual Memory',
			slug: 'arsitektur-os-kernel',
			category: ModuleCategory.STORAGE_SOFTWARE,
			videoUrl: 'https://www.youtube.com/embed/26QPDBe-NB8',
			durationInMinutes: 8,
			orderIndex: 12,
			isPublished: true,
			summaryContent: `# 🛡️ Modul 12: Arsitektur Sistem Operasi, Kernel & Virtual Memory

Sistem Operasi adalah perangkat lunak sistem fundamental yang menyediakan abstraksi aman dan efisien antara aplikasi pengguna dan perangkat keras komputer.

---

## 1. Mode Perlindungan CPU: User Mode vs Kernel Mode
* **User Mode (Ring 3):** Aplikasi berjalan dengan hak terbatas, tidak dapat mengakses langsung memori fisik atau port I/O perangkat keras.
* **Kernel Mode (Ring 0):** Kernel sistem operasi memiliki kontrol penuh atas seluruh instruksi CPU dan sirkuit motherboard.
* **System Call (Syscall):** Mekanisme aman ketika aplikasi di User Mode meminta layanan hardware kepada Kernel melalui interupsi software.

---

## 2. Memori Virtual & Paging
* Setiap program diberikan ruang alamat memori virtual sendiri (seolah memiliki seluruh RAM).
* **Memory Management Unit (MMU):** Chip perangkat keras yang menerjemahkan alamat virtual program menjadi alamat fisik RAM sesungguhnya melalui tabel halaman (*Page Table*).
* **Swapping / Paging ke Storage:** Jika RAM penuh, halaman data yang jarang digunakan dipindahkan sementara ke ruang disk (*Swap file*).

---

## 3. Rangkuman Siklus Arsitektur Komputer IPO
1. **Input Devices & Sensor** mengubah fenomena fisik dunia nyata menjadi data digital biner.
2. **System Bus & Interrupt Controller** mengalirkan bit data secara teratur ke memori utama RAM.
3. **CPU (CU & ALU)** mengambil instruksi dari RAM melalui pipa instruksi dan cache bertingkat.
4. **Operating System & Kernel** mengorkestrasikan proteksi memori, penjadwalan proses, dan manajemen berkas.
5. **Secondary Storage (SSD NVMe)** mengabadikan data secara non-volatile.
6. **Output Devices & Display** menyajikan kembali hasil kalkulasi ke wujud visual, audio, cetak, dan mekanik.`
		}
	];

	for (const moduleData of learningModulesData) {
		const existingModule = await prisma.learningModule.findFirst({
			where: { code: moduleData.code, deletedAt: null }
		});

		if (existingModule) {
			await prisma.learningModule.update({
				where: { id: existingModule.id },
				data: {
					title: moduleData.title,
					slug: moduleData.slug,
					category: moduleData.category,
					videoUrl: moduleData.videoUrl,
					durationInMinutes: moduleData.durationInMinutes,
					summaryContent: moduleData.summaryContent,
					orderIndex: moduleData.orderIndex,
					isPublished: moduleData.isPublished,
					updatedAt: new Date()
				}
			});
		} else {
			await prisma.learningModule.create({
				data: {
					code: moduleData.code,
					title: moduleData.title,
					slug: moduleData.slug,
					category: moduleData.category,
					videoUrl: moduleData.videoUrl,
					durationInMinutes: moduleData.durationInMinutes,
					summaryContent: moduleData.summaryContent,
					orderIndex: moduleData.orderIndex,
					isPublished: moduleData.isPublished,
					createdBy: 'SEED_SCRIPT'
				}
			});
		}
	}
	console.log(`✅ ${learningModulesData.length} Modul Pembelajaran berhasil di-seed (Model IPO Lengkap).`);

	// 3. Seed 10 Quiz Questions with Options
	const quizQuestionsData = [
		{
			orderIndex: 1,
			questionText:
				'Manakah dari komponen berikut yang berperan murni sebagai perangkat masukan (Input Device) pada model kerja komputer IPO?',
			explanation:
				'Pemindai (Scanner) optik mengonversi berkas fisik dunia nyata menjadi sinyal data biner digital yang dipahami komputer.',
			options: [
				{ optionText: 'Pemindai (Scanner) optik digital', isCorrect: true, orderIndex: 1 },
				{ optionText: 'Layar Monitor OLED resolusi tinggi', isCorrect: false, orderIndex: 2 },
				{ optionText: 'Solid State Drive (SSD NVMe)', isCorrect: false, orderIndex: 3 },
				{ optionText: 'Pencetak Laser (LaserJet Printer)', isCorrect: false, orderIndex: 4 }
			]
		},
		{
			orderIndex: 2,
			questionText:
				'Sub-unit CPU yang bertugas melakukan operasi perbandingan relasional (seperti >, <, =) dan operasi boolean AND/OR adalah...',
			explanation:
				'ALU (Arithmetic Logic Unit) adalah bagian inti CPU yang mengeksekusi perhitungan aritmetika dan logika perbandingan data biner.',
			options: [
				{ optionText: 'Control Unit (CU)', isCorrect: false, orderIndex: 1 },
				{ optionText: 'Arithmetic Logic Unit (ALU)', isCorrect: true, orderIndex: 2 },
				{ optionText: 'System Clock Oscillator', isCorrect: false, orderIndex: 3 },
				{ optionText: 'Universal Serial Bus (USB) Controller', isCorrect: false, orderIndex: 4 }
			]
		},
		{
			orderIndex: 3,
			questionText:
				'Mengapa memori Random Access Memory (RAM) dikategorikan sebagai penyimpanan sementara (volatile memory)?',
			explanation:
				'Karakteristik memori volatile adalah kehilangan seluruh data yang tersimpan saat aliran daya listrik ke komputer terputus.',
			options: [
				{
					optionText: 'Data di dalamnya akan terhapus seketika saat suplai daya listrik dimatikan',
					isCorrect: true,
					orderIndex: 1
				},
				{
					optionText: 'Data hanya dapat dibaca satu kali oleh sistem operasi (read-only)',
					isCorrect: false,
					orderIndex: 2
				},
				{
					optionText: 'Kecepatan aksesnya jauh lebih lambat daripada hard disk eksternal',
					isCorrect: false,
					orderIndex: 3
				},
				{
					optionText: 'Hanya bisa menyimpan file multimedia berformat gambar dan audio',
					isCorrect: false,
					orderIndex: 4
				}
			]
		},
		{
			orderIndex: 4,
			questionText:
				'Dalam siklus pemrosesan instruksi CPU (Machine Cycle), urutan tahapan yang benar adalah...',
			explanation:
				'Siklus instruksi CPU standar adalah Fetch (ambil instruksi), Decode (terjemahkan opcode), Execute (eksekusi instruksi), dan Store (simpan hasil).',
			options: [
				{ optionText: 'Fetch ➔ Decode ➔ Execute ➔ Store', isCorrect: true, orderIndex: 1 },
				{ optionText: 'Decode ➔ Fetch ➔ Store ➔ Execute', isCorrect: false, orderIndex: 2 },
				{ optionText: 'Execute ➔ Fetch ➔ Store ➔ Decode', isCorrect: false, orderIndex: 3 },
				{ optionText: 'Store ➔ Execute ➔ Decode ➔ Fetch', isCorrect: false, orderIndex: 4 }
			]
		},
		{
			orderIndex: 5,
			questionText:
				'Manakah di bawah ini yang membedakan fungsi Sistem Operasi (OS) dari Perangkat Lunak Aplikasi?',
			explanation:
				'Sistem Operasi mengelola sumber daya perangkat keras dan menyediakan lapisan abstraksi layanan dasar untuk seluruh aplikasi.',
			options: [
				{
					optionText:
						'Mengatur alokasi memori, prosesor, dan komunikasi langsung dengan sirkuit perangkat keras',
					isCorrect: true,
					orderIndex: 1
				},
				{
					optionText: 'Menyusun dokumen teks pengolah kata dan lembar sebar akuntansi',
					isCorrect: false,
					orderIndex: 2
				},
				{
					optionText: 'Mematikan sistem komputer secara otomatis saat tidak ada sinyal internet',
					isCorrect: false,
					orderIndex: 3
				},
				{
					optionText: 'Menggantikan peran kabel konektor daya dari sumber listrik PLN',
					isCorrect: false,
					orderIndex: 4
				}
			]
		},
		{
			orderIndex: 6,
			questionText:
				'Register internal CPU yang bertugas menyimpan alamat memori RAM dari instruksi berikutnya yang akan dieksekusi adalah...',
			explanation:
				'Program Counter (PC) secara spesifik menyimpan penunjuk alamat memori dari instruksi selanjutnya yang akan diambil oleh CPU.',
			options: [
				{ optionText: 'Program Counter (PC)', isCorrect: true, orderIndex: 1 },
				{ optionText: 'Instruction Register (IR)', isCorrect: false, orderIndex: 2 },
				{ optionText: 'Memory Data Register (MDR)', isCorrect: false, orderIndex: 3 },
				{ optionText: 'Accumulator (ACC)', isCorrect: false, orderIndex: 4 }
			]
		},
		{
			orderIndex: 7,
			questionText:
				'Perangkat keras keluaran yang bekerja dengan mengonversi berkas citra digital menggunakan sinar laser untuk menarik serbuk toner ke atas kertas adalah...',
			explanation:
				'Printer Laser mengaplikasikan teknik elektrofotografi di mana sinar laser membentuk muatan statis pada drum untuk merekatkan toner sebelum dipanaskan.',
			options: [
				{ optionText: 'Printer Laser (LaserJet)', isCorrect: true, orderIndex: 1 },
				{ optionText: 'Printer Dot Matrix pita karbon', isCorrect: false, orderIndex: 2 },
				{ optionText: 'Printer Thermal struk kasir', isCorrect: false, orderIndex: 3 },
				{ optionText: 'Pemindai Barcode Optik', isCorrect: false, orderIndex: 4 }
			]
		},
		{
			orderIndex: 8,
			questionText:
				'Jalur komunikasi berkecepatan tinggi yang menghubungkan modul CPU, memori RAM, dan kartu ekspansi secara sinkron disebut...',
			explanation:
				'Bus Sistem (System Bus) adalah sekumpulan konduktor fisik yang mentransmisikan data, alamat, dan sinyal kendali di antara komponen komputer.',
			options: [
				{ optionText: 'System Bus (Data, Address, Control)', isCorrect: true, orderIndex: 1 },
				{ optionText: 'Kabel Ethernet UTP Cat 6', isCorrect: false, orderIndex: 2 },
				{ optionText: 'Kabel HDMI Audio Video', isCorrect: false, orderIndex: 3 },
				{ optionText: 'Power Supply Unit Rail', isCorrect: false, orderIndex: 4 }
			]
		},
		{
			orderIndex: 9,
			questionText:
				'Teknologi penyimpanan Solid State Drive (SSD) modern menggunakan antarmuka PCIe NVMe yang unggul dibandingkan HDD karena...',
			explanation:
				'SSD NVMe tidak memiliki bagian mekanis yang berputar dan langsung berkomunikasi melalui bus PCIe dengan antrian instruksi paralel masif.',
			options: [
				{
					optionText:
						'Menggunakan memori semikonduktor tanpa piringan mekanik dengan latensi akses mikrodetik',
					isCorrect: true,
					orderIndex: 1
				},
				{
					optionText: 'Menggunakan magnet cair yang dipanaskan dengan laser inframerah',
					isCorrect: false,
					orderIndex: 2
				},
				{
					optionText: 'Dapat bekerja tanpa memerlukan sumber tegangan daya listrik sama sekali',
					isCorrect: false,
					orderIndex: 3
				},
				{
					optionText: 'Hanya bisa digunakan pada sistem operasi open source Linux',
					isCorrect: false,
					orderIndex: 4
				}
			]
		},
		{
			orderIndex: 10,
			questionText:
				'Dalam arsitektur komputer modern, hierarki cache L1, L2, dan L3 dirancang untuk mengatasi fenomena...',
			explanation:
				'Memory Wall adalah fenomena di mana kecepatan operasi CPU berkembang jauh lebih cepat daripada kecepatan transfer data dari memori utama (RAM).',
			options: [
				{
					optionText:
						'Memory Wall (Kesenjangan latensi antara prosesor cepat dan RAM yang lebih lambat)',
					isCorrect: true,
					orderIndex: 1
				},
				{
					optionText: 'Kelebihan beban tegangan suplai listrik dari adaptor daya',
					isCorrect: false,
					orderIndex: 2
				},
				{
					optionText: 'Serangan malware virus bootloader pada media penyimpanan flash',
					isCorrect: false,
					orderIndex: 3
				},
				{
					optionText: 'Radiasi elektromagnetik frekuensi tinggi dari layar monitor',
					isCorrect: false,
					orderIndex: 4
				}
			]
		}
	];

	for (const questionData of quizQuestionsData) {
		const existingQuestion = await prisma.quizQuestion.findFirst({
			where: { orderIndex: questionData.orderIndex, deletedAt: null },
			include: { options: true }
		});

		if (existingQuestion) {
			await prisma.quizQuestion.update({
				where: { id: existingQuestion.id },
				data: {
					questionText: questionData.questionText,
					explanation: questionData.explanation,
					isActive: true,
					updatedAt: new Date()
				}
			});

			// Update options
			for (const optionData of questionData.options) {
				const existingOption = existingQuestion.options.find(
					(optionRecord) => optionRecord.orderIndex === optionData.orderIndex
				);
				if (existingOption) {
					await prisma.quizOption.update({
						where: { id: existingOption.id },
						data: {
							optionText: optionData.optionText,
							isCorrect: optionData.isCorrect,
							updatedAt: new Date()
						}
					});
				} else {
					await prisma.quizOption.create({
						data: {
							questionId: existingQuestion.id,
							optionText: optionData.optionText,
							isCorrect: optionData.isCorrect,
							orderIndex: optionData.orderIndex
						}
					});
				}
			}
		} else {
			await prisma.quizQuestion.create({
				data: {
					questionText: questionData.questionText,
					explanation: questionData.explanation,
					orderIndex: questionData.orderIndex,
					isActive: true,
					createdBy: 'SEED_SCRIPT',
					options: {
						create: questionData.options.map((optionData) => ({
							optionText: optionData.optionText,
							isCorrect: optionData.isCorrect,
							orderIndex: optionData.orderIndex
						}))
					}
				}
			});
		}
	}
	console.log('✅ 10 Butir Soal Kuis & Opsi Jawaban berhasil di-seed.');

	console.log('🎉 Idempotent Database Seeding Berhasil Selesai (12 Modul & Soal Kuis)!');
}

seedDatabase()
	.catch((seedingError: unknown) => {
		console.error('❌ Gagal menjalankan database seed:', seedingError);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
