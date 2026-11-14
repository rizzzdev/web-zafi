import type { PageServerLoad } from './$types';
import { container } from '$lib/container';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const learningModule = await container.learningModuleService.getModuleDetailBySlug('input');
  if (!learningModule) {
    throw error(404, 'Modul Perangkat Masukan (Input) tidak ditemukan');
  }

  return {
    learningModule,
    previousModuleSlug: null,
    nextModuleSlug: 'process',
    nextModuleTitle: 'Unit Pemrosesan Inti (Processing Unit)',
  };
};
