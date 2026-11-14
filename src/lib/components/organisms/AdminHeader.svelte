<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import StatusBadge from '../atoms/StatusBadge.svelte';

  interface AdminHeaderProperties {
    pageTitle: string;
    pageSubtitle?: string;
    currentUserName?: string;
    currentUserRole?: string;
  }

  const {
    pageTitle,
    pageSubtitle,
    currentUserName = 'Instruktur Utama',
    currentUserRole = 'ADMIN',
  }: AdminHeaderProperties = $props();

  const userInitials = $derived(
    currentUserName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'AD'
  );
</script>

<header
  class="z-20 flex flex-col gap-3 border-b border-border-subtle bg-surface/95 backdrop-blur-md px-6 py-4 sm:flex-row sm:items-center sm:justify-between lg:sticky lg:top-0"
>
  <div>
    <h1 class="text-xl font-bold tracking-tight text-content-heading">{pageTitle}</h1>
    {#if pageSubtitle}
      <p class="mt-0.5 text-xs text-content-muted">{pageSubtitle}</p>
    {/if}
  </div>

  <div class="flex items-center gap-3">
    <StatusBadge badgeTone="amber" textLabel="Instruktur Utama" iconName="verified_user" />
    <div class="flex items-center gap-2 border-l border-border-subtle pl-3">
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-black text-canvas shadow-2xs"
      >
        {userInitials}
      </div>
      <div class="hidden text-left sm:block">
        <p class="text-xs font-bold text-content-heading">{currentUserName}</p>
        <p class="text-[10px] font-medium text-accent">Sistem Manajemen Kursus</p>
      </div>
    </div>
  </div>
</header>
