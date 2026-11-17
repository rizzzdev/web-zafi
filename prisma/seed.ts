import 'dotenv/config';
import bcrypt from 'bcrypt';
import { prisma, UserRole, ModuleCategory } from '../src/lib/db';

async function seedDatabase(): Promise<void> {
	console.log('🌱 Memulai Idempotent Database Seeding...');

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

	// 2. Seed 4 Learning Modules (Model IPO)
	const learningModulesData = [
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
Perangkat input dikelompokkan berdasarkan modalitas data yang diakuisisi:

### A. Perangkat Berbasis Teks & Ketukan (Keyboard)
* **Mekanisme Matriks Sakelar:** Penekanan tombol menutup sirkuit pada baris dan kolom tertentu.
* **Mikrokontroler Keyboard:** Menghasilkan kode pemindaian (*scan code*) unik untuk setiap tombol (Make Code saat ditekan, Break Code saat dilepas) dan mengirimkannya melalui antarmuka USB/HID ke CPU via interupsi hardware.

### B. Perangkat Penunjuk Spasial (Pointing Devices)
* **Mouse Optik/Laser:** Menggunakan sensor kamera mini berkecepatan ribuan bingkai per detik (*Digital Signal Processor*) untuk mendeteksi perubahan mikroskopis tekstur permukaan meja.
* **Layar Sentuh (Touchscreen):** Terdiri atas tipe *Kapasitif Proyeksi* (merespons medan elektrostatik jari manusia) dan *Resistif* (bekerja berdasarkan tekanan mekanis dua lapisan konduktif).

### C. Akuisisi Suara & Citra Digital
* **Mikrofon:** Membran transduser mengonversi getaran gelombang tekanan udara menjadi sinyal tegangan mikro, yang kemudian diproses oleh chip audio ADC (misal: 24-bit / 96 kHz).
* **Pemindai & Kamera Digital (CCD/CMOS Sensor):** Mengubah foton cahaya yang dipantulkan dokumen menjadi muatan elektron pada matriks piksel fotodioda.

---

## 3. Hubungan Input dengan Bus Sistem
Data dari perangkat masukan dialirkan ke prosesor melalui:
1. **Interrupt Request (IRQ):** Perangkat memberi sinyal ke CPU bahwa data baru siap dibaca.
2. **Direct Memory Access (DMA):** Untuk input berkecepatan tinggi (seperti streaming kamera), data langsung ditransfer ke memori RAM tanpa membebani siklus eksekusi CPU secara konstan.

> 💡 **Kunci Konseptual:** Perangkat input tidak sekadar menerima data mentah, melainkan memastikan data tersebut terstandarisasi ke dalam format biner yang sesuai dengan arsitektur bus sistem sebelum diteruskan ke unit pemrosesan.`
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

Unit Pemrosesan Inti (*Central Processing Unit* atau CPU) merupakan pusat pengendali dan komputasi komputer yang bertanggung jawab menginterpretasikan, mengorkestrasikan, dan mengeksekusi instruksi program perangkat lunak.

---

## 1. Arsitektur Komputasi: Model Von Neumann
Mayoritas komputer modern mengadopsi model **Von Neumann**, di mana instruksi program dan data biner berbagi ruang memori utama dan bus transmisi yang sama.

---

## 2. Tiga Komponen Internal Utama CPU

### A. Control Unit (CU)
Control Unit adalah pengatur lalu lintas logika dan instruksi:
* Mengambil (*fetch*) kode operasi (*opcode*) dari RAM.
* Menerjemahkan (*decode*) instruksi ke dalam sinyal-sinyal mikro kendali.
* Mengatur sinyal sinkronisasi *clock* agar setiap sirkuit bekerja teratur.

### B. Arithmetic Logic Unit (ALU)
Sirkuit komputasi murni yang menangani dua jenis operasi dasar:
1. **Operasi Aritmetika:** Penjumlahan biner (*Full Adder*), pengurangan, perkalian, dan pembagian.
2. **Operasi Logika Boolean:** Evaluasi relasi \`AND\`, \`OR\`, \`XOR\`, \`NOT\`, serta perbandingan besar/kecil (\`>\`, \`<\`, \`=\`).

### C. Kumpulan Register (Register File)
Memori internal berkecepatan tertinggi di dalam die CPU dengan kapasitas sangat terbatas:
* **Program Counter (PC):** Menyimpan alamat memori RAM dari instruksi berikutnya yang akan dieksekusi.
* **Instruction Register (IR):** Menyimpan kode instruksi yang sedang didekode.
* **Memory Address Register (MAR):** Menyimpan alamat memori fisik yang sedang diakses.
* **Memory Data Register (MDR):** Menampung data yang baru dibaca dari atau akan ditulis ke RAM.
* **Accumulator (ACC):** Menyimpan hasil sementara dari kalkulasi ALU.

---

## 3. Siklus Mesin CPU (*Instruction Cycle*)
Setiap instruksi komputer berjalan melalui empat tahap berulang (*Machine Cycle*):

\`\`\`text
[ Fetch ] ➔ [ Decode ] ➔ [ Execute ] ➔ [ Store / Write-back ]
\`\`\`

1. **Fetch:** CPU menyalin instruksi dari RAM pada alamat yang ditunjuk oleh \`PC\` ke dalam \`IR\`. Nilai \`PC\` kemudian dinaikkan (*increment*).
2. **Decode:** Control Unit menguraikan *opcode* instruksi dan menentukan operan yang dibutuhkan.
3. **Execute:** ALU menjalankan operasi komputasi atau perpindahan data yang diinstruksikan.
4. **Store:** Hasil akhir disimpan kembali ke register internal atau dialirkan ke alamat memori utama.

---

## 4. Hirarki Memori & Peran Cache CPU
Untuk mengatasi kesenjangan kecepatan antara CPU GHz yang super cepat dan RAM yang relatif lebih lambat (*memory wall*):
* **L1 Cache:** Berkecepatan setara clock CPU (kapasitas per-core 32KB - 64KB).
* **L2 Cache:** Lebih besar namun latensi sedikit lebih tinggi (512KB - 1MB per core).
* **L3 Cache:** Shared cache untuk seluruh core prosesor (16MB - 64MB+).

> 💡 **Kunci Konseptual:** Performa CPU modern ditentukan oleh efisiensi pipa instruksi (*instruction pipelining*) dan kemampuan mempertahankan laju eksekusi siklus tanpa *stall* akibat kelambatan akses data memori.`
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

Perangkat Keluaran (*Output Devices*) bertugas menerjemahkan bit-bit data biner hasil pemrosesan komputer menjadi wujud fisik, visual, audio, atau mekanikal yang dapat diindera dan dimanfaatkan oleh manusia maupun sistem mesin lainnya.

---

## 1. Prinsip Kerja: Digital to Analog Conversion (DAC)
Sebagaimana telinga dan mata manusia beroperasi dalam ranah gelombang kontinu, perangkat keluaran mengandalkan konverter digital-ke-analog (DAC) serta sirkuit *display controller*:
* **Video Framebuffer:** Area RAM grafis khusus (VRAM) yang memetakan warna setiap piksel dalam matriks bit RGB.
* **DAC Audio:** Mengonversi aliran data PCM biner menjadi variasi gelombang tegangan analog yang menggetarkan membran transduser speaker.

---

## 2. Klasifikasi Perangkat Keluaran Utama

### A. Monitor & Perangkat Visual (Display)
* **Teknologi Panel LCD (Liquid Crystal Display):** Menggunakan kristal cair yang diputar oleh medan listrik untuk memodulasi cahaya dari lampu latar (*LED backlight*).
* **Teknologi OLED (Organic Light Emitting Diode):** Setiap sub-piksel organik memancarkan cahayanya sendiri, menghasilkan rasio kontras tak hingga dan waktu respon mikrodetik.
* **Spesifikasi Kunci:** Resolusi piksel (Full HD, 4K), Rasio Aspek (16:9), *Refresh Rate* (60Hz, 144Hz), dan kedalaman warna (*Color Depth* 8-bit/10-bit).

### B. Pencetak Fisik (Printers & Plotters)
* **Printer Inkjet:** Menyemprotkan tetesan mikro tinta cair melalui pemanas termal (*bubble jet*) atau kristal piezoelektrik ke atas kertas.
* **Printer Laser (Electrophotography):** Sinar laser menggambar pola muatan elektrostatik pada silinder drum fotoreseptor, menarik serbuk toner bermuatan, lalu melelehkannya ke kertas dengan panas *fuser unit*.

### C. Pengeras Suara (Audio Output)
* Menguatkan sinyal analog dari DAC melalui penguat operasional (*amplifier*), menghasilkan variasi medan magnet pada *voice coil* yang mendorong konus speaker untuk menghasilkan gelombang suara akustik.

### D. Aktuator & Perangkat Kendali Mekatronika
* Motor servo, relay solenoid, dan sistem pneumatik yang digerakkan oleh mikrokontroler untuk mengubah instruksi komputasi menjadi gerakan fisik pada otomasi industri dan robotika.

---

## 3. Tabel Perbandingan Karakteristik Perangkat Keluaran

| Perangkat Keluaran | Bentuk Representasi | Metrik Kualitas Kunci | Satuan Pengukuran |
| :--- | :--- | :--- | :--- |
| **Monitor Komputer** | Visual Fotometrik | Resolusi & Refresh Rate | Piksel, Hertz (Hz) |
| **Printer Laser** | Fisik Permanen (Cetak) | Kerapatan Titik & Kecepatan | DPI (*Dots Per Inch*), PPM |
| **Speaker Audio** | Akustik Gelombang Suara | Respons Frekuensi & SNR | Hertz (Hz), Decibel (dB) |
| **Aktuator Robot** | Gerakan Kinematik Mekanis | Torsi & Presisi Sudut | Nm (*Newton meter*), Derajat |

> 💡 **Kunci Konseptual:** Tanpa perangkat keluaran, seluruh hasil kalkulasi matematis bernilai triliunan operasi per detik di dalam CPU tidak akan memiliki dampak praktis bagi pengguna manusia.`
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
			summaryContent: `# 💾 Modul 4: Media Penyimpanan & Perangkat Lunak (Storage & Software)

Siklus Input-Process-Output (IPO) membutuhkan komponen persistensi jangka panjang (*Secondary Storage*) dan lapisan logika instruksional (*Software*) agar sistem komputer dapat beroperasi secara mandiri dan menyimpan informasi melampaui siklus daya listrik.

---

## 1. Mengapa Dibutuhkan Penyimpanan Sekunder?
Memori kerja utama (RAM) bersifat **volatile**—seluruh isi data sirna saat tegangan listrik diputus. Penyimpanan sekunder (*Secondary Storage*) mengadopsi teknologi **non-volatile** untuk menjamin data tetap utuh secara permanen.

---

## 2. Evolusi Media Penyimpanan Non-Volatile

### A. Hard Disk Drive (HDD Magnetik)
* **Mekanisme:** Piringan magnetik (*platter*) berputar pada kecepatan 5400-7200 RPM dengan lengan mekanis (*read/write head*) yang mengapung di atas bantalan udara.
* **Karakteristik:** Kapasitas besar dengan harga per-gigabyte sangat ekonomis, namun rentan terhadap goncangan mekanik dan memiliki latensi pencarian (*seek time*) relatif lambat (beberapa milidetik).

### B. Solid State Drive (SSD Flash NAND)
* **Mekanisme:** Tidak memiliki komponen bergerak. Menggunakan sel memori semikonduktor *floating-gate* atau *charge-trap transistor* untuk menjebak elektron.
* **Protokol NVMe (Non-Volatile Memory Express):** Memanfaatkan jalur bus berkecepatan tinggi PCI Express (PCIe) dengan antrian instruksi paralel masif, mencapai kecepatan transfer gigabyte per detik.

---

## 3. Taksonomi Perangkat Lunak (*Software*)

Perangkat lunak adalah sekumpulan instruksi, algoritma, dan data terstruktur yang memberitahu perangkat keras apa yang harus dikerjakan. Dibagi menjadi dua kategori hierarki:

### A. Perangkat Lunak Sistem (*System Software*)
* **Sistem Operasi (OS - Operating System):** Perangkat lunak fundamental (seperti Linux, Windows, macOS) yang bertindak sebagai jembatan antara perangkat keras dan aplikasi:
  1. *Manajemen Prosesor:* Mengatur penjadwalan eksekusi thread/proses (*scheduler*).
  2. *Manajemen Memori:* Mengalokasikan ruang RAM virtual dan proteksi memori antar-aplikasi.
  3. *Manajemen Berkas:* Mengorganisasi penyimpanan file hierarkis (NTFS, EXT4, APFS).
* **Device Drivers:** Modul kode khusus yang menerjemahkan panggilan API umum sistem operasi menjadi sinyal register spesifik perangkat keras tertentu (misal: driver kartu grafis).
* **Firmware (BIOS/UEFI):** Kode permanen berkapasitas kecil yang tertanam pada chip motherboard untuk inisialisasi hardware (*Power-On Self-Test / POST*) dan booting OS.

### B. Perangkat Lunak Aplikasi (*Application Software*)
Program yang dirancang khusus untuk memfasilitasi kebutuhan produktivitas manusia:
* Pengolah Kata & Lembar Sebar (Office Suites).
* Web Browser & Klien Komunikasi Jaringan.
* Perangkat Lunak Rekayasa & IDE Kompilasi Kode.

---

## 4. Rangkuman Siklus IPO Terintegrasi
1. Data fisik diakuisisi oleh **Input Devices**.
2. **CPU** melakukan komputasi dan manipulasi data di bawah instruksi **Software**.
3. Hasil sementara ditampung di **RAM**, dan hasil permanen diarsipkan ke **Storage**.
4. Informasi final disajikan ke dunia nyata melalui **Output Devices**.`
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
	console.log('✅ 4 Modul Pembelajaran berhasil di-seed.');

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

	console.log('🎉 Idempotent Database Seeding Berhasil Selesai (Hanya Modul & Soal Kuis)!');
}

seedDatabase()
	.catch((seedingError: unknown) => {
		console.error('❌ Gagal menjalankan database seed:', seedingError);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
