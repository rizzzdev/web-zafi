<script lang="ts">
  import type { Snippet } from 'svelte';

  interface BadgeProperties {
    readonly variant?:
      | 'default'
      | 'accent'
      | 'yellow'
      | 'success'
      | 'emerald'
      | 'error'
      | 'rose'
      | 'info'
      | 'sky'
      | 'amber'
      | 'purple'
      | 'slate';
    readonly size?: 'sm' | 'md';
    readonly classNames?: string;
    readonly children?: Snippet;
  }

  const { variant = 'default', size = 'sm', classNames = '', children }: BadgeProperties = $props();

  const variantClassMap: Record<string, string> = {
    default: 'badge-default',
    accent: 'badge-accent',
    yellow: 'badge-accent',
    amber: 'badge-accent',
    success: 'badge-success',
    emerald: 'badge-success',
    error: 'badge-error',
    rose: 'badge-error',
    info: 'badge-info',
    sky: 'badge-info',
    purple: 'badge-default',
    slate: 'badge-default',
  };

  const sizeClassMap: Record<string, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs sm:text-sm px-2.5 py-1',
  };
</script>

<span class="badge-base {variantClassMap[variant] ?? 'badge-default'} {sizeClassMap[size]} {classNames}">
  {#if children}
    {@render children()}
  {/if}
</span>
