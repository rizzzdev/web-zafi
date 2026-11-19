import { z } from 'zod';

export const submitStudentFeedbackSchema = z.object({
  studentFullName: z
    .string()
    .trim()
    .min(3, 'Nama lengkap mahasiswa minimal 3 karakter'),
  studentIdentifier: z
    .string()
    .trim()
    .min(5, 'Nomor Induk Mahasiswa (NIM) minimal 5 karakter'),
  classBatch: z
    .string()
    .trim()
    .optional(),
  ratingDesign: z
    .number()
    .int()
    .min(1, 'Rating aspek desain minimal 1')
    .max(5, 'Rating aspek desain maksimal 5'),
  ratingContent: z
    .number()
    .int()
    .min(1, 'Rating aspek materi minimal 1')
    .max(5, 'Rating aspek materi maksimal 5'),
  ratingUsability: z
    .number()
    .int()
    .min(1, 'Rating aspek kegunaan minimal 1')
    .max(5, 'Rating aspek kegunaan maksimal 5'),
  comments: z
    .string()
    .trim()
    .optional()
    .default(''),
});

export type SubmitStudentFeedbackDto = z.infer<typeof submitStudentFeedbackSchema>;

export const createFeedbackSchema = submitStudentFeedbackSchema;
export type CreateFeedbackDto = SubmitStudentFeedbackDto;

export const updateFeedbackSchema = z.object({
  feedbackId: z.string().min(1, 'ID feedback wajib diisi'),
  studentFullName: z
    .string()
    .trim()
    .min(3, 'Nama lengkap mahasiswa minimal 3 karakter'),
  studentIdentifier: z
    .string()
    .trim()
    .min(5, 'Nomor Induk Mahasiswa (NIM) minimal 5 karakter'),
  classBatch: z
    .string()
    .trim()
    .optional(),
  ratingDesign: z
    .number()
    .int()
    .min(1, 'Rating aspek desain minimal 1')
    .max(5, 'Rating aspek desain maksimal 5'),
  ratingContent: z
    .number()
    .int()
    .min(1, 'Rating aspek materi minimal 1')
    .max(5, 'Rating aspek materi maksimal 5'),
  ratingUsability: z
    .number()
    .int()
    .min(1, 'Rating aspek kegunaan minimal 1')
    .max(5, 'Rating aspek kegunaan maksimal 5'),
  comments: z
    .string()
    .trim()
    .optional()
    .default(''),
});

export type UpdateFeedbackDto = z.infer<typeof updateFeedbackSchema>;
