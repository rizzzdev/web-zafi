<script lang="ts">
  import IconSymbol from '../atoms/IconSymbol.svelte';
  import ActionButton from '../atoms/ActionButton.svelte';
  import StatusBadge from '../atoms/StatusBadge.svelte';

  interface OptionItem {
    id: string;
    optionLabel?: string;
    optionText: string;
    isCorrect?: boolean;
  }

  interface QuestionItem {
    id: string;
    questionText: string;
    explanation?: string | null;
    options: readonly OptionItem[] | OptionItem[];
  }

  interface InteractiveQuizRunnerProperties {
    questionsList: readonly QuestionItem[] | QuestionItem[];
    studentName?: string;
    studentIdentifier?: string;
    classBatch?: string;
    onQuizFinished?: (results: {
      score: number;
      correctCount: number;
      totalCount: number;
      answers: Record<string, string>;
    }) => void;
  }

  const {
    questionsList,
    studentName = '',
    studentIdentifier = '',
    classBatch = '',
    onQuizFinished,
  }: InteractiveQuizRunnerProperties = $props();

  let currentQuestionIndex = $state(0);
  let selectedOptionId = $state<string | null>(null);
  let isAnswerSubmitted = $state(false);
  let totalCorrectAnswers = $state(0);
  let quizCompleted = $state(false);
  let recordedAnswersMap = $state<Record<string, string>>({});

  const activeQuestion = $derived(questionsList[currentQuestionIndex]);
  const isLastQuestion = $derived(currentQuestionIndex === questionsList.length - 1);
  const alphabetLabels = ['A', 'B', 'C', 'D', 'E'];

  function handleSelectOption(optionId: string): void {
    if (isAnswerSubmitted) return;
    selectedOptionId = optionId;
  }

  function handleCheckAnswer(): void {
    if (!selectedOptionId || isAnswerSubmitted || !activeQuestion) return;
    isAnswerSubmitted = true;
    recordedAnswersMap[activeQuestion.id] = selectedOptionId;

    const selectedOption = activeQuestion.options.find((opt) => opt.id === selectedOptionId);
    if (selectedOption?.isCorrect) {
      totalCorrectAnswers += 1;
    }
  }

  function handleNextQuestion(): void {
    if (isLastQuestion) {
      quizCompleted = true;
      if (onQuizFinished) {
        const finalScoreCalculated =
          questionsList.length > 0
            ? Math.round((totalCorrectAnswers / questionsList.length) * 100)
            : 0;
        onQuizFinished({
          score: finalScoreCalculated,
          correctCount: totalCorrectAnswers,
          totalCount: questionsList.length,
          answers: recordedAnswersMap,
        });
      }
    } else {
      currentQuestionIndex += 1;
      selectedOptionId = null;
      isAnswerSubmitted = false;
    }
  }

  function handleResetQuiz(): void {
    currentQuestionIndex = 0;
    selectedOptionId = null;
    isAnswerSubmitted = false;
    totalCorrectAnswers = 0;
    quizCompleted = false;
    recordedAnswersMap = {};
  }
</script>

<div
  class="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border-subtle bg-surface text-content shadow-lg"
