<script lang="ts">
  interface LikertOptionButtonProperties {
    readonly valueNumber: number;
    readonly isSelected: boolean;
    readonly disabled?: boolean;
    readonly onclick?: (event: MouseEvent) => void;
  }

  const { valueNumber, isSelected, disabled = false, onclick }: LikertOptionButtonProperties = $props();
</script>

<button
  type="button"
  {disabled}
  {onclick}
  class="h-10 sm:h-11 w-full rounded-xl border font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center cursor-pointer select-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 {isSelected
    ? 'btn-primary-custom ring-2 ring-accent font-black shadow-xs'
    : 'btn-secondary-custom'}"
  aria-pressed={isSelected}
>
  <span>{valueNumber}</span>
</button>
