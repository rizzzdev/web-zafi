import { productionAdapters, type AppAdapters } from './adapters';

import { AuthRepository, AuthService } from './modules/auth';
import { LearningModuleRepository, LearningModuleService } from './modules/learning-module';
import { QuizRepository, QuizService } from './modules/quiz';
import { FeedbackRepository, FeedbackService } from './modules/feedback';
import { FileStorageRepository, FileStorageService } from './modules/storage';
import { TaskLifecycleRepository, TaskLifecycleService } from './modules/task';

export class AppContainer {
	public readonly authService: AuthService;
	public readonly learningModuleService: LearningModuleService;
	public readonly quizService: QuizService;
	public readonly feedbackService: FeedbackService;
	public readonly fileStorageService: FileStorageService;
	public readonly taskLifecycleService: TaskLifecycleService;

	public constructor(adapters: AppAdapters = productionAdapters) {
		const authRepository = new AuthRepository(adapters.authAdapter);
		this.authService = new AuthService(authRepository);

		const learningModuleRepository = new LearningModuleRepository(adapters.learningModuleAdapter);
		this.learningModuleService = new LearningModuleService(learningModuleRepository);

		const quizRepository = new QuizRepository(adapters.quizAdapter);
		this.quizService = new QuizService(quizRepository);

		const feedbackRepository = new FeedbackRepository(adapters.feedbackAdapter);
		this.feedbackService = new FeedbackService(feedbackRepository);

		const fileStorageRepository = new FileStorageRepository(adapters.fileStorageAdapter);
		this.fileStorageService = new FileStorageService(fileStorageRepository);

		const taskLifecycleRepository = new TaskLifecycleRepository(adapters.taskLifecycleAdapter);
		this.taskLifecycleService = new TaskLifecycleService(taskLifecycleRepository);
	}
}

// Singleton DI Container instansiasi mode produksi (Tahap 3 - True Zero UI Rework)
export const container = new AppContainer(productionAdapters);
