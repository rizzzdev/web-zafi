import {
  updateLearningModuleSchema,
  createLearningModuleSchema,
  type UpdateLearningModuleDto,
  type CreateLearningModuleDto,
} from './dto';

export class LearningModuleValidator {
  public static validateUpdateInput(rawInputData: {
    readonly moduleId: string;
    readonly title: string;
    readonly videoUrl: string;
    readonly summaryContent: string;
    readonly isPublished: boolean;
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: UpdateLearningModuleDto;
    readonly validationError?: string;
  } {
    const parseResult = updateLearningModuleSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage =
        parseResult.error.issues[0]?.message ?? 'Validasi pembaruan modul gagal';
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

  public static validateCreateInput(rawInputData: {
    readonly code: string;
    readonly title: string;
    readonly slug: string;
    readonly category: string;
    readonly videoUrl: string;
    readonly durationInMinutes?: number;
    readonly summaryContent: string;
    readonly orderIndex?: number;
    readonly isPublished: boolean;
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: CreateLearningModuleDto;
    readonly validationError?: string;
  } {
    const parseResult = createLearningModuleSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage =
        parseResult.error.issues[0]?.message ?? 'Validasi pembuatan modul gagal';
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
