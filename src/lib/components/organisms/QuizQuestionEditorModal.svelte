<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '../atoms/Button.svelte';
  import Input from '../atoms/Input.svelte';
  import Textarea from '../atoms/Textarea.svelte';
  import FormField from '../molecules/FormField.svelte';
  import Icon from '../atoms/Icon.svelte';
  import type { QuizQuestionWithOptions } from '$lib/modules/quiz';

  interface OptionDraft {
    id?: string;
    optionText: string;
    isCorrect: boolean;
    orderIndex: number;
  }

  interface QuizQuestionEditorModalProperties {
    readonly questionData?: QuizQuestionWithOptions | null;
    readonly isOpen: boolean;
    readonly onClose: () => void;
  }

  const { questionData = null, isOpen, onClose }: QuizQuestionEditorModalProperties = $props();

  let questionText = $state('');
  let explanation = $state('');
  let orderIndex = $state(1);
  let isActive = $state(true);
  let optionsDraft = $state<OptionDraft[]>([
    { optionText: '', isCorrect: true, orderIndex: 1 },
    { optionText: '', isCorrect: false, orderIndex: 2 },
    { optionText: '', isCorrect: false, orderIndex: 3 },
    { optionText: '', isCorrect: false, orderIndex: 4 },
  ]);
  let isSubmittingForm = $state(false);

  const isEditMode = $derived(questionData !== null);

  $effect(() => {
    if (questionData) {
      questionText = questionData.questionText;
      explanation = questionData.explanation || '';
      orderIndex = questionData.orderIndex;
      isActive = questionData.isActive;
      if (questionData.options && questionData.options.length > 0) {
        optionsDraft = questionData.options.map((optionItem, index) => ({
          id: optionItem.id,
          optionText: optionItem.optionText,
          isCorrect: optionItem.isCorrect,
          orderIndex: optionItem.orderIndex ?? index + 1,
        }));
      } else {
        optionsDraft = [
          { optionText: '', isCorrect: true, orderIndex: 1 },
          { optionText: '', isCorrect: false, orderIndex: 2 },
          { optionText: '', isCorrect: false, orderIndex: 3 },
          { optionText: '', isCorrect: false, orderIndex: 4 },
        ];
      }
    } else {
      questionText = '';
      explanation = '';
      orderIndex = 1;
      isActive = true;
      optionsDraft = [
        { optionText: '', isCorrect: true, orderIndex: 1 },
        { optionText: '', isCorrect: false, orderIndex: 2 },
        { optionText: '', isCorrect: false, orderIndex: 3 },
        { optionText: '', isCorrect: false, orderIndex: 4 },
      ];
    }
  });

  function handleSelectCorrectOption(selectedIndex: number): void {
    optionsDraft = optionsDraft.map((optionItem, index) => ({
      ...optionItem,
      isCorrect: index === selectedIndex,
    }));
  }

  const serializedOptions = $derived(JSON.stringify(optionsDraft));
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
    <div class="w-full max-w-xl card-base overflow-hidden my-4 sm:my-6 text-content shadow-xl">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-3.5 sm:p-4 border-b border-border-subtle bg-surface-subtle">
        <div class="flex items-center gap-2">
          <div class="icon-box">
            <Icon name={isEditMode ? 'edit_note' : 'quiz'} size="sm" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-bold text-content-heading">
              {isEditMode ? 'Edit Butir Soal Kuis' : 'Tambah Butir Soal Kuis Baru'}
            </h3>
            <span class="text-xs text-content-muted font-mono">
              {isEditMode ? `ID: ${questionData?.id}` : 'Bank Soal Evaluasi Model IPO'}
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
        action={isEditMode ? '?/updateQuestion' : '?/createQuestion'}
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
          <input type="hidden" name="questionId" value={questionData?.id} />
        {/if}

        <input type="hidden" name="optionsJson" value={serializedOptions} />
        <input type="hidden" name="isActive" value={isActive ? 'true' : 'false'} />

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="sm:col-span-2">
            <FormField labelText="Nomor Urut Soal" inputId="orderIndex" isRequired>
              <Input
                id="orderIndex"
                name="orderIndex"
                type="number"
                min="1"
                bind:value={orderIndex}
                required
              />
            </FormField>
          </div>

          <div class="flex flex-col justify-center">
            <span class="text-xs font-semibold text-content mb-1">Status</span>
            <label class="inline-flex items-center gap-2 cursor-pointer mt-0.5">
              <input
                type="checkbox"
                bind:checked={isActive}
                class="w-4 h-4 rounded border-border-subtle bg-surface-subtle text-accent focus:ring-accent"
              />
              <span class="text-xs font-semibold text-content-heading">
                {isActive ? 'Aktif' : 'Draft'}
              </span>
            </label>
          </div>
        </div>

        <FormField labelText="Teks Pertanyaan Soal" inputId="questionText" isRequired>
          <Textarea
            id="questionText"
            name="questionText"
            bind:value={questionText}
            rows={3}
            placeholder="Tuliskan butir soal pilihan ganda di sini..."
            required
          />
        </FormField>

        <!-- Multiple Choice Options -->
        <div class="pt-1">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-content-heading">
              Pilihan Jawaban (Pilih salah satu sebagai kunci benar):
            </span>
          </div>

          <div class="flex flex-col gap-2">
            {#each optionsDraft as optionItem, optionIndex (optionIndex)}
              {@const labelCode = optionLabels[optionIndex] ?? String(optionIndex + 1)}
              <div
                class="flex items-center gap-2 p-2 rounded-xl border transition-colors {optionItem.isCorrect
                  ? 'bg-accent-subtle border-accent-border ring-1 ring-accent'
                  : 'bg-surface-subtle border-border-subtle'}"
              >
                <!-- Radio for selecting correct answer -->
                <button
                  type="button"
                  onclick={() => handleSelectCorrectOption(optionIndex)}
                  class="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold shrink-0 transition-colors {optionItem.isCorrect
                    ? 'btn-primary-custom shadow-xs'
                    : 'btn-secondary-custom'}"
                  title="Pilih sebagai kunci jawaban benar"
                >
                  <Icon
                    name={optionItem.isCorrect ? 'check_circle' : 'radio_button_unchecked'}
                    size="sm"
                  />
                  <span>{labelCode}</span>
                </button>

                <!-- Input for Option Text -->
                <input
                  type="text"
                  bind:value={optionItem.optionText}
                  placeholder={`Opsi ${labelCode}...`}
                  required
                  class="input-base text-xs sm:text-sm py-1.5 px-2.5"
                />

                {#if optionItem.isCorrect}
                  <span class="badge-accent text-xs shrink-0 px-2 py-0.5">
                    Kunci
                  </span>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <FormField
          labelText="Pembahasan Konsep IPO"
          inputId="explanation"
          helperText="Teks ini muncul pada ulasan setelah kuis dikirim."
        >
          <Textarea
            id="explanation"
            name="explanation"
            bind:value={explanation}
            rows={2}
            placeholder="Contoh: Pemindai merupakan perangkat masukan karena mengubah berkas fisik menjadi data biner..."
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
            {isEditMode ? 'Simpan' : 'Buat'}
          </Button>
        </div>
      </form>
    </div>
  </div>
{/if}
