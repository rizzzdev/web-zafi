<script lang="ts">
  import type { Snippet } from 'svelte';
  import IconSymbol from './IconSymbol.svelte';

  interface ActionButtonProperties {
    buttonType?: 'button' | 'submit' | 'reset';
    variantStyle?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'amber';
    sizeScale?: 'small' | 'medium' | 'large';
    isDisabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    leadingIcon?: string;
    trailingIcon?: string;
    customClass?: string;
    onClickHandler?: (event: MouseEvent) => void;
    children?: Snippet;
  }

  const {
    buttonType = 'button',
    variantStyle = 'primary',
    sizeScale = 'medium',
    isDisabled = false,
    isLoading = false,
    loadingText = 'Memproses...',
    leadingIcon,
    trailingIcon,
    customClass = '',
    onClickHandler,
    children,
  }: ActionButtonProperties = $props();

  const variantClasses = {
    primary:
      'bg-accent text-canvas hover:bg-accent-hover active:scale-[0.98] font-bold shadow-sm border-transparent',
    amber:
      'bg-accent text-canvas hover:bg-accent-hover active:scale-[0.98] font-bold shadow-sm border-transparent',
    secondary:
      'bg-surface text-content hover:bg-surface-hover hover:text-content-heading border-border-subtle shadow-sm',
    outline:
      'bg-transparent text-content border-border-subtle hover:bg-surface hover:text-content-heading active:bg-surface-hover',
    danger:
      'bg-status-error-subtle text-status-error border-status-error-border hover:bg-status-error hover:text-white shadow-sm',
    ghost:
      'bg-transparent text-content-muted hover:bg-surface hover:text-content-heading border-transparent',
  };

  const sizeClasses = {
    small: 'text-xs px-2.5 py-1.5 gap-1.5 rounded-lg font-medium',
    medium: 'text-sm px-4 py-2 gap-2 rounded-xl font-medium',
    large: 'text-base px-6 py-3 gap-2.5 rounded-xl font-bold',
  };
</script>

<button
  type={buttonType}
  disabled={isDisabled || isLoading}
  onclick={onClickHandler}
  class="inline-flex cursor-pointer items-center justify-center border transition-all duration-150 select-none disabled:cursor-not-allowed disabled:opacity-50 {variantClasses[
    variantStyle
  ]} {sizeClasses[sizeScale]} {customClass}"
>
  {#if isLoading}
    <IconSymbol
      name="progress_activity"
      sizeInPixels={sizeScale === 'small' ? 16 : 18}
      customClass="animate-spin text-current"
    />
    <span>{loadingText}</span>
  {:else}
    {#if leadingIcon}
      <IconSymbol name={leadingIcon} sizeInPixels={sizeScale === 'small' ? 16 : 18} />
    {/if}
    {#if children}
      {@render children()}
    {/if}
    {#if trailingIcon}
      <IconSymbol name={trailingIcon} sizeInPixels={sizeScale === 'small' ? 16 : 18} />
    {/if}
  {/if}
</button>
