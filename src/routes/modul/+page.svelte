<script lang="ts">
  import type { PageData } from './$types';
  import {
    StatusBadge,
    ContentCard,
    ActionButton,
    IconSymbol,
    MarkdownRenderer,
    EmptyStateCard,
    TextInput,
  } from '$lib/components';
  import { IPO_THEME_MAP, type IPOModuleCategoryKey } from '$lib/utils/theme';

  interface PageProps {
    readonly data: PageData;
  }

  const { data }: PageProps = $props();

  let activeCategoryFilter = $state('ALL');
  let searchQuery = $state('');

  const categoryFilters = [
    { key: 'ALL', label: 'Semua Kategori' },
    { key: 'INPUT', label: 'Perangkat Masukan (Input)' },
    { key: 'PROCESS', label: 'Pemrosesan (CPU & GPU)' },
    { key: 'OUTPUT', label: 'Perangkat Keluaran (Output)' },
    { key: 'STORAGE_SOFTWARE', label: 'Penyimpanan & OS' },
  ];

  const filteredModules = $derived(
    data.publishedLearningModules.filter((moduleItem) => {
      const matchesCategory =
        activeCategoryFilter === 'ALL' || moduleItem.category === activeCategoryFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        moduleItem.title.toLowerCase().includes(query) ||
        moduleItem.code.toLowerCase().includes(query) ||
        moduleItem.summaryContent.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    })
  );
</script>

