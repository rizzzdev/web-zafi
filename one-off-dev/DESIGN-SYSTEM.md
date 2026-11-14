# 🎨 Design System & Token Specifications: Web Media Pembelajaran Interaktif Sistem Komputer (Model IPO)

## 1. Prinsip Dasar & Standar Aksesibilitas Antarmuka

- **Reduksi Beban Kognitif**: Latar netral dengan kontras lembut (`bg-slate-50`) agar fokus visual tertuju penuh pada konten materi dan kartu rangkuman.
- **Kontras Aksesibilitas**: Seluruh teks dan latar memenuhi standar WCAG 2.1 Level AA (minimal 4.5:1).
- **Target Sentuh Responsif**: Target interaktif (tombol Likert, opsi kuis) minimal 48×48 piksel di layar ponsel.
- **Konsistensi Semantik**: Identitas warna tetap untuk setiap tahapan model sistem komputer (Input, Process, Output, Storage & Software).

---

## 2. Palet Warna Dasar & Semantik Kategori IPO

### Token Permukaan & Status Sistem

| Token Antarmuka       | Fungsi Visual                       | Kelas Latar & Teks               | Kelas Border & Fokus                        |
| :-------------------- | :---------------------------------- | :------------------------------- | :------------------------------------------ |
| **Latar Utama**       | Kanvas dasar halaman publik & admin | `bg-slate-50 text-slate-900`     | `border-slate-200`                          |
| **Permukaan Kartu**   | Kontainer modul, soal kuis, & tabel | `bg-white text-slate-800`        | `border-slate-200 shadow-sm`                |
| **Aksen Primer**      | Tombol aksi utama & navigasi aktif  | `bg-indigo-600 text-white`       | `hover:bg-indigo-700 focus:ring-indigo-500` |
| **Status Valid**      | Jawaban kuis benar & skor layak     | `bg-emerald-50 text-emerald-800` | `border-emerald-300`                        |
| **Status Peringatan** | Pesan error login & jawaban salah   | `bg-rose-50 text-rose-800`       | `border-rose-300`                           |

### Token Semantik Modul Alur IPO

| Kategori Modul         | Asosiasi Visual                  | Kelas Aksen Utama           | Kelas Latar Kartu Lembut            | Kelas Badge & Border                                 |
| :--------------------- | :------------------------------- | :-------------------------- | :---------------------------------- | :--------------------------------------------------- |
| **Input Devices**      | Sinyal masuk & akuisisi data     | `bg-sky-600 text-white`     | `bg-sky-50/70 text-sky-950`         | `border-sky-200 bg-sky-100 text-sky-800`             |
| **Processing Unit**    | Komputasi inti, logika, & memori | `bg-amber-600 text-white`   | `bg-amber-50/70 text-amber-950`     | `border-amber-200 bg-amber-100 text-amber-900`       |
| **Output Devices**     | Proyeksi hasil & umpan balik     | `bg-emerald-600 text-white` | `bg-emerald-50/70 text-emerald-950` | `border-emerald-200 bg-emerald-100 text-emerald-800` |
| **Software & Storage** | Abstraksi sistem & retensi data  | `bg-purple-600 text-white`  | `bg-purple-50/70 text-purple-950`   | `border-purple-200 bg-purple-100 text-purple-800`    |

---

## 3. Skala Tipografi & Hierarki Teks

Menggunakan sans-serif modern (**Plus Jakarta Sans** / **Inter**) dan monospace (**JetBrains Mono**) untuk NIM, spesifikasi hardware, dan data teknis.

| Elemen Tipografi      | Kelas Ukuran & Spasi                                | Kelas Ketebalan & Warna        | Penggunaan Utama                                          |
| :-------------------- | :-------------------------------------------------- | :----------------------------- | :-------------------------------------------------------- |
| **Judul Halaman**     | `text-2xl md:text-3xl tracking-tight leading-tight` | `font-bold text-slate-900`     | Header beranda, judul modul aktif, judul dashboard        |
| **Judul Bagian**      | `text-lg md:text-xl leading-snug`                   | `font-semibold text-slate-800` | Subjudul kartu rangkuman, kategori angket, panel admin    |
| **Teks Materi Utama** | `text-base leading-relaxed`                         | `font-normal text-slate-700`   | Penjelasan konsep IPO, soal kuis, butir pernyataan Likert |
| **Label & Bantuan**   | `text-sm leading-normal`                            | `font-medium text-slate-600`   | Label input form, keterangan skala, header kolom tabel    |
| **Data Teknis & NIM** | `text-xs font-mono uppercase tracking-wider`        | `font-semibold text-slate-500` | Tampilan NIM responden, timestamp, label kategori modul   |

_Note: Kolom teks materi dibatasi dengan `max-w-prose` untuk menjaga kenyamanan baca 60–75 karakter per baris._

---

## 4. Spesifikasi Komponen UI Tailwind CSS

### 4.1 Navigasi Stepper Alur IPO

- **Kontainer**: `flex items-center justify-between w-full max-w-4xl mx-auto mb-8 p-3 bg-white rounded-xl border border-slate-200 shadow-xs overflow-x-auto`
- **Item Aktif**: `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors` + kelas aksen modul
- **Item Inaktif**: `flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800`

### 4.2 Kontainer Video Embed & Kartu Cheatsheet

- **Pembungkus Video 16:9**: `relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-800 mb-8` (iframe: `absolute inset-0 w-full h-full`)
- **Grid Kartu Rangkuman**: `grid grid-cols-1 md:grid-cols-2 gap-6 my-6`
- **Kartu Cheatsheet**: `p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3` + `border-l-4` sesuai warna modul

### 4.3 Gerbang Identitas & Kartu Kuis Evaluasi

- **Kartu Identitas**: `max-w-md mx-auto p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm` (input: `w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden`)
- **Indikator Progres**: Bilah latar `w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-6`, bilah isi `h-full bg-indigo-600 transition-all duration-300`
- **Tombol Opsi Jawaban**: `w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all flex items-start gap-3` (aktif/terpilih: `border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20`)

### 4.4 Komponen Angket Skala Likert 1–5 (Mobile-First)

- **Kartu Pernyataan**: `p-5 bg-white rounded-xl border border-slate-200 shadow-2xs mb-4 flex flex-col gap-4`
- **Baris Tombol Skala**: `grid grid-cols-5 gap-2 sm:gap-4 pt-2`
- **Tombol Nilai Likert**: `h-12 rounded-lg border border-slate-300 font-semibold text-slate-700 flex flex-col items-center justify-center hover:bg-slate-100 active:scale-95 transition-all`
- **Status Nilai Terpilih**: `bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-500/30`
- **Label Kutub Skala**: `flex justify-between text-xs text-slate-500 font-medium px-1` (Kiri: "Sangat Tidak Setuju", Kanan: "Sangat Setuju")

### 4.5 Kartu KPI & Tabel Operasional Admin

- **Grid Kartu KPI**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8`
- **Kartu Metrik**: `p-5 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between` (angka utama: `text-3xl font-bold text-slate-900 my-1`)
- **Tombol Export CSV**: `inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer`
- **Tabel Responsif**: `w-full overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-2xs` (header: `px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase bg-slate-50 border-b border-slate-200`)

---

## 5. Pemetaan Helper Kelas Kategori Modul (`IPO_THEME_MAP`)

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
