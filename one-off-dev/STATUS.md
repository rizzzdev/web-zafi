# 📊 STATUS.md — Project Continuity Ledger

- **Project**: Web Media Pembelajaran Interaktif Sistem Komputer (Model IPO) & Instrumen Uji Respon R&D
- **Mode**: Mode A (Proyek Baru)
- **Track**: Single Standard Track (1–5 Hari Delivery)
- **Terakhir diperbarui**: Tahap 1 Selesai (2026-11-12)

---

## Riwayat Tahap

### Stage 1: Discovery, Scope & Prisma Schema Contract — [x] SELESAI

- **Tanggal**: 2026-11-12
- **Artefak**: `one-off-dev/SPEC.md` (memuat blok skema Prisma lengkap)
- **DoD**: 3/3 item tercentang
  - [x] Dokumen `one-off-dev/SPEC.md` terkunci dengan seluruh entitas dan blok kode `schema.prisma` lengkap.
  - [x] Seluruh field unik memiliki catatan Partial Unique Index `WHERE deleted_at IS NULL`.
  - [x] Dokumen `one-off-dev/STATUS.md` terinisialisasi dengan 5 tahap dan Port Parity Registry terdaftar.

### Stage 2: Scaffolding & UI/UX Prototyping — [x] SELESAI
- **Tanggal**: 2026-11-14
- **Artefak**: Codebase SvelteKit 2 + Svelte 5, Atomic UI components, Seed-Mock Adapters, SSR Form Actions, Husky Pre-Commit Hook, Markdown Renderer, CRUD Data Angket & Kuis, Palet Warna Mewah (Gray #2B2D31, Silver #D9DADC, Yellow #FFC93C)
- **DoD**: 10/10 item tercentang
  - [x] `bun run dev` berhasil menjalankan SvelteKit tanpa error.
  - [x] Seluruh dependencies pipeline terinstall di `package.json` (termasuk `marked` untuk materi markdown).
  - [x] File `prisma/schema.prisma` dibuat sesuai `one-off-dev/SPEC.md` §3 dan `bun x prisma generate` exit code 0 (types terbit di `$lib/db/generated`).
  - [x] `scripts/check-status.ts` terpasang dan `bun run check:status 2` lulus 100%.
  - [x] Skeleton Global Atomic Design (`atoms/`, `molecules/`, `organisms/`) terpasang dengan barrel `index.ts`.
  - [x] Seluruh route SPEC ter-render dengan SSR aktif, 4-State UI Matrix, dan Double-Submit protection.
  - [x] Transformasi Palet Warna Mewah (*Expensive Dark Look*): Gray (`#2B2D31`), Silver (`#D9DADC`), dan Yellow (`#FFC93C`) diterapkan konsisten di seluruh tema, komponen atomik, navigasi, form, kuis, angket, dan panel admin.
  - [x] Materi pembelajaran lengkap dengan renderer Markdown pada setiap modul IPO (`/modul/*`).
  - [x] CRUD lengkap Data Angket Responden (`/admin/responden`) dengan Create Manual, Read/Filter/Pagination, Update, Delete, dan Export CSV.
  - [x] CRUD lengkap Data Kuis: Kelola Bank Soal (`/admin/kelola-kuis`) dengan Create Question, Read, Update, Delete; serta Hapus Submisi Kuis Mahasiswa (`/admin/hasil-kuis`).
  - [x] Seluruh kode mematuhi Meaningful Names (Zero variabel 1 huruf: 0 `u`, 0 `p`, 0 `e`, 0 `res`).
  - [x] Git repository terinisialisasi dengan `.gitignore` yang tepat.
  - [x] Husky pre-commit hook terpasang dan aktif (menjalankan `bun run check:status 2` sebelum commit diterima).
  - [x] Dokumen `one-off-dev/STATUS.md` diperbarui: Stage 2 ditandai `[x] SELESAI`.

### Stage 3: Database Integration & Fullstack Wiring — [ ] BELUM

- **Artefak**: (menunggu penyelesaian Stage 3)
- **DoD**: 0/10 item tercentang

### Stage 4: Resilience Testing & Security Sanity Check — [ ] BELUM

- **Artefak**: (menunggu penyelesaian Stage 4)
- **DoD**: 0/8 item tercentang

### Stage 5: Docker Packaging, Local Verification & Deployment — [ ] BELUM

- **Artefak**: (menunggu penyelesaian Stage 5)
- **DoD**: 0/8 item tercentang

---

## Port Parity Registry

| Port Interface       | Adapter Prototipe (Tahap 2)     | Adapter Produksi (Tahap 3)    | Parity |
| :------------------- | :------------------------------ | :---------------------------- | :----- |
| `AuthPort`           | `InMemoryAuthAdapter`           | `PrismaAuthAdapter`           | ⬜     |
| `LearningModulePort` | `InMemoryLearningModuleAdapter` | `PrismaLearningModuleAdapter` | ⬜     |
| `QuizPort`           | `InMemoryQuizAdapter`           | `PrismaQuizAdapter`           | ⬜     |
| `FeedbackPort`       | `InMemoryFeedbackAdapter`       | `PrismaFeedbackAdapter`       | ⬜     |
| `FileStoragePort`    | `InMemoryFileStorageAdapter`    | `DiskFileStorageAdapter`      | ⬜     |
| `TaskLifecyclePort`  | `MockTaskLifecycleAdapter`      | `DbTaskLifecycleAdapter`      | ⬜     |
