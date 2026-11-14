<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  import {
    Button,
    Badge,
    Alert,
    Icon,
    SearchInput,
    EmptyState,
    QuizQuestionEditorModal,
    AdminHeader,
    ActionButton,
    StatusBadge,
    IconSymbol,
  } from '$lib/components';
  import type { QuizQuestionWithOptions } from '$lib/modules/quiz';

  interface PageProps {
    readonly data: PageData;
    readonly form: ActionData;
  }

  const { data, form }: PageProps = $props();

  let searchQuery = $state('');
  let isEditorModalOpen = $state(false);
  let activeEditingQuestion = $state<QuizQuestionWithOptions | null>(null);
  let deletingQuestionId = $state<string | null>(null);

  function handleOpenCreateModal(): void {
    activeEditingQuestion = null;
    isEditorModalOpen = true;
  }

  function handleOpenEditModal(targetQuestion: QuizQuestionWithOptions): void {
    activeEditingQuestion = targetQuestion;
    isEditorModalOpen = true;
  }

  function handleCloseModal(): void {
    isEditorModalOpen = false;
    activeEditingQuestion = null;
  }

  const filteredQuestions = $derived(
    data.allQuestions.filter((questionItem) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      const matchesQuestion = questionItem.questionText.toLowerCase().includes(query);
      const matchesExplanation = Boolean(questionItem.explanation && questionItem.explanation.toLowerCase().includes(query));
      const matchesOption = questionItem.options.some((option) => option.optionText.toLowerCase().includes(query));
      return matchesQuestion || matchesExplanation || matchesOption;
    })
  );

  const optionLetterLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
</script>

<AdminHeader
  pageTitle="Manajemen Bank Soal Kuis"
  pageSubtitle="Kelola butir soal kuis evaluasi pemahaman sistem komputer (Model IPO), kunci jawaban, dan pembahasan"
/>

<div class="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8">
  <!-- Top Bar: Title & Actions -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h2 class="text-base sm:text-lg font-bold text-content-heading">
        Daftar Butir Soal Evaluasi
      </h2>
      <p class="text-xs text-content-muted">
        Total {data.allQuestions.length} butir pertanyaan terdaftar
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
        Tambah Soal Kuis
      </ActionButton>
    </div>
  </div>

  {#if form?.message}
    <Alert variant="success" title="Operasi Berhasil" message={form.message} />
  {/if}

  {#if form?.errorMessage}
    <Alert variant="danger" title="Kesalahan" message={form.errorMessage} />
  {/if}

  <!-- Search Filter -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <SearchInput
      bind:value={searchQuery}
      placeholder="Cari teks soal, materi opsi, atau pembahasan..."
      classNames="w-full sm:w-80"
    />
    <span class="text-xs font-semibold text-content-muted">
      Total: <strong class="text-content-heading">{filteredQuestions.length}</strong> butir soal
    </span>
  </div>

  <!-- Questions List -->
  {#if filteredQuestions.length === 0}
    <EmptyState
      title="Tidak Ada Soal Kuis Ditemukan"
      description={searchQuery
        ? `Tidak ada butir soal yang sesuai dengan kata kunci "${searchQuery}".`
        : 'Belum ada butir soal dalam bank kuis. Klik "Tambah Soal Kuis" untuk menambahkan.'}
    />
  {:else}
    <div class="flex flex-col gap-3.5">
      {#each filteredQuestions as questionRecord (questionRecord.id)}
        <div class="card-base p-4 sm:p-5 shadow-xs transition-all text-content">
          <!-- Card Header -->
          <div class="flex items-center justify-between gap-2.5 pb-3 mb-3 border-b border-border-subtle">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-surface-subtle text-accent font-mono font-bold text-xs flex items-center justify-center border border-accent-border">
                #{questionRecord.orderIndex}
              </span>
              {#if questionRecord.isActive}
                <Badge variant="success" size="sm">
                  Aktif
                </Badge>
              {:else}
                <Badge variant="default" size="sm">
                  Draft
                </Badge>
              {/if}
            </div>

            <!-- Card Actions: Edit & Delete -->
            <div class="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                iconName="edit"
                onclick={() => handleOpenEditModal(questionRecord)}
              >
                Edit
              </Button>

              <form
                method="POST"
                action="?/deleteQuestion"
                use:enhance={({ cancel }) => {
                  const isConfirmed = confirm(
                    `Apakah Anda yakin ingin menghapus butir soal #${questionRecord.orderIndex}?`
                  );
                  if (!isConfirmed) {
                    cancel();
                    return;
                  }
                  deletingQuestionId = questionRecord.id;
                  return async ({ update }) => {
                    await update();
                    deletingQuestionId = null;
                  };
                }}
              >
                <input type="hidden" name="questionId" value={questionRecord.id} />
                <Button
                  type="submit"
                  variant="danger"
                  size="sm"
                  iconName="delete"
                  isSubmitting={deletingQuestionId === questionRecord.id}
                >
                  Hapus
                </Button>
              </form>
            </div>
          </div>

          <!-- Question Text -->
          <p class="text-sm sm:text-base font-bold text-content-heading leading-relaxed mb-3">
            {questionRecord.questionText}
          </p>

          <!-- Options Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {#each questionRecord.options as optionItem, optionIndex (optionItem.id)}
              {@const optionLetter = optionLetterLabels[optionIndex] ?? String(optionIndex + 1)}
              <div
                class="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl border text-xs font-medium transition-colors {optionItem.isCorrect
                  ? 'bg-accent-subtle border-accent-border text-content-heading font-semibold'
                  : 'bg-surface-subtle border-border-subtle text-content'}"
              >
                <span
                  class="w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 {optionItem.isCorrect
                    ? 'btn-primary-custom font-black'
                    : 'bg-surface text-content border border-border-subtle'}"
                >
                  {optionLetter}
                </span>
                <span class="flex-1 leading-snug">{optionItem.optionText}</span>
                {#if optionItem.isCorrect}
                  <span class="badge-accent text-xs shrink-0 px-1.5 py-0.2">
                    Kunci
                  </span>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Explanation Box -->
          {#if questionRecord.explanation}
            <div class="p-2.5 sm:p-3 rounded-xl bg-surface-subtle border border-border-subtle flex items-start gap-2 text-xs text-content">
              <Icon name="lightbulb" size="sm" classNames="shrink-0 text-accent mt-0.5" />
              <div>
                <span class="font-bold text-content-heading">Pembahasan: </span>
                <span class="leading-relaxed">{questionRecord.explanation}</span>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Modal Dialog for Question Create / Update -->
<QuizQuestionEditorModal
  questionData={activeEditingQuestion}
  isOpen={isEditorModalOpen}
  onClose={handleCloseModal}
/>
