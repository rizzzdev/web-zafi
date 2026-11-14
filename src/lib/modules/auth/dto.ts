import { z } from 'zod';

export const loginInputSchema = z.object({
  emailAddress: z
    .string()
    .trim()
    .min(1, 'Email tidak boleh kosong')
    .email('Format email tidak valid'),
  plainPassword: z
    .string()
    .min(6, 'Kata sandi minimal 6 karakter'),
});

export type LoginInputDto = z.infer<typeof loginInputSchema>;
