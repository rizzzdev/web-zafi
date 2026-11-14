import { LearningModuleRepository } from './repository';
import { LearningModuleValidator } from './validator';
import type { LearningModule } from '$lib/db';

export class LearningModuleService {
  private readonly learningModuleRepository: LearningModuleRepository;

  public constructor(learningModuleRepository: LearningModuleRepository) {
    this.learningModuleRepository = learningModuleRepository;
  }

  public async getAllPublishedModules(): Promise<readonly LearningModule[]> {
    const allModules = await this.learningModuleRepository.fetchAllLearningModules();
    return allModules
      .filter((moduleItem) => moduleItem.isPublished && !moduleItem.deletedAt)
      .sort((firstModule, secondModule) => firstModule.orderIndex - secondModule.orderIndex);
  }

  public async getAllModulesForAdmin(): Promise<readonly LearningModule[]> {
    const allModules = await this.learningModuleRepository.fetchAllLearningModules();
    return allModules
      .filter((moduleItem) => !moduleItem.deletedAt)
      .sort((firstModule, secondModule) => firstModule.orderIndex - secondModule.orderIndex);
  }

  public async getModuleDetailBySlug(moduleSlug: string): Promise<LearningModule | null> {
    return this.learningModuleRepository.fetchLearningModuleBySlug(moduleSlug);
  }

  public async updateModuleContent(rawInputData: {
    readonly moduleId: string;
    readonly title: string;
    readonly videoUrl: string;
    readonly summaryContent: string;
    readonly isPublished: boolean;
  }): Promise<{
    readonly isSuccess: boolean;
    readonly updatedModule?: LearningModule;
    readonly errorMessage?: string;
  }> {
    const validationResult = LearningModuleValidator.validateUpdateInput(rawInputData);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Validasi input pembaruan modul gagal',
      };
    }

    const updatedModule = await this.learningModuleRepository.updateLearningModuleData(validationResult.validatedData);
    return {
      isSuccess: true,
      updatedModule,
    };
  }
}
