import type { PageServerLoad } from './$types';
import { container } from '$lib/container';

export const load: PageServerLoad = async () => {
  const publishedLearningModules = await container.learningModuleService.getAllPublishedModules();
  return {
    publishedLearningModules,
  };
};
