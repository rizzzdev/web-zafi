<script lang="ts">
  import Icon from '../atoms/Icon.svelte';

  interface SearchInputProperties {
    readonly value?: string;
    readonly placeholder?: string;
    readonly oninput?: (event: Event) => void;
    readonly classNames?: string;
  }

  let {
    value = $bindable(''),
    placeholder = 'Cari berdasarkan nama atau NIM...',
    oninput,
    classNames = '',
  }: SearchInputProperties = $props();
</script>

<div class="relative flex items-center {classNames}">
  <div class="absolute left-3 text-content-muted pointer-events-none flex items-center">
    <Icon name="search" size="sm" />
  </div>
  <input
    type="search"
    bind:value
    {placeholder}
    {oninput}
    class="input-base pl-9 pr-3 text-xs sm:text-sm shadow-2xs"
  />
</div>
