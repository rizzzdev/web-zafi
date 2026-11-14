<script lang="ts">
  interface TextAreaProperties {
    identifier?: string;
    inputName: string;
    inputValue?: string;
    placeholderText?: string;
    rowsCount?: number;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    hasError?: boolean;
    customClass?: string;
    onInputEvent?: (event: Event) => void;
  }

  let {
    identifier,
    inputName,
    inputValue = $bindable(''),
    placeholderText = '',
    rowsCount = 4,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    hasError = false,
    customClass = '',
    onInputEvent,
  }: TextAreaProperties = $props();
</script>

<textarea
  id={identifier}
  name={inputName}
  bind:value={inputValue}
  placeholder={placeholderText}
  rows={rowsCount}
  disabled={isDisabled}
  readonly={isReadOnly}
  required={isRequired}
  oninput={onInputEvent}
  class="w-full rounded-xl border px-3.5 py-2.5 text-sm text-content-heading transition-colors placeholder:text-content-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-active disabled:text-content-muted {hasError
    ? 'border-status-error bg-status-error-subtle'
    : 'border-border-subtle bg-surface-subtle hover:border-border-hover'} {customClass}"
></textarea>
