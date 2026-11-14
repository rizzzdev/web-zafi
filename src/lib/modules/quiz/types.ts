import type { QuizQuestion, QuizOption, QuizSubmission } from '$lib/db';

export type { QuizQuestion, QuizOption, QuizSubmission };

export interface QuizQuestionWithOptions extends QuizQuestion {
  readonly options: readonly QuizOption[];
}

export interface QuizEvaluationDetail {
  readonly questionId: string;
  readonly questionText: string;
  readonly selectedOptionId: string;
  readonly selectedOptionText: string;
  readonly correctOptionId: string;
  readonly correctOptionText: string;
  readonly isAnswerCorrect: boolean;
  readonly explanationText: string | null;
}

export interface QuizSubmissionEvaluationResult {
  readonly submissionRecord: QuizSubmission;
  readonly totalQuestionsCount: number;
  readonly correctAnswersCount: number;
  readonly finalScore: number;
  readonly questionEvaluationDetails: readonly QuizEvaluationDetail[];
}

export interface QuizStatisticsSummary {
  readonly totalParticipantsCount: number;
  readonly averageScoreValue: number;
  readonly highestScoreValue: number;
  readonly lowestScoreValue: number;
}
