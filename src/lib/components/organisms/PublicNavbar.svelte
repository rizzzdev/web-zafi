<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import BrandLogo from '../molecules/BrandLogo.svelte';
  import ActionButton from '../atoms/ActionButton.svelte';
  import { fade, slide } from 'svelte/transition';

  interface PublicNavbarProperties {
    activePath?: string;
  }

  const { activePath = '/' }: PublicNavbarProperties = $props();

  let isMobileMenuOpen = $state(false);

  const navigationItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Katalog Modul', path: '/modul' },
    { label: 'Kuis Evaluasi', path: '/kuis' },
    { label: 'Ulasan Siswa', path: '/testimoni' },
  ];

  function toggleMobileMenu(): void {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu(): void {
    isMobileMenuOpen = false;
  }
</script>

<!-- Modern SaaS Sticky Glassmorphism Top Navigation Bar -->
<header
  class="sticky top-0 z-50 w-full border-b border-border-subtle bg-canvas/85 backdrop-blur-xl transition-all"
>
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <!-- Left: Brand Logo & Product Badge -->
    <div class="flex items-center gap-3">
      <BrandLogo size="medium" />
      <span
        class="hidden sm:inline-flex items-center gap-1 rounded-full border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-[10px] font-bold text-accent tracking-wider uppercase"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
        <span>Kursus Komputer Pro</span>
      </span>
    </div>

    <!-- Center: Desktop Navigation Links -->
    <nav class="hidden md:flex items-center gap-1 bg-surface-subtle/60 p-1.5 rounded-2xl border border-border-subtle">
      {#each navigationItems as item (item.path)}
        {@const isActive =
          activePath === item.path || (item.path !== '/' && activePath.startsWith(item.path))}
        <a
          href={item.path}
          class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all {isActive
            ? 'bg-surface text-accent font-bold shadow-xs border border-border-subtle'
            : 'text-content hover:text-content-heading hover:bg-surface/50'}"
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- Right: Actions & Researcher Portal -->
    <div class="hidden md:flex items-center gap-3">
      <a
        href="/auth/login"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-content-muted hover:text-content-heading hover:bg-surface rounded-xl transition-colors"
      >
        <IconSymbol name="admin_panel_settings" sizeInPixels={16} customClass="text-accent" />
        <span>Masuk Admin</span>
      </a>

      <a href="/modul/input">
        <ActionButton
          variantStyle="primary"
          sizeScale="small"
          trailingIcon="arrow_forward"
          customClass="font-bold shadow-xs"
        >
          Mulai Belajar
        </ActionButton>
      </a>
    </div>

    <!-- Mobile Hamburger Toggle Button -->
    <div class="flex md:hidden items-center gap-2">
      <a href="/modul/input" class="sm:hidden">
        <ActionButton variantStyle="primary" sizeScale="small">
          Mulai
        </ActionButton>
      </a>

      <button
        type="button"
        onclick={toggleMobileMenu}
        class="flex cursor-pointer items-center justify-center rounded-xl border border-border-subtle bg-surface p-2 text-content hover:text-content-heading transition-colors"
        aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
      >
        <IconSymbol name={isMobileMenuOpen ? 'close' : 'menu'} sizeInPixels={20} />
      </button>
    </div>
  </div>

  <!-- Mobile Dropdown Drawer -->
  {#if isMobileMenuOpen}
    <div
      class="border-b border-border-subtle bg-surface/95 backdrop-blur-xl px-4 py-5 md:hidden space-y-4"
      transition:slide={{ duration: 200 }}
    >
      <nav class="space-y-1">
        {#each navigationItems as item (item.path)}
          {@const isActive =
            activePath === item.path || (item.path !== '/' && activePath.startsWith(item.path))}
          <a
            href={item.path}
            onclick={closeMobileMenu}
            class="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all {isActive
              ? 'bg-accent-subtle text-accent border border-accent-border font-bold'
              : 'text-content hover:bg-surface-hover hover:text-content-heading'}"
          >
            <span>{item.label}</span>
            <IconSymbol name="chevron_right" sizeInPixels={16} customClass="text-content-muted" />
          </a>
        {/each}
      </nav>

      <div class="pt-3 border-t border-border-subtle flex flex-col gap-2">
        <a
          href="/auth/login"
          onclick={closeMobileMenu}
          class="flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-subtle py-2.5 text-xs font-semibold text-content"
        >
          <IconSymbol name="admin_panel_settings" sizeInPixels={16} customClass="text-accent" />
          <span>Masuk Admin & Instruktur</span>
        </a>

        <a href="/modul/input" onclick={closeMobileMenu}>
          <ActionButton
            variantStyle="primary"
            sizeScale="medium"
            trailingIcon="arrow_forward"
            customClass="w-full justify-center font-bold"
          >
            Mulai Belajar Sekarang (Gratis)
          </ActionButton>
        </a>
      </div>
    </div>
  {/if}
</header>
