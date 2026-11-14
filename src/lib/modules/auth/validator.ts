import { loginInputSchema, type LoginInputDto } from './dto';

export class AuthValidator {
  public static validateLoginInput(rawInputData: {
    readonly emailAddress: string;
    readonly plainPassword: string;
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: LoginInputDto;
    readonly validationError?: string;
  } {
    const parseResult = loginInputSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message ?? 'Validasi input gagal';
      return {
        isSuccess: false,
        validationError: firstErrorMessage,
      };
    }

    return {
      isSuccess: true,
      validatedData: parseResult.data,
    };
  }
}
