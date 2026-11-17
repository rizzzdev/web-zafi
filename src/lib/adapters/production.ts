import { PrismaAuthAdapter } from './PrismaAuthAdapter';
import { PrismaLearningModuleAdapter } from './PrismaLearningModuleAdapter';
import { PrismaQuizAdapter } from './PrismaQuizAdapter';
import { PrismaFeedbackAdapter } from './PrismaFeedbackAdapter';
import { DiskFileStorageAdapter } from './DiskFileStorageAdapter';
import { DbTaskLifecycleAdapter } from './DbTaskLifecycleAdapter';
import type { AppAdapters } from './prototype';

export const productionAdapters: AppAdapters = {
	authAdapter: new PrismaAuthAdapter(),
	learningModuleAdapter: new PrismaLearningModuleAdapter(),
	quizAdapter: new PrismaQuizAdapter(),
	feedbackAdapter: new PrismaFeedbackAdapter(),
	fileStorageAdapter: new DiskFileStorageAdapter(),
	taskLifecycleAdapter: new DbTaskLifecycleAdapter()
};
