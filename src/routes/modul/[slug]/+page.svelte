<script lang="ts">
  import type { PageData } from './$types';
  import {
    StatusBadge,
    IconSymbol,
    ActionButton,
    ContentCard,
    MarkdownRenderer,
    ModuleCheatsheet,
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
  <!-- Top Navigation & Breadcrumbs -->
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

  <!-- Lesson / Blog Article Header -->
  <header class="space-y-4">
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

    <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-content-heading leading-[1.2]">
      {currentModule.title}
    </h1>
  </header>

  <!-- 16:9 Video Embed Player -->
  <div
    class="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-border-subtle"
  >
    <iframe
      src={currentModule.videoUrl}
      title={currentModule.title}
      class="absolute inset-0 w-full h-full border-0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>

  <!-- Lesson Content & Cheatsheet -->
  <div class="space-y-8">
    <ModuleCheatsheet
      categoryKey={currentModule.category as IPOModuleCategoryKey}
      title={currentModule.title}
      summaryContent={currentModule.summaryContent}
      durationInMinutes={currentModule.durationInMinutes}
    />
  </div>

  <!-- Next / Prev Lesson Navigation -->
  <div class="pt-8 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#if data.previousModule}
      <a href="/modul/{data.previousModule.slug}" class="group">
        <ContentCard cardPadding="medium" hasHoverEffect={true} customClass="h-full flex flex-col justify-between">
          <div class="text-[11px] font-mono text-content-muted flex items-center gap-1 mb-1">
            <IconSymbol name="arrow_back" sizeInPixels={14} />
            <span>Modul Sebelumnya</span>
          </div>
          <div class="text-sm font-bold text-content-heading group-hover:text-accent transition-colors">
            {data.previousModule.title}
          </div>
        </ContentCard>
      </a>
    {:else}
      <div></div>
    {/if}

    {#if data.nextModule}
      <a href="/modul/{data.nextModule.slug}" class="group sm:text-right">
        <ContentCard cardPadding="medium" hasHoverEffect={true} customClass="h-full flex flex-col justify-between sm:items-end">
          <div class="text-[11px] font-mono text-accent flex items-center gap-1 mb-1 sm:justify-end">
            <span>Modul Selanjutnya</span>
            <IconSymbol name="arrow_forward" sizeInPixels={14} />
          </div>
          <div class="text-sm font-bold text-content-heading group-hover:text-accent transition-colors">
            {data.nextModule.title}
          </div>
        </ContentCard>
      </a>
    {/if}
  </div>

  <!-- Related Modules / Articles -->
  {#if data.relatedModules && data.relatedModules.length > 0}
    <div class="pt-10 border-t border-border-subtle space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-content-heading">Topik Lain yang Relevan</h3>
        <a href="/modul" class="text-xs font-semibold text-accent hover:underline">
          Lihat Semua Modul ➔
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {#each data.relatedModules as relatedItem (relatedItem.id)}
          <a href="/modul/{relatedItem.slug}" class="group">
            <ContentCard cardPadding="medium" hasHoverEffect={true} customClass="h-full flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-mono text-accent font-bold">{relatedItem.code}</span>
                <h4 class="text-xs sm:text-sm font-bold text-content-heading mt-1 leading-snug group-hover:text-accent transition-colors">
                  {relatedItem.title}
                </h4>
              </div>
              <div class="pt-3 text-[11px] text-content-muted flex items-center gap-1">
                <IconSymbol name="schedule" sizeInPixels={12} customClass="text-accent" />
                <span>{relatedItem.durationInMinutes} Menit Belajar</span>
              </div>
            </ContentCard>
          </a>
        {/each}
      </div>
    </div>
  {/if}
</div>
