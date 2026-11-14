<script lang="ts">
  import type { Snippet } from 'svelte';

  interface ContentCardProperties {
    cardPadding?: 'none' | 'small' | 'medium' | 'large';
    hasHoverEffect?: boolean;
    customClass?: string;
    children?: Snippet;
  }

  const {
    cardPadding = 'medium',
    hasHoverEffect = false,
    customClass = '',
    children,
  }: ContentCardProperties = $props();

  const paddingClasses = {
    none: 'p-0',
    small: 'p-3 sm:p-4',
    medium: 'p-5 sm:p-6',
    large: 'p-6 sm:p-8',
  };
</script>

<div
  class="rounded-2xl border border-border-subtle bg-surface text-content shadow-xs {paddingClasses[
    cardPadding
  ]} {hasHoverEffect
    ? 'transition-all duration-200 hover:border-accent-border hover:shadow-md hover:shadow-black/25 hover:-translate-y-0.5'
    : ''} {customClass}"
>
  {#if children}
    {@render children()}
  {/if}
</div>
