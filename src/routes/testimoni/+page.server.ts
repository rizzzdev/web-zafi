import type { PageServerLoad, Actions } from './$types';
import { container } from '$lib/container';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const feedbackStatisticsSummary = await container.feedbackService.getFeedbackMetricsForDashboard();
  return {
    totalRespondentsCount: feedbackStatisticsSummary.totalRespondentsCount,
  };
};

export const actions: Actions = {
  submitFeedback: async ({ request }) => {
    const formData = await request.formData();
    const studentFullName = formData.get('studentFullName')?.toString() || '';
    const studentIdentifier = formData.get('studentIdentifier')?.toString() || '';
    const classBatch = formData.get('classBatch')?.toString() || 'PTIK 2023';

    const ratingDesign = parseInt(formData.get('ratingDesign')?.toString() || '0', 10);
    const ratingContent = parseInt(formData.get('ratingContent')?.toString() || '0', 10);
    const ratingUsability = parseInt(formData.get('ratingUsability')?.toString() || '0', 10);
    const comments = formData.get('comments')?.toString() || '';

    const feedbackOutcome = await container.feedbackService.submitFeedback({
      studentFullName,
      studentIdentifier,
      classBatch,
      ratingDesign,
      ratingContent,
      ratingUsability,
      comments,
    });

    if (!feedbackOutcome.isSuccess || !feedbackOutcome.feedbackRecord) {
      return fail(400, {
        isSuccess: false,
        errorMessage: feedbackOutcome.errorMessage ?? 'Gagal menyimpan angket penilaian',
        studentFullName,
        studentIdentifier,
        classBatch,
        ratingDesign,
        ratingContent,
        ratingUsability,
        comments,
      });
    }

    return {
      isSuccess: true,
      feedbackRecord: feedbackOutcome.feedbackRecord,
    };
  },
};
