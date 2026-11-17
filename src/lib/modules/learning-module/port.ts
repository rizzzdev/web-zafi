import type { LearningModule } from '$lib/db';
import type { UpdateLearningModuleDto, CreateLearningModuleDto } from './dto';

export interface LearningModulePort {
  getAllModules(): Promise<readonly LearningModule[]>;
  getModuleBySlug(moduleSlug: string): Promise<LearningModule | null>;
  getModuleById(moduleId: string): Promise<LearningModule | null>;
  createModule(inputDto: CreateLearningModuleDto): Promise<LearningModule>;
  updateModule(inputDto: UpdateLearningModuleDto): Promise<LearningModule>;
  deleteModule(moduleId: string): Promise<boolean>;
}
