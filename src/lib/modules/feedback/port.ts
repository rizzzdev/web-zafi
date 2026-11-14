import type { StudentFeedback } from '$lib/db';
import type { FeedbackStatisticsSummary } from './types';
import type { SubmitStudentFeedbackDto, UpdateFeedbackDto } from './dto';

export interface FeedbackPort {
  recordFeedback(inputDto: SubmitStudentFeedbackDto): Promise<StudentFeedback>;
  updateFeedback(feedbackId: string, inputDto: UpdateFeedbackDto): Promise<StudentFeedback>;
  deleteFeedback(feedbackId: string): Promise<boolean>;
  getAllFeedbacks(): Promise<readonly StudentFeedback[]>;
  calculateFeedbackStatistics(): Promise<FeedbackStatisticsSummary>;
}
