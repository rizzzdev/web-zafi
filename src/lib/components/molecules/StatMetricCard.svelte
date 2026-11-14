<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import ContentCard from '../atoms/ContentCard.svelte';

  interface StatMetricCardProperties {
    metricTitle: string;
    metricValue: number | string;
    iconSymbolName: string;
    accentColorTone?: 'emerald' | 'amber' | 'sky' | 'indigo';
    subtextDescription?: string;
  }

  const {
    metricTitle,
    metricValue,
    iconSymbolName,
    accentColorTone = 'amber',
    subtextDescription,
  }: StatMetricCardProperties = $props();

  const iconBackgroundClasses = {
    amber: 'bg-accent-subtle text-accent border border-accent-border',
    emerald: 'bg-status-success-subtle text-status-success border border-status-success-border',
    sky: 'bg-status-info-subtle text-status-info border border-status-info-border',
    indigo: 'bg-surface-active text-content-heading border border-border-hover',
  };
</script>

<ContentCard cardPadding="medium" hasHoverEffect={true}>
  <div class="flex items-center justify-between">
    <div class="space-y-1">
      <p class="text-xs font-semibold tracking-wider text-content-muted uppercase">
        {metricTitle}
      </p>
      <h3 class="text-2xl sm:text-3xl font-black text-content-heading">{metricValue}</h3>
      {#if subtextDescription}
        <p class="text-xs text-content-muted font-medium">{subtextDescription}</p>
      {/if}
    </div>
    <div
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl {iconBackgroundClasses[
        accentColorTone
      ]} shadow-xs"
    >
      <IconSymbol name={iconSymbolName} sizeInPixels={26} />
    </div>
  </div>
</ContentCard>
