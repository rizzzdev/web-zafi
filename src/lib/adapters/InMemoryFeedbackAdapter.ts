import type {
  FeedbackPort,
  FeedbackStatisticsSummary,
  SubmitStudentFeedbackDto,
  UpdateFeedbackDto,
} from '$lib/modules/feedback';
import type { StudentFeedback } from '$lib/db';

export class InMemoryFeedbackAdapter implements FeedbackPort {
  private readonly feedbackStore: StudentFeedback[] = [
    {
      id: 'fb-001',
      studentName: 'Ahmad Faisal Ridwan',
      studentIdentifier: '23050974012',
      classBatch: 'PTIK 2023 A',
      ratingDesign: 5,
      ratingContent: 5,
      ratingUsability: 4,
      averageScore: 4.67,
      comments: 'Visual stepper alur IPO sangat membantu memahami alur data komputer dari input sampai output. Desain bersih dan tidak membuat mata lelah.',
      createdAt: new Date('2026-11-10T10:25:00Z'),
      updatedAt: new Date('2026-11-10T10:25:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'fb-002',
      studentName: 'Nadia Salsabila Putri',
      studentIdentifier: '23050974025',
      classBatch: 'PTIK 2023 A',
      ratingDesign: 5,
      ratingContent: 4,
      ratingUsability: 5,
      averageScore: 4.67,
      comments: 'Tombol skala angketnya sangat nyaman ditekan di layar HP. Tidak ada horizontal scroll yang membingungkan.',
      createdAt: new Date('2026-11-10T11:15:00Z'),
      updatedAt: new Date('2026-11-10T11:15:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'fb-003',
      studentName: 'Bagas Aditya Pratama',
      studentIdentifier: '23050974044',
      classBatch: 'PTIK 2023 B',
      ratingDesign: 4,
      ratingContent: 4,
      ratingUsability: 4,
      averageScore: 4.0,
      comments: 'Materi unit pemrosesan CPU cukup padat, cheatsheet ringkas di bawah video sangat membantu mengingat kembali fungsi ALU dan Register.',
      createdAt: new Date('2026-11-10T13:55:00Z'),
      updatedAt: new Date('2026-11-10T13:55:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'fb-004',
      studentName: 'Dewi Anggraini Kusuma',
      studentIdentifier: '23050974058',
      classBatch: 'PTIK 2023 B',
      ratingDesign: 5,
      ratingContent: 5,
      ratingUsability: 5,
      averageScore: 5.0,
      comments: 'Sangat cocok untuk media pengantar mahasiswa baru PTIK. Kuisnya langsung memberi pembahasan setelah selesai submit.',
      createdAt: new Date('2026-11-11T09:35:00Z'),
      updatedAt: new Date('2026-11-11T09:35:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'fb-005',
      studentName: 'Reza Firmansyah',
      studentIdentifier: '23050974071',
      classBatch: 'PTIK 2023 C',
      ratingDesign: 4,
      ratingContent: 4,
      ratingUsability: 5,
      averageScore: 4.33,
      comments: 'Format navigasi modul sekuensial memudahkan belajar tanpa perlu login akun atau membuat password rumit.',
      createdAt: new Date('2026-11-11T14:25:00Z'),
      updatedAt: new Date('2026-11-11T14:25:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'fb-006',
      studentName: 'Siti Rahmawati',
      studentIdentifier: '23050974088',
      classBatch: 'PTIK 2023 C',
      ratingDesign: 5,
      ratingContent: 4,
      ratingUsability: 4,
      averageScore: 4.33,
      comments: 'Skema warna modul (Sky, Amber, Emerald, Purple) membuat identitas setiap tahapan IPO sangat mudah dibedakan.',
      createdAt: new Date('2026-11-12T08:40:00Z'),
      updatedAt: new Date('2026-11-12T08:40:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
  ];

  public async recordFeedback(inputDto: SubmitStudentFeedbackDto): Promise<StudentFeedback> {
    const rawAverage = (inputDto.ratingDesign + inputDto.ratingContent + inputDto.ratingUsability) / 3;
    const roundedAverage = Math.round(rawAverage * 100) / 100;

    const newFeedbackRecord: StudentFeedback = {
      id: `fb-${crypto.randomUUID().slice(0, 8)}`,
      studentName: inputDto.studentFullName,
      studentIdentifier: inputDto.studentIdentifier,
      classBatch: inputDto.classBatch ?? 'PTIK Umum',
      ratingDesign: inputDto.ratingDesign,
      ratingContent: inputDto.ratingContent,
      ratingUsability: inputDto.ratingUsability,
      averageScore: roundedAverage,
      comments: inputDto.comments,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    };

    this.feedbackStore.unshift(newFeedbackRecord);
    return { ...newFeedbackRecord };
  }

  public async updateFeedback(feedbackId: string, inputDto: UpdateFeedbackDto): Promise<StudentFeedback> {
    const feedbackIndex = this.feedbackStore.findIndex((item) => item.id === feedbackId && item.deletedAt === null);
    if (feedbackIndex === -1) {
      throw new Error(`Data feedback dengan ID '${feedbackId}' tidak ditemukan.`);
    }

    const rawAverage = (inputDto.ratingDesign + inputDto.ratingContent + inputDto.ratingUsability) / 3;
    const roundedAverage = Math.round(rawAverage * 100) / 100;

    const existingFeedback = this.feedbackStore[feedbackIndex];
    const updatedFeedbackRecord: StudentFeedback = {
      ...existingFeedback,
      studentName: inputDto.studentFullName,
      studentIdentifier: inputDto.studentIdentifier,
      classBatch: inputDto.classBatch ?? existingFeedback.classBatch,
      ratingDesign: inputDto.ratingDesign,
      ratingContent: inputDto.ratingContent,
      ratingUsability: inputDto.ratingUsability,
      averageScore: roundedAverage,
      comments: inputDto.comments,
      updatedAt: new Date(),
    };

    this.feedbackStore[feedbackIndex] = updatedFeedbackRecord;
    return { ...updatedFeedbackRecord };
  }

  public async deleteFeedback(feedbackId: string): Promise<boolean> {
    const feedbackIndex = this.feedbackStore.findIndex((item) => item.id === feedbackId);
    if (feedbackIndex === -1) {
      return false;
    }

    // Soft delete or remove from memory store
    this.feedbackStore.splice(feedbackIndex, 1);
    return true;
  }

  public async getAllFeedbacks(): Promise<readonly StudentFeedback[]> {
    return [...this.feedbackStore]
      .filter((item) => item.deletedAt === null)
      .sort((firstFeedback, secondFeedback) => secondFeedback.createdAt.getTime() - firstFeedback.createdAt.getTime());
  }

  public async calculateFeedbackStatistics(): Promise<FeedbackStatisticsSummary> {
    const activeFeedbacks = this.feedbackStore.filter((item) => item.deletedAt === null);
    const totalRespondentsCount = activeFeedbacks.length;
    if (totalRespondentsCount === 0) {
      return {
        totalRespondentsCount: 0,
        overallAverageScore: 0,
        designAspectAverage: 0,
        contentAspectAverage: 0,
        usabilityAspectAverage: 0,
        overallInterpretationLabel: 'Belum Ada Data',
      };
    }

    const designSum = activeFeedbacks.reduce((accumulator, item) => accumulator + item.ratingDesign, 0);
    const contentSum = activeFeedbacks.reduce((accumulator, item) => accumulator + item.ratingContent, 0);
    const usabilitySum = activeFeedbacks.reduce((accumulator, item) => accumulator + item.ratingUsability, 0);

    const designAspectAverage = Math.round((designSum / totalRespondentsCount) * 100) / 100;
    const contentAspectAverage = Math.round((contentSum / totalRespondentsCount) * 100) / 100;
    const usabilityAspectAverage = Math.round((usabilitySum / totalRespondentsCount) * 100) / 100;

    const overallAverageScore =
      Math.round(((designAspectAverage + contentAspectAverage + usabilityAspectAverage) / 3) * 100) / 100;

    let overallInterpretationLabel = 'Sangat Layak';
    if (overallAverageScore < 2.0) {
      overallInterpretationLabel = 'Tidak Layak';
    } else if (overallAverageScore < 3.0) {
      overallInterpretationLabel = 'Kurang Layak';
    } else if (overallAverageScore < 4.0) {
      overallInterpretationLabel = 'Cukup Layak';
    } else if (overallAverageScore < 4.5) {
      overallInterpretationLabel = 'Layak';
    }

    return {
      totalRespondentsCount,
      overallAverageScore,
      designAspectAverage,
      contentAspectAverage,
      usabilityAspectAverage,
      overallInterpretationLabel,
    };
  }
}
