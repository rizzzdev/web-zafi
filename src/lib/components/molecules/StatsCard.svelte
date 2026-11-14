<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  interface StatsCardProperties {
    readonly title: string;
    readonly value: string | number;
    readonly subtitle?: string;
    readonly iconName: string;
    readonly iconVariant?: 'indigo' | 'emerald' | 'amber' | 'purple' | 'sky' | 'yellow';
    readonly badgeText?: string;
  }

  const {
    title,
    value,
    subtitle,
    iconName,
    badgeText,
  }: StatsCardProperties = $props();
</script>

<div class="card-interactive p-3.5 sm:p-4.5 flex flex-col justify-between shadow-xs">
  <div class="flex items-center justify-between gap-2.5 mb-2">
    <span class="text-xs font-semibold text-content-muted uppercase tracking-wider">{title}</span>
    <div class="icon-box">
      <Icon name={iconName} size="sm" />
    </div>
  </div>

  <div class="my-0.5 sm:my-1">
    <span class="text-xl sm:text-2xl font-extrabold text-content-heading tracking-tight">{value}</span>
  </div>

  <div class="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-border-subtle text-xs">
    {#if subtitle}
      <span class="text-content-muted font-medium">{subtitle}</span>
    {/if}
    {#if badgeText}
      <span class="badge-accent text-xs">
        {badgeText}
      </span>
    {/if}
  </div>
</div>
