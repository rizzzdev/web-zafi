# 📌 Project Spec: Web Media Pembelajaran Interaktif Sistem Komputer (Model IPO) & Instrumen Uji Respon R&D

## 1. Problem Statement & Core Job-To-Be-Done

- **Target Pengguna & Role**:
  - **Mahasiswa / Responden (Public)**: Mahasiswa semester awal Pendidikan Teknik Informatika dan Komputer (PTIK) yang sedang mempelajari mata kuliah pengantar sistem komputer.
  - **Admin / Peneliti (Authenticated Role: ADMIN)**: Mahasiswa peneliti (Klien) yang membutuhkan platform media uji coba sekaligus instrumen pengumpulan data evaluasi kelayakan media untuk keperluan Bab 4 Skripsi/Proposal Metopen.
- **Masalah Utama**:
  - Mahasiswa baru memiliki latar belakang pengetahuan yang heterogen mengenai sistem komputer (perbedaan latar belakang SMA/SMK/MA).
  - Pembelajaran konsep komputer secara teoretis cenderung abstrak tanpa representasi alur kerja data yang jelas.
  - Klien memiliki video pembelajaran namun terikat regulasi mata kuliah Metodologi Penelitian (Metopen) berjenis **Penelitian Pengembangan (R&D)** yang mewajibkan adanya produk nyata yang dapat diuji coba dan dievaluasi langsung oleh mahasiswa melalui testimoni/angket kepraktisan.
- **Core Job-To-Be-Done**:
  > _"Software ini dibuat agar Mahasiswa dapat mempelajari konsep dasar sistem komputer berbasis alur Input-Process-Output (IPO) melalui video terstruktur dan kuis interaktif, serta Peneliti dapat mengumpulkan data respon kepraktisan media pembelajaran secara instan tanpa rekapitulasi manual."_

---

## 2. Route Architecture & Navigation Layout

Sesuai standar arsitektur bersih, seluruh rute menggunakan folder eksplisit statis (tanpa dynamic route parameter `/[role]/`):

### Public Routes (Mahasiswa / Responden):

- `/` : Halaman Beranda (Pengantar sistem komputer, tujuan instruksional, dan profil media pembelajaran).
- `/modul` : Daftar modul alur IPO lengkap (_Input Devices, Processing Unit, Output Devices, Software & Storage_).
- `/modul/input` : Modul 1 — Perangkat Masukan (_Input Devices_).
- `/modul/process` : Modul 2 — Unit Pemrosesan (_CPU, ALU, Register, RAM_).
- `/modul/output` : Modul 3 — Perangkat Keluaran (_Output Devices_).
- `/modul/storage-software` : Modul 4 — Media Penyimpanan & Perangkat Lunak.
- `/kuis` : Halaman Kuis Interaktif (Evaluasi pemahaman konsep mandiri dengan kalkulasi skor otomatis).
- `/testimoni` : Halaman Angket Kepraktisan Media (Pengisian instrumen uji coba R&D dengan skala Likert 1–5 dan feedback kualitatif).

### Auth Routes:

- `/auth/login` : Halaman login peneliti/admin (Bcrypt cost 12, Secure HttpOnly Cookie).
- `/auth/logout` : Handler pemutusan sesi login admin dan penghapusan cookie.

### Admin Routes (Peneliti):

- `/admin/dashboard` : Ringkasan metrik R&D (Total responden, rerata nilai kuis, skor kelayakan media per indikator).
- `/admin/responden` : Tabel data angket respon kepraktisan mahasiswa + Fitur Export CSV.
- `/admin/hasil-kuis` : Tabel rekapitulasi hasil pengerjaan kuis mahasiswa + Fitur Export CSV.
- `/admin/kelola-modul` : Manajemen CRUD modul pembelajaran (Ubah judul, link video YouTube/Drive embed, dan rangkuman teks).

---

## 3. Data Entities & Locked Prisma Schema Contract

> Blok kode Prisma Schema di bawah ini adalah Kontrak Tunggal yang mengikat seluruh tahapan pengembangan:

