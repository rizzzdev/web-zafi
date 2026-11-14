<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '../atoms/Button.svelte';
  import Input from '../atoms/Input.svelte';
  import Textarea from '../atoms/Textarea.svelte';
  import FormField from '../molecules/FormField.svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { LearningModule } from '$lib/db';

  interface ModuleEditorModalProperties {
    readonly moduleData: LearningModule;
    readonly isOpen: boolean;
    readonly onClose: () => void;
  }

  const { moduleData, isOpen, onClose }: ModuleEditorModalProperties = $props();

  let previewVideoUrl = $state('');
  let isSubmittingForm = $state(false);

  $effect(() => {
    if (moduleData?.videoUrl) {
      previewVideoUrl = moduleData.videoUrl;
    }
  });
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
    <div class="w-full max-w-xl card-base overflow-hidden my-4 sm:my-6 text-content shadow-xl">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-3.5 sm:p-4 border-b border-border-subtle bg-surface-subtle">
        <div class="flex items-center gap-2">
          <div class="icon-box">
            <Icon name="edit_note" size="sm" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-content-heading">Edit Konten Modul Pembelajaran</h3>
            <span class="text-xs text-content-muted font-mono">{moduleData.code} — {moduleData.category}</span>
          </div>
        </div>
        <button
          type="button"
          onclick={onClose}
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-content-muted hover:text-content-heading hover:bg-surface flex items-center justify-center transition-colors"
          aria-label="Tutup Modal"
        >
          <Icon name="close" size="sm" />
        </button>
      </div>

      <!-- Form Body with enhance & double-submit protection -->
      <form
        method="POST"
        action="?/updateModule"
        use:enhance={() => {
          isSubmittingForm = true;
          return async ({ update }) => {
            await update();
            isSubmittingForm = false;
            onClose();
          };
        }}
        class="p-3.5 sm:p-5 flex flex-col gap-3.5 overflow-y-auto"
      >
        <input type="hidden" name="moduleId" value={moduleData.id} />

        <FormField labelText="Judul Modul" inputId="title" isRequired>
          <Input id="title" name="title" value={moduleData.title} required />
        </FormField>

        <FormField
          labelText="URL Video Embed (YouTube / Drive)"
          inputId="videoUrl"
          isRequired
          helperText="Gunakan tautan embed, contoh: https://www.youtube.com/embed/..."
        >
          <Input
            id="videoUrl"
            name="videoUrl"
            bind:value={previewVideoUrl}
            required
          />
        </FormField>

        <!-- Live Preview Iframe Box -->
        {#if previewVideoUrl}
          <div class="rounded-xl border border-border-subtle bg-canvas p-2 overflow-hidden">
            <span class="text-xs font-semibold text-content-muted block mb-1">Pratinjau Langsung (Live Preview):</span>
            <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={previewVideoUrl}
                title="Pratinjau Video"
                class="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        {/if}

        <FormField labelText="Rangkuman Materi (Cheatsheet Markdown)" inputId="summaryContent" isRequired>
          <Textarea
            id="summaryContent"
            name="summaryContent"
            value={moduleData.summaryContent}
            rows={5}
            required
          />
        </FormField>

        <div class="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            value="true"
            checked={moduleData.isPublished}
            class="w-4 h-4 rounded border-border-subtle bg-surface-subtle text-accent focus:ring-accent"
          />
          <label for="isPublished" class="text-xs sm:text-sm font-semibold text-content">
            Publikasikan modul ini ke halaman mahasiswa
          </label>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-2.5 pt-3.5 border-t border-border-subtle">
          <Button type="button" variant="outline" size="sm" onclick={onClose} disabled={isSubmittingForm}>
            Batal
          </Button>
          <Button type="submit" variant="primary" size="sm" isSubmitting={isSubmittingForm} iconName="save">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  </div>
{/if}
