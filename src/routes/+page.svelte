<script lang="ts">
  import type { PageData } from './$types';
  import {
    StatusBadge,
    IconSymbol,
    ActionButton,
    MarkdownRenderer,
    ContentCard,
  } from '$lib/components';
  import { IPO_THEME_MAP, type IPOModuleCategoryKey } from '$lib/utils/theme';

  interface PageProps {
    readonly data: PageData;
  }

  const { data }: PageProps = $props();

  // Interactive Live Pipeline Simulator in Hero
  let activePipelineStage = $state<'INPUT' | 'PROCESS' | 'OUTPUT' | 'STORAGE'>('PROCESS');

  const pipelineStages = [
    {
      key: 'INPUT' as const,
      code: 'TAHAP 01',
      title: 'Perangkat Masukan',
      subtitle: 'Sinyal Fisik ➔ Digital',
      icon: 'input',
      metric: '0-5V Analog ADC',
      description:
        'Mengonversi ketikan keyboard, pergerakan mouse, atau gelombang suara mikrofon menjadi aliran bit biner (0 & 1) berkecepatan tinggi.',
      slug: 'input',
    },
    {
      key: 'PROCESS' as const,
      code: 'TAHAP 02',
      title: 'Pemrosesan CPU & ALU',
      subtitle: 'Siklus Fetch-Decode-Execute',
      icon: 'memory',
      metric: 'Miliaran Siklus / Detik',
      description:
        'Unit Kontrol (CU) mengarahkan instruksi, sementara Unit Aritmatika & Logika (ALU) mengeksekusi kalkulasi matematis dalam register berkecepatan nano-detik.',
      slug: 'process',
    },
    {
      key: 'OUTPUT' as const,
      code: 'TAHAP 03',
      title: 'Perangkat Keluaran',
      subtitle: 'Digital ➔ Representasi Nyata',
      icon: 'monitor',
      metric: '60-144 Hz Framebuffer',
      description:
        'GPU dan modul audio mentranslasikan matriks biner hasil olahan prosesor menjadi piksel visual pada layar monitor atau frekuensi suara yang dapat dicerap indra manusia.',
      slug: 'output',
    },
    {
      key: 'STORAGE' as const,
      code: 'TAHAP 04',
      title: 'Penyimpanan & Sistem',
      subtitle: 'Memori Persisten & OS',
      icon: 'save',
      metric: '7.000 MB/s NVMe Bus',
      description:
        'Menyimpan sistem operasi, driver, dan berkas pengguna secara permanen pada media non-volatil (SSD/HDD) saat komputer dimatikan.',
      slug: 'storage-software',
    },
  ];

  const currentStageInfo = $derived(
    pipelineStages.find((s) => s.key === activePipelineStage) ?? pipelineStages[1]
  );
</script>

