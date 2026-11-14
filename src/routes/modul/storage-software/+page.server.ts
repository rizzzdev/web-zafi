import type { PageServerLoad } from './$types';
import { container } from '$lib/container';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const learningModule = await container.learningModuleService.getModuleDetailBySlug('storage-software');
  if (!learningModule) {
    throw error(404, 'Modul Media Penyimpanan & Software tidak ditemukan');
  }

  return {
    learningModule,
    previousModuleSlug: 'output',
    previousModuleTitle: 'Perangkat Keluaran (Output)',
    nextModuleSlug: null,
  };
};
