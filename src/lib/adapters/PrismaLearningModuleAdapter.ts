import type { LearningModulePort, UpdateLearningModuleDto } from '$lib/modules/learning-module';
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

	public async updateModule(inputDto: UpdateLearningModuleDto): Promise<LearningModule> {
		const updatedModule = await prisma.learningModule.update({
			where: {
				id: inputDto.id
			},
			data: {
				title: inputDto.title,
				videoUrl: inputDto.videoUrl,
				summaryContent: inputDto.summaryContent,
				durationInMinutes: inputDto.durationInMinutes,
				updatedAt: new Date()
			}
		});

		return updatedModule;
	}
}
