<script lang="ts">
  import type { Snippet } from 'svelte';

  interface FormLabelProperties {
    fieldIdentifier?: string;
    labelText: string;
    isRequired?: boolean;
    helperText?: string;
    customClass?: string;
    children?: Snippet;
  }

  const {
    fieldIdentifier,
    labelText,
    isRequired = false,
    helperText,
    customClass = '',
    children,
  }: FormLabelProperties = $props();
</script>

<div class="mb-1.5 flex items-center justify-between text-xs {customClass}">
  <label for={fieldIdentifier} class="font-bold text-content-heading flex items-center gap-1">
    <span>{labelText}</span>
    {#if isRequired}
      <span class="text-status-error font-bold" aria-hidden="true">*</span>
    {/if}
  </label>
  {#if helperText}
    <span class="text-content-muted">{helperText}</span>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
