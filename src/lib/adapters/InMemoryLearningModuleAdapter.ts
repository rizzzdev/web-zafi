import type { LearningModulePort, UpdateLearningModuleDto } from '$lib/modules/learning-module';
import { type LearningModule, ModuleCategory } from '$lib/db';

export class InMemoryLearningModuleAdapter implements LearningModulePort {
  private readonly moduleStore: LearningModule[] = [
    {
      id: 'm1000000-0000-0000-0000-000000000001',
      code: 'MOD-01',
      title: 'Perangkat Masukan (Input Devices)',
      slug: 'input',
      category: ModuleCategory.INPUT,
      videoUrl: 'https://www.youtube.com/embed/Z_b_4Dfg7Q8',
      durationInMinutes: 6,
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

> 💡 **Kunci Konseptual:** Perangkat input tidak sekadar menerima data mentah, melainkan memastikan data tersebut terstandarisasi ke dalam format biner yang sesuai dengan arsitektur bus sistem sebelum diteruskan ke unit pemrosesan.`,
      orderIndex: 1,
      isPublished: true,
      createdAt: new Date('2026-11-01T08:00:00Z'),
      updatedAt: new Date('2026-11-01T08:00:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'm2000000-0000-0000-0000-000000000002',
      code: 'MOD-02',
      title: 'Unit Pemrosesan Inti (Processing Unit)',
      slug: 'process',
      category: ModuleCategory.PROCESS,
      videoUrl: 'https://www.youtube.com/embed/FZGugFqDr60',
      durationInMinutes: 8,
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

> 💡 **Kunci Konseptual:** Performa CPU modern ditentukan oleh efisiensi pipa instruksi (*instruction pipelining*) dan kemampuan mempertahankan laju eksekusi siklus tanpa *stall* akibat kelambatan akses data memori.`,
      orderIndex: 2,
      isPublished: true,
      createdAt: new Date('2026-11-01T08:30:00Z'),
      updatedAt: new Date('2026-11-01T08:30:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'm3000000-0000-0000-0000-000000000003',
      code: 'MOD-03',
      title: 'Perangkat Keluaran (Output Devices)',
      slug: 'output',
      category: ModuleCategory.OUTPUT,
      videoUrl: 'https://www.youtube.com/embed/4RPtJ9UYHS8',
      durationInMinutes: 5,
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

> 💡 **Kunci Konseptual:** Tanpa perangkat keluaran, seluruh hasil kalkulasi matematis bernilai triliunan operasi per detik di dalam CPU tidak akan memiliki dampak praktis bagi pengguna manusia.`,
      orderIndex: 3,
      isPublished: true,
      createdAt: new Date('2026-11-01T09:00:00Z'),
      updatedAt: new Date('2026-11-01T09:00:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'm4000000-0000-0000-0000-000000000004',
      code: 'MOD-04',
      title: 'Media Penyimpanan & Perangkat Lunak',
      slug: 'storage-software',
      category: ModuleCategory.STORAGE_SOFTWARE,
      videoUrl: 'https://www.youtube.com/embed/p3q5zWCw8J4',
      durationInMinutes: 7,
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

## 4. Alur Integrasi Penuh Siklus IPO Komputer

\`\`\`text
+---------------+       +------------------+       +----------------+
| INPUT DEVICES | ----> | PROCESSING (CPU) | ----> | OUTPUT DEVICES |
+---------------+       +------------------+       +----------------+
                                ^     |
                                |     v
                        +----------------------+
                        | STORAGE & RAM SYSTEM |
                        +----------------------+
\`\`\`

1. **Input:** Pengguna mengetik perintah teks pada Keyboard.
2. **Process:** CPU membaca instruksi dari RAM, ALU memproses teks, dan OS mengalokasikan memori.
3. **Storage:** Dokumen disimpan secara non-volatile ke SSD NVMe.
4. **Output:** Kartu grafis dan Layar Monitor menampilkan hasil ketikan secara visual kepada pengguna.

> 💡 **Kunci Konseptual:** Perangkat keras menyediakan kapasitas eksekusi fisik, sementara perangkat lunak memberikan kecerdasan logika untuk menyelesaikan masalah komputasi nyata.`,
      orderIndex: 4,
      isPublished: true,
      createdAt: new Date('2026-11-01T09:30:00Z'),
      updatedAt: new Date('2026-11-01T09:30:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'm5000000-0000-0000-0000-000000000005',
      code: 'MOD-05',
      title: 'Arsitektur GPU & Komputasi Paralel (Graphics & AI Hardware)',
      slug: 'gpu-parallel-computing',
      category: ModuleCategory.PROCESS,
      videoUrl: 'https://www.youtube.com/embed/FZGugFqDr60',
      durationInMinutes: 9,
      summaryContent: `# 🚀 Modul 5: Arsitektur GPU & Komputasi Paralel

Unit Pemrosesan Grafis (*Graphics Processing Unit* / GPU) telah bertransformasi dari akselerator grafis 3D menjadi mesin komputasi paralel masif untuk *High Performance Computing* dan *Artificial Intelligence*.

---

## 1. Perbedaan Mendasar Arsitektur CPU vs GPU
* **CPU (Latency-Optimized):** Memiliki sedikit core yang sangat bertenaga dan fleksibel dengan cache berukuran besar untuk mengeksekusi instruksi sekuensial secepat mungkin.
* **GPU (Throughput-Optimized):** Memiliki ribuan core yang lebih sederhana untuk mengeksekusi jutaan operasi matematika matriks dan vektor secara paralel (SIMD - *Single Instruction, Multiple Data*).

---

## 2. Pipeline Rendering & Compute Shaders
1. **Vertex Processing:** Mentransformasikan koordinat objek 3D dalam ruang dunia nyata ke ruang kamera.
2. **Rasterization:** Mengubah primitif geometris menjadi fragmen piksel 2D.
3. **Pixel/Fragment Shaders:** Menghitung warna, pencahayaan fotorealistik (*Ray Tracing*), dan tekstur.
4. **Compute Unified Device Architecture (CUDA):** Menjalankan kalkulasi non-grafis seperti pelatihan model *Deep Learning* dan simulasi dinamika fluida.

> 💡 **Kunci Konseptual:** Kolaborasi CPU dan GPU modern memungkinkan pembagian beban kerja komputasi: CPU menangani kontrol logika utama, sementara GPU mengolah kalkulasi matriks data masif.`,
      orderIndex: 5,
      isPublished: true,
      createdAt: new Date('2026-11-05T10:00:00Z'),
      updatedAt: new Date('2026-11-05T10:00:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'm6000000-0000-0000-0000-000000000006',
      code: 'MOD-06',
      title: 'Manajemen Memori Virtual & File System Modern',
      slug: 'virtual-memory-file-system',
      category: ModuleCategory.STORAGE_SOFTWARE,
      videoUrl: 'https://www.youtube.com/embed/3eI9s_9Xk7s',
      durationInMinutes: 7,
      summaryContent: `# 📁 Modul 6: Manajemen Memori Virtual & File System Modern

Sistem operasi mengabstraksikan perangkat keras fisik penyimpanan dan memori agar aplikasi dapat beroperasi dengan aman tanpa saling menimpa data.

---

## 1. Konsep Memori Virtual & Paging
Memori virtual memberikan ilusi kepada setiap aplikasi bahwa ia memiliki ruang memori pribadi yang luas dan berurutan:
* **Memory Management Unit (MMU):** Sirkuit hardware di CPU yang mentranslasikan alamat logika (*virtual address*) menjadi alamat fisik di RAM (*physical address*).
* **Page Fault:** Terjadi ketika data yang diminta belum ada di RAM fisik dan harus dimuat dari SSD (Swap/Pagefile).

---

## 2. Arsitektur File System Modern (NTFS, Ext4, ZFS)
* **Metadata & Inode Table:** Menyimpan informasi kepemilikan berkas, izin akses, dan ukuran tanpa memuat isi data berkas.
* **Journaling:** Mekanisme pencatatan transaksi sebelum ditulis ke disk fisik untuk mencegah kerusakan data saat listrik padam tiba-tiba.
* **Hierarki Direktori:** Struktur pohon (*tree structure*) yang memudahkan pencarian dan pengelompokan data pengguna.

> 💡 **Kunci Konseptual:** Memori virtual dan file system adalah wujud nyata bagaimana perangkat lunak sistem menyempurnakan batasan fisik perangkat keras.`,
      orderIndex: 6,
      isPublished: true,
      createdAt: new Date('2026-11-08T11:00:00Z'),
      updatedAt: new Date('2026-11-08T11:00:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
    },
  ];

  public async getAllModules(): Promise<readonly LearningModule[]> {
    return [...this.moduleStore];
  }

  public async getModuleBySlug(moduleSlug: string): Promise<LearningModule | null> {
    const matchedModule = this.moduleStore.find((moduleItem) => moduleItem.slug === moduleSlug && !moduleItem.deletedAt);
    return matchedModule ? { ...matchedModule } : null;
  }

  public async getModuleById(moduleId: string): Promise<LearningModule | null> {
    const matchedModule = this.moduleStore.find((moduleItem) => moduleItem.id === moduleId && !moduleItem.deletedAt);
    return matchedModule ? { ...matchedModule } : null;
  }

  public async updateModule(inputDto: UpdateLearningModuleDto): Promise<LearningModule> {
    const targetModuleIndex = this.moduleStore.findIndex((moduleItem) => moduleItem.id === inputDto.moduleId);
    if (targetModuleIndex === -1) {
      throw new Error(`Modul dengan ID '${inputDto.moduleId}' tidak ditemukan`);
    }

    const currentModule = this.moduleStore[targetModuleIndex];
    const updatedModule: LearningModule = {
      ...currentModule,
      title: inputDto.title,
      videoUrl: inputDto.videoUrl,
      summaryContent: inputDto.summaryContent,
      isPublished: inputDto.isPublished,
      updatedAt: new Date(),
    };

    this.moduleStore[targetModuleIndex] = updatedModule;
    return { ...updatedModule };
  }
}
