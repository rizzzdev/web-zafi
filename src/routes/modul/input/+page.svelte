<script lang="ts">
  import type { PageData } from './$types';
  import {
    IPOStepper,
    ModuleCheatsheet,
    ActionButton,
    StatusBadge,
    IconSymbol,
    ContentCard,
  } from '$lib/components';
  import { IPO_THEME_MAP, type IPOModuleCategoryKey } from '$lib/utils/theme';

  interface PageProps {
    readonly data: PageData;
  }

  const { data }: PageProps = $props();
  const currentModule = $derived(data.learningModule);
  const themeConfig = $derived(
    IPO_THEME_MAP[currentModule.category as IPOModuleCategoryKey] ?? IPO_THEME_MAP.INPUT
  );
</script>

<div class="w-full max-w-5xl mx-auto space-y-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
  <!-- Back Navigation (matching sains-desa) -->
  <div class="flex items-center justify-between text-xs font-semibold">
    <a
      href="/modul"
      class="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-hover"
    >
      <IconSymbol name="arrow_back" sizeInPixels={16} />
      <span>Kembali ke Katalog Modul</span>
    </a>

    <div class="hidden sm:flex items-center gap-2 text-content-muted">
      <span>Katalog Modul</span>
      <span>/</span>
      <span class="text-content-heading">{themeConfig.label}</span>
    </div>
  </div>

  <!-- Module Header Info -->
  <div class="space-y-4">
    <div class="flex flex-wrap items-center gap-2.5">
      <StatusBadge badgeTone="amber" textLabel={themeConfig.label} />
      <span
        class="text-xs text-accent font-mono font-bold bg-surface px-2.5 py-0.5 rounded-lg border border-border-subtle"
      >
        {currentModule.code}
      </span>
      <span class="text-xs text-content-muted flex items-center gap-1 font-mono">
        <IconSymbol name="schedule" sizeInPixels={14} customClass="text-accent" />
        {currentModule.durationInMinutes} Menit Pembahasan
      </span>
      <span class="text-xs text-content-muted flex items-center gap-1">
        <IconSymbol name="person" sizeInPixels={14} customClass="text-accent" />
        Ditulis oleh Instruktur EduKomputer
      </span>
    </div>

    <h1 class="text-2xl leading-tight font-extrabold tracking-tight text-content-heading sm:text-4xl">
      {currentModule.title}
    </h1>

    <div
      class="rounded-2xl border border-accent-border bg-accent-subtle/40 p-4 sm:p-5 text-xs sm:text-sm leading-relaxed text-content"
    >
      <div class="flex items-start gap-3">
        <div class="mt-0.5 text-accent shrink-0">
          <IconSymbol name="info" sizeInPixels={20} />
        </div>
        <p class="font-medium text-content-heading">
          {currentModule.summaryContent.substring(0, 160)}...
        </p>
      </div>
    </div>
  </div>

  <!-- 16:9 Video Embed Player -->
  <div
    class="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-xl border border-border-subtle"
  >
    <iframe
      src={currentModule.videoUrl}
      title={currentModule.title}
      class="absolute inset-0 w-full h-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>

  <!-- Conceptual Breakdown Sections (matching sains-desa multi-card approach) -->
  <div class="space-y-6">
    <ContentCard cardPadding="large" customClass="space-y-3">
      <div class="flex items-center gap-2.5 text-accent">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-subtle border border-accent-border">
          <IconSymbol name="input" sizeInPixels={20} />
        </div>
        <h2 class="text-base sm:text-lg font-bold text-content-heading">
          Prinsip Kerja & Konversi Sinyal Masukan
        </h2>
      </div>
      <p class="pl-11 text-xs sm:text-sm leading-relaxed text-content">
        Perangkat input bertugas menjembatani interaksi manusia dan mesin dengan mengonversi sinyal fisik (ketikan tombol mekanik keyboard, gelombang optik sensor mouse, atau gelombang suara mikrofon) menjadi kode digital biner (0 dan 1) yang dimengerti oleh bus sistem komputer.
      </p>
    </ContentCard>

    <ContentCard cardPadding="large" customClass="space-y-3">
      <div class="flex items-center gap-2.5 text-accent">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-subtle border border-accent-border">
          <IconSymbol name="devices" sizeInPixels={20} />
        </div>
        <h2 class="text-base sm:text-lg font-bold text-content-heading">
          Penerapan Komparatif di Dunia Komputasi Nyata
        </h2>
      </div>
      <p class="pl-11 text-xs sm:text-sm leading-relaxed text-content">
        Mulai dari antarmuka konvensional USB Human Interface Device (HID) hingga sensor IoT analog-to-digital converter (ADC), pemahaman siklus masukan menjadi fondasi arsitektur komputasi modern.
      </p>
    </ContentCard>
  </div>

  <!-- Cheatsheet & Cognitive Chunking -->
  <ModuleCheatsheet
    categoryKey="INPUT"
    title={currentModule.title}
    summaryContent={currentModule.summaryContent}
    durationInMinutes={currentModule.durationInMinutes}
  />

  <!-- Next / Prev Stepper Navigation Actions -->
  <div
    class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-border-subtle"
  >
    <a href="/modul" class="w-full sm:w-auto">
      <ActionButton
        variantStyle="outline"
        sizeScale="medium"
        leadingIcon="arrow_back"
        customClass="w-full sm:w-auto"
      >
        Daftar Modul
      </ActionButton>
    </a>

    {#if data.nextModuleSlug}
      <a href="/modul/{data.nextModuleSlug}" class="w-full sm:w-auto">
        <ActionButton
          variantStyle="primary"
          sizeScale="medium"
          trailingIcon="arrow_forward"
          customClass="w-full sm:w-auto font-bold"
        >
          Modul Selanjutnya: Pemrosesan (CPU) ➔
        </ActionButton>
      </a>
    {/if}
  </div>
</div>
