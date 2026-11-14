import type { PageServerLoad, Actions } from './$types';
import { container } from '$lib/container';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const allFeedbacks = await container.feedbackService.getAllFeedbacksForAdmin();
  return {
    allFeedbacks,
  };
};

export const actions: Actions = {
  createFeedback: async ({ request }) => {
    const formData = await request.formData();
    const studentFullName = formData.get('studentFullName')?.toString() || '';
    const studentIdentifier = formData.get('studentIdentifier')?.toString() || '';
    const classBatch = formData.get('classBatch')?.toString() || undefined;
    const ratingDesign = parseInt(formData.get('ratingDesign')?.toString() || '5', 10);
    const ratingContent = parseInt(formData.get('ratingContent')?.toString() || '5', 10);
    const ratingUsability = parseInt(formData.get('ratingUsability')?.toString() || '5', 10);
    const comments = formData.get('comments')?.toString() || '';

    const submissionOutcome = await container.feedbackService.submitFeedback({
      studentFullName,
      studentIdentifier,
      classBatch,
      ratingDesign,
      ratingContent,
      ratingUsability,
      comments,
    });

    if (!submissionOutcome.isSuccess || !submissionOutcome.feedbackRecord) {
      return fail(400, {
        isSuccess: false,
        errorMessage: submissionOutcome.errorMessage ?? 'Gagal menambahkan data respon angket',
      });
    }

    return {
      isSuccess: true,
      message: `Respon angket untuk "${submissionOutcome.feedbackRecord.studentName}" berhasil ditambahkan.`,
    };
  },

  updateFeedback: async ({ request }) => {
    const formData = await request.formData();
    const feedbackId = formData.get('feedbackId')?.toString() || '';
    const studentFullName = formData.get('studentFullName')?.toString() || '';
    const studentIdentifier = formData.get('studentIdentifier')?.toString() || '';
    const classBatch = formData.get('classBatch')?.toString() || undefined;
    const ratingDesign = parseInt(formData.get('ratingDesign')?.toString() || '5', 10);
    const ratingContent = parseInt(formData.get('ratingContent')?.toString() || '5', 10);
    const ratingUsability = parseInt(formData.get('ratingUsability')?.toString() || '5', 10);
    const comments = formData.get('comments')?.toString() || '';

    const updateOutcome = await container.feedbackService.updateFeedbackRecord({
      feedbackId,
      studentFullName,
      studentIdentifier,
      classBatch,
      ratingDesign,
      ratingContent,
      ratingUsability,
      comments,
    });

    if (!updateOutcome.isSuccess || !updateOutcome.feedbackRecord) {
      return fail(400, {
        isSuccess: false,
        errorMessage: updateOutcome.errorMessage ?? 'Gagal memperbarui data angket',
      });
    }

    return {
      isSuccess: true,
      message: `Data angket "${updateOutcome.feedbackRecord.studentName}" berhasil diperbarui.`,
    };
  },

  deleteFeedback: async ({ request }) => {
    const formData = await request.formData();
    const feedbackId = formData.get('feedbackId')?.toString() || '';

    const deleteOutcome = await container.feedbackService.deleteFeedbackRecord(feedbackId);
    if (!deleteOutcome.isSuccess) {
      return fail(400, {
        isSuccess: false,
        errorMessage: deleteOutcome.errorMessage ?? 'Gagal menghapus data angket',
      });
    }

    return {
      isSuccess: true,
      message: 'Data angket berhasil dihapus.',
    };
  },

  exportCsv: async () => {
    const exportTask = await container.taskLifecycleService.startExportTask('feedbacks-export');
    return {
      isSuccess: true,
      exportTaskId: exportTask.taskId,
      message: 'Ekspor data responden berhasil disiapkan dalam format CSV.',
    };
  },
};
