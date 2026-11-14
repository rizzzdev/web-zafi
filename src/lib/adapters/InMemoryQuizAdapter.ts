import type {
  QuizPort,
  QuizQuestionWithOptions,
  QuizSubmissionEvaluationResult,
  QuizStatisticsSummary,
  SubmitQuizAttemptDto,
  CreateQuizQuestionDto,
  UpdateQuizQuestionDto,
} from '$lib/modules/quiz';
import type { QuizSubmission } from '$lib/db';

export class InMemoryQuizAdapter implements QuizPort {
  private readonly questionsStore: QuizQuestionWithOptions[] = [
    {
      id: 'q1000000-0000-0000-0000-000000000001',
      questionText: 'Manakah dari komponen berikut yang berperan murni sebagai perangkat masukan (Input Device) pada model kerja komputer IPO?',
      explanation: 'Pemindai (Scanner) dan Mikrofon mengonversi masukan fisik dunia nyata (cahaya dan gelombang suara) menjadi sinyal data biner digital yang dipahami komputer.',
      orderIndex: 1,
      isActive: true,
      createdAt: new Date('2026-11-01T08:00:00Z'),
      updatedAt: new Date('2026-11-01T08:00:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
      options: [
        {
          id: 'opt-1-1',
          questionId: 'q1000000-0000-0000-0000-000000000001',
          optionText: 'Pemindai (Scanner) optik digital',
          isCorrect: true,
          orderIndex: 1,
          createdAt: new Date('2026-11-01T08:00:00Z'),
          updatedAt: new Date('2026-11-01T08:00:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-1-2',
          questionId: 'q1000000-0000-0000-0000-000000000001',
          optionText: 'Layar Monitor OLED resolusi tinggi',
          isCorrect: false,
          orderIndex: 2,
          createdAt: new Date('2026-11-01T08:00:00Z'),
          updatedAt: new Date('2026-11-01T08:00:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-1-3',
          questionId: 'q1000000-0000-0000-0000-000000000001',
          optionText: 'Solid State Drive (SSD NVMe)',
          isCorrect: false,
          orderIndex: 3,
          createdAt: new Date('2026-11-01T08:00:00Z'),
          updatedAt: new Date('2026-11-01T08:00:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-1-4',
          questionId: 'q1000000-0000-0000-0000-000000000001',
          optionText: 'Pencetak Laser (LaserJet Printer)',
          isCorrect: false,
          orderIndex: 4,
          createdAt: new Date('2026-11-01T08:00:00Z'),
          updatedAt: new Date('2026-11-01T08:00:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
      ],
    },
    {
      id: 'q2000000-0000-0000-0000-000000000002',
      questionText: 'Sub-unit CPU yang bertugas melakukan operasi perbandingan relasional (seperti >, <, =) dan operasi boolean AND/OR adalah...',
      explanation: 'ALU (Arithmetic Logic Unit) adalah bagian inti CPU yang mengeksekusi perhitungan aritmetika dan logika perbandingan data biner.',
      orderIndex: 2,
      isActive: true,
      createdAt: new Date('2026-11-01T08:05:00Z'),
      updatedAt: new Date('2026-11-01T08:05:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
      options: [
        {
          id: 'opt-2-1',
          questionId: 'q2000000-0000-0000-0000-000000000002',
          optionText: 'Control Unit (CU)',
          isCorrect: false,
          orderIndex: 1,
          createdAt: new Date('2026-11-01T08:05:00Z'),
          updatedAt: new Date('2026-11-01T08:05:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-2-2',
          questionId: 'q2000000-0000-0000-0000-000000000002',
          optionText: 'Arithmetic Logic Unit (ALU)',
          isCorrect: true,
          orderIndex: 2,
          createdAt: new Date('2026-11-01T08:05:00Z'),
          updatedAt: new Date('2026-11-01T08:05:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-2-3',
          questionId: 'q2000000-0000-0000-0000-000000000002',
          optionText: 'System Clock Oscillator',
          isCorrect: false,
          orderIndex: 3,
          createdAt: new Date('2026-11-01T08:05:00Z'),
          updatedAt: new Date('2026-11-01T08:05:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-2-4',
          questionId: 'q2000000-0000-0000-0000-000000000002',
          optionText: 'Universal Serial Bus (USB) Controller',
          isCorrect: false,
          orderIndex: 4,
          createdAt: new Date('2026-11-01T08:05:00Z'),
          updatedAt: new Date('2026-11-01T08:05:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
      ],
    },
    {
      id: 'q3000000-0000-0000-0000-000000000003',
      questionText: 'Mengapa memori Random Access Memory (RAM) dikategorikan sebagai penyimpanan sementara (*volatile memory*)?',
      explanation: 'Karakteristik memori volatile adalah kehilangan seluruh data yang tersimpan saat aliran daya listrik ke komputer terputus.',
      orderIndex: 3,
      isActive: true,
      createdAt: new Date('2026-11-01T08:10:00Z'),
      updatedAt: new Date('2026-11-01T08:10:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
      options: [
        {
          id: 'opt-3-1',
          questionId: 'q3000000-0000-0000-0000-000000000003',
          optionText: 'Data di dalamnya akan terhapus seketika saat suplai daya listrik dimatikan',
          isCorrect: true,
          orderIndex: 1,
          createdAt: new Date('2026-11-01T08:10:00Z'),
          updatedAt: new Date('2026-11-01T08:10:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-3-2',
          questionId: 'q3000000-0000-0000-0000-000000000003',
          optionText: 'Data hanya dapat dibaca satu kali oleh sistem operasi (*read-only*)',
          isCorrect: false,
          orderIndex: 2,
          createdAt: new Date('2026-11-01T08:10:00Z'),
          updatedAt: new Date('2026-11-01T08:10:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-3-3',
          questionId: 'q3000000-0000-0000-0000-000000000003',
          optionText: 'Kecepatan aksesnya jauh lebih lambat daripada hard disk eksternal',
          isCorrect: false,
          orderIndex: 3,
          createdAt: new Date('2026-11-01T08:10:00Z'),
          updatedAt: new Date('2026-11-01T08:10:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-3-4',
          questionId: 'q3000000-0000-0000-0000-000000000003',
          optionText: 'Hanya bisa menyimpan file multimedia berformat gambar dan audio',
          isCorrect: false,
          orderIndex: 4,
          createdAt: new Date('2026-11-01T08:10:00Z'),
          updatedAt: new Date('2026-11-01T08:10:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
      ],
    },
    {
      id: 'q4000000-0000-0000-0000-000000000004',
      questionText: 'Dalam siklus pemrosesan instruksi CPU (*Machine Cycle*), urutan tahapan yang benar adalah...',
      explanation: 'Siklus instruksi CPU standar adalah Fetch (ambil instruksi), Decode (terjemahkan opcode), Execute (eksekusi instruksi), dan Store (simpan hasil).',
      orderIndex: 4,
      isActive: true,
      createdAt: new Date('2026-11-01T08:15:00Z'),
      updatedAt: new Date('2026-11-01T08:15:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
      options: [
        {
          id: 'opt-4-1',
          questionId: 'q4000000-0000-0000-0000-000000000004',
          optionText: 'Fetch ➔ Decode ➔ Execute ➔ Store',
          isCorrect: true,
          orderIndex: 1,
          createdAt: new Date('2026-11-01T08:15:00Z'),
          updatedAt: new Date('2026-11-01T08:15:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-4-2',
          questionId: 'q4000000-0000-0000-0000-000000000004',
          optionText: 'Decode ➔ Fetch ➔ Store ➔ Execute',
          isCorrect: false,
          orderIndex: 2,
          createdAt: new Date('2026-11-01T08:15:00Z'),
          updatedAt: new Date('2026-11-01T08:15:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-4-3',
          questionId: 'q4000000-0000-0000-0000-000000000004',
          optionText: 'Execute ➔ Fetch ➔ Store ➔ Decode',
          isCorrect: false,
          orderIndex: 3,
          createdAt: new Date('2026-11-01T08:15:00Z'),
          updatedAt: new Date('2026-11-01T08:15:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-4-4',
          questionId: 'q4000000-0000-0000-0000-000000000004',
          optionText: 'Store ➔ Execute ➔ Decode ➔ Fetch',
          isCorrect: false,
          orderIndex: 4,
          createdAt: new Date('2026-11-01T08:15:00Z'),
          updatedAt: new Date('2026-11-01T08:15:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
      ],
    },
    {
      id: 'q5000000-0000-0000-0000-000000000005',
      questionText: 'Manakah di bawah ini yang membedakan fungsi Sistem Operasi (OS) dari Perangkat Lunak Aplikasi?',
      explanation: 'Sistem Operasi mengelola sumber daya perangkat keras dan menyediakan lapisan abstraksi layanan dasar untuk seluruh aplikasi.',
      orderIndex: 5,
      isActive: true,
      createdAt: new Date('2026-11-01T08:20:00Z'),
      updatedAt: new Date('2026-11-01T08:20:00Z'),
      deletedAt: null,
      createdBy: 'SYSTEM_SEED',
      updatedBy: null,
      deletedBy: null,
      options: [
        {
          id: 'opt-5-1',
          questionId: 'q5000000-0000-0000-0000-000000000005',
          optionText: 'Mengatur alokasi memori, prosesor, dan komunikasi langsung dengan sirkuit perangkat keras',
          isCorrect: true,
          orderIndex: 1,
          createdAt: new Date('2026-11-01T08:20:00Z'),
          updatedAt: new Date('2026-11-01T08:20:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-5-2',
          questionId: 'q5000000-0000-0000-0000-000000000005',
          optionText: 'Menyusun dokumen teks pengolah kata dan lembar sebar akuntansi',
          isCorrect: false,
          orderIndex: 2,
          createdAt: new Date('2026-11-01T08:20:00Z'),
          updatedAt: new Date('2026-11-01T08:20:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-5-3',
          questionId: 'q5000000-0000-0000-0000-000000000005',
          optionText: 'Mematikan sistem komputer secara otomatis saat tidak ada sinyal internet',
          isCorrect: false,
          orderIndex: 3,
          createdAt: new Date('2026-11-01T08:20:00Z'),
          updatedAt: new Date('2026-11-01T08:20:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
        {
          id: 'opt-5-4',
          questionId: 'q5000000-0000-0000-0000-000000000005',
          optionText: 'Menggantikan peran kabel konektor daya dari sumber listrik PLN',
          isCorrect: false,
          orderIndex: 4,
          createdAt: new Date('2026-11-01T08:20:00Z'),
          updatedAt: new Date('2026-11-01T08:20:00Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
        },
      ],
    },
  ];

  private readonly submissionsStore: QuizSubmission[] = [
    {
      id: 'sub-001',
      studentName: 'Ahmad Faisal Ridwan',
      studentIdentifier: '23050974012',
      classBatch: 'PTIK 2023 A',
      score: 100,
      totalQuestions: 5,
      correctAnswers: 5,
      createdAt: new Date('2026-11-10T10:15:00Z'),
      updatedAt: new Date('2026-11-10T10:15:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'sub-002',
      studentName: 'Nadia Salsabila Putri',
      studentIdentifier: '23050974025',
      classBatch: 'PTIK 2023 A',
      score: 80,
      totalQuestions: 5,
      correctAnswers: 4,
      createdAt: new Date('2026-11-10T11:00:00Z'),
      updatedAt: new Date('2026-11-10T11:00:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'sub-003',
      studentName: 'Bagas Aditya Pratama',
      studentIdentifier: '23050974044',
      classBatch: 'PTIK 2023 B',
      score: 60,
      totalQuestions: 5,
      correctAnswers: 3,
      createdAt: new Date('2026-11-10T13:45:00Z'),
      updatedAt: new Date('2026-11-10T13:45:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'sub-004',
      studentName: 'Dewi Anggraini Kusuma',
      studentIdentifier: '23050974058',
      classBatch: 'PTIK 2023 B',
      score: 100,
      totalQuestions: 5,
      correctAnswers: 5,
      createdAt: new Date('2026-11-11T09:20:00Z'),
      updatedAt: new Date('2026-11-11T09:20:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
    {
      id: 'sub-005',
      studentName: 'Reza Firmansyah',
      studentIdentifier: '23050974071',
      classBatch: 'PTIK 2023 C',
      score: 80,
      totalQuestions: 5,
      correctAnswers: 4,
      createdAt: new Date('2026-11-11T14:10:00Z'),
      updatedAt: new Date('2026-11-11T14:10:00Z'),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    },
  ];

  public async getPublishedQuizQuestions(): Promise<readonly QuizQuestionWithOptions[]> {
    return this.questionsStore
      .filter((question) => question.isActive && !question.deletedAt)
      .sort((firstQuestion, secondQuestion) => firstQuestion.orderIndex - secondQuestion.orderIndex);
  }

  public async processQuizSubmission(submissionAttempt: SubmitQuizAttemptDto): Promise<QuizSubmissionEvaluationResult> {
    const publishedQuestions = await this.getPublishedQuizQuestions();
    const totalQuestionsCount = publishedQuestions.length;
    let correctAnswersCount = 0;

    const questionEvaluationDetails = publishedQuestions.map((questionItem) => {
      const selectedOptionId = submissionAttempt.userSelectedAnswers[questionItem.id] ?? '';
      const selectedOption = questionItem.options.find((option) => option.id === selectedOptionId);
      const correctOption = questionItem.options.find((option) => option.isCorrect);

      const isAnswerCorrect = Boolean(selectedOption && selectedOption.isCorrect);
      if (isAnswerCorrect) {
        correctAnswersCount += 1;
      }

      return {
        questionId: questionItem.id,
        questionText: questionItem.questionText,
        selectedOptionId,
        selectedOptionText: selectedOption ? selectedOption.optionText : 'Tidak dijawab',
        correctOptionId: correctOption ? correctOption.id : '',
        correctOptionText: correctOption ? correctOption.optionText : '',
        isAnswerCorrect,
        explanationText: questionItem.explanation,
      };
    });

    const calculatedScore = totalQuestionsCount > 0 ? Math.round((correctAnswersCount / totalQuestionsCount) * 100) : 0;

    const newSubmissionRecord: QuizSubmission = {
      id: `sub-${crypto.randomUUID().slice(0, 8)}`,
      studentName: submissionAttempt.studentFullName,
      studentIdentifier: submissionAttempt.studentIdentifier,
      classBatch: submissionAttempt.classBatch ?? 'PTIK Umum',
      score: calculatedScore,
      totalQuestions: totalQuestionsCount,
      correctAnswers: correctAnswersCount,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    };

    this.submissionsStore.unshift(newSubmissionRecord);

    return {
      submissionRecord: newSubmissionRecord,
      totalQuestionsCount,
      correctAnswersCount,
      finalScore: calculatedScore,
      questionEvaluationDetails,
    };
  }

  public async getAllQuizQuestionsForAdmin(): Promise<readonly QuizQuestionWithOptions[]> {
    return [...this.questionsStore]
      .filter((question) => question.deletedAt === null)
      .sort((firstQuestion, secondQuestion) => firstQuestion.orderIndex - secondQuestion.orderIndex);
  }

  public async createQuizQuestion(inputDto: CreateQuizQuestionDto): Promise<QuizQuestionWithOptions> {
    const newQuestionId = `q-${crypto.randomUUID().slice(0, 8)}`;
    const createdOptions = inputDto.options.map((optionInput, optionIndex) => ({
      id: optionInput.id ?? `opt-${crypto.randomUUID().slice(0, 8)}`,
      questionId: newQuestionId,
      optionText: optionInput.optionText,
      isCorrect: optionInput.isCorrect,
      orderIndex: optionInput.orderIndex ?? optionIndex + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    }));

    const newQuestion: QuizQuestionWithOptions = {
      id: newQuestionId,
      questionText: inputDto.questionText,
      explanation: inputDto.explanation ?? null,
      orderIndex: inputDto.orderIndex,
      isActive: inputDto.isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
      options: createdOptions,
    };

    this.questionsStore.push(newQuestion);
    return newQuestion;
  }

  public async updateQuizQuestion(
    questionId: string,
    inputDto: UpdateQuizQuestionDto
  ): Promise<QuizQuestionWithOptions> {
    const targetIndex = this.questionsStore.findIndex(
      (item) => item.id === questionId && item.deletedAt === null
    );
    if (targetIndex === -1) {
      throw new Error(`Soal kuis dengan ID '${questionId}' tidak ditemukan.`);
    }

    const existingQuestion = this.questionsStore[targetIndex];
    const updatedOptions = inputDto.options.map((optionInput, optionIndex) => ({
      id: optionInput.id ?? `opt-${crypto.randomUUID().slice(0, 8)}`,
      questionId,
      optionText: optionInput.optionText,
      isCorrect: optionInput.isCorrect,
      orderIndex: optionInput.orderIndex ?? optionIndex + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      createdBy: null,
      updatedBy: null,
      deletedBy: null,
    }));

    const updatedQuestion: QuizQuestionWithOptions = {
      ...existingQuestion,
      questionText: inputDto.questionText,
      explanation: inputDto.explanation ?? null,
      orderIndex: inputDto.orderIndex,
      isActive: inputDto.isActive,
      updatedAt: new Date(),
      options: updatedOptions,
    };

    this.questionsStore[targetIndex] = updatedQuestion;
    return updatedQuestion;
  }

  public async deleteQuizQuestion(questionId: string): Promise<boolean> {
    const targetIndex = this.questionsStore.findIndex((item) => item.id === questionId);
    if (targetIndex === -1) {
      return false;
    }
    this.questionsStore.splice(targetIndex, 1);
    return true;
  }

  public async deleteQuizSubmission(submissionId: string): Promise<boolean> {
    const targetIndex = this.submissionsStore.findIndex((item) => item.id === submissionId);
    if (targetIndex === -1) {
      return false;
    }
    this.submissionsStore.splice(targetIndex, 1);
    return true;
  }

  public async getAllQuizSubmissions(): Promise<readonly QuizSubmission[]> {
    return [...this.submissionsStore].sort(
      (firstSubmission, secondSubmission) => secondSubmission.createdAt.getTime() - firstSubmission.createdAt.getTime()
    );
  }

  public async calculateQuizStatistics(): Promise<QuizStatisticsSummary> {
    const totalParticipantsCount = this.submissionsStore.length;
    if (totalParticipantsCount === 0) {
      return {
        totalParticipantsCount: 0,
        averageScoreValue: 0,
        highestScoreValue: 0,
        lowestScoreValue: 0,
      };
    }

    const totalScoresSum = this.submissionsStore.reduce((accumulator, item) => accumulator + item.score, 0);
    const averageScoreValue = Math.round((totalScoresSum / totalParticipantsCount) * 10) / 10;
    const highestScoreValue = Math.max(...this.submissionsStore.map((item) => item.score));
    const lowestScoreValue = Math.min(...this.submissionsStore.map((item) => item.score));

    return {
      totalParticipantsCount,
      averageScoreValue,
      highestScoreValue,
      lowestScoreValue,
    };
  }
}
