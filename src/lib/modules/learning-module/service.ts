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

  public async createNewModule(rawInputData: {
    readonly code: string;
    readonly title: string;
    readonly slug: string;
    readonly category: string;
    readonly videoUrl: string;
    readonly durationInMinutes?: number;
    readonly summaryContent: string;
    readonly orderIndex?: number;
    readonly isPublished: boolean;
  }): Promise<{
    readonly isSuccess: boolean;
    readonly createdModule?: LearningModule;
    readonly errorMessage?: string;
  }> {
    const validationResult = LearningModuleValidator.validateCreateInput(rawInputData);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Validasi pembuatan modul gagal',
      };
    }

    const existingModuleWithSlug = await this.learningModuleRepository.fetchLearningModuleBySlug(
      validationResult.validatedData.slug
    );
    if (existingModuleWithSlug) {
      return {
        isSuccess: false,
        errorMessage: `Slug '${validationResult.validatedData.slug}' sudah digunakan oleh modul lain. Silakan gunakan slug unik.`,
      };
    }

    const createdModule = await this.learningModuleRepository.createLearningModuleData(
      validationResult.validatedData
    );
    return {
      isSuccess: true,
      createdModule,
    };
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

    const updatedModule = await this.learningModuleRepository.updateLearningModuleData(
      validationResult.validatedData
    );
    return {
      isSuccess: true,
      updatedModule,
    };
  }

  public async deleteModuleById(moduleId: string): Promise<{
    readonly isSuccess: boolean;
    readonly errorMessage?: string;
  }> {
    const existingModule = await this.learningModuleRepository.fetchLearningModuleById(moduleId);
    if (!existingModule) {
      return {
        isSuccess: false,
        errorMessage: 'Modul tidak ditemukan atau sudah dihapus',
      };
    }

    const isDeletedSuccessfully = await this.learningModuleRepository.deleteLearningModuleData(
      moduleId
    );
    return {
      isSuccess: isDeletedSuccessfully,
      errorMessage: isDeletedSuccessfully ? undefined : 'Gagal menghapus modul dari database',
    };
  }
}
