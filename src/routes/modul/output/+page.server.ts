import type { PageServerLoad } from './$types';
import { container } from '$lib/container';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const learningModule = await container.learningModuleService.getModuleDetailBySlug('output');
  if (!learningModule) {
    throw error(404, 'Modul Perangkat Keluaran (Output) tidak ditemukan');
  }

  return {
    learningModule,
    previousModuleSlug: 'process',
    previousModuleTitle: 'Unit Pemrosesan Inti (Process)',
    nextModuleSlug: 'storage-software',
    nextModuleTitle: 'Penyimpanan & Perangkat Lunak',
  };
};
