import type { PageServerLoad } from './$types';
import { container } from '$lib/container';

export const load: PageServerLoad = async () => {
  const feedbackStats = await container.feedbackService.getFeedbackMetricsForDashboard();
  const quizStats = await container.quizService.getQuizMetricsForDashboard();

  const recentFeedbacks = (await container.feedbackService.getAllFeedbacksForAdmin()).slice(0, 5);
  const recentSubmissions = (await container.quizService.getSubmissionsForAdmin()).slice(0, 5);

  return {
    feedbackStats,
    quizStats,
    recentFeedbacks,
    recentSubmissions,
  };
};
