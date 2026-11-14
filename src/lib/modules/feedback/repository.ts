import type { FeedbackPort } from './port';
import type { StudentFeedback } from '$lib/db';
import type { FeedbackStatisticsSummary } from './types';
import type { SubmitStudentFeedbackDto, UpdateFeedbackDto } from './dto';

export class FeedbackRepository {
  private readonly feedbackPortAdapter: FeedbackPort;

  public constructor(feedbackPortAdapter: FeedbackPort) {
    this.feedbackPortAdapter = feedbackPortAdapter;
  }

  public async saveStudentFeedback(inputDto: SubmitStudentFeedbackDto): Promise<StudentFeedback> {
    return this.feedbackPortAdapter.recordFeedback(inputDto);
  }

  public async updateStudentFeedback(feedbackId: string, inputDto: UpdateFeedbackDto): Promise<StudentFeedback> {
    return this.feedbackPortAdapter.updateFeedback(feedbackId, inputDto);
  }

  public async deleteStudentFeedback(feedbackId: string): Promise<boolean> {
    return this.feedbackPortAdapter.deleteFeedback(feedbackId);
  }

  public async fetchAllFeedbacks(): Promise<readonly StudentFeedback[]> {
    return this.feedbackPortAdapter.getAllFeedbacks();
  }

  public async fetchFeedbackStatistics(): Promise<FeedbackStatisticsSummary> {
    return this.feedbackPortAdapter.calculateFeedbackStatistics();
  }
}
