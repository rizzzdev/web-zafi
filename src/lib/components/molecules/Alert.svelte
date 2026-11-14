<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';

  interface AlertProperties {
    readonly variant?: 'success' | 'error' | 'warning' | 'info' | 'danger';
    readonly title?: string;
    readonly message?: string;
    readonly classNames?: string;
    readonly children?: Snippet;
  }

  const { variant = 'info', title, message, classNames = '', children }: AlertProperties = $props();

  const normalizedVariant = $derived(variant === 'danger' ? 'error' : variant);

  const variantStyles: Record<string, string> = {
    success: 'bg-status-success-subtle text-content-heading border-status-success-border',
    error: 'bg-status-error-subtle text-content-heading border-status-error-border',
    warning: 'bg-accent-subtle text-content-heading border-accent-border',
    info: 'bg-surface text-content-heading border-border-subtle',
  };

  const iconNames: Record<string, string> = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  const iconColors: Record<string, string> = {
    success: 'text-status-success',
    error: 'text-status-error',
    warning: 'text-accent',
    info: 'text-content',
  };
</script>

<div class="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border {variantStyles[normalizedVariant]} {classNames}" role="alert">
  <div class="shrink-0 mt-0.5">
    <Icon name={iconNames[normalizedVariant]} classNames={iconColors[normalizedVariant]} size="sm" />
  </div>
  <div class="flex-1 text-xs sm:text-sm leading-relaxed">
    {#if title}
      <h4 class="font-bold mb-0.5 text-content-heading">{title}</h4>
    {/if}
    {#if message}
      <p class="text-content">{message}</p>
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
