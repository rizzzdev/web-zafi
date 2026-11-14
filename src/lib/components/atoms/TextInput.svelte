<script lang="ts">
  interface TextInputProperties {
    identifier?: string;
    inputName: string;
    inputType?: 'text' | 'email' | 'password' | 'number' | 'url' | 'search';
    inputValue?: string | number;
    placeholderText?: string;
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
    inputType = 'text',
    inputValue = $bindable(''),
    placeholderText = '',
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    hasError = false,
    customClass = '',
    onInputEvent,
  }: TextInputProperties = $props();
</script>

<input
  id={identifier}
  name={inputName}
  type={inputType}
  bind:value={inputValue}
  placeholder={placeholderText}
  disabled={isDisabled}
  readonly={isReadOnly}
  required={isRequired}
  oninput={onInputEvent}
  class="w-full rounded-xl border px-3.5 py-2.5 text-sm text-content-heading transition-colors placeholder:text-content-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-active disabled:text-content-muted {hasError
    ? 'border-status-error bg-status-error-subtle'
    : 'border-border-subtle bg-surface-subtle hover:border-border-hover'} {customClass}"
/>
