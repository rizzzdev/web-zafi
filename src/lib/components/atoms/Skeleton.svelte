<script lang="ts">
  interface SkeletonProperties {
    readonly width?: string;
    readonly height?: string;
    readonly rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    readonly classNames?: string;
  }

  const { width = 'w-full', height = 'h-4', rounded = 'md', classNames = '' }: SkeletonProperties = $props();

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };
</script>

<div
  class="animate-pulse bg-surface border border-border-subtle {width} {height} {roundedStyles[rounded]} {classNames}"
  aria-hidden="true"
></div>
