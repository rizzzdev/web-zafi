import type { LearningModule, ModuleCategory } from '$lib/db';

export type { LearningModule, ModuleCategory };

export interface LearningModuleSummary {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly slug: string;
  readonly category: ModuleCategory;
  readonly videoUrl: string;
  readonly durationInMinutes: number;
  readonly summaryContent: string;
  readonly orderIndex: number;
  readonly isPublished: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
