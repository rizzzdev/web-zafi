import { InMemoryAuthAdapter } from './InMemoryAuthAdapter';
import { InMemoryLearningModuleAdapter } from './InMemoryLearningModuleAdapter';
import { InMemoryQuizAdapter } from './InMemoryQuizAdapter';
import { InMemoryFeedbackAdapter } from './InMemoryFeedbackAdapter';
import { InMemoryFileStorageAdapter } from './InMemoryFileStorageAdapter';
import { MockTaskLifecycleAdapter } from './MockTaskLifecycleAdapter';

import type { AuthPort } from '$lib/modules/auth';
import type { LearningModulePort } from '$lib/modules/learning-module';
import type { QuizPort } from '$lib/modules/quiz';
import type { FeedbackPort } from '$lib/modules/feedback';
import type { FileStoragePort } from '$lib/modules/storage';
import type { TaskLifecyclePort } from '$lib/modules/task';

export interface AppAdapters {
  readonly authAdapter: AuthPort;
  readonly learningModuleAdapter: LearningModulePort;
  readonly quizAdapter: QuizPort;
  readonly feedbackAdapter: FeedbackPort;
  readonly fileStorageAdapter: FileStoragePort;
  readonly taskLifecycleAdapter: TaskLifecyclePort;
}

export const prototypeAdapters: AppAdapters = {
  authAdapter: new InMemoryAuthAdapter(),
  learningModuleAdapter: new InMemoryLearningModuleAdapter(),
  quizAdapter: new InMemoryQuizAdapter(),
  feedbackAdapter: new InMemoryFeedbackAdapter(),
  fileStorageAdapter: new InMemoryFileStorageAdapter(),
  taskLifecycleAdapter: new MockTaskLifecycleAdapter(),
};
