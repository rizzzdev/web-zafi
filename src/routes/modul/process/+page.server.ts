import type { PageServerLoad } from './$types';
import { container } from '$lib/container';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const learningModule = await container.learningModuleService.getModuleDetailBySlug('process');
  if (!learningModule) {
    throw error(404, 'Modul Unit Pemrosesan (Process) tidak ditemukan');
  }

  return {
    learningModule,
    previousModuleSlug: 'input',
    previousModuleTitle: 'Perangkat Masukan (Input)',
    nextModuleSlug: 'output',
    nextModuleTitle: 'Perangkat Keluaran (Output)',
  };
};
