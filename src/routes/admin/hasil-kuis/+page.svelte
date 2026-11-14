<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  import {
    DataTable,
    Button,
    SearchInput,
    Pagination,
    Badge,
    Alert,
    Icon,
    AdminHeader,
    ActionButton,
    StatusBadge,
    IconSymbol,
  } from '$lib/components';
  import { formatDateToWIB } from '$lib/utils/formatters';

  interface PageProps {
    readonly data: PageData;
    readonly form: ActionData;
  }

  const { data, form }: PageProps = $props();

  let searchQuery = $state('');
  let currentPage = $state(1);
  const itemsPerPage = 10;
  let isExportingCsv = $state(false);
  let deletingSubmissionId = $state<string | null>(null);

  const filteredSubmissions = $derived(
    data.allQuizSubmissions.filter((submissionItem) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        submissionItem.studentName.toLowerCase().includes(query) ||
        submissionItem.studentIdentifier.toLowerCase().includes(query)
      );
    })
  );

  const totalPages = $derived(Math.ceil(filteredSubmissions.length / itemsPerPage));
  const paginatedSubmissions = $derived(
    filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  function handleDownloadMockCsv(): void {
    const csvHeader = 'ID,Nama Mahasiswa,NIM,Kelas,Jawaban Benar,Total Soal,Nilai Akhir,Waktu Pengerjaan\n';
    const csvRows = data.allQuizSubmissions
      .map(
        (submissionRecord) =>
          `"${submissionRecord.id}","${submissionRecord.studentName}","${submissionRecord.studentIdentifier}","${submissionRecord.classBatch || ''}",${submissionRecord.correctAnswers},${submissionRecord.totalQuestions},${submissionRecord.score},"${formatDateToWIB(submissionRecord.createdAt)}"`
      )
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `rekap-nilai-kuis-${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }
</script>

<AdminHeader
  pageTitle="Hasil & Performa Kuis Siswa"
  pageSubtitle="Data evaluasi pemahaman siswa pada materi sistem komputer dan kursus digital"
/>

<div class="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8">
  <!-- Top Bar: Action Buttons -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h2 class="text-base sm:text-lg font-bold text-content-heading">
        Tabel Submisi Mahasiswa
      </h2>
      <p class="text-xs text-content-muted">
        Nilai dan rincian waktu submit pengerjaan kuis
      </p>
    </div>

    <div class="flex items-center gap-2.5 self-start sm:self-auto">
      <a href="/admin/kelola-kuis">
        <ActionButton variantStyle="outline" sizeScale="small" leadingIcon="quiz">
          Bank Soal
        </ActionButton>
      </a>

      <form
        method="POST"
        action="?/exportCsv"
        use:enhance={() => {
          isExportingCsv = true;
          return async ({ update }) => {
            await update();
            isExportingCsv = false;
            handleDownloadMockCsv();
          };
        }}
      >
        <ActionButton
          buttonType="submit"
          variantStyle="primary"
          sizeScale="small"
          leadingIcon="download"
          isLoading={isExportingCsv}
          loadingText="Exporting..."
        >
          Export CSV
        </ActionButton>
      </form>
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
      placeholder="Cari nama atau NIM mahasiswa..."
      classNames="w-full sm:w-80"
    />
    <span class="text-xs font-semibold text-content-muted">
      Total: <strong class="text-content-heading">{filteredSubmissions.length}</strong> catatan
    </span>
  </div>

  <!-- Deterministic 4-State DataTable -->
  <DataTable
    itemsCount={paginatedSubmissions.length}
    emptyTitle="Tidak Ada Hasil Kuis Ditemukan"
    emptyDescription={searchQuery ? `Tidak ada data yang cocok dengan kata kunci "${searchQuery}".` : 'Belum ada mahasiswa yang menyelesaikan kuis.'}
  >
    {#snippet headerRow()}
      <tr>
        <th class="px-3.5 py-3">No</th>
        <th class="px-3.5 py-3">Nama & Identitas</th>
        <th class="px-3.5 py-3 hidden sm:table-cell">Kelas</th>
        <th class="px-3.5 py-3 text-center hidden md:table-cell">Akurasi Jawaban</th>
        <th class="px-3.5 py-3 text-center">Nilai Akhir</th>
        <th class="px-3.5 py-3 text-right hidden lg:table-cell">Waktu Submit (WIB)</th>
        <th class="px-3.5 py-3 text-center">Aksi</th>
      </tr>
    {/snippet}

    {#snippet tableRows()}
      {#each paginatedSubmissions as submissionRecord, index (submissionRecord.id)}
        <tr class="hover:bg-surface-hover/50 transition-colors border-b border-border-subtle">
          <td class="px-3.5 py-3 text-content-muted font-mono text-xs">
            {(currentPage - 1) * itemsPerPage + index + 1}
          </td>
          <td class="px-3.5 py-3">
            <div class="font-bold text-content-heading text-xs sm:text-sm">{submissionRecord.studentName}</div>
            <div class="text-xs text-content-muted font-mono">{submissionRecord.studentIdentifier}</div>
          </td>
          <td class="px-3.5 py-3 text-content hidden sm:table-cell text-xs">
            {submissionRecord.classBatch || 'PTIK'}
          </td>
          <td class="px-3.5 py-3 text-center font-semibold text-content hidden md:table-cell text-xs">
            {submissionRecord.correctAnswers} / {submissionRecord.totalQuestions} Benar
          </td>
          <td class="px-3.5 py-3 text-center">
            <Badge variant={submissionRecord.score >= 80 ? 'success' : submissionRecord.score >= 60 ? 'accent' : 'error'} size="sm">
              {submissionRecord.score} / 100
            </Badge>
          </td>
          <td class="px-3.5 py-3 text-right text-content-muted font-mono text-xs hidden lg:table-cell">
            {formatDateToWIB(submissionRecord.createdAt)}
          </td>
          <td class="px-3.5 py-3 text-center">
            <form
              method="POST"
              action="?/deleteSubmission"
              use:enhance={({ cancel }) => {
                const isConfirmed = confirm(
                  `Apakah Anda yakin ingin menghapus hasil kuis dari mahasiswa "${submissionRecord.studentName}"?`
                );
                if (!isConfirmed) {
                  cancel();
                  return;
                }
                deletingSubmissionId = submissionRecord.id;
                return async ({ update }) => {
                  await update();
                  deletingSubmissionId = null;
                };
              }}
            >
              <input type="hidden" name="submissionId" value={submissionRecord.id} />
              <button
                type="submit"
                disabled={deletingSubmissionId === submissionRecord.id}
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-content-muted hover:text-status-error hover:bg-status-error-subtle flex items-center justify-center transition-colors disabled:opacity-50 mx-auto cursor-pointer"
                title="Hapus Catatan Kuis"
                aria-label="Hapus Catatan Kuis Mahasiswa"
              >
                <Icon name="delete" size="sm" />
              </button>
            </form>
          </td>
        </tr>
      {/each}
    {/snippet}

    {#snippet pagination()}
      <Pagination
        {currentPage}
        {totalPages}
        totalItemsCount={filteredSubmissions.length}
        {itemsPerPage}
        onPageChange={(targetPage) => (currentPage = targetPage)}
      />
    {/snippet}
  </DataTable>
</div>
