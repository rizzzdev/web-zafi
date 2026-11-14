import {
  submitQuizAttemptSchema,
  createQuizQuestionSchema,
  updateQuizQuestionSchema,
  type SubmitQuizAttemptDto,
  type CreateQuizQuestionDto,
  type UpdateQuizQuestionDto,
} from './dto';

export class QuizValidator {
  public static validateQuizSubmission(rawInputData: {
    readonly studentFullName: string;
    readonly studentIdentifier: string;
    readonly classBatch?: string;
    readonly userSelectedAnswers: Record<string, string>;
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: SubmitQuizAttemptDto;
    readonly validationError?: string;
  } {
    const parseResult = submitQuizAttemptSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message ?? 'Validasi pengerjaan kuis gagal';
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

  public static validateCreateQuestion(rawInputData: {
    readonly questionText: string;
    readonly explanation?: string;
    readonly orderIndex: number;
    readonly isActive: boolean;
    readonly options: readonly {
      readonly id?: string;
      readonly optionText: string;
      readonly isCorrect: boolean;
      readonly orderIndex: number;
    }[];
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: CreateQuizQuestionDto;
    readonly validationError?: string;
  } {
    const parseResult = createQuizQuestionSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message ?? 'Validasi pembuatan soal gagal';
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

  public static validateUpdateQuestion(rawInputData: {
    readonly questionId: string;
    readonly questionText: string;
    readonly explanation?: string;
    readonly orderIndex: number;
    readonly isActive: boolean;
    readonly options: readonly {
      readonly id?: string;
      readonly optionText: string;
      readonly isCorrect: boolean;
      readonly orderIndex: number;
    }[];
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: UpdateQuizQuestionDto;
    readonly validationError?: string;
  } {
    const parseResult = updateQuizQuestionSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message ?? 'Validasi pembaruan soal gagal';
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
