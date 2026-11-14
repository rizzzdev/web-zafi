<script lang="ts">
  import type { Snippet } from 'svelte';
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import ActionButton from '../atoms/ActionButton.svelte';

  interface EmptyStateCardProperties {
    iconName?: string;
    titleHeading: string;
    descriptionText: string;
    actionButtonLabel?: string;
    onActionButtonClick?: () => void;
    children?: Snippet;
  }

  const {
    iconName = 'inbox',
    titleHeading,
    descriptionText,
    actionButtonLabel,
    onActionButtonClick,
    children,
  }: EmptyStateCardProperties = $props();
</script>

<div
  class="mx-auto my-6 max-w-xl rounded-2xl border border-dashed border-border-subtle bg-surface/40 p-8 text-center sm:p-12 backdrop-blur-xs"
>
  <div
    class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-subtle text-accent border border-border-subtle shadow-xs"
  >
    <IconSymbol name={iconName} sizeInPixels={36} />
  </div>
  <h3 class="mb-1 text-lg font-bold text-content-heading">{titleHeading}</h3>
  <p class="mx-auto mb-6 max-w-md text-xs sm:text-sm leading-relaxed text-content-muted">
    {descriptionText}
  </p>

  {#if actionButtonLabel && onActionButtonClick}
    <ActionButton
      buttonType="button"
      variantStyle="primary"
      sizeScale="medium"
      leadingIcon="add"
      onClickHandler={onActionButtonClick}
    >
      {actionButtonLabel}
    </ActionButton>
  {/if}

  {#if children}
    <div class="mt-4">
      {@render children()}
    </div>
  {/if}
</div>
