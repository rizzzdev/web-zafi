<script lang="ts">
  interface InputProperties {
    readonly id?: string;
    readonly name?: string;
    readonly type?: 'text' | 'email' | 'password' | 'number' | 'search';
    readonly value?: string | number;
    readonly placeholder?: string;
    readonly required?: boolean;
    readonly disabled?: boolean;
    readonly readonly?: boolean;
    readonly classNames?: string;
    readonly oninput?: (event: Event) => void;
  }

  let {
    id,
    name,
    type = 'text',
    value = $bindable(''),
    placeholder = '',
    required = false,
    disabled = false,
    readonly = false,
    classNames = '',
    oninput,
  }: InputProperties = $props();
</script>

<input
  {id}
  {name}
  {type}
  bind:value
  {placeholder}
  {required}
  {disabled}
  {readonly}
  {oninput}
  class="input-base {classNames}"
/>
