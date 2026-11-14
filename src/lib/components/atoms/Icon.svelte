<script lang="ts">
  interface IconProperties {
    readonly name: string;
    readonly size?: 'sm' | 'md' | 'lg' | 'xl';
    readonly classNames?: string;
  }

  const { name, size = 'md', classNames = '' }: IconProperties = $props();

  const sizeClassesRecord = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };
</script>

<span
  class="material-symbols-outlined select-none align-middle {sizeClassesRecord[size]} {classNames}"
  aria-hidden="true"
>
  {name}
</span>
