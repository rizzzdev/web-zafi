import type { PageServerLoad, Actions } from './$types';
import { container } from '$lib/container';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const allQuizSubmissions = await container.quizService.getSubmissionsForAdmin();
  return {
    allQuizSubmissions,
  };
};

export const actions: Actions = {
  deleteSubmission: async ({ request }) => {
    const formData = await request.formData();
    const submissionId = formData.get('submissionId')?.toString() || '';

    const deletionOutcome = await container.quizService.deleteSubmission(submissionId);
    if (!deletionOutcome.isSuccess) {
      return fail(400, {
        isSuccess: false,
        errorMessage: deletionOutcome.errorMessage ?? 'Gagal menghapus submisi kuis',
      });
    }

    return {
      isSuccess: true,
      message: 'Data hasil kuis mahasiswa berhasil dihapus.',
    };
  },

  exportCsv: async () => {
    const exportTask = await container.taskLifecycleService.startExportTask('quiz-submissions-export');
    return {
      isSuccess: true,
      exportTaskId: exportTask.taskId,
      message: 'Ekspor rekap hasil kuis berhasil disiapkan dalam format CSV.',
    };
  },
};
