import type { LearningModulePort } from './port';
import type { LearningModule } from '$lib/db';
import type { UpdateLearningModuleDto, CreateLearningModuleDto } from './dto';

export class LearningModuleRepository {
  private readonly learningModulePortAdapter: LearningModulePort;

  public constructor(learningModulePortAdapter: LearningModulePort) {
    this.learningModulePortAdapter = learningModulePortAdapter;
  }

  public async fetchAllLearningModules(): Promise<readonly LearningModule[]> {
    return this.learningModulePortAdapter.getAllModules();
  }

  public async fetchLearningModuleBySlug(moduleSlug: string): Promise<LearningModule | null> {
    return this.learningModulePortAdapter.getModuleBySlug(moduleSlug);
  }

  public async fetchLearningModuleById(moduleId: string): Promise<LearningModule | null> {
    return this.learningModulePortAdapter.getModuleById(moduleId);
  }

  public async createLearningModuleData(createData: CreateLearningModuleDto): Promise<LearningModule> {
    return this.learningModulePortAdapter.createModule(createData);
  }

  public async updateLearningModuleData(updateData: UpdateLearningModuleDto): Promise<LearningModule> {
    return this.learningModulePortAdapter.updateModule(updateData);
  }

  public async deleteLearningModuleData(moduleId: string): Promise<boolean> {
    return this.learningModulePortAdapter.deleteModule(moduleId);
  }
}