```prisma
datasource db {
  provider = "postgresql"
  // Note: In Prisma 7, connection URLs are defined in prisma.config.ts
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
  binaryTargets   = ["native", "linux-musl-openssl-3.0.x"]
  output          = "../src/lib/db/generated"
}

enum UserRole {
  ADMIN
}

enum ModuleCategory {
  INPUT
  PROCESS
  OUTPUT
  STORAGE_SOFTWARE
}

model User {
  id           String    @id @default(uuid())
  email        String
  passwordHash String    @map("password_hash")
  fullName     String    @map("full_name")
  role         UserRole  @default(ADMIN)
  createdAt    DateTime  @default(now()) @map("created_at") @db.Timestamptz(3)
  updatedAt    DateTime  @updatedAt @map("updated_at") @db.Timestamptz(3)
  deletedAt    DateTime? @map("deleted_at") @db.Timestamptz(3)
  createdBy    String?   @map("created_by")
  updatedBy    String?   @map("updated_by")
  deletedBy    String?   @map("deleted_by")

  // Note: Partial Unique Index executed via SQL migration in Stage 3:
  // CREATE UNIQUE INDEX users_email_active_idx ON users (email) WHERE deleted_at IS NULL;
  @@index([deletedAt])
  @@map("users")
}

model LearningModule {
  id             String         @id @default(uuid())
  code           String
  title          String
  slug           String
  category       ModuleCategory @default(INPUT)
  videoUrl       String         @map("video_url")
  durationInMinutes Int         @default(5) @map("duration_in_minutes")
  summaryContent String         @map("summary_content") @db.Text
  orderIndex     Int            @default(1) @map("order_index")
  isPublished    Boolean        @default(true) @map("is_published")
  createdAt      DateTime       @default(now()) @map("created_at") @db.Timestamptz(3)
  updatedAt      DateTime       @updatedAt @map("updated_at") @db.Timestamptz(3)
  deletedAt      DateTime?      @map("deleted_at") @db.Timestamptz(3)
  createdBy      String?        @map("created_by")
  updatedBy      String?        @map("updated_by")
  deletedBy      String?        @map("deleted_by")

  // Partial Unique Index:
  // CREATE UNIQUE INDEX learning_modules_code_active_idx ON learning_modules (code) WHERE deleted_at IS NULL;
  // CREATE UNIQUE INDEX learning_modules_slug_active_idx ON learning_modules (slug) WHERE deleted_at IS NULL;
  @@index([deletedAt])
  @@index([orderIndex])
  @@map("learning_modules")
}

model QuizQuestion {
  id             String         @id @default(uuid())
  questionText   String         @map("question_text") @db.Text
  explanation    String?        @db.Text
  orderIndex     Int            @default(1) @map("order_index")
  isActive       Boolean        @default(true) @map("is_active")
  createdAt      DateTime       @default(now()) @map("created_at") @db.Timestamptz(3)
  updatedAt      DateTime       @updatedAt @map("updated_at") @db.Timestamptz(3)
  deletedAt      DateTime?      @map("deleted_at") @db.Timestamptz(3)
  createdBy      String?        @map("created_by")
  updatedBy      String?        @map("updated_by")
  deletedBy      String?        @map("deleted_by")

  options        QuizOption[]

  @@index([deletedAt])
  @@index([orderIndex])
  @@map("quiz_questions")
}

model QuizOption {
  id             String        @id @default(uuid())
  questionId     String        @map("question_id")
  optionText     String        @map("option_text")
  isCorrect      Boolean       @default(false) @map("is_correct")
  orderIndex     Int           @default(1) @map("order_index")
  createdAt      DateTime      @default(now()) @map("created_at") @db.Timestamptz(3)
  updatedAt      DateTime      @updatedAt @map("updated_at") @db.Timestamptz(3)
  deletedAt      DateTime?     @map("deleted_at") @db.Timestamptz(3)
  createdBy      String?       @map("created_by")
  updatedBy      String?       @map("updated_by")
  deletedBy      String?       @map("deleted_by")

  question       QuizQuestion  @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@index([questionId])
  @@index([deletedAt])
  @@map("quiz_options")
}

model QuizSubmission {
  id                String    @id @default(uuid())
  studentName       String    @map("student_name")
  studentIdentifier String    @map("student_identifier") // NIM atau Nomor Mahasiswa
  classBatch        String?   @map("class_batch")        // Kelas/Angkatan
  score             Int       @default(0)
  totalQuestions    Int       @default(0) @map("total_questions")
  correctAnswers    Int       @default(0) @map("correct_answers")
  createdAt         DateTime  @default(now()) @map("created_at") @db.Timestamptz(3)
  updatedAt         DateTime  @updatedAt @map("updated_at") @db.Timestamptz(3)
  deletedAt         DateTime? @map("deleted_at") @db.Timestamptz(3)
  createdBy         String?   @map("created_by")
  updatedBy         String?   @map("updated_by")
  deletedBy         String?   @map("deleted_by")

  @@index([studentIdentifier])
  @@index([deletedAt])
  @@map("quiz_submissions")
}

model StudentFeedback {
  id                String    @id @default(uuid())
  studentName       String    @map("student_name")
  studentIdentifier String    @map("student_identifier") // NIM
  classBatch        String?   @map("class_batch")        // Kelas/Angkatan
  ratingDesign      Int       @map("rating_design")      // Skala 1-5 Aspek Visual/Desain
  ratingContent     Int       @map("rating_content")     // Skala 1-5 Aspek Kejelasan Materi
  ratingUsability   Int       @map("rating_usability")   // Skala 1-5 Aspek Kemudahan Penggunaan
  averageScore      Decimal   @map("average_score") @db.Decimal(3, 2)
  comments          String    @db.Text                   // Kritik, saran, testimoni kualitatif
  createdAt         DateTime  @default(now()) @map("created_at") @db.Timestamptz(3)
  updatedAt         DateTime  @updatedAt @map("updated_at") @db.Timestamptz(3)
  deletedAt         DateTime? @map("deleted_at") @db.Timestamptz(3)
  createdBy         String?   @map("created_by")
  updatedBy         String?   @map("updated_by")
  deletedBy         String?   @map("deleted_by")

  @@index([studentIdentifier])
  @@index([deletedAt])
  @@map("student_feedbacks")
}
```

