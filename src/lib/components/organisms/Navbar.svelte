<script lang="ts">
  import PublicNavbar from './PublicNavbar.svelte';

  interface NavbarProperties {
    readonly currentPathname?: string;
  }

  const { currentPathname = '/' }: NavbarProperties = $props();
</script>

<PublicNavbar activePath={currentPathname} />
