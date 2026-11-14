import { QuizRepository } from './repository';
import { QuizValidator } from './validator';
import type {
  QuizQuestionWithOptions,
  QuizSubmissionEvaluationResult,
  QuizStatisticsSummary,
} from './types';
import type { QuizSubmission } from '$lib/db';

export class QuizService {
  private readonly quizRepository: QuizRepository;

  public constructor(quizRepository: QuizRepository) {
    this.quizRepository = quizRepository;
  }

  public async getQuizQuestionsForStudent(): Promise<readonly QuizQuestionWithOptions[]> {
    return this.quizRepository.fetchPublishedQuestions();
  }

  public async getAllQuestionsForAdmin(): Promise<readonly QuizQuestionWithOptions[]> {
    return this.quizRepository.fetchAllQuestionsForAdmin();
  }

  public async createQuestion(rawInputData: {
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
  }): Promise<{
    readonly isSuccess: boolean;
    readonly createdQuestion?: QuizQuestionWithOptions;
    readonly errorMessage?: string;
  }> {
    const validationResult = QuizValidator.validateCreateQuestion(rawInputData);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Validasi pembuatan butir soal gagal',
      };
    }

    try {
      const createdQuestion = await this.quizRepository.createQuestion(validationResult.validatedData);
      return {
        isSuccess: true,
        createdQuestion,
      };
    } catch (operationError) {
      const errorMessage = operationError instanceof Error ? operationError.message : 'Gagal membuat butir soal kuis';
      return {
        isSuccess: false,
        errorMessage,
      };
    }
  }

  public async updateQuestion(rawInputData: {
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
  }): Promise<{
    readonly isSuccess: boolean;
    readonly updatedQuestion?: QuizQuestionWithOptions;
    readonly errorMessage?: string;
  }> {
    const validationResult = QuizValidator.validateUpdateQuestion(rawInputData);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Validasi pembaruan butir soal gagal',
      };
    }

    try {
      const updatedQuestion = await this.quizRepository.updateQuestion(
        rawInputData.questionId,
        validationResult.validatedData
      );
      return {
        isSuccess: true,
        updatedQuestion,
      };
    } catch (operationError) {
      const errorMessage = operationError instanceof Error ? operationError.message : 'Gagal memperbarui butir soal kuis';
      return {
        isSuccess: false,
        errorMessage,
      };
    }
  }

  public async deleteQuestion(questionId: string): Promise<{
    readonly isSuccess: boolean;
    readonly errorMessage?: string;
  }> {
    if (!questionId || questionId.trim().length === 0) {
      return {
        isSuccess: false,
        errorMessage: 'ID soal tidak valid',
      };
    }

    const isDeleted = await this.quizRepository.deleteQuestion(questionId);
    if (!isDeleted) {
      return {
        isSuccess: false,
        errorMessage: 'Butir soal kuis tidak ditemukan atau sudah dihapus',
      };
    }

    return {
      isSuccess: true,
    };
  }

  public async deleteSubmission(submissionId: string): Promise<{
    readonly isSuccess: boolean;
    readonly errorMessage?: string;
  }> {
    if (!submissionId || submissionId.trim().length === 0) {
      return {
        isSuccess: false,
        errorMessage: 'ID submisi kuis tidak valid',
      };
    }

    const isDeleted = await this.quizRepository.deleteSubmission(submissionId);
    if (!isDeleted) {
      return {
        isSuccess: false,
        errorMessage: 'Data hasil kuis tidak ditemukan atau sudah dihapus',
      };
    }

    return {
      isSuccess: true,
    };
  }

  public async submitQuizAttempt(rawSubmissionData: {
    readonly studentFullName: string;
    readonly studentIdentifier: string;
    readonly classBatch?: string;
    readonly userSelectedAnswers: Record<string, string>;
  }): Promise<{
    readonly isSuccess: boolean;
    readonly evaluationResult?: QuizSubmissionEvaluationResult;
    readonly errorMessage?: string;
  }> {
    const validationResult = QuizValidator.validateQuizSubmission(rawSubmissionData);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Validasi pengerjaan kuis gagal',
      };
    }

    const evaluationResult = await this.quizRepository.submitQuizEvaluation(validationResult.validatedData);
    return {
      isSuccess: true,
      evaluationResult,
    };
  }

  public async getSubmissionsForAdmin(): Promise<readonly QuizSubmission[]> {
    return this.quizRepository.fetchAllSubmissions();
  }

  public async getQuizMetricsForDashboard(): Promise<QuizStatisticsSummary> {
    return this.quizRepository.fetchQuizStatistics();
  }
}
