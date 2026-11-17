import type { PageServerLoad, Actions } from './$types';
import { container } from '$lib/container';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const allModules = await container.learningModuleService.getAllModulesForAdmin();
  return {
    allModules,
  };
};

export const actions: Actions = {
  createModule: async ({ request }) => {
    const formData = await request.formData();
    const code = formData.get('code')?.toString() || '';
    const title = formData.get('title')?.toString() || '';
    const slug = formData.get('slug')?.toString() || '';
    const category = formData.get('category')?.toString() || 'INPUT';
    const videoUrl = formData.get('videoUrl')?.toString() || '';
    const durationInMinutes = parseInt(formData.get('durationInMinutes')?.toString() || '5', 10);
    const orderIndex = parseInt(formData.get('orderIndex')?.toString() || '1', 10);
    const summaryContent = formData.get('summaryContent')?.toString() || '';
    const isPublished = formData.get('isPublished')?.toString() === 'true';

    const creationOutcome = await container.learningModuleService.createNewModule({
      code,
      title,
      slug,
      category,
      videoUrl,
      durationInMinutes: Number.isNaN(durationInMinutes) ? 5 : durationInMinutes,
      orderIndex: Number.isNaN(orderIndex) ? 1 : orderIndex,
      summaryContent,
      isPublished,
    });

    if (!creationOutcome.isSuccess || !creationOutcome.createdModule) {
      return fail(400, {
        isSuccess: false,
        errorMessage: creationOutcome.errorMessage ?? 'Gagal membuat modul pembelajaran baru',
      });
    }

    return {
      isSuccess: true,
      createdModule: creationOutcome.createdModule,
      message: `Modul baru "${creationOutcome.createdModule.title}" berhasil ditambahkan.`,
    };
  },

  updateModule: async ({ request }) => {
    const formData = await request.formData();
    const moduleId = formData.get('moduleId')?.toString() || '';
    const title = formData.get('title')?.toString() || '';
    const videoUrl = formData.get('videoUrl')?.toString() || '';
    const summaryContent = formData.get('summaryContent')?.toString() || '';
    const isPublished = formData.get('isPublished')?.toString() === 'true';

    const updateOutcome = await container.learningModuleService.updateModuleContent({
      moduleId,
      title,
      videoUrl,
      summaryContent,
      isPublished,
    });

    if (!updateOutcome.isSuccess || !updateOutcome.updatedModule) {
      return fail(400, {
        isSuccess: false,
        errorMessage: updateOutcome.errorMessage ?? 'Gagal memperbarui konten modul',
      });
    }

    return {
      isSuccess: true,
      updatedModule: updateOutcome.updatedModule,
      message: `Modul "${updateOutcome.updatedModule.title}" berhasil diperbarui.`,
    };
  },

  deleteModule: async ({ request }) => {
    const formData = await request.formData();
    const moduleId = formData.get('moduleId')?.toString() || '';

    const deletionOutcome = await container.learningModuleService.deleteModuleById(moduleId);

    if (!deletionOutcome.isSuccess) {
      return fail(400, {
        isSuccess: false,
        errorMessage: deletionOutcome.errorMessage ?? 'Gagal menghapus modul pembelajaran',
      });
    }

    return {
      isSuccess: true,
      message: 'Modul pembelajaran berhasil dihapus.',
    };
  },
};
