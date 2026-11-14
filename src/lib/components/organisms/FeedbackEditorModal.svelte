<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '../atoms/Button.svelte';
  import Input from '../atoms/Input.svelte';
  import Textarea from '../atoms/Textarea.svelte';
  import FormField from '../molecules/FormField.svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { StudentFeedback } from '$lib/db';

  interface FeedbackEditorModalProperties {
    readonly feedbackData?: StudentFeedback | null;
    readonly isOpen: boolean;
    readonly onClose: () => void;
  }

  const { feedbackData = null, isOpen, onClose }: FeedbackEditorModalProperties = $props();

  let studentFullName = $state('');
  let studentIdentifier = $state('');
  let classBatch = $state('');
  let ratingDesign = $state(5);
  let ratingContent = $state(5);
  let ratingUsability = $state(5);
  let comments = $state('');
  let isSubmittingForm = $state(false);

  const isEditMode = $derived(feedbackData !== null);

  $effect(() => {
    if (feedbackData) {
      studentFullName = feedbackData.studentName;
      studentIdentifier = feedbackData.studentIdentifier;
      classBatch = feedbackData.classBatch || 'PTIK 2023';
      ratingDesign = feedbackData.ratingDesign;
      ratingContent = feedbackData.ratingContent;
      ratingUsability = feedbackData.ratingUsability;
      comments = feedbackData.comments;
    } else {
      studentFullName = '';
      studentIdentifier = '';
      classBatch = 'PTIK 2023 A';
      ratingDesign = 5;
      ratingContent = 5;
      ratingUsability = 5;
      comments = '';
    }
  });

  const ratingOptionsList = [1, 2, 3, 4, 5];
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
    <div class="w-full max-w-lg card-base overflow-hidden my-4 sm:my-6 text-content shadow-xl">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-3.5 sm:p-4 border-b border-border-subtle bg-surface-subtle">
        <div class="flex items-center gap-2">
          <div class="icon-box">
            <Icon name={isEditMode ? 'edit_note' : 'add_circle'} size="sm" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-content-heading">
              {isEditMode ? 'Edit Data Ulasan Siswa' : 'Tambah Ulasan Siswa Manual'}
            </h3>
            <span class="text-xs text-content-muted font-mono">
              {isEditMode ? `ID: ${feedbackData?.id}` : 'Input Ulasan Siswa Baru'}
            </span>
          </div>
        </div>
        <button
          type="button"
          onclick={onClose}
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-content-muted hover:text-content-heading hover:bg-surface flex items-center justify-center transition-colors"
          aria-label="Tutup Dialog"
        >
          <Icon name="close" size="sm" />
        </button>
      </div>

      <!-- Form Body with double-submit protection -->
      <form
        method="POST"
        action={isEditMode ? '?/updateFeedback' : '?/createFeedback'}
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
        {#if isEditMode}
          <input type="hidden" name="feedbackId" value={feedbackData?.id} />
        {/if}

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField labelText="Nama Lengkap Mahasiswa" inputId="studentFullName" isRequired>
            <Input
              id="studentFullName"
              name="studentFullName"
              bind:value={studentFullName}
              placeholder="Contoh: Budi Santoso"
              required
            />
          </FormField>

          <FormField labelText="NIM Mahasiswa" inputId="studentIdentifier" isRequired>
            <Input
              id="studentIdentifier"
              name="studentIdentifier"
              bind:value={studentIdentifier}
              placeholder="Contoh: 23050974001"
              required
            />
          </FormField>
        </div>

        <FormField labelText="Kelas / Angkatan" inputId="classBatch">
          <Input
            id="classBatch"
            name="classBatch"
            bind:value={classBatch}
            placeholder="Contoh: PTIK 2023 A"
          />
        </FormField>

        <!-- Rating Aspek Desain -->
        <div>
          <label class="block text-xs font-semibold text-content mb-1.5" for="ratingDesign">
            Aspek 1: Tampilan & Desain Visual (1-5)
          </label>
          <div class="flex items-center gap-1.5 sm:gap-2">
            {#each ratingOptionsList as ratingValue (ratingValue)}
              <button
                type="button"
                onclick={() => (ratingDesign = ratingValue)}
                class="flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold border transition-all {ratingDesign === ratingValue
                  ? 'btn-primary-custom shadow-xs'
                  : 'btn-secondary-custom'}"
              >
                ★ {ratingValue}
              </button>
            {/each}
          </div>
          <input type="hidden" name="ratingDesign" value={ratingDesign} />
        </div>

        <!-- Rating Aspek Materi -->
        <div>
          <label class="block text-xs font-semibold text-content mb-1.5" for="ratingContent">
            Aspek 2: Kualitas & Kejelasan Materi (1-5)
          </label>
          <div class="flex items-center gap-1.5 sm:gap-2">
            {#each ratingOptionsList as ratingValue (ratingValue)}
              <button
                type="button"
                onclick={() => (ratingContent = ratingValue)}
                class="flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold border transition-all {ratingContent === ratingValue
                  ? 'btn-primary-custom shadow-xs'
                  : 'btn-secondary-custom'}"
              >
                ★ {ratingValue}
              </button>
            {/each}
          </div>
          <input type="hidden" name="ratingContent" value={ratingContent} />
        </div>

        <!-- Rating Aspek Usability -->
        <div>
          <label class="block text-xs font-semibold text-content mb-1.5" for="ratingUsability">
            Aspek 3: Kemudahan Penggunaan / Usability (1-5)
          </label>
          <div class="flex items-center gap-1.5 sm:gap-2">
            {#each ratingOptionsList as ratingValue (ratingValue)}
              <button
                type="button"
                onclick={() => (ratingUsability = ratingValue)}
                class="flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold border transition-all {ratingUsability === ratingValue
                  ? 'btn-primary-custom shadow-xs'
                  : 'btn-secondary-custom'}"
              >
                ★ {ratingValue}
              </button>
            {/each}
          </div>
          <input type="hidden" name="ratingUsability" value={ratingUsability} />
        </div>

        <FormField labelText="Testimoni / Kritik & Saran Kualitatif" inputId="comments" isRequired>
          <Textarea
            id="comments"
            name="comments"
            bind:value={comments}
            rows={3}
            placeholder="Tuliskan testimoni atau masukan kepraktisan media pembelajaran..."
            required
          />
        </FormField>

        <!-- Footer Actions -->
        <div class="flex items-center justify-end gap-2.5 pt-3.5 border-t border-border-subtle mt-1">
          <Button type="button" variant="outline" size="sm" onclick={onClose}>
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isSubmitting={isSubmittingForm}
            iconName="save"
          >
            {isEditMode ? 'Simpan' : 'Tambah'}
          </Button>
        </div>
      </form>
    </div>
  </div>
{/if}
