import type { PageServerLoad, Actions } from './$types';
import { container } from '$lib/container';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const allQuestions = await container.quizService.getAllQuestionsForAdmin();
  return {
    allQuestions,
  };
};

export const actions: Actions = {
  createQuestion: async ({ request }) => {
    const formData = await request.formData();
    const questionText = formData.get('questionText')?.toString() || '';
    const explanation = formData.get('explanation')?.toString() || undefined;
    const orderIndex = parseInt(formData.get('orderIndex')?.toString() || '1', 10);
    const isActive = formData.get('isActive')?.toString() === 'true';
    const rawOptionsJson = formData.get('optionsJson')?.toString() || '[]';

    let parsedOptions: Array<{
      readonly id?: string;
      readonly optionText: string;
      readonly isCorrect: boolean;
      readonly orderIndex: number;
    }> = [];

    try {
      parsedOptions = JSON.parse(rawOptionsJson);
    } catch {
      return fail(400, {
        isSuccess: false,
        errorMessage: 'Format data opsi pilihan jawaban tidak valid',
      });
    }

    const creationOutcome = await container.quizService.createQuestion({
      questionText,
      explanation,
      orderIndex,
      isActive,
      options: parsedOptions,
    });

    if (!creationOutcome.isSuccess || !creationOutcome.createdQuestion) {
      return fail(400, {
        isSuccess: false,
        errorMessage: creationOutcome.errorMessage ?? 'Gagal membuat butir soal kuis',
      });
    }

    return {
      isSuccess: true,
      message: `Soal nomor urut ${creationOutcome.createdQuestion.orderIndex} berhasil ditambahkan ke bank kuis.`,
    };
  },

  updateQuestion: async ({ request }) => {
    const formData = await request.formData();
    const questionId = formData.get('questionId')?.toString() || '';
    const questionText = formData.get('questionText')?.toString() || '';
    const explanation = formData.get('explanation')?.toString() || undefined;
    const orderIndex = parseInt(formData.get('orderIndex')?.toString() || '1', 10);
    const isActive = formData.get('isActive')?.toString() === 'true';
    const rawOptionsJson = formData.get('optionsJson')?.toString() || '[]';

    let parsedOptions: Array<{
      readonly id?: string;
      readonly optionText: string;
      readonly isCorrect: boolean;
      readonly orderIndex: number;
    }> = [];

    try {
      parsedOptions = JSON.parse(rawOptionsJson);
    } catch {
      return fail(400, {
        isSuccess: false,
        errorMessage: 'Format data opsi pilihan jawaban tidak valid',
      });
    }

    const updateOutcome = await container.quizService.updateQuestion({
      questionId,
      questionText,
      explanation,
      orderIndex,
      isActive,
      options: parsedOptions,
    });

    if (!updateOutcome.isSuccess || !updateOutcome.updatedQuestion) {
      return fail(400, {
        isSuccess: false,
        errorMessage: updateOutcome.errorMessage ?? 'Gagal memperbarui butir soal kuis',
      });
    }

    return {
      isSuccess: true,
      message: `Soal nomor urut ${updateOutcome.updatedQuestion.orderIndex} berhasil diperbarui.`,
    };
  },

  deleteQuestion: async ({ request }) => {
    const formData = await request.formData();
    const questionId = formData.get('questionId')?.toString() || '';

    const deletionOutcome = await container.quizService.deleteQuestion(questionId);
    if (!deletionOutcome.isSuccess) {
      return fail(400, {
        isSuccess: false,
        errorMessage: deletionOutcome.errorMessage ?? 'Gagal menghapus butir soal kuis',
      });
    }

    return {
      isSuccess: true,
      message: 'Butir soal kuis berhasil dihapus.',
    };
  },
};
