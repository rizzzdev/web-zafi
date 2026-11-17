<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  import {
    Button,
    Badge,
    Alert,
    Icon,
    ModuleEditorModal,
    MarkdownRenderer,
    AdminHeader,
    ActionButton,
    IconSymbol,
  } from '$lib/components';
  import { IPO_THEME_MAP, type IPOModuleCategoryKey } from '$lib/utils/theme';
  import type { LearningModule } from '$lib/db';

  interface PageProps {
    readonly data: PageData;
    readonly form: ActionData;
  }

  const { data, form }: PageProps = $props();

  let activeEditingModule = $state<LearningModule | null>(null);
  let isModalOpen = $state(false);
  let deletingModuleId = $state<string | null>(null);

  function handleOpenCreateModal(): void {
    activeEditingModule = null;
    isModalOpen = true;
  }

  function handleOpenEditModal(targetModule: LearningModule): void {
    activeEditingModule = targetModule;
    isModalOpen = true;
  }

  function handleCloseModal(): void {
    isModalOpen = false;
    activeEditingModule = null;
  }
</script>

<AdminHeader
  pageTitle="Manajemen Modul Pembelajaran"
  pageSubtitle="Kelola judul materi, tautan video pembelajaran YouTube embed, rangkuman cheatsheet, dan visibilitas publik"
/>

<div class="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8">
  <!-- Header Title & Action Button -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h2 class="text-base sm:text-lg font-bold text-content-heading">
        Katalog & Manajemen Modul Kursus ({data.allModules.length} Modul)
      </h2>
      <p class="text-xs text-content-muted">
        Kelola materi pembelajaran, tautan video, cheatsheet rangkuman, dan status publikasi modul kursus
      </p>
    </div>

    <div class="flex items-center gap-2.5 self-start sm:self-auto">
      <ActionButton
        buttonType="button"
        variantStyle="primary"
        sizeScale="small"
        leadingIcon="add"
        onClickHandler={handleOpenCreateModal}
      >
        Tambah Modul Baru
      </ActionButton>
    </div>
  </div>

  {#if form?.message}
    <Alert variant="success" title="Operasi Berhasil" message={form.message} />
  {/if}

  {#if form?.errorMessage}
    <Alert variant="danger" title="Kesalahan Operasi" message={form.errorMessage} />
  {/if}

  <!-- Module Cards Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
    {#each data.allModules as moduleItem (moduleItem.id)}
      {@const themeConfig = IPO_THEME_MAP[moduleItem.category as IPOModuleCategoryKey] ?? IPO_THEME_MAP.INPUT}
      <div class="card-interactive p-4 sm:p-5 flex flex-col justify-between text-content shadow-xs">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold text-accent bg-surface-subtle px-2 py-0.5 rounded border border-border-subtle">{moduleItem.code}</span>
              <Badge variant="default">
                {themeConfig.label}
              </Badge>
            </div>

            <div class="flex items-center gap-2">
              {#if moduleItem.isPublished}
                <span class="badge-success text-xs font-bold">
                  <Icon name="check" size="sm" /> Publik
                </span>
              {:else}
                <span class="badge-default text-xs font-bold">
                  Draft
                </span>
              {/if}
            </div>
          </div>

          <h3 class="text-sm sm:text-base font-bold text-content-heading mb-1.5">
            {moduleItem.title}
          </h3>

          <div class="text-xs text-content-muted mb-2.5 flex items-center gap-1.5 font-mono truncate">
            <Icon name="link" size="sm" classNames="shrink-0 text-accent" />
            <span class="truncate">{moduleItem.videoUrl}</span>
          </div>

          <div class="text-xs text-content line-clamp-3 leading-relaxed mb-4 overflow-hidden">
            <MarkdownRenderer
              content={moduleItem.summaryContent}
              isCardPreview={true}
            />
          </div>
        </div>

        <div class="pt-3 border-t border-border-subtle flex items-center justify-between gap-2">
          <a
            href="/modul/{moduleItem.slug}"
            target="_blank"
            class="text-xs font-bold text-content hover:text-accent flex items-center gap-1 transition-colors"
          >
            <Icon name="open_in_new" size="sm" />
            Lihat Halaman
          </a>

          <div class="flex items-center gap-2">
            <form
              method="POST"
              action="?/deleteModule"
              use:enhance={({ cancel }) => {
                const confirmed = confirm(`Apakah Anda yakin ingin menghapus modul "${moduleItem.title}"?`);
                if (!confirmed) {
                  cancel();
                  return;
                }
                deletingModuleId = moduleItem.id;
                return async ({ update }) => {
                  await update();
                  deletingModuleId = null;
                };
              }}
            >
              <input type="hidden" name="moduleId" value={moduleItem.id} />
              <button
                type="submit"
                class="cursor-pointer p-1.5 text-content-muted hover:text-status-error hover:bg-surface rounded-lg transition-colors"
                title="Hapus Modul"
                aria-label="Hapus Modul"
                disabled={deletingModuleId === moduleItem.id}
              >
                <IconSymbol name="delete" sizeInPixels={18} />
              </button>
            </form>

            <ActionButton
              buttonType="button"
              variantStyle="outline"
              sizeScale="small"
              leadingIcon="edit"
              onclick={() => handleOpenEditModal(moduleItem)}
            >
              Edit Modul
            </ActionButton>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if isModalOpen}
  <ModuleEditorModal
    moduleData={activeEditingModule}
    isOpen={isModalOpen}
    onClose={handleCloseModal}
  />
{/if}
