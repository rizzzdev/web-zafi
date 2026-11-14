<script lang="ts">
  interface SelectOptionItem {
    label: string;
    value: string | number;
  }

  interface SelectInputProperties {
    identifier?: string;
    selectName: string;
    selectedValue?: string | number;
    optionsList: SelectOptionItem[];
    placeholderText?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    hasError?: boolean;
    customClass?: string;
  }

  let {
    identifier,
    selectName,
    selectedValue = $bindable(''),
    optionsList,
    placeholderText,
    isDisabled = false,
    isRequired = false,
    hasError = false,
    customClass = '',
  }: SelectInputProperties = $props();
</script>

<select
  id={identifier}
  name={selectName}
  bind:value={selectedValue}
  disabled={isDisabled}
  required={isRequired}
  class="w-full rounded-xl border px-3.5 py-2.5 text-sm text-content-heading transition-colors focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-active disabled:text-content-muted {hasError
    ? 'border-status-error bg-status-error-subtle'
    : 'border-border-subtle bg-surface-subtle hover:border-border-hover'} {customClass}"
>
  {#if placeholderText}
    <option value="" disabled selected={selectedValue === ''}>{placeholderText}</option>
  {/if}
  {#each optionsList as currentOption (currentOption.value)}
    <option value={currentOption.value} class="bg-surface text-content-heading">
      {currentOption.label}
    </option>
  {/each}
</select>
