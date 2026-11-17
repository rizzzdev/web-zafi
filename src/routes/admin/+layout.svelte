<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import { AdminSidebar } from '$lib/components';

  interface AdminLayoutProperties {
    readonly data: {
      readonly adminUser: { readonly fullName: string; readonly role: string };
      readonly currentPathname: string;
    };
    readonly children: Snippet;
  }

  const { data, children }: AdminLayoutProperties = $props();
</script>

<div class="flex h-screen overflow-hidden bg-canvas text-content flex-col lg:flex-row font-sans">
  <!-- Desktop Permanent Sidebar / Mobile Header with Drawer Toggle -->
  <AdminSidebar
    currentPathname={page.url.pathname}
    userFullName={data.adminUser?.fullName || 'Instruktur Utama'}
  />

  <!-- Main Admin Workspace with independent scroll -->
  <main class="flex min-w-0 flex-1 flex-col overflow-y-auto">
    {#if children}
      {@render children()}
    {/if}
  </main>
</div>
