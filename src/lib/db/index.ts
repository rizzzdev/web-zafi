import 'dotenv/config';
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import type * as GeneratedTypes from './generated';

const customRequire = createRequire(import.meta.url);

function resolvePrismaClientClass(): typeof GeneratedTypes.PrismaClient {
	const possiblePathLocations = [
		path.resolve(process.cwd(), 'src/lib/db/generated/index.js'),
		new URL('./generated/index.js', import.meta.url).pathname,
	];

	for (const candidatePath of possiblePathLocations) {
		try {
			// Handle windows leading slash on file URLs like /C:/...
			const normalizedPath = candidatePath.replace(/^\/([A-Z]:)/i, '$1');
			if (fs.existsSync(normalizedPath)) {
				const resolvedModule = customRequire(normalizedPath) as typeof GeneratedTypes;
				if (resolvedModule?.PrismaClient) {
					return resolvedModule.PrismaClient;
				}
			}
		} catch {
			// Lanjutkan pengecekan kandidat berikutnya
		}
	}

	const fallbackModule = customRequire('./generated/index.js') as typeof GeneratedTypes;
	return fallbackModule.PrismaClient;
}

const ResolvedPrismaClient = resolvePrismaClientClass();

const databaseUrl =
	process.env.DATABASE_URL ||
	'postgresql://postgres:nightwitch96@localhost:5433/app_edukomputer_db';

declare global {
	var __globalPrismaClientInstance: GeneratedTypes.PrismaClient | undefined;
}

function instantiatePrismaClient(): GeneratedTypes.PrismaClient {
	const connectionPool = new pg.Pool({ connectionString: databaseUrl });
	const databaseAdapter = new PrismaPg(connectionPool);
	return new ResolvedPrismaClient({ adapter: databaseAdapter });
}

export const prisma: GeneratedTypes.PrismaClient =
	globalThis.__globalPrismaClientInstance ?? instantiatePrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalThis.__globalPrismaClientInstance = prisma;
}

export const UserRole = {
	ADMIN: 'ADMIN',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ModuleCategory = {
	INPUT: 'INPUT',
	PROCESS: 'PROCESS',
	OUTPUT: 'OUTPUT',
	STORAGE_SOFTWARE: 'STORAGE_SOFTWARE',
} as const;
export type ModuleCategory = (typeof ModuleCategory)[keyof typeof ModuleCategory];

export type Decimal = number;

export type {
	User,
	LearningModule,
	QuizQuestion,
	QuizOption,
	QuizSubmission,
	AsyncTask,
} from './generated';

export type StudentFeedback = Omit<GeneratedTypes.StudentFeedback, 'averageScore'> & {
	readonly averageScore: number;
};
