<script lang="ts">
  import './layout.css';
  import { page } from '$app/state';
  import { PublicNavbar, PublicFooter, IconSymbol } from '$lib/components';
  import type { Snippet } from 'svelte';

  interface LayoutProperties {
    readonly data: {
      readonly sessionUser: { readonly fullName: string; readonly role: string } | null;
      readonly currentPathname: string;
    };
    readonly children: Snippet;
  }

  const { data, children }: LayoutProperties = $props();

  const isAdminRoute = $derived(page.url.pathname.startsWith('/admin'));
  const isAuthRoute = $derived(page.url.pathname.startsWith('/auth'));
</script>

<svelte:head>
  <title>EduKomputer — Media Pembelajaran Arsitektur Sistem Komputer (Model IPO)</title>
  <meta
    name="description"
    content="Media interaktif pembelajaran arsitektur sistem komputer model alur kerja Input-Process-Output-Storage untuk mahasiswa PTIK UNNES."
  />
</svelte:head>

{#if isAdminRoute}
  <div class="flex min-h-screen flex-col bg-canvas text-content font-sans">
    {#if children}
      {@render children()}
    {/if}
  </div>
{:else if isAuthRoute}
  <div class="flex min-h-screen flex-col bg-canvas text-content font-sans">
    <div class="p-4 sm:p-6">
      <a
        href="/"
        class="inline-flex items-center gap-2 text-xs font-bold text-accent transition-colors hover:text-accent-hover"
      >
        <IconSymbol name="arrow_back" sizeInPixels={16} />
        <span>Kembali ke Beranda EduKomputer</span>
      </a>
    </div>
    <div class="flex flex-1 items-center justify-center p-4">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
{:else}
  <!-- Modern SaaS Layout: Sticky Top Navbar + Fluid Main Canvas + Rich Footer -->
  <div class="flex min-h-screen flex-col bg-canvas text-content font-sans selection:bg-accent selection:text-canvas">
    <PublicNavbar activePath={page.url.pathname} />

    <main class="flex-1 w-full">
      {#if children}
        {@render children()}
      {/if}
    </main>

    <PublicFooter />
  </div>
{/if}
