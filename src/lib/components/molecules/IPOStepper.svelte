<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  interface StepItem {
    readonly slug: string;
    readonly label: string;
    readonly iconName: string;
    readonly categoryKey: 'INPUT' | 'PROCESS' | 'OUTPUT' | 'STORAGE_SOFTWARE';
  }

  interface IPOStepperProperties {
    readonly currentActiveSlug: string;
  }

  const { currentActiveSlug }: IPOStepperProperties = $props();

  const stepsList: readonly StepItem[] = [
    { slug: 'input', label: '1. Input', iconName: 'input', categoryKey: 'INPUT' },
    { slug: 'process', label: '2. Process', iconName: 'memory', categoryKey: 'PROCESS' },
    { slug: 'output', label: '3. Output', iconName: 'output', categoryKey: 'OUTPUT' },
    { slug: 'storage-software', label: '4. Storage', iconName: 'save', categoryKey: 'STORAGE_SOFTWARE' },
  ];
</script>

<nav aria-label="Alur Pembelajaran IPO" class="w-full mb-6">
  <div class="flex items-center p-1.5 sm:p-2 bg-surface rounded-2xl border border-border-subtle shadow-xs overflow-x-auto gap-1.5 sm:gap-2">
    {#each stepsList as stepItem, stepIndex (stepItem.slug)}
      {@const isActive = currentActiveSlug === stepItem.slug}
      <a
        href="/modul/{stepItem.slug}"
        class="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-150 shrink-0 {isActive
          ? 'btn-primary-custom shadow-xs font-bold'
          : 'text-content hover:bg-surface-hover hover:text-content-heading'}"
        aria-current={isActive ? 'step' : undefined}
      >
        <Icon name={stepItem.iconName} size="sm" />
        <span>{stepItem.label}</span>
      </a>

      {#if stepIndex < stepsList.length - 1}
        <span class="text-content-muted select-none text-xs hidden sm:inline" aria-hidden="true">➔</span>
      {/if}
    {/each}
  </div>
</nav>
