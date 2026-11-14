<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  import {
    ContentCard,
    StatusBadge,
    IconSymbol,
    ActionButton,
    AlertMessage,
    TextInput,
    TextArea,
    LikertQuestionCard,
  } from '$lib/components';
  import { formatDecimalScore } from '$lib/utils/formatters';

  let { data, form }: PageProps = $props();

  let studentFullNameInput = $state('');
  let studentIdentifierInput = $state('');
  let classBatchInput = $state('PTIK 2023 A');

  let ratingDesignValue = $state(5);
  let ratingContentValue = $state(5);
  let ratingUsabilityValue = $state(5);
  let commentsInput = $state('');

  $effect(() => {
    if (form?.studentFullName) studentFullNameInput = form.studentFullName;
    if (form?.studentIdentifier) studentIdentifierInput = form.studentIdentifier;
    if (form?.classBatch) classBatchInput = form.classBatch;
    if (form?.ratingDesign) ratingDesignValue = form.ratingDesign;
    if (form?.ratingContent) ratingContentValue = form.ratingContent;
    if (form?.ratingUsability) ratingUsabilityValue = form.ratingUsability;
    if (form?.comments) commentsInput = form.comments;
  });

  let isSubmittingFeedback = $state(false);

  const commentSuggestions = [
    'Visual alur IPO sangat jelas dan mudah dipahami.',
    'Video ringkas dan rangkuman di bawah sangat membantu belajar.',
    'Sangat direkomendasikan untuk praktikum pengantar sistem komputer PTIK.',
    'Navigasinya cepat dan responsif saat dibuka di handphone.',
  ];

  function applyCommentChip(chipText: string): void {
    if (commentsInput.trim().length === 0) {
      commentsInput = chipText;
    } else {
      commentsInput += ` ${chipText}`;
    }
  }
</script>

