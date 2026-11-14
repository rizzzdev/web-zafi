import type { PageServerLoad } from './$types';
import { container } from '$lib/container';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const currentSlug = params.slug;
  const learningModule = await container.learningModuleService.getModuleDetailBySlug(currentSlug);

  if (!learningModule) {
    throw error(404, `Modul pembelajaran dengan slug "${currentSlug}" tidak ditemukan.`);
  }

  const allPublishedModules = await container.learningModuleService.getAllPublishedModules();
  const currentIndex = allPublishedModules.findIndex((m) => m.slug === currentSlug);

  const previousModule = currentIndex > 0 ? allPublishedModules[currentIndex - 1] : null;
  const nextModule =
    currentIndex >= 0 && currentIndex < allPublishedModules.length - 1
      ? allPublishedModules[currentIndex + 1]
      : null;

  return {
    learningModule,
    previousModule,
    nextModule,
    relatedModules: allPublishedModules.filter((m) => m.slug !== currentSlug).slice(0, 3),
  };
};
