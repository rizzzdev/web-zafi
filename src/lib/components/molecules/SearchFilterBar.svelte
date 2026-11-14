<script lang="ts">
  import TextInput from '../atoms/TextInput.svelte';
  import SelectInput from '../atoms/SelectInput.svelte';
  import ActionButton from '../atoms/ActionButton.svelte';
  import IconSymbol from '../atoms/IconSymbol.svelte';

  interface FilterOptionItem {
    label: string;
    value: string | number;
  }

  interface SearchFilterBarProperties {
    searchQuery?: string;
    selectedFilterCategory?: string;
    filterOptions?: FilterOptionItem[];
    placeholderSearchText?: string;
    filterCategoryLabel?: string;
    onSearchSubmit?: () => void;
  }

  let {
    searchQuery = $bindable(''),
    selectedFilterCategory = $bindable(''),
    filterOptions = [],
    placeholderSearchText = 'Cari materi atau kata kunci...',
    filterCategoryLabel = 'Semua Kategori',
    onSearchSubmit,
  }: SearchFilterBarProperties = $props();
</script>

<div
  class="flex flex-col items-stretch gap-3 rounded-2xl border border-border-subtle bg-surface p-3 shadow-xs md:flex-row md:items-center"
>
  <div class="relative flex-1">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-content-muted"
    >
      <IconSymbol name="search" sizeInPixels={20} />
    </div>
    <TextInput
      inputName="search"
      bind:inputValue={searchQuery}
      placeholderText={placeholderSearchText}
      customClass="pl-10"
    />
  </div>

  {#if filterOptions.length > 0}
    <div class="w-full shrink-0 md:w-56">
      <SelectInput
        selectName="category"
        bind:selectedValue={selectedFilterCategory}
        placeholderText={filterCategoryLabel}
        optionsList={filterOptions}
      />
    </div>
  {/if}

  {#if onSearchSubmit}
    <div class="shrink-0">
      <ActionButton
        buttonType="button"
        variantStyle="primary"
        leadingIcon="filter_list"
        onClickHandler={onSearchSubmit}
      >
        Terapkan
      </ActionButton>
    </div>
  {/if}
</div>
