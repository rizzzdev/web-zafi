<script lang="ts">
  import type { Snippet } from 'svelte';
  import Skeleton from '../atoms/Skeleton.svelte';
  import EmptyState from '../molecules/EmptyState.svelte';
  import Alert from '../molecules/Alert.svelte';
  import Button from '../atoms/Button.svelte';

  interface DataTableProperties {
    readonly isLoading?: boolean;
    readonly errorMessage?: string | null;
    readonly itemsCount: number;
    readonly emptyTitle?: string;
    readonly emptyDescription?: string;
    readonly onRetry?: () => void;
    readonly headerRow?: Snippet;
    readonly tableRows?: Snippet;
    readonly pagination?: Snippet;
  }

  const {
    isLoading = false,
    errorMessage = null,
    itemsCount,
    emptyTitle = 'Data Belum Tersedia',
    emptyDescription = 'Belum ada catatan yang tersimpan pada tabel ini.',
    onRetry,
    headerRow,
    tableRows,
    pagination,
  }: DataTableProperties = $props();
</script>

<div class="card-base w-full overflow-hidden shadow-xs">
  {#if isLoading}
    <!-- 1. LOADING STATE -->
    <div class="p-4 sm:p-6 flex flex-col gap-3">
      <Skeleton height="h-7" rounded="lg" />
      <Skeleton height="h-10" rounded="xl" />
      <Skeleton height="h-10" rounded="xl" />
      <Skeleton height="h-10" rounded="xl" />
    </div>
  {:else if errorMessage}
    <!-- 2. ERROR STATE -->
    <div class="p-4 sm:p-6">
      <Alert variant="error" title="Gagal Memuat Data" message={errorMessage}>
        {#if onRetry}
          <div class="mt-2.5">
            <Button variant="outline" size="sm" onclick={onRetry} iconName="refresh">
              Muat Ulang
            </Button>
          </div>
        {/if}
      </Alert>
    </div>
  {:else if itemsCount === 0}
    <!-- 3. EMPTY STATE -->
    <div class="p-4 sm:p-6">
      <EmptyState title={emptyTitle} description={emptyDescription} iconName="table_rows" />
    </div>
  {:else}
    <!-- 4. POPULATED STATE (Mobile Horizontal Scrollable Table) -->
    <div class="w-full overflow-x-auto">
      <table class="w-full text-left text-xs sm:text-sm text-content">
        <thead class="bg-surface-subtle border-b border-border-subtle text-xs font-bold text-content-muted uppercase tracking-wider">
          {#if headerRow}
            {@render headerRow()}
          {/if}
        </thead>
        <tbody class="divide-y divide-border-subtle">
          {#if tableRows}
            {@render tableRows()}
          {/if}
        </tbody>
      </table>
    </div>

    {#if pagination}
      <div class="border-t border-border-subtle">
        {@render pagination()}
      </div>
    {/if}
  {/if}
</div>
