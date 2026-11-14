<script lang="ts">
  import type { Snippet } from 'svelte';
  import IconSymbol from '../atoms/IconSymbol.svelte';

  interface ModalDialogProperties {
    isOpen: boolean;
    modalTitle: string;
    onClose: () => void;
    children?: Snippet;
    footerActions?: Snippet;
  }

  const { isOpen, modalTitle, onClose, children, footerActions }: ModalDialogProperties = $props();
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm transition-opacity"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="w-full max-w-xl overflow-hidden rounded-2xl border border-border-subtle bg-surface text-content shadow-2xl duration-150 animate-in fade-in zoom-in-95"
    >
      <div class="flex items-center justify-between border-b border-border-subtle px-6 py-4">
        <h3 class="text-base font-bold text-content-heading">{modalTitle}</h3>
        <button
          type="button"
          onclick={onClose}
          class="cursor-pointer rounded-lg p-1.5 text-content-muted transition-colors hover:bg-surface-hover hover:text-content-heading"
          aria-label="Tutup dialog"
        >
          <IconSymbol name="close" sizeInPixels={20} />
        </button>
      </div>

      <div class="max-h-[70vh] overflow-y-auto px-6 py-5">
        {#if children}
          {@render children()}
        {/if}
      </div>

      {#if footerActions}
        <div class="flex justify-end gap-3 border-t border-border-subtle bg-surface-subtle px-6 py-4">
          {@render footerActions()}
        </div>
      {/if}
    </div>
  </div>
{/if}
