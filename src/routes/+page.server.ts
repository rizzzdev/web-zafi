import type { PageServerLoad } from './$types';
import { container } from '$lib/container';

export const load: PageServerLoad = async () => {
  const publishedLearningModules = await container.learningModuleService.getAllPublishedModules();
  const quizStatisticsSummary = await container.quizService.getQuizMetricsForDashboard();
  const feedbackStatisticsSummary = await container.feedbackService.getFeedbackMetricsForDashboard();
  const allFeedbacks = await container.feedbackService.getAllFeedbacksForAdmin();

  const curatedFeedbacks = allFeedbacks
    .filter((fb) => fb.comments && fb.comments.trim().length > 0)
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3)
    .map((fb) => ({
      id: fb.id,
      studentName: fb.studentName,
      classBatch: fb.classBatch,
      averageScore: fb.averageScore,
      comments: fb.comments as string,
    }));

  const fallbackFeedbacks = [
    {
      id: 'fallback-1',
      studentName: 'Ahmad Fauzan',
      classBatch: 'Peserta Kursus Sistem Komputer',
      averageScore: 5,
      comments:
        'Sebelumnya saya selalu bingung membedakan peran CU dan ALU saat proses Fetch-Decode-Execute. Begitu lihat simulasi dan video di modul 2, model mentalnya langsung terbentuk jelas!',
    },
    {
      id: 'fallback-2',
      studentName: 'Dewi Lestari',
      classBatch: 'Siswa Kelas Hardware & IoT',
      averageScore: 5,
      comments:
        'Tampilan gelapnya sangat nyaman di mata, tidak bikin lelah walau belajar berjam-jam. Rangkuman cheatsheet di bawah video sangat membantu buat bahan review sebelum praktikum.',
    },
    {
      id: 'fallback-3',
      studentName: 'Rian Saputra',
      classBatch: 'Praktisi Rekayasa Perangkat Lunak',
      averageScore: 5,
      comments:
        'Fitur kuisnya keren banget! Begitu pilih jawaban langsung muncul penjelasan ilmiahnya, jadi tahu persis salah di mana tanpa perlu menunggu hasil esok hari.',
    },
  ];

  return {
    publishedLearningModules,
    totalQuizParticipants: quizStatisticsSummary.totalParticipantsCount,
    totalFeedbackRespondents: feedbackStatisticsSummary.totalRespondentsCount,
    feedbackStats: feedbackStatisticsSummary,
    featuredFeedbacks: curatedFeedbacks.length > 0 ? curatedFeedbacks : fallbackFeedbacks,
  };
};
