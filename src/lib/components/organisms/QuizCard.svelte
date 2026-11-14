<script lang="ts">
  import type { QuizQuestionWithOptions } from '$lib/modules/quiz';
  import Icon from '../atoms/Icon.svelte';

  interface QuizCardProperties {
    readonly question: QuizQuestionWithOptions;
    readonly questionIndex: number;
    readonly totalQuestionsCount: number;
    readonly selectedOptionId: string;
    readonly onSelectOption: (optionId: string) => void;
  }

  const {
    question,
    questionIndex,
    totalQuestionsCount,
    selectedOptionId,
    onSelectOption,
  }: QuizCardProperties = $props();
</script>

<div class="card-base p-4 sm:p-6 mb-5 transition-all">
  <!-- Header: Index & Category -->
  <div class="flex items-center justify-between gap-3 mb-3.5">
    <span class="badge-accent text-xs">
      <Icon name="help_outline" size="sm" />
      Soal {questionIndex} dari {totalQuestionsCount}
    </span>
    <span class="text-xs text-content-muted font-mono">Pilihan Ganda</span>
  </div>

  <!-- Question Text -->
  <h3 class="text-sm sm:text-base font-bold text-content-heading leading-relaxed mb-4">
    {question.questionText}
  </h3>

  <!-- Options List (Touch targets min 44px) -->
  <div class="flex flex-col gap-2 sm:gap-2.5">
    {#each question.options as optionItem, optionIndex (optionItem.id)}
      {@const isSelected = selectedOptionId === optionItem.id}
      {@const optionLabel = String.fromCharCode(65 + optionIndex)}
      <button
        type="button"
        onclick={() => onSelectOption(optionItem.id)}
        class="w-full text-left p-2.5 sm:p-3.5 rounded-xl border transition-all flex items-start gap-2.5 sm:gap-3 cursor-pointer select-none {isSelected
          ? 'border-accent bg-accent-subtle ring-1 ring-accent text-content-heading font-semibold'
          : 'border-border-subtle bg-surface-subtle hover:bg-surface-hover hover:border-border-hover text-content'}"
      >
        <span
          class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 {isSelected
            ? 'btn-primary-custom font-black'
            : 'bg-surface text-content border border-border-subtle'}"
        >
          {optionLabel}
        </span>
        <span class="text-xs sm:text-sm leading-snug">
          {optionItem.optionText}
        </span>
      </button>
    {/each}
  </div>
</div>
