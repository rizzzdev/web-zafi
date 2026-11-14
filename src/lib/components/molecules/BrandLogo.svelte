<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';

  interface BrandLogoProperties {
    href?: string;
    variant?: 'light' | 'dark';
    size?: 'small' | 'medium' | 'large';
    clickable?: boolean;
    customClass?: string;
    title?: string;
    subtitle?: string;
    iconName?: string;
  }

  const {
    href = '/',
    variant = 'dark',
    size = 'medium',
    clickable = true,
    customClass = '',
    title = 'EduKomputer',
    subtitle = 'Platform Belajar Komputer',
    iconName = 'computer',
  }: BrandLogoProperties = $props();

  const containerSizes: Record<'small' | 'medium' | 'large', string> = {
    small: 'w-8 h-8 rounded-lg',
    medium: 'w-10 h-10 rounded-xl',
    large: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl',
  };

  const iconSizes: Record<'small' | 'medium' | 'large', number> = {
    small: 18,
    medium: 22,
    large: 30,
  };

  const titleSizes: Record<'small' | 'medium' | 'large', string> = {
    small: 'text-sm font-bold',
    medium: 'text-base font-extrabold',
    large: 'text-xl sm:text-2xl font-black',
  };

  const subtitleSizes: Record<'small' | 'medium' | 'large', string> = {
    small: 'text-[9px] font-bold tracking-wider uppercase',
    medium: 'text-[10px] font-bold tracking-wider uppercase',
    large: 'text-xs font-bold tracking-wider uppercase',
  };
</script>

{#if clickable && href}
  <a
    {href}
    class="group flex items-center gap-3 transition-opacity select-none {customClass}"
    aria-label="{title} — {subtitle}"
  >
    <div
      class="{containerSizes[size]} bg-accent text-canvas flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-accent-hover shrink-0 transition-all"
    >
      <IconSymbol name={iconName} sizeInPixels={iconSizes[size]} />
    </div>
    <div class="flex min-w-0 flex-col text-left">
      <span
        class="{titleSizes[size]} tracking-tight text-content-heading group-hover:text-accent transition-colors truncate"
      >
        {title}
      </span>
      <span class="{subtitleSizes[size]} font-bold text-accent truncate">
        {subtitle}
      </span>
    </div>
  </a>
{:else}
  <div class="flex items-center gap-3 select-none {customClass}" aria-label="{title} — {subtitle}">
    <div
      class="{containerSizes[size]} bg-accent text-canvas flex shrink-0 items-center justify-center shadow-xs transition-colors"
    >
      <IconSymbol name={iconName} sizeInPixels={iconSizes[size]} />
    </div>
    <div class="flex min-w-0 flex-col text-left">
      <span class="{titleSizes[size]} tracking-tight text-content-heading truncate">
        {title}
      </span>
      <span class="{subtitleSizes[size]} font-bold text-accent truncate">
        {subtitle}
      </span>
    </div>
  </div>
{/if}
