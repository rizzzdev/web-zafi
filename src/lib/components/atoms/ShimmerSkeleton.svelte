<script lang="ts">
  interface ShimmerSkeletonProperties {
    widthClass?: string;
    heightClass?: string;
    roundedShape?: 'square' | 'rounded' | 'circle';
    customClass?: string;
  }

  const {
    widthClass = 'w-full',
    heightClass = 'h-4',
    roundedShape = 'rounded',
    customClass = '',
  }: ShimmerSkeletonProperties = $props();

  const shapeClasses = {
    square: 'rounded-none',
    rounded: 'rounded-xl',
    circle: 'rounded-full',
  };
</script>

<div
  class="animate-pulse bg-surface-hover/80 {shapeClasses[
    roundedShape
  ]} {widthClass} {heightClass} {customClass}"
  aria-hidden="true"
></div>
