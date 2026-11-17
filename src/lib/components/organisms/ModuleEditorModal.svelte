<script lang="ts">
  import { enhance } from '$app/forms';
  import {
    ActionButton,
    TextInput,
    TextArea,
    SelectInput,
    IconSymbol,
  } from '$lib/components';
  import type { LearningModule } from '$lib/modules/learning-module';

  interface ModuleEditorModalProperties {
    readonly moduleData?: LearningModule | null;
    readonly isOpen: boolean;
    readonly onClose: () => void;
  }

  const { moduleData = null, isOpen, onClose }: ModuleEditorModalProperties = $props();

  const isEditMode = $derived(moduleData !== null);

  let codeInput = $state('');
  let titleInput = $state('');
  let slugInput = $state('');
  let categoryInput = $state<string>('INPUT');
  let orderIndexInput = $state(1);
  let durationInMinutesInput = $state(5);
  let videoUrlInput = $state('');
  let summaryContentInput = $state('');
  let isPublishedInput = $state(true);

  let isSubmittingForm = $state(false);
  let showVideoPreview = $state(true);

  const categoryOptions = [
    { label: 'Tahap 1: Input Devices (Masukan)', value: 'INPUT' },
    { label: 'Tahap 2: Processing Unit (Pemrosesan CPU)', value: 'PROCESS' },
    { label: 'Tahap 3: Output Devices (Keluaran)', value: 'OUTPUT' },
    { label: 'Tahap 4: Storage & Software (Penyimpanan & Lunak)', value: 'STORAGE_SOFTWARE' },
  ];

  $effect(() => {
    if (moduleData) {
      codeInput = moduleData.code;
      titleInput = moduleData.title;
      slugInput = moduleData.slug;
      categoryInput = moduleData.category;
      orderIndexInput = moduleData.orderIndex;
      durationInMinutesInput = moduleData.durationInMinutes;
      videoUrlInput = moduleData.videoUrl;
      summaryContentInput = moduleData.summaryContent;
      isPublishedInput = moduleData.isPublished;
    } else {
      codeInput = '';
      titleInput = '';
      slugInput = '';
      categoryInput = 'INPUT';
      orderIndexInput = 5;
      durationInMinutesInput = 5;
      videoUrlInput = '';
      summaryContentInput = '';
      isPublishedInput = true;
    }
  });

  function handleAutoGenerateSlug(newTitle: string): void {
    if (!isEditMode && (!slugInput || slugInput.trim() === '')) {
      slugInput = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs transition-opacity"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-border-subtle bg-surface text-content shadow-2xl overflow-hidden duration-150 animate-in fade-in zoom-in-95"
    >
      <!-- Fixed Sticky Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-border-subtle bg-surface-subtle shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
            <IconSymbol name={isEditMode ? 'edit_note' : 'add_circle'} sizeInPixels={22} />
          </div>
          <div>
            <h3 class="text-base font-bold text-content-heading">
              {isEditMode ? 'Edit Konten Modul Pembelajaran' : 'Tambah Modul Pembelajaran Baru'}
            </h3>
            <p class="text-xs text-content-muted">
              {isEditMode ? `${moduleData?.code} — ${moduleData?.category}` : 'Daftarkan materi pembelajaran arsitektur komputer baru'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onclick={onClose}
          class="cursor-pointer rounded-lg p-1.5 text-content-muted hover:text-content-heading hover:bg-surface-hover transition-colors"
          aria-label="Tutup Dialog"
        >
          <IconSymbol name="close" sizeInPixels={20} />
        </button>
      </div>

      <!-- Form Body & Footer wrapper -->
      <form
        method="POST"
        action={isEditMode ? '?/updateModule' : '?/createModule'}
        use:enhance={() => {
          isSubmittingForm = true;
          return async ({ update }) => {
            await update();
            isSubmittingForm = false;
            onClose();
          };
        }}
        class="flex flex-col flex-1 overflow-hidden"
      >
        <!-- Scrollable Form Content -->
        <div class="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
          {#if isEditMode}
            <input type="hidden" name="moduleId" value={moduleData?.id} />
          {/if}

          <!-- Mode Spesifik Header Info -->
          {#if isEditMode}
            <div class="flex items-center gap-2 p-3 rounded-xl border border-border-subtle bg-surface-subtle text-xs text-content-muted">
              <span class="font-bold font-mono text-accent bg-surface px-2 py-0.5 rounded border border-border-subtle">
                {codeInput}
              </span>
              <span class="font-semibold text-content-heading">Kategori: {categoryInput}</span>
              <span class="ml-auto font-mono">Urutan: #{orderIndexInput}</span>
            </div>
          {:else}
            <!-- Metadata Modul Baru -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label for="moduleCode" class="block text-xs font-bold text-content-heading mb-1.5">
                  Kode Modul <span class="text-status-error">*</span>
                </label>
                <TextInput
                  identifier="moduleCode"
                  inputName="code"
                  bind:inputValue={codeInput}
                  placeholderText="MOD-05"
                  isRequired={true}
                />
              </div>

              <div class="sm:col-span-2">
                <label for="moduleCategory" class="block text-xs font-bold text-content-heading mb-1.5">
                  Kategori Alur IPO <span class="text-status-error">*</span>
                </label>
                <SelectInput
                  identifier="moduleCategory"
                  selectName="category"
                  bind:selectedValue={categoryInput}
                  optionsList={categoryOptions}
                  isRequired={true}
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="moduleOrderIndex" class="block text-xs font-bold text-content-heading mb-1.5">
                  Nomor Urut Tampil <span class="text-status-error">*</span>
                </label>
                <TextInput
                  identifier="moduleOrderIndex"
                  inputName="orderIndex"
                  inputType="number"
                  bind:inputValue={orderIndexInput}
                  placeholderText="5"
                  isRequired={true}
                />
              </div>
              <div>
                <label for="moduleDuration" class="block text-xs font-bold text-content-heading mb-1.5">
                  Estimasi Durasi (Menit) <span class="text-status-error">*</span>
                </label>
                <TextInput
                  identifier="moduleDuration"
                  inputName="durationInMinutes"
                  inputType="number"
                  bind:inputValue={durationInMinutesInput}
                  placeholderText="5"
                  isRequired={true}
                />
              </div>
            </div>
          {/if}

          <!-- Judul Modul -->
          <div>
            <label for="moduleTitle" class="block text-xs font-bold text-content-heading mb-1.5">
              Judul Modul Pembelajaran <span class="text-status-error">*</span>
            </label>
            <TextInput
              identifier="moduleTitle"
              inputName="title"
              bind:inputValue={titleInput}
              onInputEvent={(event) => {
                const target = event.target as HTMLInputElement;
                handleAutoGenerateSlug(target.value);
              }}
              placeholderText="Contoh: Arsitektur Bus & Interkoneksi Sistem"
              isRequired={true}
            />
          </div>

          {#if !isEditMode}
            <!-- Slug URL Modul Baru -->
            <div>
              <label for="moduleSlug" class="block text-xs font-bold text-content-heading mb-1.5">
                Slug URL (Akses Halaman Mahasiswa: /modul/[slug]) <span class="text-status-error">*</span>
              </label>
              <TextInput
                identifier="moduleSlug"
                inputName="slug"
                bind:inputValue={slugInput}
                placeholderText="arsitektur-bus"
                isRequired={true}
              />
            </div>
          {/if}

          <!-- URL Video Embed -->
          <div>
            <label for="moduleVideoUrl" class="block text-xs font-bold text-content-heading mb-1.5">
              URL Video Embed (YouTube / Google Drive) <span class="text-status-error">*</span>
            </label>
            <TextInput
              identifier="moduleVideoUrl"
              inputName="videoUrl"
              inputType="url"
              bind:inputValue={videoUrlInput}
              placeholderText="https://www.youtube.com/embed/..."
              isRequired={true}
            />
            <p class="text-[11px] text-content-muted mt-1">
              Gunakan format embed, contoh: <code class="font-mono text-accent">https://www.youtube.com/embed/VIDEO_ID</code>
            </p>
          </div>

          <!-- Live Video Preview (Collapsible & Compact) -->
          {#if videoUrlInput && videoUrlInput.trim().length > 0}
            <div class="rounded-xl border border-border-subtle bg-surface-subtle p-3 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-content-heading flex items-center gap-1.5">
                  <IconSymbol name="smart_display" sizeInPixels={16} />
                  Pratinjau Video (Live Preview)
                </span>
                <button
                  type="button"
                  class="cursor-pointer text-xs text-accent hover:text-accent-hover font-semibold transition-colors flex items-center gap-1"
                  onclick={() => {
                    showVideoPreview = !showVideoPreview;
                  }}
                >
                  <span>{showVideoPreview ? 'Sembunyikan' : 'Tampilkan'}</span>
                  <IconSymbol name={showVideoPreview ? 'expand_less' : 'expand_more'} sizeInPixels={16} />
                </button>
              </div>

              {#if showVideoPreview}
                <div class="relative w-full aspect-video max-h-52 rounded-lg overflow-hidden bg-black mx-auto">
                  <iframe
                    src={videoUrlInput}
                    title="Pratinjau Video Modul"
                    class="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              {/if}
            </div>
          {/if}

          <!-- Textarea Rangkuman Cheatsheet Markdown -->
          <div>
            <label for="moduleSummaryContent" class="block text-xs font-bold text-content-heading mb-1.5">
              Rangkuman Materi (Cheatsheet Markdown) <span class="text-status-error">*</span>
            </label>
            <TextArea
              identifier="moduleSummaryContent"
              inputName="summaryContent"
              bind:inputValue={summaryContentInput}
              rowsCount={8}
              placeholderText="# Judul Rangkuman&#10;&#10;Tuliskan ringkasan materi menggunakan format Markdown..."
              isRequired={true}
            />
            <p class="text-[11px] text-content-muted mt-1">
              Mendukung format Markdown: heading (#), tebal (**), list (-), dan tabel.
            </p>
          </div>

          <!-- Publikasi Checkbox -->
          <div class="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isPublishedInput"
              name="isPublished"
              value="true"
              bind:checked={isPublishedInput}
              class="w-4 h-4 rounded border-border-subtle bg-surface-subtle text-accent focus:ring-accent cursor-pointer"
            />
            <label for="isPublishedInput" class="text-xs sm:text-sm font-semibold text-content cursor-pointer">
              Publikasikan modul ini agar dapat diakses mahasiswa
            </label>
          </div>
        </div>

        <!-- Fixed Sticky Footer -->
        <div class="flex items-center justify-end gap-3 px-5 py-4 border-t border-border-subtle bg-surface-subtle shrink-0">
          <ActionButton
            buttonType="button"
            variantStyle="outline"
            sizeScale="medium"
            onClickHandler={onClose}
            isDisabled={isSubmittingForm}
          >
            Batal
          </ActionButton>
          <ActionButton
            buttonType="submit"
            variantStyle="primary"
            sizeScale="medium"
            leadingIcon={isEditMode ? 'save' : 'add'}
            customClass="font-bold"
            isDisabled={isSubmittingForm}
            isLoading={isSubmittingForm}
            loadingText={isEditMode ? 'Menyimpan...' : 'Menambahkan...'}
          >
            {isEditMode ? 'Simpan Perubahan' : 'Tambahkan Modul'}
          </ActionButton>
        </div>
      </form>
    </div>
  </div>
{/if}