---

## 4. Search, Filter & Pagination Specifications

- **Searchable Fields**:
  - `StudentFeedback`: `studentName`, `studentIdentifier`, `comments`
  - `QuizSubmission`: `studentName`, `studentIdentifier`
  - `LearningModule`: `title`, `summaryContent`
- **Filterable Fields**:
  - `LearningModule`: `category`, `isPublished`
  - `StudentFeedback`: `ratingDesign`, `ratingContent`, `ratingUsability`, `createdAt`
  - `QuizSubmission`: `score`, `createdAt`
- **Sortable Fields**:
  - `createdAt` (ASC/DESC), `score` (ASC/DESC), `orderIndex` (ASC/DESC)
- **Pagination Defaults**:
  - Tabel Admin: `page: 1`, `limit: 10` (opsi: 10, 25, 50).

---

## 5. Async Tasks & Upload Specifications

- **Task Lifecycle (`TaskLifecyclePort`)**:
  - Proses Export CSV Data Responden & Rekap Kuis untuk laporan Metopen (>1.000 row) mendukung lifecycle: `PENDING` ➔ `PROCESSING` ➔ `COMPLETED` / `FAILED`.
- **Upload Limit (`FileStoragePort`)**:
  - Format yang diizinkan: JPG, PNG, PDF.
  - Batas ukuran maksimal: 5MB.
  - Lokasi penyimpanan: Disk lokal `/app/uploads`.

---

## 6. Threat Model & OWASP Defense

1. **Password Hashing**: Bcrypt cost factor 12 menggunakan pustaka resmi `bcrypt` dan `@types/bcrypt`.
2. **Zero-Credential Echo**: Pesan kesalahan autentikasi bersifat generik (_"Email atau kata sandi tidak valid"_) tanpa membocorkan eksistensi pengguna.
3. **Session Management**: Session token ditransfer melalui cookie `HttpOnly`, `SameSite=Lax`, `Secure` (di production).
4. **Input Sanitization**: Seluruh masukan form testimoni mahasiswa dibersihkan untuk mencegah serangan Cross-Site Scripting (XSS).
5. **Rate Limiting**: Pembatasan percobaan login pada rute `/auth/login` untuk mencegah brute force attack.

---

## 7. Isolated Database Configuration

- **Database URL**: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_edukomputer_db`
- **Redis URL**: `REDIS_URL=redis://localhost:6379/0` (opsional untuk caching)

