<script lang="ts">
  interface TextAreaProperties {
    identifier?: string;
    id?: string;
    inputName?: string;
    name?: string;
    inputValue?: string;
    value?: string;
    textareaValue?: string;
    placeholderText?: string;
    placeholder?: string;
    rowsCount?: number;
    rows?: number;
    rowLength?: number;
    isDisabled?: boolean;
    disabled?: boolean;
    isReadOnly?: boolean;
    readonly?: boolean;
    isRequired?: boolean;
    required?: boolean;
    hasError?: boolean;
    customClass?: string;
    onInputEvent?: (event: Event) => void;
    oninput?: (event: Event) => void;
  }

  let {
    identifier,
    id,
    inputName,
    name,
    inputValue = $bindable(''),
    value,
    textareaValue,
    placeholderText,
    placeholder,
    rowsCount,
    rows,
    rowLength,
    isDisabled = false,
    disabled = false,
    isReadOnly = false,
    readonly = false,
    isRequired = false,
    required = false,
    hasError = false,
    customClass = '',
    onInputEvent,
    oninput,
  }: TextAreaProperties = $props();

  const resolvedIdentifier = $derived(identifier ?? id);
  const resolvedName = $derived(inputName ?? name ?? 'textarea');
  const resolvedPlaceholder = $derived(placeholderText ?? placeholder ?? '');
  const resolvedRows = $derived(rowsCount ?? rows ?? rowLength ?? 4);
  const resolvedDisabled = $derived(isDisabled || disabled);
  const resolvedReadOnly = $derived(isReadOnly || readonly);
  const resolvedRequired = $derived(isRequired || required);
  const resolvedInputHandler = $derived(onInputEvent ?? oninput);

  // Sync if value or textareaValue is passed externally
  $effect(() => {
    if (value !== undefined && inputValue !== value) {
      inputValue = value;
    } else if (textareaValue !== undefined && inputValue !== textareaValue) {
      inputValue = textareaValue;
    }
  });
</script>

<textarea
  id={resolvedIdentifier}
  name={resolvedName}
  bind:value={inputValue}
  placeholder={resolvedPlaceholder}
  rows={resolvedRows}
  disabled={resolvedDisabled}
  readonly={resolvedReadOnly}
  required={resolvedRequired}
  oninput={resolvedInputHandler}
  class="w-full rounded-xl border px-3.5 py-2.5 text-sm text-content-heading transition-colors placeholder:text-content-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-active disabled:text-content-muted {hasError
    ? 'border-status-error bg-status-error-subtle'
    : 'border-border-subtle bg-surface-subtle hover:border-border-hover'} {customClass}"
></textarea>
