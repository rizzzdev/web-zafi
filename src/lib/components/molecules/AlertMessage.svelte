<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';

  interface AlertMessageProperties {
    alertTone?: 'success' | 'error' | 'warning' | 'info';
    alertTitle?: string;
    alertMessage: string;
    isDismissible?: boolean;
    onDismiss?: () => void;
  }

  const {
    alertTone = 'info',
    alertTitle,
    alertMessage,
    isDismissible = false,
    onDismiss,
  }: AlertMessageProperties = $props();

  const toneClasses = {
    success: 'bg-status-success-subtle border-status-success-border text-status-success',
    error: 'bg-status-error-subtle border-status-error-border text-status-error',
    warning: 'bg-accent-subtle border-accent-border text-accent',
    info: 'bg-status-info-subtle border-status-info-border text-status-info',
  };

  const iconNames = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
</script>

<div
  class="rounded-xl border p-4 {toneClasses[
    alertTone
  ]} flex items-start gap-3 text-xs sm:text-sm shadow-xs backdrop-blur-xs"
>
  <div class="mt-0.5 shrink-0">
    <IconSymbol name={iconNames[alertTone]} sizeInPixels={20} />
  </div>
  <div class="flex-1 min-w-0">
    {#if alertTitle}
      <h4 class="mb-0.5 font-bold tracking-tight text-content-heading">{alertTitle}</h4>
    {/if}
    <p class="leading-relaxed text-content">{alertMessage}</p>
  </div>
  {#if isDismissible && onDismiss}
    <button
      type="button"
      onclick={onDismiss}
      class="shrink-0 p-1 text-content-muted hover:text-content-heading transition-colors cursor-pointer"
      aria-label="Tutup notifikasi"
    >
      <IconSymbol name="close" sizeInPixels={18} />
    </button>
  {/if}
</div>