<div class="w-full max-w-4xl mx-auto space-y-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
  <!-- Header Title (SaaS Style) -->
  <div class="mx-auto max-w-2xl space-y-3 text-center">
    <div class="flex justify-center">
      <StatusBadge badgeTone="amber" textLabel="Ulasan & Kepuasan Siswa" iconName="rate_review" />
    </div>
    <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-content-heading">
      Ulasan & Testimoni Siswa
    </h1>
    <p class="text-xs sm:text-base leading-relaxed text-content-muted">
      Bantu kami meningkatkan kualitas kursus dan materi komputer ini. Ulasan dan penilaian jujur Anda sangat berharga bagi perkembangan platform dan membantu siswa lain menemukan materi terbaik.
    </p>
  </div>

  {#if form?.isSuccess && form.feedbackRecord}
    <!-- SUCCESS CELEBRATION CARD -->
    <ContentCard cardPadding="large" customClass="text-center space-y-6">
      <div
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-subtle text-accent border border-accent-border shadow-xs"
      >
        <IconSymbol name="volunteer_activism" sizeInPixels={36} />
      </div>

      <div class="space-y-1">
        <StatusBadge badgeTone="emerald" textLabel="Ulasan Berhasil Diterbitkan" />
        <h2 class="text-2xl font-black text-content-heading mt-2">
          Terima Kasih Banyak atas Ulasan Anda!
        </h2>
        <p class="text-xs sm:text-sm text-content max-w-md mx-auto leading-relaxed">
          Penilaian dari <strong class="text-content-heading">{form.feedbackRecord.studentName}</strong> (ID: {form.feedbackRecord.studentIdentifier}) dengan rerata skor kepuasan <strong class="text-accent">{formatDecimalScore(form.feedbackRecord.averageScore)} / 5.00</strong> telah berhasil tersimpan dan tampil di platform EduKomputer.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a href="/">
          <ActionButton variantStyle="primary" sizeScale="medium" leadingIcon="home">
            Kembali ke Beranda
          </ActionButton>
        </a>
        <a href="/kuis">
          <ActionButton variantStyle="outline" sizeScale="medium" leadingIcon="quiz">
            Coba Kuis Evaluasi
          </ActionButton>
        </a>
      </div>
    </ContentCard>
  {:else}
    {#if form?.errorMessage}
      <AlertMessage
        alertTone="error"
        alertTitle="Gagal Menyimpan Ulasan"
        alertMessage={form.errorMessage}
      />
    {/if}

    <form
      method="POST"
      action="?/submitFeedback"
      use:enhance={() => {
        isSubmittingFeedback = true;
        return async ({ update }) => {
          await update();
          isSubmittingFeedback = false;
        };
      }}
      class="space-y-6"
    >
      <!-- Identitas Responden -->
      <ContentCard cardPadding="large" customClass="space-y-4">
        <div class="flex items-center gap-2.5 pb-3 border-b border-border-subtle text-accent">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle border border-accent-border">
            <IconSymbol name="person" sizeInPixels={20} />
          </div>
          <h3 class="text-base font-bold text-content-heading">1. Data Diri Siswa / Peserta</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="studentFullName" class="block text-xs font-bold text-content-heading mb-1.5">
              Nama Lengkap <span class="text-status-error">*</span>
            </label>
            <TextInput
              identifier="studentFullName"
              inputName="studentFullName"
              placeholderText="contoh: Siti Aisyah"
              bind:inputValue={studentFullNameInput}
              isRequired={true}
            />
          </div>

          <div>
            <label for="studentIdentifier" class="block text-xs font-bold text-content-heading mb-1.5">
              ID Siswa / No. Peserta (NIM/Email/ID) <span class="text-status-error">*</span>
            </label>
            <TextInput
              identifier="studentIdentifier"
              inputName="studentIdentifier"
              placeholderText="contoh: 5302422015"
              bind:inputValue={studentIdentifierInput}
              isRequired={true}
            />
          </div>
        </div>

        <div>
          <label for="classBatch" class="block text-xs font-bold text-content-heading mb-1.5">
            Kelas / Asal Institusi <span class="text-status-error">*</span>
          </label>
          <TextInput
            identifier="classBatch"
            inputName="classBatch"
            placeholderText="contoh: Kelas A - 2026"
            bind:inputValue={classBatchInput}
            isRequired={true}
          />
        </div>
      </ContentCard>

      <!-- 3 Butir Instrumen Likert -->
      <ContentCard cardPadding="large" customClass="space-y-6">
        <div class="flex items-center gap-2.5 pb-3 border-b border-border-subtle text-accent">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle border border-accent-border">
            <IconSymbol name="checklist" sizeInPixels={20} />
          </div>
          <h3 class="text-base font-bold text-content-heading">
            2. Rating & Kepuasan Belajar Kursus (Skala 1-5)
          </h3>
        </div>

        <LikertQuestionCard
          aspectCode="ASPEK-01"
          aspectTitle="Desain Antarmuka & Keterbacaan"
          questionText="Tampilan visual, tata letak antarmuka, kontras warna, dan integrasi video pembelajaran mudah dipahami serta nyaman dipelajari."
          inputName="ratingDesign"
          bind:selectedRatingValue={ratingDesignValue}
        />

        <LikertQuestionCard
          aspectCode="ASPEK-02"
          aspectTitle="Kelayakan & Kejelasan Materi"
          questionText="Uraian konsep pada materi kursus disajikan secara runut, sistematis, dan sangat membantu pemahaman arsitektur komputer."
          inputName="ratingContent"
          bind:selectedRatingValue={ratingContentValue}
        />

        <LikertQuestionCard
          aspectCode="ASPEK-03"
          aspectTitle="Kemudahan Penggunaan (Usability)"
          questionText="Navigasi antar modul lancar, responsif diakses melalui smartphone maupun laptop, serta fitur kuis interaktif berfungsi secara efektif."
          inputName="ratingUsability"
          bind:selectedRatingValue={ratingUsabilityValue}
        />
      </ContentCard>

      <!-- Saran & Masukan Kualitatif -->
      <ContentCard cardPadding="large" customClass="space-y-4">
        <div class="flex items-center gap-2.5 pb-3 border-b border-border-subtle text-accent">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-subtle border border-accent-border">
            <IconSymbol name="chat" sizeInPixels={20} />
          </div>
          <h3 class="text-base font-bold text-content-heading">
            3. Ulasan & Rekomendasi Siswa
          </h3>
        </div>

        <div>
          <label for="comments" class="block text-xs font-bold text-content-heading mb-1.5">
            Ulasan & Pengalaman Belajar (Opsional)
          </label>
          <TextArea
            identifier="comments"
            inputName="comments"
            rowsCount={3}
            placeholderText="Tuliskan pengalaman belajar atau saran topik kursus selanjutnya..."
            bind:inputValue={commentsInput}
          />
        </div>

        <!-- Suggestion Chips -->
        <div class="space-y-1.5">
          <span class="text-xs text-content-muted">Rekomendasi ulasan cepat:</span>
          <div class="flex flex-wrap gap-2">
            {#each commentSuggestions as chipText (chipText)}
              <button
                type="button"
                onclick={() => applyCommentChip(chipText)}
                class="rounded-lg border border-border-subtle bg-surface-subtle px-2.5 py-1 text-xs text-content hover:border-accent-border hover:text-accent transition-colors cursor-pointer"
              >
                + {chipText}
              </button>
            {/each}
          </div>
        </div>

        <div class="pt-4 border-t border-border-subtle">
          <ActionButton
            buttonType="submit"
            variantStyle="primary"
            sizeScale="large"
            leadingIcon="send"
            customClass="w-full font-bold justify-center"
            isDisabled={isSubmittingFeedback}
            isLoading={isSubmittingFeedback}
            loadingText="Mengirimkan Ulasan..."
          >
            Kirimkan Ulasan & Rating Saya
          </ActionButton>
        </div>
      </ContentCard>
    </form>
  {/if}
</div>
