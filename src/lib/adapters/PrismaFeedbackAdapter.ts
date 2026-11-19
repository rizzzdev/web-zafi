import type {
	FeedbackPort,
	FeedbackStatisticsSummary,
	SubmitStudentFeedbackDto,
	UpdateFeedbackDto
} from '$lib/modules/feedback';
import { prisma, type StudentFeedback } from '$lib/db';
import type { StudentFeedback as PrismaStudentFeedbackRecord } from '$lib/db/generated';

function mapPrismaFeedbackToDomain(feedbackRecord: PrismaStudentFeedbackRecord): StudentFeedback {
	return {
		id: feedbackRecord.id,
		studentName: feedbackRecord.studentName,
		studentIdentifier: feedbackRecord.studentIdentifier,
		classBatch: feedbackRecord.classBatch,
		ratingDesign: feedbackRecord.ratingDesign,
		ratingContent: feedbackRecord.ratingContent,
		ratingUsability: feedbackRecord.ratingUsability,
		// Safe DTO serialization anti-Decimal crash
		averageScore: Number(feedbackRecord.averageScore),
		comments: feedbackRecord.comments,
		createdAt: feedbackRecord.createdAt,
		updatedAt: feedbackRecord.updatedAt,
		deletedAt: feedbackRecord.deletedAt,
		createdBy: feedbackRecord.createdBy,
		updatedBy: feedbackRecord.updatedBy,
		deletedBy: feedbackRecord.deletedBy
	};
}

export class PrismaFeedbackAdapter implements FeedbackPort {
	public async recordFeedback(inputDto: SubmitStudentFeedbackDto): Promise<StudentFeedback> {
		const rawAverageScore =
			(inputDto.ratingDesign + inputDto.ratingContent + inputDto.ratingUsability) / 3;
		const roundedAverageScore = Math.round(rawAverageScore * 100) / 100;

		const createdFeedbackRecord = await prisma.studentFeedback.create({
			data: {
				studentName: inputDto.studentFullName,
				studentIdentifier: inputDto.studentIdentifier,
				classBatch: inputDto.classBatch ?? null,
				ratingDesign: inputDto.ratingDesign,
				ratingContent: inputDto.ratingContent,
				ratingUsability: inputDto.ratingUsability,
				averageScore: roundedAverageScore,
				comments: inputDto.comments
			}
		});

		return mapPrismaFeedbackToDomain(createdFeedbackRecord);
	}

	public async updateFeedback(
		feedbackId: string,
		inputDto: UpdateFeedbackDto
	): Promise<StudentFeedback> {
		const rawAverageScore =
			(inputDto.ratingDesign + inputDto.ratingContent + inputDto.ratingUsability) / 3;
		const roundedAverageScore = Math.round(rawAverageScore * 100) / 100;

		const updatedFeedbackRecord = await prisma.studentFeedback.update({
			where: { id: feedbackId },
			data: {
				studentName: inputDto.studentFullName,
				studentIdentifier: inputDto.studentIdentifier,
				classBatch: inputDto.classBatch ?? null,
				ratingDesign: inputDto.ratingDesign,
				ratingContent: inputDto.ratingContent,
				ratingUsability: inputDto.ratingUsability,
				averageScore: roundedAverageScore,
				comments: inputDto.comments,
				updatedAt: new Date()
			}
		});

		return mapPrismaFeedbackToDomain(updatedFeedbackRecord);
	}

	public async deleteFeedback(feedbackId: string): Promise<boolean> {
		const existingFeedback = await prisma.studentFeedback.findFirst({
			where: { id: feedbackId, deletedAt: null }
		});

		if (!existingFeedback) {
			return false;
		}

		await prisma.studentFeedback.update({
			where: { id: feedbackId },
			data: { deletedAt: new Date() }
		});

		return true;
	}

	public async getAllFeedbacks(): Promise<readonly StudentFeedback[]> {
		const feedbackList = await prisma.studentFeedback.findMany({
			where: {
				deletedAt: null
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return feedbackList.map((feedbackItem) => mapPrismaFeedbackToDomain(feedbackItem));
	}

	public async calculateFeedbackStatistics(): Promise<FeedbackStatisticsSummary> {
		const activeFeedbacks = await prisma.studentFeedback.findMany({
			where: {
				deletedAt: null
			}
		});

		const totalRespondentsCount = activeFeedbacks.length;
		if (totalRespondentsCount === 0) {
			return {
				totalRespondentsCount: 0,
				overallAverageScore: 0,
				designAspectAverage: 0,
				contentAspectAverage: 0,
				usabilityAspectAverage: 0,
				overallInterpretationLabel: 'Belum Ada Data'
			};
		}

		const designSum = activeFeedbacks.reduce(
			(accumulator, feedbackItem) => accumulator + feedbackItem.ratingDesign,
			0
		);
		const contentSum = activeFeedbacks.reduce(
			(accumulator, feedbackItem) => accumulator + feedbackItem.ratingContent,
			0
		);
		const usabilitySum = activeFeedbacks.reduce(
			(accumulator, feedbackItem) => accumulator + feedbackItem.ratingUsability,
			0
		);

		const designAspectAverage = Math.round((designSum / totalRespondentsCount) * 100) / 100;
		const contentAspectAverage = Math.round((contentSum / totalRespondentsCount) * 100) / 100;
		const usabilityAspectAverage = Math.round((usabilitySum / totalRespondentsCount) * 100) / 100;

		const overallAverageScore =
			Math.round(
				((designAspectAverage + contentAspectAverage + usabilityAspectAverage) / 3) * 100
			) / 100;

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
			overallInterpretationLabel
		};
	}
}
