<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import BrandLogo from '../molecules/BrandLogo.svelte';
  import StatusBadge from '../atoms/StatusBadge.svelte';
  import ActionButton from '../atoms/ActionButton.svelte';
  import { fade } from 'svelte/transition';

  interface AdminSidebarProperties {
    readonly currentPathname?: string;
    readonly userFullName?: string;
  }

  const {
    currentPathname = '/admin/dashboard',
    userFullName = 'Instruktur Utama',
  }: AdminSidebarProperties = $props();

  const navigationMenuItems = [
    {
      label: 'Dashboard Kursus',
      path: '/admin/dashboard',
      icon: 'dashboard',
      description: 'Metrik statistik & performa operasional platform',
    },
    {
      label: 'Ulasan & Testimoni Siswa',
      path: '/admin/responden',
      icon: 'rate_review',
      description: 'Rekapitulasi rating kepuasan & testimoni siswa',
    },
    {
      label: 'Hasil Kuis Siswa',
      path: '/admin/hasil-kuis',
      icon: 'fact_check',
      description: 'Nilai asesmen kompetensi & pemahaman siswa',
    },
    {
      label: 'Kelola Bank Soal',
      path: '/admin/kelola-kuis',
      icon: 'quiz',
      description: 'Manajemen soal pilihan ganda & kunci jawaban',
    },
    {
      label: 'Kelola Modul & Kursus',
      path: '/admin/kelola-modul',
      icon: 'video_library',
      description: 'Video embed, artikel panduan, dan cheatsheet',
    },
  ];

  let isMobileMenuOpen = $state(false);

  function toggleMobileMenu(): void {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu(): void {
    isMobileMenuOpen = false;
  }

  $effect(() => {
    if (typeof document !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  });
</script>

<!-- 1. Permanent Desktop Sidebar (Hidden on mobile, flex on lg) -->
<aside
  class="hidden h-screen w-64 shrink-0 flex-col border-r border-border-subtle bg-surface text-content lg:flex xl:w-72 sticky top-0"
  aria-label="Panel Navigasi Admin Kursus"
>
  <!-- Brand Header -->
  <div class="border-b border-border-subtle p-5 shrink-0">
    <BrandLogo size="medium" title="EduKomputer" subtitle="PANEL MANAJEMEN KURSUS" />
  </div>

  <!-- Admin Profile Card -->
  <div class="p-4 border-b border-border-subtle bg-surface-subtle/50 shrink-0">
    <div class="p-3 rounded-xl bg-surface border border-border-subtle flex items-center justify-between shadow-2xs">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="w-8 h-8 rounded-lg bg-accent text-canvas font-black flex items-center justify-center shrink-0 text-xs">
          {userFullName.substring(0, 2).toUpperCase()}
        </div>
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-bold text-content-heading truncate max-w-32">{userFullName}</span>
          <span class="text-[10px] text-content-muted">Pengelola Kursus EduKomputer</span>
        </div>
      </div>
      <StatusBadge badgeTone="amber" textLabel="ADMIN" />
    </div>
  </div>

  <!-- Navigation Menu -->
  <nav class="flex-1 space-y-1 overflow-y-auto p-4">
    <div class="px-2 pb-2 text-[11px] font-bold tracking-wider text-content-muted uppercase">
      Menu Manajemen Kursus
    </div>
    {#each navigationMenuItems as navItem (navItem.path)}
      {@const isCurrentActive =
        currentPathname === navItem.path ||
        (navItem.path !== '/admin/dashboard' && currentPathname.startsWith(navItem.path))}
      <a
        href={navItem.path}
        class="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all {isCurrentActive
          ? 'border border-accent-border bg-accent-subtle font-bold text-accent shadow-2xs'
          : 'text-content hover:bg-surface-hover hover:text-content-heading'}"
      >
        <div
          class="rounded-lg p-1.5 {isCurrentActive
            ? 'bg-accent text-canvas'
            : 'bg-surface-subtle text-content-muted group-hover:bg-accent-subtle group-hover:text-accent'} shrink-0 transition-colors"
        >
          <IconSymbol name={navItem.icon} sizeInPixels={18} />
        </div>
        <span class="truncate">{navItem.label}</span>
      </a>
    {/each}
  </nav>

  <!-- Bottom Actions -->
  <div class="space-y-2 border-t border-border-subtle bg-surface-subtle/70 p-4 shrink-0 mt-auto">
    <a
      href="/"
      class="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-3 py-2 text-xs font-semibold text-content hover:bg-surface-hover hover:text-content-heading transition-colors"
    >
      <IconSymbol name="arrow_back" sizeInPixels={16} />
      <span>Kembali ke Web Publik</span>
    </a>

    <form method="POST" action="/auth/logout">
      <ActionButton
        buttonType="submit"
        variantStyle="danger"
        sizeScale="small"
        leadingIcon="logout"
        customClass="w-full font-bold justify-center"
      >
        Keluar Sesi Admin
      </ActionButton>
    </form>
  </div>
</aside>

<!-- 2. Mobile Admin Topbar Header -->
<header
  class="sticky top-0 z-50 flex items-center justify-between border-b border-border-subtle bg-surface/95 px-4 py-3 backdrop-blur-md lg:hidden"
>
  <BrandLogo size="small" title="EduKomputer" subtitle="PANEL ADMIN" />
  <button
    type="button"
    onclick={toggleMobileMenu}
    class="flex cursor-pointer items-center justify-center rounded-xl border border-border-subtle bg-surface-subtle p-2 text-content hover:bg-surface-hover hover:text-content-heading transition-colors"
    aria-label={isMobileMenuOpen ? 'Tutup navigasi admin' : 'Buka navigasi admin'}
  >
    <IconSymbol name={isMobileMenuOpen ? 'close' : 'menu'} sizeInPixels={22} />
  </button>
</header>

<!-- 3. Mobile Admin Drawer Menu -->
{#if isMobileMenuOpen}
  <div
    class="fixed inset-x-0 top-[57px] bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-surface p-4 lg:hidden"
    transition:fade={{ duration: 150 }}
  >
    <div class="space-y-2">
      <div class="p-3 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-between mb-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-accent text-canvas font-black flex items-center justify-center text-xs">
            {userFullName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div class="text-xs font-bold text-content-heading">{userFullName}</div>
            <div class="text-[10px] text-content-muted">Pengelola Kursus EduKomputer</div>
          </div>
        </div>
        <StatusBadge badgeTone="amber" textLabel="ADMIN" />
      </div>

      <div class="px-2 pb-1 text-[11px] font-bold tracking-wider text-content-muted uppercase">
        Menu Kontrol Kursus
      </div>

      {#each navigationMenuItems as navItem (navItem.path)}
        {@const isCurrentActive =
          currentPathname === navItem.path ||
          (navItem.path !== '/admin/dashboard' && currentPathname.startsWith(navItem.path))}
        <a
          href={navItem.path}
          onclick={closeMobileMenu}
          class="flex items-center gap-3 rounded-xl p-3 transition-all {isCurrentActive
            ? 'border border-accent-border bg-accent-subtle font-bold text-accent shadow-xs'
            : 'border border-transparent text-content hover:bg-surface-hover hover:text-content-heading'}"
        >
          <div
            class="rounded-lg p-2 {isCurrentActive
              ? 'bg-accent text-canvas'
              : 'bg-surface-subtle text-content-muted'} shrink-0"
          >
            <IconSymbol name={navItem.icon} sizeInPixels={20} />
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-bold text-content-heading">{navItem.label}</div>
            <div class="text-[10px] text-content-muted truncate">{navItem.description}</div>
          </div>
        </a>
      {/each}
    </div>

    <div class="mt-auto space-y-2 border-t border-border-subtle pt-4">
      <a
        href="/"
        onclick={closeMobileMenu}
        class="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-subtle p-2.5 text-xs font-semibold text-content"
      >
        <IconSymbol name="arrow_back" sizeInPixels={16} />
        <span>Kembali ke Web Publik</span>
      </a>

      <form method="POST" action="/auth/logout">
        <ActionButton
          buttonType="submit"
          variantStyle="danger"
          sizeScale="medium"
          leadingIcon="logout"
          customClass="w-full font-bold justify-center"
        >
          Keluar Sesi Admin
        </ActionButton>
      </form>
    </div>
  </div>
{/if}
