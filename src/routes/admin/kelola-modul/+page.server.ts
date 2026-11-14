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
};
