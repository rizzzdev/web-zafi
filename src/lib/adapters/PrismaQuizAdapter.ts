import type {
	QuizPort,
	QuizQuestionWithOptions,
	QuizSubmissionEvaluationResult,
	QuizStatisticsSummary,
	SubmitQuizAttemptDto,
	CreateQuizQuestionDto,
	UpdateQuizQuestionDto,
	QuizEvaluationDetail
} from '$lib/modules/quiz';
import { prisma, type QuizSubmission } from '$lib/db';

export class PrismaQuizAdapter implements QuizPort {
	public async getPublishedQuizQuestions(): Promise<readonly QuizQuestionWithOptions[]> {
		const publishedQuestions = await prisma.quizQuestion.findMany({
			where: {
				isActive: true,
				deletedAt: null
			},
			include: {
				options: {
					where: {
						deletedAt: null
					},
					orderBy: {
						orderIndex: 'asc'
					}
				}
			},
			orderBy: {
				orderIndex: 'asc'
			}
		});

		return publishedQuestions;
	}

	public async getAllQuizQuestionsForAdmin(): Promise<readonly QuizQuestionWithOptions[]> {
		const adminQuestions = await prisma.quizQuestion.findMany({
			where: {
				deletedAt: null
			},
			include: {
				options: {
					where: {
						deletedAt: null
					},
					orderBy: {
						orderIndex: 'asc'
					}
				}
			},
			orderBy: {
				orderIndex: 'asc'
			}
		});

		return adminQuestions;
	}

	public async createQuizQuestion(
		inputDto: CreateQuizQuestionDto
	): Promise<QuizQuestionWithOptions> {
		const createdQuestion = await prisma.quizQuestion.create({
			data: {
				questionText: inputDto.questionText,
				explanation: inputDto.explanation,
				orderIndex: inputDto.orderIndex,
				isActive: inputDto.isActive,
				options: {
					create: inputDto.options.map((optionInput, optionIndex) => ({
						optionText: optionInput.optionText,
						isCorrect: optionInput.isCorrect,
						orderIndex: optionInput.orderIndex ?? optionIndex + 1
					}))
				}
			},
			include: {
				options: {
					where: {
						deletedAt: null
					},
					orderBy: {
						orderIndex: 'asc'
					}
				}
			}
		});

		return createdQuestion;
	}

	public async updateQuizQuestion(
		questionId: string,
		inputDto: UpdateQuizQuestionDto
	): Promise<QuizQuestionWithOptions> {
		// 1. Update atribut utama butir soal
		await prisma.quizQuestion.update({
			where: { id: questionId },
			data: {
				questionText: inputDto.questionText,
				explanation: inputDto.explanation,
				orderIndex: inputDto.orderIndex,
				isActive: inputDto.isActive,
				updatedAt: new Date()
			}
		});

		// 2. Refresh opsi jawaban
		await prisma.quizOption.deleteMany({
			where: { questionId }
		});

		await prisma.quizOption.createMany({
			data: inputDto.options.map((optionInput, optionIndex) => ({
				questionId,
				optionText: optionInput.optionText,
				isCorrect: optionInput.isCorrect,
				orderIndex: optionInput.orderIndex ?? optionIndex + 1
			}))
		});

		const updatedQuestionRecord = await prisma.quizQuestion.findUniqueOrThrow({
			where: { id: questionId },
			include: {
				options: {
					where: { deletedAt: null },
					orderBy: { orderIndex: 'asc' }
				}
			}
		});

		return updatedQuestionRecord;
	}

	public async deleteQuizQuestion(questionId: string): Promise<boolean> {
		const existingQuestion = await prisma.quizQuestion.findFirst({
			where: { id: questionId, deletedAt: null }
		});

		if (!existingQuestion) {
			return false;
		}

		await prisma.quizQuestion.update({
			where: { id: questionId },
			data: { deletedAt: new Date() }
		});

		return true;
	}

	public async deleteQuizSubmission(submissionId: string): Promise<boolean> {
		const existingSubmission = await prisma.quizSubmission.findFirst({
			where: { id: submissionId, deletedAt: null }
		});

		if (!existingSubmission) {
			return false;
		}

		await prisma.quizSubmission.update({
			where: { id: submissionId },
			data: { deletedAt: new Date() }
		});

		return true;
	}

	public async processQuizSubmission(
		submissionAttempt: SubmitQuizAttemptDto
	): Promise<QuizSubmissionEvaluationResult> {
		const publishedQuestions = await this.getPublishedQuizQuestions();
		const totalQuestionsCount = publishedQuestions.length;
		let correctAnswersCount = 0;

		const questionEvaluationDetails: QuizEvaluationDetail[] = publishedQuestions.map(
			(questionItem) => {
				const selectedOptionId = submissionAttempt.userSelectedAnswers[questionItem.id] ?? '';
				const selectedOption = questionItem.options.find(
					(optionRecord) => optionRecord.id === selectedOptionId
				);
				const correctOption = questionItem.options.find((optionRecord) => optionRecord.isCorrect);

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
					explanationText: questionItem.explanation ?? null
				};
			}
		);

		const calculatedScore =
			totalQuestionsCount > 0 ? Math.round((correctAnswersCount / totalQuestionsCount) * 100) : 0;

		const createdSubmissionRecord = await prisma.quizSubmission.create({
			data: {
				studentName: submissionAttempt.studentFullName,
				studentIdentifier: submissionAttempt.studentIdentifier,
				classBatch: submissionAttempt.classBatch ?? null,
				score: calculatedScore,
				totalQuestions: totalQuestionsCount,
				correctAnswers: correctAnswersCount
			}
		});

		return {
			submissionRecord: createdSubmissionRecord,
			totalQuestionsCount,
			correctAnswersCount,
			finalScore: calculatedScore,
			questionEvaluationDetails
		};
	}

	public async getAllQuizSubmissions(): Promise<readonly QuizSubmission[]> {
		const submissionsList = await prisma.quizSubmission.findMany({
			where: {
				deletedAt: null
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return submissionsList;
	}

	public async calculateQuizStatistics(): Promise<QuizStatisticsSummary> {
		const activeSubmissions = await prisma.quizSubmission.findMany({
			where: {
				deletedAt: null
			}
		});

		if (activeSubmissions.length === 0) {
			return {
				totalParticipantsCount: 0,
				averageScoreValue: 0,
				highestScoreValue: 0,
				lowestScoreValue: 0
			};
		}

		const scoreList = activeSubmissions.map((submission) => submission.score);
		const totalScoreSum = scoreList.reduce(
			(runningTotal, currentScore) => runningTotal + currentScore,
			0
		);

		return {
			totalParticipantsCount: activeSubmissions.length,
			averageScoreValue: Math.round((totalScoreSum / activeSubmissions.length) * 10) / 10,
			highestScoreValue: Math.max(...scoreList),
			lowestScoreValue: Math.min(...scoreList)
		};
	}
}