<div class="w-full max-w-7xl mx-auto space-y-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
  <!-- Header Title (Modern Tech Blog / Course Catalog Header) -->
  <div class="space-y-4 max-w-3xl">
    <div class="flex items-center gap-2">
      <StatusBadge badgeTone="amber" textLabel="Pustaka Materi & Kursus Komputer" iconName="menu_book" />
      <span class="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-content-muted">
        <span class="h-1.5 w-1.5 rounded-full bg-status-success animate-pulse"></span>
        <span>Materi Terus Bertambah</span>
      </span>
    </div>

    <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-content-heading">
      Katalog Modul & Artikel Belajar Komputer
    </h1>

    <p class="text-xs sm:text-base leading-relaxed text-content-muted">
      Pelajari cara kerja komputer, arsitektur prosesor, memori, dan rekayasa perangkat lunak secara runut dan visual. Setiap artikel dan modul dilengkapi video penjelasan 16:9 esensial, rangkuman teknis (*cheatsheet*), dan asesmen interaktif.
    </p>
  </div>

  <!-- Search & Category Filters (Blog Style Filter Bar) -->
  <div class="space-y-4 p-5 rounded-2xl border border-border-subtle bg-surface-subtle/50 backdrop-blur-md">
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      <!-- Search Input -->
      <div class="relative flex-1 max-w-lg">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-content-muted">
          <IconSymbol name="search" sizeInPixels={20} />
        </div>
        <TextInput
          inputName="search"
          bind:inputValue={searchQuery}
          placeholderText="Cari judul modul, komponen, atau kata kunci..."
          customClass="pl-10 w-full"
        />
      </div>

      <!-- Result Counter -->
      <div class="text-xs font-semibold text-content-muted font-mono flex items-center gap-1.5 self-start sm:self-auto">
        <IconSymbol name="filter_list" sizeInPixels={16} customClass="text-accent" />
        <span>Menampilkan {filteredModules.length} Modul & Artikel</span>
      </div>
    </div>

    <!-- Category Filter Pills -->
    <div class="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
      {#each categoryFilters as catFilter (catFilter.key)}
        {@const isActive = activeCategoryFilter === catFilter.key}
        <button
          type="button"
          onclick={() => (activeCategoryFilter = catFilter.key)}
          class="rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer {isActive
            ? 'bg-accent text-canvas font-bold shadow-xs'
            : 'border border-border-subtle bg-surface text-content hover:bg-surface-hover hover:text-content-heading'}"
        >
          {catFilter.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Blog / Course Cards Grid or Empty State -->
  {#if filteredModules.length === 0}
    <EmptyStateCard
      iconName="search_off"
      titleHeading="Modul Tidak Ditemukan"
      descriptionText="Tidak ada modul pembelajaran yang cocok dengan kata kunci atau filter ini. Coba gunakan kata kunci pencarian yang lain."
      actionButtonLabel="Reset Filter & Pencarian"
      onActionButtonClick={() => {
        searchQuery = '';
        activeCategoryFilter = 'ALL';
      }}
    />
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {#each filteredModules as moduleItem (moduleItem.id)}
        {@const themeConfig =
          IPO_THEME_MAP[moduleItem.category as IPOModuleCategoryKey] ?? IPO_THEME_MAP.INPUT}
        <article class="h-full">
          <ContentCard
            cardPadding="medium"
            hasHoverEffect={true}
            customClass="h-full flex flex-col justify-between group border-border-subtle hover:border-accent-border transition-all"
          >
            <div>
              <!-- Card Top Meta: Category + Read Time -->
              <div class="flex items-center justify-between mb-3.5">
                <div class="flex items-center gap-2">
                  <span
                    class="text-[11px] font-mono font-bold text-accent bg-surface-subtle px-2 py-0.5 rounded border border-border-subtle"
                  >
                    {moduleItem.code}
                  </span>
                  <StatusBadge badgeTone="amber" textLabel={themeConfig.label} />
                </div>
                <span
                  class="text-xs font-medium text-content-muted font-mono flex items-center gap-1"
                >
                  <IconSymbol name="schedule" sizeInPixels={15} customClass="text-accent" />
                  {moduleItem.durationInMinutes} Menit
                </span>
              </div>

              <!-- Article Title -->
              <h2
                class="text-base sm:text-lg font-bold text-content-heading mb-2.5 leading-snug group-hover:text-accent transition-colors"
              >
                <a href="/modul/{moduleItem.slug}">{moduleItem.title}</a>
              </h2>

              <!-- Article Excerpt -->
              <div class="text-xs sm:text-sm text-content-muted line-clamp-3 leading-relaxed mb-4 overflow-hidden">
                <MarkdownRenderer content={moduleItem.summaryContent} isCardPreview={true} />
              </div>
            </div>

            <!-- Card Bottom Meta: Author byline + Action -->
            <div class="pt-4 border-t border-border-subtle mt-2 space-y-3">
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <div class="flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-accent font-bold text-[10px] border border-accent-border">
                    EK
                  </div>
                  <span class="text-content-muted font-medium">Instruktur EduKomputer</span>
                </div>
                <span class="text-[11px] text-content-muted">Video + Cheatsheet</span>
              </div>

              <div>
                <a href="/modul/{moduleItem.slug}" class="block">
                  <ActionButton
                    variantStyle="primary"
                    sizeScale="small"
                    trailingIcon="arrow_forward"
                    customClass="w-full justify-center font-bold"
                  >
                    Pelajari Modul ➔
                  </ActionButton>
                </a>
              </div>
            </div>
          </ContentCard>
        </article>
      {/each}
    </div>
  {/if}

  <!-- Expanding Catalog Banner -->
  <div class="rounded-3xl border border-border-subtle bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
    <div class="space-y-2 text-center sm:text-left">
      <div class="flex items-center gap-2 justify-center sm:justify-start">
        <IconSymbol name="add_to_photos" sizeInPixels={20} customClass="text-accent" />
        <h3 class="text-base font-bold text-content-heading">Materi Kursus Terus Bertambah Secara Rutin</h3>
      </div>
      <p class="text-xs sm:text-sm text-content-muted max-w-xl">
        Modul dan panduan baru terus dipublikasikan oleh para instruktur. Ingin topik tertentu dibahas? Berikan masukan topik melalui halaman ulasan siswa.
      </p>
    </div>

    <div class="shrink-0 flex items-center gap-3">
      <a href="/testimoni">
        <ActionButton variantStyle="secondary" sizeScale="medium" leadingIcon="rate_review">
          Usulkan Topik Baru
        </ActionButton>
      </a>
      <a href="/kuis">
        <ActionButton variantStyle="outline" sizeScale="medium" leadingIcon="quiz">
          Uji Pemahaman Kuis
        </ActionButton>
      </a>
    </div>
  </div>
</div>
