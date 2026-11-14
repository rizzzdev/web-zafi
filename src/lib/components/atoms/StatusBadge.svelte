<script lang="ts">
  import type { Snippet } from 'svelte';
  import IconSymbol from './IconSymbol.svelte';

  interface StatusBadgeProperties {
    badgeTone?: 'emerald' | 'amber' | 'rose' | 'slate' | 'sky' | 'indigo';
    iconName?: string;
    textLabel?: string;
    customClass?: string;
    children?: Snippet;
  }

  const {
    badgeTone = 'amber',
    iconName,
    textLabel,
    customClass = '',
    children,
  }: StatusBadgeProperties = $props();

  const toneClasses = {
    emerald: 'bg-status-success-subtle text-status-success border-status-success-border',
    amber: 'bg-accent-subtle text-accent border-accent-border font-bold',
    rose: 'bg-status-error-subtle text-status-error border-status-error-border',
    slate: 'bg-surface-subtle text-content-muted border-border-subtle',
    sky: 'bg-status-info-subtle text-status-info border-status-info-border',
    indigo: 'bg-surface-active text-content-heading border-border-hover',
  };
</script>

<span
  class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold select-none {toneClasses[
    badgeTone
  ]} {customClass}"
>
  {#if iconName}
    <IconSymbol name={iconName} sizeInPixels={14} />
  {/if}
  {#if textLabel}
    <span>{textLabel}</span>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</span>
