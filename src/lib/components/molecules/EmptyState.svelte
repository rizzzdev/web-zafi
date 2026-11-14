<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from '../atoms/Icon.svelte';

  interface EmptyStateProperties {
    readonly iconName?: string;
    readonly title: string;
    readonly description: string;
    readonly classNames?: string;
    readonly actions?: Snippet;
  }

  const {
    iconName = 'inbox',
    title,
    description,
    classNames = '',
    actions,
  }: EmptyStateProperties = $props();
</script>

<div class="card-base border-dashed p-6 sm:p-10 flex flex-col items-center justify-center text-center {classNames}">
  <div class="w-12 h-12 rounded-xl bg-surface-subtle text-accent flex items-center justify-center mb-3 border border-border-subtle">
    <Icon name={iconName} size="md" />
  </div>
  <h3 class="text-base font-bold text-content-heading mb-1">{title}</h3>
  <p class="text-xs sm:text-sm text-content-muted max-w-sm mb-5 leading-relaxed">{description}</p>
  {#if actions}
    <div class="flex items-center gap-2.5">
      {@render actions()}
    </div>
  {/if}
</div>
