<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';

  interface ButtonProperties {
    readonly type?: 'button' | 'submit' | 'reset';
    readonly variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success';
    readonly size?: 'sm' | 'md' | 'lg';
    readonly isSubmitting?: boolean;
    readonly disabled?: boolean;
    readonly classNames?: string;
    readonly iconName?: string;
    readonly children?: Snippet;
    readonly onclick?: (event: MouseEvent) => void;
  }

  const {
    type = 'button',
    variant = 'primary',
    size = 'md',
    isSubmitting = false,
    disabled = false,
    classNames = '',
    iconName,
    children,
    onclick,
  }: ButtonProperties = $props();

  const variantClassMap: Record<string, string> = {
    primary: 'btn-primary-custom shadow-xs',
    secondary: 'btn-secondary-custom',
    outline: 'btn-outline-custom',
    danger: 'btn-danger-custom',
    ghost: 'bg-transparent text-content hover:bg-surface hover:text-content-heading',
    success: 'badge-success font-semibold px-3 py-1.5',
  };

  const sizeClassMap: Record<string, string> = {
    sm: 'px-2.5 py-1 text-xs font-semibold gap-1.5 rounded-lg min-h-8',
    md: 'px-3.5 py-2 text-xs sm:text-sm font-semibold gap-2 rounded-xl min-h-10',
    lg: 'px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-bold gap-2 rounded-xl min-h-11',
  };
</script>

<button
  {type}
  disabled={disabled || isSubmitting}
  {onclick}
  class="inline-flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-accent {variantClassMap[variant] ?? 'btn-primary-custom'} {sizeClassMap[size]} {classNames}"
>
  {#if isSubmitting}
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Memproses...</span>
  {:else}
    {#if iconName}
      <Icon name={iconName} size={size === 'sm' ? 'sm' : 'md'} />
    {/if}
    {#if children}
      {@render children()}
    {/if}
  {/if}
</button>
