import { z } from 'zod';
import { ModuleCategory } from '$lib/db';

export const updateLearningModuleSchema = z.object({
  moduleId: z.string().uuid('ID modul tidak valid'),
  title: z.string().trim().min(3, 'Judul minimal 3 karakter'),
  videoUrl: z.string().trim().url('URL video harus valid (YouTube embed atau Drive link)'),
  summaryContent: z.string().trim().min(10, 'Rangkuman materi minimal 10 karakter'),
  isPublished: z.boolean(),
});

export type UpdateLearningModuleDto = z.infer<typeof updateLearningModuleSchema>;
