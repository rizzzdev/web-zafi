import { FeedbackRepository } from './repository';
import { FeedbackValidator } from './validator';
import type { FeedbackStatisticsSummary } from './types';
import type { StudentFeedback } from '$lib/db';

export class FeedbackService {
  private readonly feedbackRepository: FeedbackRepository;

  public constructor(feedbackRepository: FeedbackRepository) {
    this.feedbackRepository = feedbackRepository;
  }

  public async submitFeedback(rawInputData: {
    readonly studentFullName: string;
    readonly studentIdentifier: string;
    readonly classBatch?: string;
    readonly ratingDesign: number;
    readonly ratingContent: number;
    readonly ratingUsability: number;
    readonly comments: string;
  }): Promise<{
    readonly isSuccess: boolean;
    readonly feedbackRecord?: StudentFeedback;
    readonly errorMessage?: string;
  }> {
    const validationResult = FeedbackValidator.validateFeedbackSubmission(rawInputData);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Validasi angket feedback gagal',
      };
    }

    const feedbackRecord = await this.feedbackRepository.saveStudentFeedback(validationResult.validatedData);
    return {
      isSuccess: true,
      feedbackRecord,
    };
  }

  public async updateFeedbackRecord(rawInputData: {
    readonly feedbackId: string;
    readonly studentFullName: string;
    readonly studentIdentifier: string;
    readonly classBatch?: string;
    readonly ratingDesign: number;
    readonly ratingContent: number;
    readonly ratingUsability: number;
    readonly comments: string;
  }): Promise<{
    readonly isSuccess: boolean;
    readonly feedbackRecord?: StudentFeedback;
    readonly errorMessage?: string;
  }> {
    const validationResult = FeedbackValidator.validateFeedbackUpdate(rawInputData);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Validasi pembaruan angket gagal',
      };
    }

    try {
      const feedbackRecord = await this.feedbackRepository.updateStudentFeedback(
        rawInputData.feedbackId,
        validationResult.validatedData
      );
      return {
        isSuccess: true,
        feedbackRecord,
      };
    } catch (operationError) {
      const errorMessage = operationError instanceof Error ? operationError.message : 'Gagal memperbarui data angket';
      return {
        isSuccess: false,
        errorMessage,
      };
    }
  }

  public async deleteFeedbackRecord(feedbackId: string): Promise<{
    readonly isSuccess: boolean;
    readonly errorMessage?: string;
  }> {
    if (!feedbackId || feedbackId.trim().length === 0) {
      return {
        isSuccess: false,
        errorMessage: 'ID angket tidak valid',
      };
    }

    const isDeleted = await this.feedbackRepository.deleteStudentFeedback(feedbackId);
    if (!isDeleted) {
      return {
        isSuccess: false,
        errorMessage: 'Data angket tidak ditemukan atau sudah dihapus',
      };
    }

    return {
      isSuccess: true,
    };
  }

  public async getAllFeedbacksForAdmin(): Promise<readonly StudentFeedback[]> {
    return this.feedbackRepository.fetchAllFeedbacks();
  }

  public async getFeedbackMetricsForDashboard(): Promise<FeedbackStatisticsSummary> {
    return this.feedbackRepository.fetchFeedbackStatistics();
  }
}
