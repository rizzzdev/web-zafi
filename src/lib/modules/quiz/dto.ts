import { z } from 'zod';

export const submitQuizAttemptSchema = z.object({
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
  userSelectedAnswers: z
    .record(z.string(), z.string())
    .refine((answersRecord) => Object.keys(answersRecord).length > 0, {
      message: 'Anda belum memilih jawaban kuis',
    }),
});

export type SubmitQuizAttemptDto = z.infer<typeof submitQuizAttemptSchema>;

export const quizOptionInputSchema = z.object({
  id: z.string().optional(),
  optionText: z.string().trim().min(1, 'Teks opsi pilihan jawaban wajib diisi'),
  isCorrect: z.boolean().default(false),
  orderIndex: z.number().int().default(1),
});

export type QuizOptionInputDto = z.infer<typeof quizOptionInputSchema>;

export const createQuizQuestionSchema = z.object({
  questionText: z.string().trim().min(5, 'Teks butir soal minimal 5 karakter'),
  explanation: z.string().trim().optional(),
  orderIndex: z.number().int().min(1).default(1),
  isActive: z.boolean().default(true),
  options: z
    .array(quizOptionInputSchema)
    .min(2, 'Soal pilihan ganda minimal memiliki 2 opsi')
    .refine((optionsList) => optionsList.some((optionItem) => optionItem.isCorrect), {
      message: 'Minimal salah satu opsi harus ditandai sebagai kunci jawaban benar',
    }),
});

export type CreateQuizQuestionDto = z.infer<typeof createQuizQuestionSchema>;

export const updateQuizQuestionSchema = z.object({
  questionId: z.string().min(1, 'ID soal wajib diisi'),
  questionText: z.string().trim().min(5, 'Teks butir soal minimal 5 karakter'),
  explanation: z.string().trim().optional(),
  orderIndex: z.number().int().min(1).default(1),
  isActive: z.boolean().default(true),
  options: z
    .array(quizOptionInputSchema)
    .min(2, 'Soal pilihan ganda minimal memiliki 2 opsi')
    .refine((optionsList) => optionsList.some((optionItem) => optionItem.isCorrect), {
      message: 'Minimal salah satu opsi harus ditandai sebagai kunci jawaban benar',
    }),
});

export type UpdateQuizQuestionDto = z.infer<typeof updateQuizQuestionSchema>;
