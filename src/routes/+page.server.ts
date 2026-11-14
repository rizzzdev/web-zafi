import type { PageServerLoad } from './$types';
import { container } from '$lib/container';

export const load: PageServerLoad = async () => {
  const publishedLearningModules = await container.learningModuleService.getAllPublishedModules();
  const quizStatisticsSummary = await container.quizService.getQuizMetricsForDashboard();
  const feedbackStatisticsSummary = await container.feedbackService.getFeedbackMetricsForDashboard();

  return {
    publishedLearningModules,
    totalQuizParticipants: quizStatisticsSummary.totalParticipantsCount,
    totalFeedbackRespondents: feedbackStatisticsSummary.totalRespondentsCount,
  };
};
