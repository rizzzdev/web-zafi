import type {
	LearningModulePort,
	UpdateLearningModuleDto,
	CreateLearningModuleDto
} from '$lib/modules/learning-module';
import { prisma, type LearningModule } from '$lib/db';

export class PrismaLearningModuleAdapter implements LearningModulePort {
	public async getAllModules(): Promise<readonly LearningModule[]> {
		const modulesFromDatabase = await prisma.learningModule.findMany({
			where: {
				deletedAt: null
			},
			orderBy: {
				orderIndex: 'asc'
			}
		});

		return modulesFromDatabase;
	}

	public async getModuleBySlug(moduleSlug: string): Promise<LearningModule | null> {
		const normalizedSlug = moduleSlug.trim().toLowerCase();
		const matchedModule = await prisma.learningModule.findFirst({
			where: {
				slug: normalizedSlug,
				deletedAt: null
			}
		});

		return matchedModule;
	}

	public async getModuleById(moduleId: string): Promise<LearningModule | null> {
		const matchedModule = await prisma.learningModule.findFirst({
			where: {
				id: moduleId,
				deletedAt: null
			}
		});

		return matchedModule;
	}

	public async createModule(inputDto: CreateLearningModuleDto): Promise<LearningModule> {
		const createdModule = await prisma.learningModule.create({
			data: {
				code: inputDto.code,
				title: inputDto.title,
				slug: inputDto.slug,
				category: inputDto.category,
				videoUrl: inputDto.videoUrl,
				durationInMinutes: inputDto.durationInMinutes,
				summaryContent: inputDto.summaryContent,
				orderIndex: inputDto.orderIndex,
				isPublished: inputDto.isPublished,
				createdBy: 'ADMIN'
			}
		});

		return createdModule;
	}

	public async updateModule(inputDto: UpdateLearningModuleDto): Promise<LearningModule> {
		const updatedModule = await prisma.learningModule.update({
			where: {
				id: inputDto.moduleId
			},
			data: {
				title: inputDto.title,
				videoUrl: inputDto.videoUrl,
				summaryContent: inputDto.summaryContent,
				isPublished: inputDto.isPublished,
				updatedAt: new Date()
			}
		});

		return updatedModule;
	}

	public async deleteModule(moduleId: string): Promise<boolean> {
		await prisma.learningModule.update({
			where: {
				id: moduleId
			},
			data: {
				deletedAt: new Date(),
				deletedBy: 'ADMIN'
			}
		});

		return true;
	}
}
