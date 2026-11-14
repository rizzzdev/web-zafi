<script lang="ts">
  import type { PageData } from './$types';
  import {
    AdminHeader,
    StatMetricCard,
    ContentCard,
    StatusBadge,
    IconSymbol,
    ActionButton,
    AlertMessage,
  } from '$lib/components';
  import { formatDateToWIB, formatDecimalScore } from '$lib/utils/formatters';

  interface PageProps {
    readonly data: PageData;
  }

  const { data }: PageProps = $props();

  let isExporting = $state(false);

  function handleExportCsv(): void {
    isExporting = true;
    const csvHeader = 'NIM,Nama Mahasiswa,Rombel,Skor Desain,Skor Materi,Skor Usability,Rerata,Waktu\n';
    const csvRows = data.recentFeedbacks
      .map(
        (f) =>
          `"${f.studentIdentifier}","${f.studentName}","${f.classBatch || ''}",${f.ratingDesign},${f.ratingContent},${f.ratingUsability},${formatDecimalScore(f.averageScore)},"${formatDateToWIB(f.createdAt)}"`
      )
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rekap-ulasan-kursus-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      isExporting = false;
    }, 800);
  }
</script>

<AdminHeader
  pageTitle="Dashboard Manajemen Kursus"
  pageSubtitle="Ringkasan metrik performa platform, perkembangan belajar siswa, dan kepuasan modul EduKomputer"
/>

<div class="w-full space-y-8 p-4 sm:p-6 lg:p-8">
  <!-- 4 Stats Metric Cards (matching sains-desa) -->
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <StatMetricCard
      metricTitle="Ulasan Siswa"
      metricValue={data.feedbackStats.totalRespondentsCount}
      iconSymbolName="rate_review"
      accentColorTone="amber"
      subtextDescription="Testimoni terverifikasi"
    />

    <StatMetricCard
      metricTitle="Partisipan Kuis"
      metricValue={data.quizStats.totalParticipantsCount}
      iconSymbolName="quiz"
      accentColorTone="sky"
      subtextDescription="Telah menyelesaikan kuis evaluasi"
    />

    <StatMetricCard
      metricTitle="Rerata Skor Kuis"
      metricValue="{data.quizStats.averageScoreValue} / 100"
      iconSymbolName="school"
      accentColorTone="emerald"
      subtextDescription="Rata-rata evaluasi siswa"
    />

    <StatMetricCard
      metricTitle="Indeks Kepuasan"
      metricValue="{formatDecimalScore(data.feedbackStats.overallAverageScore)} / 5.00"
      iconSymbolName="grade"
      accentColorTone="amber"
      subtextDescription={data.feedbackStats.overallInterpretationLabel}
    />
  </div>

  <!-- Action Bar & Export Report (matching sains-desa) -->
  <div
    class="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface p-5 shadow-2xs sm:flex-row"
  >
    <div class="space-y-1 text-center sm:text-left">
      <h3 class="text-sm font-bold text-content-heading">
        Ekspor Data Ulasan & Evaluasi Kursus
      </h3>
      <p class="text-xs text-content-muted">
        Unduh berkas CSV rekapitulasi data penilaian siswa dan hasil kuis untuk laporan performa platform pembelajaran.
      </p>
    </div>

    <ActionButton
      buttonType="button"
      variantStyle="primary"
      leadingIcon="download"
      isDisabled={isExporting}
      isLoading={isExporting}
      loadingText="Membuat Berkas CSV..."
      onClickHandler={handleExportCsv}
    >
      Unduh Rekap Ulasan (.CSV)
    </ActionButton>
  </div>

  <!-- Rincian 3 Aspek Likert (ContentCard grid) -->
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <IconSymbol name="analytics" sizeInPixels={20} customClass="text-accent" />
      <h2 class="text-base font-bold text-content-heading">
        Rerata Skor Berdasarkan 3 Aspek Evaluasi Kursus
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ContentCard cardPadding="medium">
        <span class="text-xs font-semibold text-content-muted">1. Aspek Desain Tampilan</span>
        <div class="text-2xl font-black text-content-heading my-1">
          {formatDecimalScore(data.feedbackStats.designAspectAverage)}
          <span class="text-xs font-normal text-content-muted">/ 5.00</span>
        </div>
        <p class="text-xs text-content-muted">Layout Alur IPO, video player, dan kontras warna</p>
      </ContentCard>

      <ContentCard cardPadding="medium">
        <span class="text-xs font-semibold text-content-muted">2. Aspek Kelayakan Materi</span>
        <div class="text-2xl font-black text-content-heading my-1">
          {formatDecimalScore(data.feedbackStats.contentAspectAverage)}
          <span class="text-xs font-normal text-content-muted">/ 5.00</span>
        </div>
        <p class="text-xs text-content-muted">Relevansi konsep komputasi & alur sekuensial</p>
      </ContentCard>

      <ContentCard cardPadding="medium">
        <span class="text-xs font-semibold text-content-muted">3. Aspek Kemudahan (Usability)</span>
        <div class="text-2xl font-black text-content-heading my-1">
          {formatDecimalScore(data.feedbackStats.usabilityAspectAverage)}
          <span class="text-xs font-normal text-content-muted">/ 5.00</span>
        </div>
        <p class="text-xs text-content-muted">Responsivitas smartphone, navigasi, dan interaksi kuis</p>
      </ContentCard>
    </div>
  </div>

  <!-- Recent Feedbacks Table Overview -->
  <ContentCard cardPadding="none" customClass="overflow-hidden">
    <div class="flex items-center justify-between border-b border-border-subtle p-5">
      <div>
        <h3 class="text-sm font-bold text-content-heading">Ulasan Siswa Terbaru</h3>
        <p class="text-xs text-content-muted">Data testimoni dan penilaian siswa yang baru masuk</p>
      </div>
      <a
        href="/admin/responden"
        class="text-xs font-bold text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
      >
        <span>Lihat Semua ({data.feedbackStats.totalRespondentsCount})</span>
        <IconSymbol name="arrow_forward" sizeInPixels={16} />
      </a>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs sm:text-sm">
        <thead class="bg-surface-subtle border-b border-border-subtle text-xs font-bold text-content-muted uppercase tracking-wider">
          <tr>
            <th class="px-5 py-3">Mahasiswa</th>
            <th class="px-5 py-3">Rombel</th>
            <th class="px-5 py-3">Rerata Skor</th>
            <th class="px-5 py-3">Waktu</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-subtle">
          {#each data.recentFeedbacks as feedbackItem (feedbackItem.id)}
            <tr class="hover:bg-surface-hover/50 transition-colors">
              <td class="px-5 py-3.5">
                <div class="font-bold text-content-heading">{feedbackItem.studentName}</div>
                <div class="text-[11px] font-mono text-content-muted">{feedbackItem.studentIdentifier}</div>
              </td>
              <td class="px-5 py-3.5 text-content">{feedbackItem.classBatch || 'PTIK'}</td>
              <td class="px-5 py-3.5">
                <StatusBadge
                  badgeTone="amber"
                  textLabel={`${formatDecimalScore(feedbackItem.averageScore)} / 5.00`}
                />
              </td>
              <td class="px-5 py-3.5 text-xs text-content-muted font-mono">
                {formatDateToWIB(feedbackItem.createdAt)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </ContentCard>
</div>
