import type {
  QuizQuestionWithOptions,
  QuizSubmissionEvaluationResult,
  QuizStatisticsSummary,
} from './types';
import type { QuizSubmission } from '$lib/db';
import type {
  SubmitQuizAttemptDto,
  CreateQuizQuestionDto,
  UpdateQuizQuestionDto,
} from './dto';

export interface QuizPort {
  getPublishedQuizQuestions(): Promise<readonly QuizQuestionWithOptions[]>;
  getAllQuizQuestionsForAdmin(): Promise<readonly QuizQuestionWithOptions[]>;
  createQuizQuestion(inputDto: CreateQuizQuestionDto): Promise<QuizQuestionWithOptions>;
  updateQuizQuestion(questionId: string, inputDto: UpdateQuizQuestionDto): Promise<QuizQuestionWithOptions>;
  deleteQuizQuestion(questionId: string): Promise<boolean>;
  deleteQuizSubmission(submissionId: string): Promise<boolean>;
  processQuizSubmission(submissionAttempt: SubmitQuizAttemptDto): Promise<QuizSubmissionEvaluationResult>;
  getAllQuizSubmissions(): Promise<readonly QuizSubmission[]>;
  calculateQuizStatistics(): Promise<QuizStatisticsSummary>;
}
