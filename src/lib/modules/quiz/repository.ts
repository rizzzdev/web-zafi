import type { QuizPort } from './port';
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

export class QuizRepository {
  private readonly quizPortAdapter: QuizPort;

  public constructor(quizPortAdapter: QuizPort) {
    this.quizPortAdapter = quizPortAdapter;
  }

  public async fetchPublishedQuestions(): Promise<readonly QuizQuestionWithOptions[]> {
    return this.quizPortAdapter.getPublishedQuizQuestions();
  }

  public async fetchAllQuestionsForAdmin(): Promise<readonly QuizQuestionWithOptions[]> {
    return this.quizPortAdapter.getAllQuizQuestionsForAdmin();
  }

  public async createQuestion(inputDto: CreateQuizQuestionDto): Promise<QuizQuestionWithOptions> {
    return this.quizPortAdapter.createQuizQuestion(inputDto);
  }

  public async updateQuestion(
    questionId: string,
    inputDto: UpdateQuizQuestionDto
  ): Promise<QuizQuestionWithOptions> {
    return this.quizPortAdapter.updateQuizQuestion(questionId, inputDto);
  }

  public async deleteQuestion(questionId: string): Promise<boolean> {
    return this.quizPortAdapter.deleteQuizQuestion(questionId);
  }

  public async deleteSubmission(submissionId: string): Promise<boolean> {
    return this.quizPortAdapter.deleteQuizSubmission(submissionId);
  }

  public async submitQuizEvaluation(
    submissionAttempt: SubmitQuizAttemptDto
  ): Promise<QuizSubmissionEvaluationResult> {
    return this.quizPortAdapter.processQuizSubmission(submissionAttempt);
  }

  public async fetchAllSubmissions(): Promise<readonly QuizSubmission[]> {
    return this.quizPortAdapter.getAllQuizSubmissions();
  }

  public async fetchQuizStatistics(): Promise<QuizStatisticsSummary> {
    return this.quizPortAdapter.calculateQuizStatistics();
  }
}
