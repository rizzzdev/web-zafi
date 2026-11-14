<script lang="ts">
  import Icon from '../atoms/Icon.svelte';
  import MarkdownRenderer from '../atoms/MarkdownRenderer.svelte';
  import { IPO_THEME_MAP, type IPOModuleCategoryKey } from '$lib/utils/theme';

  interface ModuleCheatsheetProperties {
    readonly categoryKey: IPOModuleCategoryKey;
    readonly title: string;
    readonly summaryContent: string;
    readonly durationInMinutes: number;
  }

  const {
    categoryKey,
    title,
    summaryContent,
    durationInMinutes,
  }: ModuleCheatsheetProperties = $props();

  const themeConfig = $derived(IPO_THEME_MAP[categoryKey] ?? IPO_THEME_MAP.INPUT);
</script>

<div class="my-6 w-full">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
    <div class="flex items-center gap-2">
      <div class="icon-box">
        <Icon name={themeConfig.icon} size="sm" />
      </div>
      <h3 class="text-sm sm:text-base font-bold text-content-heading">Materi Pembelajaran Mendalam & Rangkuman Kognitif</h3>
    </div>
    <span class="badge-default self-start sm:self-auto shrink-0">
      <Icon name="menu_book" size="sm" classNames="text-accent" />
      <span>{durationInMinutes} Menit Pembahasan</span>
    </span>
  </div>

  <div class="card-base p-4 sm:p-6 text-content">
    <MarkdownRenderer content={summaryContent} />
  </div>
</div>
