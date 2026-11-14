import type { LearningModulePort } from './port';
import type { LearningModule } from '$lib/db';
import type { UpdateLearningModuleDto } from './dto';

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

  public async updateLearningModuleData(updateData: UpdateLearningModuleDto): Promise<LearningModule> {
    return this.learningModulePortAdapter.updateModule(updateData);
  }
}
