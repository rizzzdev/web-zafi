<script lang="ts">
  import LikertOptionButton from '../atoms/LikertOptionButton.svelte';

  interface LikertQuestionCardProperties {
    readonly aspectCode?: string;
    readonly questionIndex?: number;
    readonly aspectTitle: string;
    readonly questionText?: string;
    readonly statementText?: string;
    readonly inputName: string;
    selectedRatingValue?: number;
    selectedValue?: number;
    readonly onSelectValue?: (selectedScore: number) => void;
  }

  let {
    aspectCode,
    questionIndex,
    aspectTitle,
    questionText,
    statementText,
    inputName,
    selectedRatingValue = $bindable(5),
    selectedValue = $bindable(5),
    onSelectValue,
  }: LikertQuestionCardProperties = $props();

  const scoreOptions = [1, 2, 3, 4, 5];

  const currentScore = $derived(selectedRatingValue ?? selectedValue ?? 5);

  function handleSelectScore(scoreOptionNumber: number): void {
    selectedRatingValue = scoreOptionNumber;
    selectedValue = scoreOptionNumber;
    if (onSelectValue) {
      onSelectValue(scoreOptionNumber);
    }
  }
</script>

<div class="card-base p-4 sm:p-5 mb-4 flex flex-col gap-3.5 transition-all">
  <div>
    <div class="flex items-center gap-2">
      {#if aspectCode}
        <span class="badge-accent text-xs font-mono font-bold">{aspectCode}</span>
      {:else if questionIndex}
        <span class="badge-accent text-xs font-mono font-bold">#{questionIndex}</span>
      {/if}
      <span class="badge-accent text-xs">
        {aspectTitle}
      </span>
    </div>
    <h4 class="text-sm sm:text-base font-semibold text-content-heading mt-2 leading-snug">
      {questionText || statementText || ''}
    </h4>
  </div>

  <!-- Hidden input for standard HTML form submission -->
  <input type="hidden" name={inputName} value={currentScore} />

  <!-- 5 touch-friendly buttons row -->
  <div class="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-1">
    {#each scoreOptions as scoreOptionNumber (scoreOptionNumber)}
      <LikertOptionButton
        valueNumber={scoreOptionNumber}
        isSelected={currentScore === scoreOptionNumber}
        onclick={() => handleSelectScore(scoreOptionNumber)}
      />
    {/each}
  </div>

  <!-- Pole labels (Mobile: compact and legible) -->
  <div class="flex justify-between items-center text-xs text-content-muted font-medium px-0.5">
    <span class="flex items-center gap-1">
      <span class="text-content font-bold">1</span> STS
    </span>
    <span class="text-xs text-content-muted italic hidden sm:inline">(Sangat Tidak Setuju ➔ Sangat Setuju)</span>
    <span class="flex items-center gap-1 text-right">
      SS <span class="text-content font-bold">5</span>
    </span>
  </div>
</div>
