import { updateLearningModuleSchema, type UpdateLearningModuleDto } from './dto';

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
      const firstErrorMessage = parseResult.error.issues[0]?.message ?? 'Validasi pembaruan modul gagal';
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
