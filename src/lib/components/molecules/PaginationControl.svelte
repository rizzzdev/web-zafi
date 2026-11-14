<script lang="ts">
  import ActionButton from '../atoms/ActionButton.svelte';
  import IconSymbol from '../atoms/IconSymbol.svelte';

  interface PaginationControlProperties {
    currentPage: number;
    totalRecords: number;
    recordsPerPage: number;
    onPageChange: (targetPage: number) => void;
  }

  const { currentPage, totalRecords, recordsPerPage, onPageChange }: PaginationControlProperties =
    $props();

  const totalPages = $derived(Math.max(1, Math.ceil(totalRecords / recordsPerPage)));
  const hasPrevious = $derived(currentPage > 1);
  const hasNext = $derived(currentPage < totalPages);
  const startIndex = $derived(totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1);
  const endIndex = $derived(Math.min(currentPage * recordsPerPage, totalRecords));
</script>

<div
  class="flex flex-col items-center justify-between gap-3 border-t border-border-subtle pt-3 text-xs text-content-muted sm:flex-row"
>
  <div>
    Menampilkan <span class="font-bold text-content-heading">{startIndex}</span> -
    <span class="font-bold text-content-heading">{endIndex}</span>
    dari <span class="font-bold text-content-heading">{totalRecords}</span> entri
  </div>

  <div class="flex items-center gap-1.5">
    <ActionButton
      buttonType="button"
      variantStyle="outline"
      sizeScale="small"
      isDisabled={!hasPrevious}
      onClickHandler={() => onPageChange(currentPage - 1)}
    >
      <IconSymbol name="chevron_left" sizeInPixels={16} />
      <span class="hidden sm:inline">Sebelumnya</span>
    </ActionButton>

    <span
      class="rounded-lg border border-accent-border bg-accent-subtle px-3 py-1 font-bold text-accent"
    >
      {currentPage} / {totalPages}
    </span>

    <ActionButton
      buttonType="button"
      variantStyle="outline"
      sizeScale="small"
      isDisabled={!hasNext}
      onClickHandler={() => onPageChange(currentPage + 1)}
    >
      <span class="hidden sm:inline">Berikutnya</span>
      <IconSymbol name="chevron_right" sizeInPixels={16} />
    </ActionButton>
  </div>
</div>
