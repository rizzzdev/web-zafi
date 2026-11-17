<script lang="ts">
  interface IconSymbolProperties {
    name: string;
    sizeInPixels?: number;
    customClass?: string;
    filled?: boolean;
  }

  const { name, sizeInPixels = 20, customClass = '', filled = false }: IconSymbolProperties = $props();
</script>

<span
  class="material-symbols-outlined select-none align-middle inline-flex items-center justify-center {customClass}"
  style="font-size: {sizeInPixels}px; width: {sizeInPixels}px; height: {sizeInPixels}px; line-height: 1; {filled ? `font-variation-settings: 'FILL' 1;` : ''}"
  aria-hidden="true"
>
  {name}
</span>