---

## 8. Meaningful Naming Dictionary

- `users`: Daftar entitas akun administrator peneliti (DILARANG: `u`, `usr`).
- `learningModules`: Daftar modul materi pembelajaran berbasis IPO (DILARANG: `m`, `mods`).
- `quizQuestions`: Daftar butir pertanyaan evaluasi pemahaman (DILARANG: `q`, `questions`).
- `quizSubmissions`: Rekap hasil pengerjaan kuis mahasiswa (DILARANG: `qs`, `subs`).
- `studentFeedbacks`: Data angket instrumen uji coba dan testimoni mahasiswa (DILARANG: `sf`, `fb`).
- `isSubmitting`: Status reaktif saat pengiriman data form di Svelte 5.
- `isLoading`: Status loading pengambilan data.

---

## 9. Definition of Done (DoD) Stage 1

- [x] Dokumen `one-off-dev/SPEC.md` terkunci dengan seluruh entitas dan blok kode `schema.prisma` lengkap.
- [x] Seluruh field unik memiliki catatan Partial Unique Index `WHERE deleted_at IS NULL`.
- [x] Dokumen `one-off-dev/STATUS.md` terinisialisasi dengan 5 tahap dan Port Parity Registry terdaftar.

---

## 10. Cognitive-First UI/UX & Design System Specifications

_Rujukan lengkap: [UI-UX-GUIDELINES.md](file:///c:/Users/rplsm/Documents/web-zafi/one-off-dev/UI-UX-GUIDELINES.md) & [DESIGN-SYSTEM.md](file:///c:/Users/rplsm/Documents/web-zafi/one-off-dev/DESIGN-SYSTEM.md)_

### 10.1 Prinsip Aksesibilitas & Kognitif

- **Latar Netral**: `bg-slate-50 text-slate-900`, kartu `bg-white text-slate-800 border-slate-200 shadow-sm`.
- **Target Sentuh Responsif**: Minimal 48×48px pada elemen interaktif kuis dan tombol Likert 1–5.
- **Visual Stepper IPO**: Navigasi sekuensial _Input ➔ Process ➔ Output ➔ Software & Storage_.
- **Video 16:9 & Chunked Cheatsheet**: Video responsif di paruh atas, cheatsheet terbagi 2 kolom desktop / 1 kolom mobile di bawah.
- **Kuis Beban Rendah**: Progressive onboarding (Nama & NIM), progress bar eksplisit, umpan balik instan + CTA angket.
- **Angket Likert Single-Column**: 5 tombol horizontal besar per butir (1=Sangat Tidak Setuju s.d. 5=Sangat Setuju) menghindari tabel matriks lebar di mobile.
- **Admin F-Pattern**: 4 KPI Cards di atas, tabel dengan filter/search, dan tombol Export CSV instan.

### 10.2 Pemetaan Helper Kelas Kategori Modul

```typescript
export const IPO_THEME_MAP = {
	INPUT: {
		label: 'Input Devices',
		badge: 'bg-sky-100 text-sky-800 border-sky-200',
		accentBg: 'bg-sky-600 text-white',
		softCard: 'bg-sky-50/70 border-sky-200 text-sky-950',
		borderLeft: 'border-l-4 border-l-sky-600'
	},
	PROCESS: {
		label: 'Processing Unit',
		badge: 'bg-amber-100 text-amber-900 border-amber-200',
		accentBg: 'bg-amber-600 text-white',
		softCard: 'bg-amber-50/70 border-amber-200 text-amber-950',
		borderLeft: 'border-l-4 border-l-amber-600'
	},
	OUTPUT: {
		label: 'Output Devices',
		badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
		accentBg: 'bg-emerald-600 text-white',
		softCard: 'bg-emerald-50/70 border-emerald-200 text-emerald-950',
		borderLeft: 'border-l-4 border-l-emerald-600'
	},
	STORAGE_SOFTWARE: {
		label: 'Software & Storage',
		badge: 'bg-purple-100 text-purple-800 border-purple-200',
		accentBg: 'bg-purple-600 text-white',
		softCard: 'bg-purple-50/70 border-purple-200 text-purple-950',
		borderLeft: 'border-l-4 border-l-purple-600'
	}
} as const;
```
