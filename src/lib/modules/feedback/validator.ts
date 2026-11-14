import {
  submitStudentFeedbackSchema,
  updateFeedbackSchema,
  type SubmitStudentFeedbackDto,
  type UpdateFeedbackDto,
} from './dto';

export class FeedbackValidator {
  public static validateFeedbackSubmission(rawInputData: {
    readonly studentFullName: string;
    readonly studentIdentifier: string;
    readonly classBatch?: string;
    readonly ratingDesign: number;
    readonly ratingContent: number;
    readonly ratingUsability: number;
    readonly comments: string;
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: SubmitStudentFeedbackDto;
    readonly validationError?: string;
  } {
    const parseResult = submitStudentFeedbackSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message ?? 'Validasi angket feedback gagal';
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

  public static validateFeedbackUpdate(rawInputData: {
    readonly feedbackId: string;
    readonly studentFullName: string;
    readonly studentIdentifier: string;
    readonly classBatch?: string;
    readonly ratingDesign: number;
    readonly ratingContent: number;
    readonly ratingUsability: number;
    readonly comments: string;
  }): {
    readonly isSuccess: boolean;
    readonly validatedData?: UpdateFeedbackDto;
    readonly validationError?: string;
  } {
    const parseResult = updateFeedbackSchema.safeParse(rawInputData);
    if (!parseResult.success) {
      const firstErrorMessage = parseResult.error.issues[0]?.message ?? 'Validasi pembaruan angket gagal';
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
