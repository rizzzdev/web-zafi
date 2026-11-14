import type { LearningModule } from '$lib/db';
import type { UpdateLearningModuleDto } from './dto';

export interface LearningModulePort {
  getAllModules(): Promise<readonly LearningModule[]>;
  getModuleBySlug(moduleSlug: string): Promise<LearningModule | null>;
  getModuleById(moduleId: string): Promise<LearningModule | null>;
  updateModule(inputDto: UpdateLearningModuleDto): Promise<LearningModule>;
}
