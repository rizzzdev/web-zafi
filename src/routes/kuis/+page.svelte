<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import {
    StatusBadge,
    InteractiveQuizRunner,
    IconSymbol,
    ContentCard,
    FormField,
    TextInput,
    ActionButton,
    AlertMessage,
  } from '$lib/components';

  let { data, form }: PageProps = $props();

  let studentFullName = $state('');
  let studentIdentifier = $state('');
  let classBatch = $state('PTIK 2023 A');
  let hasStartedQuiz = $state(false);

  // Hidden form submission state when quiz finishes
  let isSavingToServer = $state(false);
  let savedServerSuccess = $state(false);
  let hiddenSubmissionFormElement: HTMLFormElement | null = $state(null);
  let submittedAnswersJson = $state('{}');

  function startQuizRunner(): void {
    hasStartedQuiz = true;
  }

  function handleQuizFinished(results: {
    score: number;
    correctCount: number;
    totalCount: number;
    answers: Record<string, string>;
  }): void {
    submittedAnswersJson = JSON.stringify(results.answers);
  }
</script>

<div class="w-full max-w-4xl mx-auto space-y-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
  <!-- Title Header (Modern SaaS Style) -->
  <div class="mx-auto max-w-2xl space-y-3 text-center">
    <div class="flex justify-center">
      <StatusBadge badgeTone="amber" textLabel="Evaluasi Kognitif Mandiri" iconName="quiz" />
    </div>
    <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-content-heading">
      Kuis Evaluasi Model IPO
    </h1>
    <p class="text-xs sm:text-base leading-relaxed text-content-muted">
      Buktikan pemahaman Anda mengenai alur kerja sistem komputer. Soal disusun adaptif dengan umpan balik ilmiah seketika dan bebas dari registrasi akun.
    </p>
  </div>

  {#if form?.isSuccess}
    <AlertMessage
      alertTone="success"
      alertTitle="Submisi Resmi Berhasil Disimpan"
      alertMessage="Nilai evaluasi Anda telah resmi tercatat ke dalam sistem pencatatan hasil belajar siswa EduKomputer."
    />
  {/if}

  {#if !hasStartedQuiz}
    <!-- Identity Step / Overview Card -->
    <ContentCard cardPadding="large" customClass="max-w-xl mx-auto space-y-6">
      <div class="flex items-center gap-3 border-b border-border-subtle pb-4">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-canvas font-black shadow-xs shrink-0"
        >
          <IconSymbol name="badge" sizeInPixels={24} />
        </div>
        <div>
          <h2 class="text-base font-bold text-content-heading">Identitas Siswa / Peserta Kursus</h2>
          <p class="text-xs text-content-muted">
            Opsional: Masukkan nama untuk pencatatan di sertifikat hasil dan lembar evaluasi
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label for="fullNameInput" class="block text-xs font-bold text-content-heading mb-1.5">
            Nama Lengkap Siswa / Peserta
          </label>
          <TextInput
            identifier="fullNameInput"
            inputName="studentName"
            bind:inputValue={studentFullName}
            placeholderText="contoh: Muhammad Rizki"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="studentIdInput" class="block text-xs font-bold text-content-heading mb-1.5">
              ID Siswa / No. Peserta (NIM/NISN)
            </label>
            <TextInput
              identifier="studentIdInput"
              inputName="studentIdentifier"
              bind:inputValue={studentIdentifier}
              placeholderText="contoh: 5302422001"
            />
          </div>

          <div>
            <label for="batchInput" class="block text-xs font-bold text-content-heading mb-1.5">
              Kelas / Angkatan
            </label>
            <TextInput
              identifier="batchInput"
              inputName="classBatch"
              bind:inputValue={classBatch}
              placeholderText="contoh: Kelas A - 2026"
            />
          </div>
        </div>
      </div>

      <div class="pt-2">
        <ActionButton
          buttonType="button"
          variantStyle="primary"
          sizeScale="large"
          leadingIcon="play_circle"
          customClass="w-full font-bold justify-center"
          onClickHandler={startQuizRunner}
        >
          Mulai Mengerjakan Kuis ({data.publishedQuestionsList.length} Soal)
        </ActionButton>
      </div>

      <p class="text-center text-[11px] text-content-muted">
        Tanpa kata sandi atau registrasi • Feedback penjelasan instan per soal
      </p>
    </ContentCard>
  {:else}
    <!-- Interactive Quiz Runner (Matching sains-desa) -->
    <InteractiveQuizRunner
      questionsList={data.publishedQuestionsList}
      studentName={studentFullName}
      studentIdentifier={studentIdentifier}
      classBatch={classBatch}
      onQuizFinished={handleQuizFinished}
    />
  {/if}
</div>
