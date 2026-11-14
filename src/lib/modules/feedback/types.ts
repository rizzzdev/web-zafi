import type { StudentFeedback } from '$lib/db';

export type { StudentFeedback };

export interface FeedbackAspectAverage {
  readonly aspectName: string;
  readonly averageScoreValue: number;
  readonly interpretationLabel: string;
}

export interface FeedbackStatisticsSummary {
  readonly totalRespondentsCount: number;
  readonly overallAverageScore: number;
  readonly designAspectAverage: number;
  readonly contentAspectAverage: number;
  readonly usabilityAspectAverage: number;
  readonly overallInterpretationLabel: string;
}
