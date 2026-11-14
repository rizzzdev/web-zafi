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
    FeedbackEditorModal,
    AdminHeader,
    ActionButton,
    StatusBadge,
    IconSymbol,
  } from '$lib/components';
  import { formatDateToWIB, formatDecimalScore } from '$lib/utils/formatters';
  import type { StudentFeedback } from '$lib/db';

  interface PageProps {
    readonly data: PageData;
    readonly form: ActionData;
  }

  const { data, form }: PageProps = $props();

  let searchQuery = $state('');
  let currentPage = $state(1);
  const itemsPerPage = 10;
  let isExportingCsv = $state(false);

  // Modal State for Create & Edit
  let isEditorModalOpen = $state(false);
  let activeEditingFeedback = $state<StudentFeedback | null>(null);

  // Deletion tracking
  let deletingFeedbackId = $state<string | null>(null);

  function handleOpenCreateModal(): void {
    activeEditingFeedback = null;
    isEditorModalOpen = true;
  }

  function handleOpenEditModal(targetFeedback: StudentFeedback): void {
    activeEditingFeedback = targetFeedback;
    isEditorModalOpen = true;
  }

  function handleCloseModal(): void {
    isEditorModalOpen = false;
    activeEditingFeedback = null;
  }

  // Client-side search filtering
  const filteredFeedbacks = $derived(
    data.allFeedbacks.filter((feedbackItem) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        feedbackItem.studentName.toLowerCase().includes(query) ||
        feedbackItem.studentIdentifier.toLowerCase().includes(query) ||
        (feedbackItem.comments && feedbackItem.comments.toLowerCase().includes(query))
      );
    })
  );

  const totalPages = $derived(Math.ceil(filteredFeedbacks.length / itemsPerPage));
  const paginatedFeedbacks = $derived(
    filteredFeedbacks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  function handleDownloadMockCsv(): void {
    const csvHeader =
      'ID,Nama Mahasiswa,NIM,Kelas,Rating Desain,Rating Materi,Rating Usability,Rerata Skor,Komentar,Waktu Submit\n';
    const csvRows = data.allFeedbacks
      .map(
        (feedbackRecord) =>
          `"${feedbackRecord.id}","${feedbackRecord.studentName}","${feedbackRecord.studentIdentifier}","${feedbackRecord.classBatch || ''}",${feedbackRecord.ratingDesign},${feedbackRecord.ratingContent},${feedbackRecord.ratingUsability},${feedbackRecord.averageScore.toString()},"sep='${(feedbackRecord.comments || '').replace(/"/g, '""')}","${formatDateToWIB(feedbackRecord.createdAt)}"`
      )
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `rekap-ulasan-siswa-${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }
</script>

<AdminHeader
  pageTitle="Ulasan & Testimoni Siswa"
  pageSubtitle="Kelola hasil evaluasi kepuasan dan testimoni siswa (CRUD Ulasan Siswa) platform EduKomputer"
/>

<div class="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8">
  <!-- Top Bar: Actions -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div>
      <h2 class="text-base sm:text-lg font-bold text-content-heading">
        Tabel Ulasan Siswa
      </h2>
      <p class="text-xs text-content-muted">
        Daftar rating kepuasan dan umpan balik siswa
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
      <ActionButton
        buttonType="button"
        variantStyle="primary"
        sizeScale="small"
        leadingIcon="add"
        onClickHandler={handleOpenCreateModal}
      >
        Tambah Ulasan
      </ActionButton>

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
          variantStyle="outline"
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
      placeholder="Cari nama, NIM, atau testimoni..."
      classNames="w-full sm:w-80"
    />
    <span class="text-xs font-semibold text-content-muted">
      Total: <strong class="text-content-heading">{filteredFeedbacks.length}</strong> data ditemukan
    </span>
  </div>

  <!-- Deterministic 4-State DataTable -->
  <DataTable
    itemsCount={paginatedFeedbacks.length}
    emptyTitle="Tidak Ada Respon Ditemukan"
    emptyDescription={searchQuery
      ? `Tidak ada data yang cocok dengan kata kunci "${searchQuery}".`
      : 'Belum ada responden yang mengisi angket.'}
  >
    {#snippet headerRow()}
      <tr>
        <th class="px-3.5 py-3">No</th>
        <th class="px-3.5 py-3">Nama & Identitas</th>
        <th class="px-3.5 py-3 hidden md:table-cell">Kelas</th>
        <th class="px-3.5 py-3 text-center hidden lg:table-cell">Desain</th>
        <th class="px-3.5 py-3 text-center hidden lg:table-cell">Materi</th>
        <th class="px-3.5 py-3 text-center hidden lg:table-cell">Usability</th>
        <th class="px-3.5 py-3 text-center">Rerata Skor</th>
        <th class="px-3.5 py-3 hidden sm:table-cell">Testimoni / Saran</th>
        <th class="px-3.5 py-3 text-right hidden xl:table-cell">Waktu Submit (WIB)</th>
        <th class="px-3.5 py-3 text-center">Aksi</th>
      </tr>
    {/snippet}

    {#snippet tableRows()}
      {#each paginatedFeedbacks as feedback, index (feedback.id)}
        <tr class="hover:bg-surface-hover/50 transition-colors border-b border-border-subtle">
          <td class="px-3.5 py-3 text-content-muted font-mono text-xs">
            {(currentPage - 1) * itemsPerPage + index + 1}
          </td>
          <td class="px-3.5 py-3">
            <div class="font-bold text-content-heading text-xs sm:text-sm">{feedback.studentName}</div>
            <div class="text-xs text-content-muted font-mono">{feedback.studentIdentifier}</div>
          </td>
          <td class="px-3.5 py-3 text-content hidden md:table-cell text-xs">
            {feedback.classBatch || 'PTIK'}
          </td>
          <td class="px-3.5 py-3 text-center font-bold text-content-heading hidden lg:table-cell text-xs">
            {feedback.ratingDesign} / 5
          </td>
          <td class="px-3.5 py-3 text-center font-bold text-content-heading hidden lg:table-cell text-xs">
            {feedback.ratingContent} / 5
          </td>
          <td class="px-3.5 py-3 text-center font-bold text-content-heading hidden lg:table-cell text-xs">
            {feedback.ratingUsability} / 5
          </td>
          <td class="px-3.5 py-3 text-center">
            <Badge variant="accent" size="sm">
              ★ {formatDecimalScore(feedback.averageScore)}
            </Badge>
          </td>
          <td class="px-3.5 py-3 text-content max-w-xs truncate hidden sm:table-cell text-xs">
            "{feedback.comments}"
          </td>
          <td class="px-3.5 py-3 text-right text-content-muted font-mono text-xs hidden xl:table-cell">
            {formatDateToWIB(feedback.createdAt)}
          </td>
          <td class="px-3.5 py-3 text-center">
            <div class="flex items-center justify-center gap-1">
              <!-- Edit Button -->
              <button
                type="button"
                onclick={() => handleOpenEditModal(feedback)}
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-content-muted hover:text-accent hover:bg-surface-hover flex items-center justify-center transition-colors cursor-pointer"
                title="Edit Respon"
                aria-label="Edit Respon Mahasiswa"
              >
                <Icon name="edit" size="sm" />
              </button>

              <!-- Delete Action Form -->
              <form
                method="POST"
                action="?/deleteFeedback"
                use:enhance={({ cancel }) => {
                  const isConfirmed = confirm(
                    `Apakah Anda yakin ingin menghapus data angket dari "${feedback.studentName}"?`
                  );
                  if (!isConfirmed) {
                    cancel();
                    return;
                  }
                  deletingFeedbackId = feedback.id;
                  return async ({ update }) => {
                    await update();
                    deletingFeedbackId = null;
                  };
                }}
              >
                <input type="hidden" name="feedbackId" value={feedback.id} />
                <button
                  type="submit"
                  disabled={deletingFeedbackId === feedback.id}
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-content-muted hover:text-status-error hover:bg-status-error-subtle flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
                  title="Hapus Respon"
                  aria-label="Hapus Respon Mahasiswa"
                >
                  <Icon name="delete" size="sm" />
                </button>
              </form>
            </div>
          </td>
        </tr>
      {/each}
    {/snippet}

    {#snippet pagination()}
      <Pagination
        {currentPage}
        {totalPages}
        totalItemsCount={filteredFeedbacks.length}
        {itemsPerPage}
        onPageChange={(targetPage) => (currentPage = targetPage)}
      />
    {/snippet}
  </DataTable>
</div>

<!-- Modal Dialog for Feedback Create / Update -->
<FeedbackEditorModal
  feedbackData={activeEditingFeedback}
  isOpen={isEditorModalOpen}
  onClose={handleCloseModal}
/>