>
  {#if questionsList.length === 0}
    <div class="p-8 text-center text-content-muted">
      Belum ada soal kuis yang diterbitkan saat ini.
    </div>
  {:else if quizCompleted}
    <!-- Completed Celebration State -->
    <div class="space-y-6 p-8 text-center sm:p-12">
      <div
        class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-subtle text-accent border border-accent-border shadow-xs"
      >
        <IconSymbol name="emoji_events" sizeInPixels={48} />
      </div>

      <div class="space-y-1">
        <StatusBadge badgeTone="amber" textLabel="Evaluasi Kognitif Selesai" />
        <h3 class="text-2xl font-black text-content-heading mt-2">Kuis Berhasil Diselesaikan!</h3>
        <p class="text-xs sm:text-sm text-content-muted">
          {#if studentName}
            Mahasiswa: <strong class="text-content-heading">{studentName}</strong> (NIM: {studentIdentifier})
          {:else}
            Evaluasi model mental sistem komputer (Model IPO).
          {/if}
        </p>
      </div>

      <div class="inline-block rounded-2xl border border-border-subtle bg-surface-subtle px-8 py-5">
        <p class="text-xs font-bold tracking-wider text-content-muted uppercase">Skor Evaluasi</p>
        <p class="mt-1 text-4xl sm:text-5xl font-black text-accent">
          {Math.round((totalCorrectAnswers / questionsList.length) * 100)}
          <span class="text-sm font-semibold text-content-muted">/ 100</span>
        </p>
        <p class="mt-1 text-xs font-semibold text-content">
          Benar <strong class="text-status-success">{totalCorrectAnswers}</strong> dari {questionsList.length} butir pertanyaan
        </p>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-3 pt-4">
        <ActionButton
          buttonType="button"
          variantStyle="outline"
          leadingIcon="replay"
          onClickHandler={handleResetQuiz}
        >
          Coba Ulang Kuis
        </ActionButton>

        <a
          href="/testimoni"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-canvas shadow-sm hover:bg-accent-hover transition-colors"
        >
          <IconSymbol name="rate_review" sizeInPixels={18} />
          <span>Isi Angket Respon PTIK</span>
        </a>
      </div>
    </div>
  {:else}
    <!-- Active Quiz Questions View -->
    <!-- Progress Indicator -->
    <div
      class="flex items-center justify-between border-b border-border-subtle bg-surface-subtle px-6 py-4 text-xs font-semibold text-content-muted"
    >
      <div class="flex items-center gap-2">
        <StatusBadge
          badgeTone="amber"
          textLabel={`Soal ${currentQuestionIndex + 1} dari ${questionsList.length}`}
        />
      </div>
      <div class="flex items-center gap-1.5 text-accent font-bold">
        <IconSymbol name="grade" sizeInPixels={16} />
        <span>Skor Sementara: {totalCorrectAnswers} Benar</span>
      </div>
    </div>

    <!-- Question Content -->
    <div class="space-y-6 p-6 sm:p-8">
      <h3 class="text-base sm:text-lg leading-snug font-bold text-content-heading">
        {activeQuestion?.questionText}
      </h3>

      <!-- Options List -->
      <div class="space-y-3">
        {#each activeQuestion?.options || [] as option, optionIndex (option.id)}
          {@const isSelected = selectedOptionId === option.id}
          {@const showCorrectStyle = isAnswerSubmitted && option.isCorrect}
          {@const showIncorrectStyle = isAnswerSubmitted && isSelected && !option.isCorrect}
          {@const label = option.optionLabel || alphabetLabels[optionIndex] || '•'}

          <button
            type="button"
            onclick={() => handleSelectOption(option.id)}
            disabled={isAnswerSubmitted}
            class="flex w-full cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all disabled:cursor-default {showCorrectStyle
              ? 'border-status-success bg-status-success-subtle font-semibold text-content-heading shadow-xs'
              : showIncorrectStyle
                ? 'border-status-error bg-status-error-subtle text-content-heading'
                : isSelected
                  ? 'border-accent bg-accent-subtle text-content-heading shadow-xs'
                  : 'border-border-subtle bg-surface-subtle hover:border-border-hover hover:bg-surface-hover'}"
          >
            <div
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold {showCorrectStyle
                ? 'border-status-success bg-status-success text-white'
                : showIncorrectStyle
                  ? 'border-status-error bg-status-error text-white'
                  : isSelected
                    ? 'border-accent bg-accent text-canvas font-black'
                    : 'border-border-subtle bg-surface text-content-muted'}"
            >
              {label}
            </div>

            <div class="flex-1 pt-0.5 text-xs sm:text-sm text-content">
              {option.optionText}
            </div>

            {#if showCorrectStyle}
              <IconSymbol
                name="check_circle"
                sizeInPixels={20}
                customClass="text-status-success shrink-0"
              />
            {:else if showIncorrectStyle}
              <IconSymbol
                name="cancel"
                sizeInPixels={20}
                customClass="text-status-error shrink-0"
              />
            {/if}
          </button>
        {/each}
      </div>

      <!-- Feedback Explanation Box -->
      {#if isAnswerSubmitted && activeQuestion?.explanation}
        <div
          class="animate-in fade-in space-y-1.5 rounded-xl border border-border-subtle bg-surface-subtle p-4 text-xs text-content duration-200 sm:text-sm"
        >
          <p class="flex items-center gap-1.5 font-bold text-accent">
            <IconSymbol name="lightbulb" sizeInPixels={18} customClass="text-accent" />
            <span>Penjelasan Konsep Sistem Komputer:</span>
          </p>
          <p class="pl-6 leading-relaxed text-content-heading">{activeQuestion.explanation}</p>
        </div>
      {/if}

      <!-- Action Button Controls -->
      <div class="flex justify-end gap-3 border-t border-border-subtle pt-4">
        {#if !isAnswerSubmitted}
          <ActionButton
            buttonType="button"
            variantStyle="primary"
            isDisabled={!selectedOptionId}
            onClickHandler={handleCheckAnswer}
          >
            Periksa Jawaban
          </ActionButton>
        {:else}
          <ActionButton
            buttonType="button"
            variantStyle="primary"
            trailingIcon="arrow_forward"
            onClickHandler={handleNextQuestion}
          >
            {isLastQuestion ? 'Lihat Hasil Akhir' : 'Soal Berikutnya'}
          </ActionButton>
        {/if}
      </div>
    </div>
  {/if}
</div>
