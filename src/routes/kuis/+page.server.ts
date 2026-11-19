import type { PageServerLoad, Actions } from './$types';
import { container } from '$lib/container';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const publishedQuestionsList = await container.quizService.getQuizQuestionsForStudent();
  return {
    publishedQuestionsList,
  };
};

export const actions: Actions = {
  submitQuiz: async ({ request }) => {
    const formData = await request.formData();
    const rawStudentFullName = formData.get('studentFullName')?.toString().trim() || '';
    const rawStudentIdentifier = formData.get('studentIdentifier')?.toString().trim() || '';
    const rawClassBatch = formData.get('classBatch')?.toString().trim() || '';

    const studentFullName = rawStudentFullName.length >= 3 ? rawStudentFullName : 'Peserta EduKomputer';
    const studentIdentifier = rawStudentIdentifier.length >= 5 ? rawStudentIdentifier : `TAMU-${Date.now().toString().slice(-6)}`;
    const classBatch = rawClassBatch.length > 0 ? rawClassBatch : 'PTIK 2023 A';

    // Parse all selected options: keys matching question IDs
    const userSelectedAnswers: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('question_')) {
        const questionId = key.replace('question_', '');
        userSelectedAnswers[questionId] = value.toString();
      }
    }

    const evaluationOutcome = await container.quizService.submitQuizAttempt({
      studentFullName,
      studentIdentifier,
      classBatch,
      userSelectedAnswers,
    });

    if (!evaluationOutcome.isSuccess || !evaluationOutcome.evaluationResult) {
      return fail(400, {
        isSuccess: false,
        errorMessage: evaluationOutcome.errorMessage ?? 'Gagal memproses pengerjaan kuis',
        studentFullName,
        studentIdentifier,
        classBatch,
      });
    }

    return {
      isSuccess: true,
      evaluationResult: evaluationOutcome.evaluationResult,
    };
  },
};
