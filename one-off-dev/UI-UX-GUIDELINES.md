# 🎨 UI/UX Guidelines: Web Media Pembelajaran Interaktif Sistem Komputer (Model IPO)

Desain antarmuka untuk **Web Media Pembelajaran Interaktif Sistem Komputer (Model IPO)** menyeimbangkan dua tujuan utama:

1. **Menekan beban kognitif (_cognitive load_)** bagi mahasiswa baru PTIK yang memiliki latar belakang heterogen.
2. **Memaksimalkan tingkat penyelesaian (_completion rate_)** kuis dan angket skala Likert sebagai sumber data primer Bab 4 penelitian R&D.

---

## 1. Prinsip Kognitif & Struktur Halaman Modul IPO

Berdasarkan _Cognitive Theory of Multimedia Learning_ (Richard Mayer):

- **Visual Stepper Alur IPO**: Sediakan navigasi sekuensial berbentuk alur _Input ➔ Process ➔ Output ➔ Software & Storage_ di bagian atas halaman modul beserta tombol _Selanjutnya_ dan _Sebelumnya_ yang jelas untuk membangun model mental bertahap.
- **Hierarki Video Embed & Kartu Cheatsheet**:
  - Paruh atas: Pemutar video responsif rasio 16:9 sebagai fokus utama.
  - Paruh bawah: Kartu rangkuman visual (_cheatsheet_) dengan teknik _content chunking_ (poin-poin pendek, subjudul, ikon spesifik, mudah dipindai/_scannable_).
- **Pengodean Warna Semantik (_Semantic Color Coding_)**:
  - **Input Devices**: Sky Blue (`bg-sky-600`)
  - **Processing Unit**: Amber (`bg-amber-600`)
  - **Output Devices**: Emerald (`bg-emerald-600`)
  - **Software & Storage**: Purple (`bg-purple-600`)
  - Kontras teks memenuhi standar aksesibilitas WCAG 2.1 minimal rasio 4.5:1.

---

## 2. UX Kuis Evaluasi Tanpa Beban Registrasi

Ketiadaan registrasi akun memangkas friksi, dengan pengelolaan identitas rapi:

- **Gerbang Identitas Ringkas (_Progressive Onboarding_)**: Form input **Nama Lengkap**, **NIM**, dan **Kelas** dalam kartu fokus tunggal sebelum soal dimulai, dilengkapi validasi format.
- **Indikator Progres & Fokus Soal**: _Progress bar_ visual yang menampilkan posisi pengerjaan eksplisit (_Soal X dari N_).
- **Umpan Balik Instan (_Immediate Feedback Loop_)**:
  - Skor akhir langsung muncul setelah pengerjaan.
  - Tinjauan jawaban benar/salah disertai ulasan singkat konsep IPO terkait.
  - Tombol CTA menonjol mengarahkan mahasiswa ke halaman pengisian angket kelayakan media (`/testimoni`).

---

## 3. UX Instrumen Angket Likert 1–5 & Testimoni R&D

Dioptimalkan khusus untuk pengguna smartphone (_Mobile-First Survey_):

- **Hindari Tabel Matriks Lebar di Layar Mobile**: Menggunakan tata letak satu kolom vertikal (_single-column layout_). Setiap butir pernyataan diikuti oleh deretan 5 tombol angka berukuran besar (_touch-friendly target_ minimal 48×48px).
- **Pengelompokan Tiga Aspek Kelayakan**:
  1. **Aspek Desain Tampilan** (_ratingDesign_)
  2. **Aspek Kelayakan Materi** (_ratingContent_)
  3. **Aspek Kemudahan Penggunaan** (_ratingUsability_)
  - Label skala eksplisit pada kedua ujung: `1 = Sangat Tidak Setuju` hingga `5 = Sangat Setuju`.
- **Minimalkan Beban Mengetik**: Kolom testimoni/saran kualitatif diletakkan di akhir dengan chip pemicu opsional, diakhiri tombol aksi spesifik: **"Kirim Penilaian Responden"**.

---

## 4. UX Dashboard Peneliti & Ekspor Data Skripsi

Pusat kendali operasional peneliti untuk pemantauan sampel Bab 4:

- **Pola Pemindaian F-Pattern untuk Kartu KPI**:
  - 4 metrik utama teratas: _Total Responden Angket_, _Partisipan Kuis_, _Rerata Skor Kuis_, dan _Indeks Kelayakan Media_.
  - Interpretasi instan pada kartu skor Likert (contoh: _4.42 / 5.00 — Kategori: Sangat Layak_).
- **Tabel Operasional & Ekspor CSV Satu Klik**: Pencarian Nama/NIM, filter rating/skor, pengurutan kolom, dan tombol **Export CSV** berwarna kontras tinggi di sudut kanan atas tabel.
- **Pratinjau Langsung (_Live Preview_) pada Form Modul**: Kotak pratinjau _iframe_ otomatis saat admin memasukkan tautan video (YouTube / Google Drive embed) sebelum data disimpan.

---

## 5. Matriks Pemetaan UI/UX terhadap Arsitektur Rute

| Rute Aplikasi      | Pola Komponen UI                                       | Prinsip UX Utama                                   | Dampak pada Tujuan R&D                                      |
| :----------------- | :----------------------------------------------------- | :------------------------------------------------- | :---------------------------------------------------------- |
| **`/` & `/modul`** | Hero Card, IPO Visual Stepper                          | _Progressive disclosure_, orientasi alur belajar   | Memperjelas tujuan belajar bagi mahasiswa baru PTIK         |
| **`/modul/*`**     | Responsive 16:9 Video, Cheatsheet Grid                 | Teori Beban Kognitif Mayer, _content chunking_     | Menjaga fokus belajar tanpa kejenuhan teks                  |
| **`/kuis`**        | Identity Gate Card, Progress Bar, Instant Score        | _Immediate feedback_, navigasi bebas distraksi     | Mengukur pemahaman kognitif mahasiswa secara akurat         |
| **`/testimoni`**   | Single-Column Likert Cards, Large Touch Targets (48px) | _Mobile-first survey_, pencegahan _survey fatigue_ | Meningkatkan _completion rate_ data uji kepraktisan         |
| **`/admin/*`**     | Top KPI Cards, Searchable Table, CSV Action            | _F-pattern scanning_, _data etiquette_ ekspor      | Mempercepat rekapitulasi statistik Bab 4 tanpa rekap manual |