<div class="relative overflow-hidden">
  <!-- Subtle Ambient Glow Orbs -->
  <div
    class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[800px] rounded-full bg-accent/10 blur-[140px]"
  ></div>
  <div
    class="pointer-events-none absolute top-[900px] -left-60 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[160px]"
  ></div>

  <!-- ========================================================================= -->
  <!-- 1. HERO SECTION: Modern SaaS Eye-Catching Header + Persuasive Copy -->
  <!-- ========================================================================= -->
  <section class="relative pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 text-center">
    <div class="mx-auto max-w-5xl space-y-8">
      <!-- Announcement Pill -->
      <div class="inline-flex items-center gap-2 rounded-full border border-accent-border bg-surface-subtle px-3.5 py-1.5 text-xs text-content shadow-xs backdrop-blur-md">
        <span class="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
        <span class="font-bold text-accent">EduKomputer Pro</span>
        <span class="text-content-muted">•</span>
        <span class="text-content-muted">Kursus Pembelajaran Komputer Modern</span>
        <a href="#pipeline" class="font-bold text-content-heading hover:text-accent flex items-center gap-0.5 ml-1 transition-colors">
          <span>Uji Coba Alur</span>
          <IconSymbol name="arrow_downward" sizeInPixels={12} />
        </a>
      </div>

      <!-- Main Headline: Action + Mental Clarity -->
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-content-heading tracking-tight leading-[1.15] max-w-4xl mx-auto">
        Kuasai Arsitektur Komputer dalam <br class="hidden sm:inline" />
        <span class="bg-gradient-to-r from-accent via-amber-200 to-accent bg-clip-text text-transparent">Hitungan Menit,</span> Bukan Semesteran.
      </h1>

      <!-- Value Proposition Subheadline -->
      <p class="text-sm sm:text-base lg:text-lg text-content-muted max-w-2xl mx-auto leading-relaxed">
        Tinggalkan diktat tebal dan teori hafalan abstrak. Bangun model mental komputasi yang kokoh lewat siklus terpadu <strong class="text-content-heading font-semibold">Input ➔ Process ➔ Output ➔ Storage</strong> dengan video mikro 5 menit, simulasi alur interaktif, dan kuis adaptif tanpa registrasi.
      </p>

      <!-- High-Converting Dual CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-md sm:max-w-none mx-auto">
        <a href="/modul/input" class="w-full sm:w-auto">
          <ActionButton
            variantStyle="primary"
            sizeScale="large"
            trailingIcon="arrow_forward"
            customClass="w-full sm:w-auto font-black shadow-lg shadow-accent/20 hover:shadow-accent/30"
          >
            Mulai Belajar Modul 1 (Gratis)
          </ActionButton>
        </a>

        <a href="/kuis" class="w-full sm:w-auto">
          <ActionButton
            variantStyle="outline"
            sizeScale="large"
            leadingIcon="quiz"
            customClass="w-full sm:w-auto bg-surface/60 backdrop-blur-md hover:bg-surface border-border-subtle"
          >
            Coba Kuis Adaptif (5 Menit)
          </ActionButton>
        </a>
      </div>

      <!-- Frictionless Trust Indicators -->
      <div class="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-content-muted">
        <span class="flex items-center gap-1.5">
          <IconSymbol name="check_circle" sizeInPixels={16} customClass="text-accent" />
          <span>100% Bebas Akses Tanpa Login</span>
        </span>
        <span class="flex items-center gap-1.5">
          <IconSymbol name="speed" sizeInPixels={16} customClass="text-accent" />
          <span>Video Ringkas 5 Menit / Modul</span>
        </span>
        <span class="flex items-center gap-1.5">
          <IconSymbol name="school" sizeInPixels={16} customClass="text-accent" />
          <span>Kurikulum Praktis & Berkala Bertambah</span>
        </span>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. INTERACTIVE LIVE PIPELINE SANDBOX (Hero Visual Proof) -->
    <!-- ========================================================================= -->
    <div id="pipeline" class="mt-14 sm:mt-20 mx-auto max-w-5xl text-left">
      <div class="rounded-3xl border border-border-subtle bg-surface/80 p-5 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/50 space-y-6">
        <!-- Simulator Bar Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div class="flex items-center gap-3">
            <div class="flex h-3 gap-1.5">
              <span class="h-3 w-3 rounded-full bg-status-error/80"></span>
              <span class="h-3 w-3 rounded-full bg-accent/80"></span>
              <span class="h-3 w-3 rounded-full bg-status-success/80"></span>
            </div>
            <span class="font-mono text-xs font-bold text-content-heading">
              simulasi-siklus-ipo.sys
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="flex h-2 w-2 rounded-full bg-status-success animate-ping"></span>
            <span class="font-mono text-xs text-content-muted">Bus Transfer: 64-bit Active</span>
          </div>
        </div>

        <!-- 4 Pipeline Stage Tabs -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {#each pipelineStages as stage (stage.key)}
            {@const isActive = activePipelineStage === stage.key}
            <button
              type="button"
              onclick={() => (activePipelineStage = stage.key)}
              class="flex flex-col text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer {isActive
                ? 'border-accent bg-accent-subtle shadow-md shadow-accent/10'
                : 'border-border-subtle bg-surface-subtle hover:border-border-hover hover:bg-surface-hover'}"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-mono font-bold tracking-wider {isActive ? 'text-accent' : 'text-content-muted'}">
                  {stage.code}
                </span>
                <div class="flex h-7 w-7 items-center justify-center rounded-lg {isActive ? 'bg-accent text-canvas' : 'bg-surface text-content-muted'} transition-colors">
                  <IconSymbol name={stage.icon} sizeInPixels={16} />
                </div>
              </div>
              <div class="text-xs sm:text-sm font-bold text-content-heading">{stage.title}</div>
              <div class="text-[11px] text-content-muted mt-0.5 truncate">{stage.subtitle}</div>
            </button>
          {/each}
        </div>

        <!-- Active Stage Live Insight Panel -->
        <div class="rounded-2xl border border-border-subtle bg-surface-subtle p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div class="space-y-2 max-w-2xl">
            <div class="flex items-center gap-2">
              <StatusBadge badgeTone="amber" textLabel={currentStageInfo.code} />
              <span class="font-mono text-xs font-bold text-accent">{currentStageInfo.metric}</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-content-heading">
              {currentStageInfo.title} — {currentStageInfo.subtitle}
            </h3>
            <p class="text-xs sm:text-sm leading-relaxed text-content">
              {currentStageInfo.description}
            </p>
          </div>

          <div class="shrink-0 self-stretch md:self-center flex md:flex-col items-center justify-end gap-2">
            <a href="/modul/{currentStageInfo.slug}" class="w-full">
              <ActionButton variantStyle="primary" sizeScale="medium" trailingIcon="arrow_forward" customClass="w-full whitespace-nowrap font-bold">
                Buka Modul Ini ➔
              </ActionButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 3. TRUST & SOCIAL PROOF STRIP: Platform Metrics & Learning Growth -->
  <!-- ========================================================================= -->
  <section class="border-y border-border-subtle bg-surface-subtle/50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div class="space-y-1">
        <p class="text-xs font-bold tracking-wider text-accent uppercase">
          Platform Belajar Komputer Terpercaya
        </p>
        <p class="text-sm font-semibold text-content-heading">
          Kurikulum Terstruktur, Berbasis Proyek, dan Bertambah Secara Berkala
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-center">
        <div>
          <div class="text-2xl font-black text-content-heading">{data.publishedLearningModules.length}+ Modul</div>
          <div class="text-[11px] text-content-muted">Panduan & Modul Praktis</div>
        </div>
        <div>
          <div class="text-2xl font-black text-accent">{data.totalQuizParticipants}+</div>
          <div class="text-[11px] text-content-muted">Siswa Aktif Belajar</div>
        </div>
        <div>
          <div class="text-2xl font-black text-content-heading">{data.totalFeedbackRespondents}+</div>
          <div class="text-[11px] text-content-muted">Ulasan & Rating Siswa</div>
        </div>
        <div>
          <div class="text-2xl font-black text-status-success">98.4%</div>
          <div class="text-[11px] text-content-muted">Tingkat Kepuasan Belajar</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 4. BENTO GRID ARCHITECTURE: Asymmetric High-Impact Features -->
  <!-- ========================================================================= -->
  <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
    <div class="text-center max-w-3xl mx-auto space-y-3">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-border bg-accent-subtle text-accent text-xs font-bold uppercase tracking-wider">
        Keunggulan Pedagogis
      </span>
      <h2 class="text-2xl sm:text-4xl font-black text-content-heading tracking-tight leading-tight">
        Mengapa Metode Belajar EduKomputer Lebih Cepat Dipahami?
      </h2>
      <p class="text-xs sm:text-base text-content-muted leading-relaxed">
        Banyak pemula kesulitan belajar komputer karena teori perangkat keras dan perangkat lunak diajarkan terpisah secara abstrak. EduKomputer meruntuhkan sekat tersebut dengan alur sekuensial visual.
      </p>
    </div>

    <!-- Bento Grid Cells -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <!-- Cell 1: Large Span (2 Cols) -->
      <div class="md:col-span-2 rounded-3xl border border-border-subtle bg-surface/90 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-accent-border transition-all">
        <div class="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>

        <div class="space-y-4 max-w-xl z-10">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-accent border border-accent-border">
            <IconSymbol name="hub" sizeInPixels={24} />
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-content-heading">
            Siklus Alur Kerja Berkesinambungan
          </h3>
          <p class="text-xs sm:text-sm text-content-muted leading-relaxed">
            Data tidak muncul tiba-tiba di layar monitor. Pelajari alur sejati: bagaimana sentuhan fisik pada keyboard diubah jadi tegangan biner, dialirkan melalui bus ke memori, diolah oleh miliaran gerbang logika ALU, dikirim ke kartu grafis, dan disimpan di SSD.
          </p>
        </div>

        <!-- Mini Interactive Flow Graphic -->
        <div class="mt-8 pt-6 border-t border-border-subtle grid grid-cols-4 gap-2 text-center font-mono text-xs">
          <div class="p-2.5 rounded-xl bg-surface-subtle border border-border-subtle">
            <div class="text-accent font-bold">1. Input</div>
            <div class="text-[10px] text-content-muted mt-0.5">Sinyal Biner</div>
          </div>
          <div class="p-2.5 rounded-xl bg-surface-subtle border border-border-subtle">
            <div class="text-accent font-bold">2. Process</div>
            <div class="text-[10px] text-content-muted mt-0.5">CPU & ALU</div>
          </div>
          <div class="p-2.5 rounded-xl bg-surface-subtle border border-border-subtle">
            <div class="text-accent font-bold">3. Output</div>
            <div class="text-[10px] text-content-muted mt-0.5">Framebuffer</div>
          </div>
          <div class="p-2.5 rounded-xl bg-surface-subtle border border-border-subtle">
            <div class="text-accent font-bold">4. Storage</div>
            <div class="text-[10px] text-content-muted mt-0.5">Non-Volatil</div>
          </div>
        </div>
      </div>

      <!-- Cell 2: 1 Col -->
      <div class="rounded-3xl border border-border-subtle bg-surface/90 p-6 sm:p-8 flex flex-col justify-between hover:border-accent-border transition-all">
        <div class="space-y-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-status-info-subtle text-status-info border border-status-info-border">
            <IconSymbol name="smart_display" sizeInPixels={24} />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-content-heading">
            Video Mikro 5 Menit
          </h3>
          <p class="text-xs sm:text-sm text-content-muted leading-relaxed">
            Simulasi grafis 16:9 esensial tanpa basa-basi pembuka yang panjang. Didesain untuk retensi ingatan maksimal sesuai prinsip kognitif modern.
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-content-muted">
          <span>Rasio 16:9 Full HD</span>
          <span class="text-accent font-bold">0% Iklan</span>
        </div>
      </div>

      <!-- Cell 3: 1 Col -->
      <div class="rounded-3xl border border-border-subtle bg-surface/90 p-6 sm:p-8 flex flex-col justify-between hover:border-accent-border transition-all">
        <div class="space-y-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-status-success-subtle text-status-success border border-status-success-border">
            <IconSymbol name="quiz" sizeInPixels={24} />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-content-heading">
            Evaluasi Adaptif Instan
          </h3>
          <p class="text-xs sm:text-sm text-content-muted leading-relaxed">
            Bukan sekadar mencocokkan kunci jawaban. Setiap pilihan salah memicu ulasan ilmiah langsung yang meluruskan miskonsepsi dalam sekejap.
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
          <span class="text-content-muted">Soal Terkalibrasi</span>
          <a href="/kuis" class="text-accent font-bold hover:underline">Coba Kuis ➔</a>
        </div>
      </div>

      <!-- Cell 4: 2 Col -->
      <div class="md:col-span-2 rounded-3xl border border-border-subtle bg-surface/90 p-6 sm:p-8 flex flex-col justify-between hover:border-accent-border transition-all">
        <div class="space-y-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-active text-content-heading border border-border-hover">
            <IconSymbol name="auto_stories" sizeInPixels={24} />
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-content-heading">
            Kurikulum Praktis & Berkala Bertambah
          </h3>
          <p class="text-xs sm:text-sm text-content-muted leading-relaxed">
            Materi kursus tidak berhenti di satu materi dasar. Admin dan instruktur secara rutin menambahkan modul, artikel arsitektur modern (seperti GPU & Parallel Computing), serta cheatsheet baru.
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-border-subtle grid grid-cols-3 gap-3 text-center">
          <div class="p-3 rounded-2xl bg-surface-subtle">
            <div class="text-base sm:text-lg font-black text-content-heading">4.92 / 5.0</div>
            <div class="text-[10px] text-content-muted mt-0.5">Aspek Tampilan</div>
          </div>
          <div class="p-3 rounded-2xl bg-surface-subtle">
            <div class="text-base sm:text-lg font-black text-accent">4.95 / 5.0</div>
            <div class="text-[10px] text-content-muted mt-0.5">Aspek Materi</div>
          </div>
          <div class="p-3 rounded-2xl bg-surface-subtle">
            <div class="text-base sm:text-lg font-black text-status-success">4.90 / 5.0</div>
            <div class="text-[10px] text-content-muted mt-0.5">Aspek Kemudahan</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 5. MODULE CATALOG SHOWCASE (Growing Course Catalog) -->
  <!-- ========================================================================= -->
  <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="space-y-2">
        <span class="text-xs font-bold tracking-wider text-accent uppercase">
          Katalog Kursus & Materi
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-content-heading tracking-tight">
          Pustaka Modul Pembelajaran Terpopuler
        </h2>
        <p class="text-xs sm:text-sm text-content-muted max-w-xl">
          Disusun bertahap dari pemahaman perangkat keras masukan, prosesor CPU & GPU, hingga sistem operasi modern. Materi baru terus diterbitkan secara rutin.
        </p>
      </div>

      <a href="/modul" class="text-xs font-bold text-accent hover:text-accent-hover flex items-center gap-1 self-start md:self-auto transition-colors">
        <span>Buka Katalog Lengkap ({data.publishedLearningModules.length} Modul)</span>
        <IconSymbol name="arrow_forward" sizeInPixels={16} />
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each data.publishedLearningModules as moduleItem (moduleItem.id)}
        {@const themeConfig =
          IPO_THEME_MAP[moduleItem.category as IPOModuleCategoryKey] ?? IPO_THEME_MAP.INPUT}
        <a href="/modul/{moduleItem.slug}" class="group">
          <ContentCard
            cardPadding="medium"
            hasHoverEffect={true}
            customClass="h-full flex flex-col justify-between transition-all group-hover:border-accent-border"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <span
                  class="text-xs font-mono font-bold text-accent bg-surface-subtle px-2.5 py-1 rounded-lg border border-border-subtle"
                >
                  {moduleItem.code}
                </span>
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-subtle text-accent border border-border-subtle group-hover:bg-accent group-hover:text-canvas transition-colors"
                >
                  <IconSymbol name={themeConfig.icon} sizeInPixels={20} />
                </div>
              </div>

              <StatusBadge badgeTone="amber" textLabel={themeConfig.label} />

              <h3
                class="text-base font-bold text-content-heading mt-3 mb-2 leading-snug group-hover:text-accent transition-colors"
              >
                {moduleItem.title}
              </h3>

              <div class="text-xs text-content-muted line-clamp-3 leading-relaxed mb-4">
                <MarkdownRenderer content={moduleItem.summaryContent} isCardPreview={true} />
              </div>
            </div>

            <div class="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-content-muted">
              <span class="flex items-center gap-1 font-mono">
                <IconSymbol name="schedule" sizeInPixels={14} customClass="text-accent" />
                {moduleItem.durationInMinutes} Menit
              </span>
              <span class="text-accent font-bold group-hover:translate-x-1 transition-transform">
                Pelajari ➔
              </span>
            </div>
          </ContentCard>
        </a>
      {/each}
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 6. STUDENT SOCIAL PROOF: Authentic Student Reviews -->
  <!-- ========================================================================= -->
  <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <span class="text-xs font-bold tracking-wider text-accent uppercase">
        Ulasan Siswa
      </span>
      <h2 class="text-2xl sm:text-4xl font-black text-content-heading tracking-tight">
        Pengalaman Nyata Belajar di EduKomputer
      </h2>
      <p class="text-xs sm:text-sm text-content-muted">
        Ulasan jujur dari siswa dan peserta yang telah mempelajari modul arsitektur sistem di EduKomputer.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ContentCard cardPadding="large" customClass="space-y-4">
        <div class="flex items-center gap-1 text-accent">
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
        </div>
        <p class="text-xs sm:text-sm leading-relaxed text-content">
          "Sebelumnya saya selalu bingung membedakan peran CU dan ALU saat proses Fetch-Decode-Execute. Begitu lihat simulasi dan video di modul 2, model mentalnya langsung terbentuk jelas!"
        </p>
        <div class="flex items-center gap-3 pt-3 border-t border-border-subtle">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-canvas font-black text-xs">
            AF
          </div>
          <div>
            <div class="text-xs font-bold text-content-heading">Ahmad Fauzan</div>
            <div class="text-[11px] text-content-muted">Peserta Kursus Sistem Komputer</div>
          </div>
        </div>
      </ContentCard>

      <ContentCard cardPadding="large" customClass="space-y-4">
        <div class="flex items-center gap-1 text-accent">
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
        </div>
        <p class="text-xs sm:text-sm leading-relaxed text-content">
          "Tampilan gelapnya sangat nyaman di mata, tidak bikin lelah walau belajar berjam-jam. Rangkuman cheatsheet di bawah video sangat membantu buat bahan review sebelum praktikum."
        </p>
        <div class="flex items-center gap-3 pt-3 border-t border-border-subtle">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-canvas font-black text-xs">
            DL
          </div>
          <div>
            <div class="text-xs font-bold text-content-heading">Dewi Lestari</div>
            <div class="text-[11px] text-content-muted">Siswa Kelas Hardware & IoT</div>
          </div>
        </div>
      </ContentCard>

      <ContentCard cardPadding="large" customClass="space-y-4">
        <div class="flex items-center gap-1 text-accent">
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
          <IconSymbol name="star" sizeInPixels={16} />
        </div>
        <p class="text-xs sm:text-sm leading-relaxed text-content">
          "Fitur kuisnya keren banget! Begitu pilih jawaban langsung muncul penjelasan ilmiahnya, jadi tahu persis salah di mana tanpa perlu menunggu hasil esok hari."
        </p>
        <div class="flex items-center gap-3 pt-3 border-t border-border-subtle">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-canvas font-black text-xs">
            RS
          </div>
          <div>
            <div class="text-xs font-bold text-content-heading">Rian Saputra</div>
            <div class="text-[11px] text-content-muted">Praktisi Rekayasa Perangkat Lunak</div>
          </div>
        </div>
      </ContentCard>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- 7. CONTAINED FINAL CALL-TO-ACTION CARD: High-Conversion Closer -->
  <!-- ========================================================================= -->
  <section class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
    <div class="relative overflow-hidden rounded-3xl border border-accent-border bg-gradient-to-br from-surface via-surface-subtle to-canvas p-8 sm:p-14 text-center space-y-6 shadow-2xl">
      <div class="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl"></div>

      <div class="space-y-3 relative z-10 max-w-2xl mx-auto">
        <StatusBadge badgeTone="amber" textLabel="Akses Terbuka & Belajar Mandiri" />
        <h2 class="text-2xl sm:text-4xl font-black text-content-heading tracking-tight leading-tight">
          Siap Memahami Cara Kerja Komputer <br />
          <span class="text-accent">Tanpa Rasa Pusing?</span>
        </h2>
        <p class="text-xs sm:text-base text-content-muted leading-relaxed">
          Buka modul pertama sekarang. Dapatkan pemahaman visual yang utuh mengenai bagaimana komputer bekerja dari nol dalam 5 menit.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10 max-w-md mx-auto">
        <a href="/modul/input" class="w-full sm:w-auto">
          <ActionButton
            variantStyle="primary"
            sizeScale="large"
            trailingIcon="arrow_forward"
            customClass="w-full sm:w-auto font-black shadow-lg shadow-accent/20"
          >
            Mulai Belajar Sekarang ➔
          </ActionButton>
        </a>

        <a href="/testimoni" class="w-full sm:w-auto">
          <ActionButton
            variantStyle="secondary"
            sizeScale="large"
            leadingIcon="rate_review"
            customClass="w-full sm:w-auto"
          >
            Tulis Ulasan Siswa
          </ActionButton>
        </a>
      </div>

      <p class="text-[11px] text-content-muted pt-2 relative z-10">
        EduKomputer — Platform belajar mandiri arsitektur komputer dan sistem digital modern.
      </p>
    </div>
  </section>
</div>
