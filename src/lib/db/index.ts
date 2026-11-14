import type * as GeneratedTypes from './generated/index';

export const UserRole = {
  ADMIN: 'ADMIN',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ModuleCategory = {
  INPUT: 'INPUT',
  PROCESS: 'PROCESS',
  OUTPUT: 'OUTPUT',
  STORAGE_SOFTWARE: 'STORAGE_SOFTWARE',
} as const;
export type ModuleCategory = (typeof ModuleCategory)[keyof typeof ModuleCategory];

export type Decimal = number;

export type {
  User,
  LearningModule,
  QuizQuestion,
  QuizOption,
  QuizSubmission,
} from './generated/index';

export type StudentFeedback = Omit<GeneratedTypes.StudentFeedback, 'averageScore'> & {
  readonly averageScore: number;
};
