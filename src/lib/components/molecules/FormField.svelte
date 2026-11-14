<script lang="ts">
  import type { Snippet } from 'svelte';

  interface FormFieldProperties {
    readonly labelText?: string;
    readonly inputId?: string;
    readonly isRequired?: boolean;
    readonly helperText?: string;
    readonly errorMessage?: string;
    readonly classNames?: string;
    readonly children?: Snippet;
  }

  const {
    labelText,
    inputId,
    isRequired = false,
    helperText,
    errorMessage,
    classNames = '',
    children,
  }: FormFieldProperties = $props();
</script>

<div class="flex flex-col gap-1.5 {classNames}">
  {#if labelText}
    <label for={inputId} class="text-xs sm:text-sm font-semibold text-content flex items-center gap-1">
      <span>{labelText}</span>
      {#if isRequired}
        <span class="text-accent font-bold">*</span>
      {/if}
    </label>
  {/if}

  {#if children}
    {@render children()}
  {/if}

  {#if errorMessage}
    <p class="text-xs text-status-error font-medium flex items-center gap-1 mt-0.5">
      <span>⚠️</span>
      <span>{errorMessage}</span>
    </p>
  {:else if helperText}
    <p class="text-xs text-content-muted mt-0.5">{helperText}</p>
  {/if}
</div>
