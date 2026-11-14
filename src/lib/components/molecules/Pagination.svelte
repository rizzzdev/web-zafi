<script lang="ts">
  import Button from '../atoms/Button.svelte';

  interface PaginationProperties {
    readonly currentPage: number;
    readonly totalPages: number;
    readonly totalItemsCount: number;
    readonly itemsPerPage: number;
    readonly onPageChange?: (pageNumber: number) => void;
  }

  const {
    currentPage,
    totalPages,
    totalItemsCount,
    itemsPerPage,
    onPageChange,
  }: PaginationProperties = $props();

  const startItemIndex = $derived(Math.min((currentPage - 1) * itemsPerPage + 1, totalItemsCount));
  const endItemIndex = $derived(Math.min(currentPage * itemsPerPage, totalItemsCount));
</script>

<div class="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-surface border-t border-border-subtle">
  <div class="text-xs text-content-muted font-medium">
    Menampilkan <span class="font-bold text-content-heading">{startItemIndex}</span> - <span class="font-bold text-content-heading">{endItemIndex}</span> dari <span class="font-bold text-content-heading">{totalItemsCount}</span> data
  </div>

  <div class="flex items-center gap-1.5 sm:gap-2">
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage <= 1}
      onclick={() => onPageChange?.(currentPage - 1)}
      iconName="chevron_left"
    >
      Sebelumnya
    </Button>

    <span class="text-xs font-semibold px-1.5 text-content">
      {currentPage} / {Math.max(totalPages, 1)}
    </span>

    <Button
      variant="outline"
      size="sm"
      disabled={currentPage >= totalPages}
      onclick={() => onPageChange?.(currentPage + 1)}
      iconName="chevron_right"
    >
      Selanjutnya
    </Button>
  </div>
</div>
