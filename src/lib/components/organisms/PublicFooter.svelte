<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import BrandLogo from '../molecules/BrandLogo.svelte';
</script>

<footer class="mt-20 border-t border-border-subtle bg-surface-subtle text-content">
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
      <!-- Brand & Mission -->
      <div class="space-y-3 md:col-span-1 lg:col-span-1">
        <BrandLogo variant="dark" size="medium" />
        <p class="text-xs leading-relaxed text-content-muted sm:text-sm">
          Platform pembelajaran komputer interaktif dan kursus online terstruktur. Pahami cara kerja hardware, arsitektur prosesor, dan rekayasa perangkat lunak secara visual dan aplikatif.
        </p>
        <div class="flex flex-col gap-1.5 pt-2 text-xs text-content-muted">
          <div class="flex items-center gap-2">
            <span class="inline-block h-2 w-2 rounded-full bg-accent"></span>
            <span class="font-semibold text-content-heading">
              EduKomputer Platform
            </span>
          </div>
          <p class="text-[11px] text-content-muted">
            Materi & modul belajar terus bertambah secara berkala
          </p>
          <div class="mt-1 flex items-start gap-1.5 text-xs text-accent">
            <IconSymbol name="verified" sizeInPixels={16} customClass="shrink-0 mt-0.5" />
            <span>Kurikulum Berbasis Standar Industri Komputasi</span>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold tracking-wider text-content-heading uppercase">
          Jelajahi Platform
        </h4>
        <ul class="space-y-2 text-xs sm:text-sm text-content-muted">
          <li>
            <a href="/" class="transition-colors hover:text-accent">
              Beranda Kursus
            </a>
          </li>
          <li>
            <a href="/modul" class="transition-colors hover:text-accent">
              Katalog Modul & Artikel
            </a>
          </li>
          <li>
            <a href="/kuis" class="transition-colors hover:text-accent">
              Kuis Evaluasi Interaktif
            </a>
          </li>
          <li>
            <a href="/testimoni" class="transition-colors hover:text-accent">
              Ulasan & Testimoni Siswa
            </a>
          </li>
        </ul>
      </div>

      <!-- Model Mental & Kurikulum -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold tracking-wider text-content-heading uppercase">
          Topik Pembelajaran
        </h4>
        <ul class="space-y-2 text-xs sm:text-sm text-content-muted">
          <li>
            <a href="/modul/input" class="transition-colors hover:text-accent">
              Perangkat Masukan & Sensor
            </a>
          </li>
          <li>
            <a href="/modul/process" class="transition-colors hover:text-accent">
              Unit Pemrosesan CPU & ALU
            </a>
          </li>
          <li>
            <a href="/modul/output" class="transition-colors hover:text-accent">
              Perangkat Keluaran & Display
            </a>
          </li>
          <li>
            <a href="/modul/storage-software" class="transition-colors hover:text-accent">
              Penyimpanan & Sistem Operasi
            </a>
          </li>
        </ul>
      </div>

      <!-- Narahubung & Komunitas -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold tracking-wider text-content-heading uppercase">
          Dukungan & Bantuan
        </h4>
        <ul class="space-y-2.5 text-xs text-content-muted">
          <li class="flex items-center gap-2 text-content">
            <IconSymbol name="school" sizeInPixels={16} customClass="text-accent shrink-0" />
            <span class="font-medium">Tim Instruktur EduKomputer</span>
          </li>
          <li class="flex items-center gap-2 text-content">
            <IconSymbol name="mail" sizeInPixels={16} customClass="text-accent shrink-0" />
            <span class="font-medium">halo@edukomputer.id</span>
          </li>
          <li class="flex items-center gap-2 text-content">
            <IconSymbol name="check_circle" sizeInPixels={16} customClass="text-status-success shrink-0" />
            <span>Akses Terbuka & Belajar Mandiri</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Copyright Strip -->
    <div
      class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-6 text-xs text-content-muted sm:flex-row"
    >
      <p class="text-center sm:text-left">
        © 2026 <strong class="text-content-heading">EduKomputer</strong> — Platform Kursus & Pembelajaran Komputer Modern.
      </p>
      <p class="font-mono text-[11px] text-content-muted">
        Arsitektur Komputer • SSR Native Platform
      </p>
    </div>
  </div>
</footer>
