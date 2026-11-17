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

export const createLearningModuleSchema = z.object({
  code: z.string().trim().min(2, 'Kode modul minimal 2 karakter').toUpperCase(),
  title: z.string().trim().min(3, 'Judul minimal 3 karakter'),
  slug: z.string().trim().min(2, 'Slug minimal 2 karakter').toLowerCase(),
  category: z.nativeEnum(ModuleCategory),
  videoUrl: z.string().trim().url('URL video harus valid (YouTube embed atau Drive link)'),
  durationInMinutes: z.number().int().min(1).default(5),
  summaryContent: z.string().trim().min(10, 'Rangkuman materi minimal 10 karakter'),
  orderIndex: z.number().int().min(1).default(1),
  isPublished: z.boolean().default(true),
});

export type CreateLearningModuleDto = z.infer<typeof createLearningModuleSchema>;
