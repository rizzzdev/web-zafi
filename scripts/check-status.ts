import fs from 'node:fs';
import path from 'node:path';

const requestedStageArgument = process.argv[2];
const targetStageNumber = requestedStageArgument ? parseInt(requestedStageArgument, 10) : 2;

const projectRootDirectory = process.cwd();
const statusFilePath = path.join(projectRootDirectory, 'one-off-dev', 'STATUS.md');

console.log(
	`\n🔍 Memeriksa Kesiapan & Status Pipeline Proyek (Target Stage: ${targetStageNumber})...\n`
);

if (!fs.existsSync(statusFilePath)) {
	console.error(`❌ File STATUS.md tidak ditemukan di: ${statusFilePath}`);
	process.exit(1);
}

const statusFileContent = fs.readFileSync(statusFilePath, 'utf-8');

function verifyStage1Status(): boolean {
	const isStage1Complete = statusFileContent.includes(
		'### Stage 1: Discovery, Scope & Prisma Schema Contract — [x] SELESAI'
	);
	if (!isStage1Complete) {
		console.error('❌ Stage 1 belum ditandai SELESAI pada one-off-dev/STATUS.md');
		return false;
	}
	console.log('✅ Stage 1: Discovery, Scope & Prisma Schema Contract terverifikasi.');
	return true;
}

function verifyStage2Status(): boolean {
	const validationErrors: string[] = [];

	// 1. Verifikasi dependencies pada package.json
	const packageJsonPath = path.join(projectRootDirectory, 'package.json');
	if (!fs.existsSync(packageJsonPath)) {
		validationErrors.push('File package.json tidak ditemukan.');
	} else {
		const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
		const allInstalledDependencies = {
			...(packageJsonContent.dependencies || {}),
			...(packageJsonContent.devDependencies || {})
		};

		const requiredDependenciesList = [
			'svelte',
			'@sveltejs/kit',
			'tailwindcss',
			'bcrypt',
			'@material-symbols/font-400',
			'prisma',
			'@prisma/client',
			'zod',
			'husky'
		];

		for (const dependencyName of requiredDependenciesList) {
			if (!allInstalledDependencies[dependencyName]) {
				validationErrors.push(`Dependency '${dependencyName}' belum terpasang di package.json.`);
			}
		}
	}

	// 2. Verifikasi schema.prisma
	const prismaSchemaFilePath = path.join(projectRootDirectory, 'prisma', 'schema.prisma');
	if (!fs.existsSync(prismaSchemaFilePath)) {
		validationErrors.push('File prisma/schema.prisma tidak ditemukan.');
	} else {
		const schemaContent = fs.readFileSync(prismaSchemaFilePath, 'utf-8');
		const requiredModelNames = [
			'User',
			'LearningModule',
			'QuizQuestion',
			'QuizOption',
			'QuizSubmission',
			'StudentFeedback'
		];
		for (const modelName of requiredModelNames) {
			if (!schemaContent.includes(`model ${modelName}`)) {
				validationErrors.push(`Model '${modelName}' tidak ditemukan di prisma/schema.prisma.`);
			}
		}
	}

	// 3. Verifikasi Prisma generated client
	const prismaGeneratedClientPath = path.join(
		projectRootDirectory,
		'src',
		'lib',
		'db',
		'generated',
		'index.d.ts'
	);
	if (!fs.existsSync(prismaGeneratedClientPath)) {
		validationErrors.push('Prisma generated client tidak ditemukan di src/lib/db/generated.');
	}

	// 4. Verifikasi Atomic Design Skeleton
	const requiredComponentDirectories = [
		path.join(projectRootDirectory, 'src', 'lib', 'components', 'atoms', 'index.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'components', 'molecules', 'index.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'components', 'organisms', 'index.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'components', 'index.ts')
	];
	for (const componentPath of requiredComponentDirectories) {
		if (!fs.existsSync(componentPath)) {
			validationErrors.push(
				`Komponen pustaka tidak ditemukan: ${path.relative(projectRootDirectory, componentPath)}`
			);
		}
	}

	// 5. Verifikasi Domain Modules & Adapters & Container
	const requiredArchitecturePaths = [
		path.join(projectRootDirectory, 'src', 'lib', 'adapters', 'prototype.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'container.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'modules', 'auth', 'index.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'modules', 'learning-module', 'index.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'modules', 'quiz', 'index.ts'),
		path.join(projectRootDirectory, 'src', 'lib', 'modules', 'feedback', 'index.ts')
	];
	for (const architecturePath of requiredArchitecturePaths) {
		if (!fs.existsSync(architecturePath)) {
			validationErrors.push(
				`Arsitektur domain/adapter tidak ditemukan: ${path.relative(projectRootDirectory, architecturePath)}`
			);
		}
	}

	// 6. Verifikasi Rute Wajib (SSR server load + page UI)
	const requiredRouteEndpoints = [
		'src/routes/+page.svelte',
		'src/routes/modul/+page.svelte',
		'src/routes/modul/input/+page.svelte',
		'src/routes/modul/process/+page.svelte',
		'src/routes/modul/output/+page.svelte',
		'src/routes/modul/storage-software/+page.svelte',
		'src/routes/kuis/+page.svelte',
		'src/routes/testimoni/+page.svelte',
		'src/routes/auth/login/+page.svelte',
		'src/routes/admin/dashboard/+page.svelte',
		'src/routes/admin/responden/+page.svelte',
		'src/routes/admin/hasil-kuis/+page.svelte',
		'src/routes/admin/kelola-kuis/+page.svelte',
		'src/routes/admin/kelola-modul/+page.svelte'
	];
	for (const routePath of requiredRouteEndpoints) {
		const fullRoutePath = path.join(projectRootDirectory, routePath);
		if (!fs.existsSync(fullRoutePath)) {
			validationErrors.push(`Rute halaman tidak ditemukan: ${routePath}`);
		}
	}

	// 7. Verifikasi Git & Husky Hook
	const huskyPreCommitHookPath = path.join(projectRootDirectory, '.husky', 'pre-commit');
	if (!fs.existsSync(huskyPreCommitHookPath)) {
		validationErrors.push('Husky pre-commit hook tidak ditemukan.');
	}

	if (validationErrors.length > 0) {
		console.error('❌ Kegagalan Verifikasi DoD Stage 2:');
		for (const errorMessage of validationErrors) {
			console.error(`  - ${errorMessage}`);
		}
		return false;
	}

	console.log('✅ Stage 2: Scaffolding, Atomic UI, Mock Adapters, SSR Routes, and Husky verified.');
	return true;
}

function verifyStage3Status(): boolean {
	const validationErrors: string[] = [];

	// 1. Verifikasi status Stage 3 pada STATUS.md
	const isStage3MarkedDone = statusFileContent.includes(
		'### Stage 3: Database Integration & Fullstack Wiring — [x] SELESAI'
	);
	if (!isStage3MarkedDone) {
		validationErrors.push('Stage 3 belum ditandai [x] SELESAI pada one-off-dev/STATUS.md');
	}

	// 2. Verifikasi Berkas Adapter Produksi
	const requiredProductionFiles = [
		'src/lib/adapters/PrismaAuthAdapter.ts',
		'src/lib/adapters/PrismaLearningModuleAdapter.ts',
		'src/lib/adapters/PrismaQuizAdapter.ts',
		'src/lib/adapters/PrismaFeedbackAdapter.ts',
		'src/lib/adapters/DiskFileStorageAdapter.ts',
		'src/lib/adapters/DbTaskLifecycleAdapter.ts',
		'src/lib/adapters/production.ts',
		'src/hooks.server.ts',
		'src/routes/api/health/+server.ts',
		'src/routes/uploads/[...file]/+server.ts',
		'prisma/seed.ts'
	];

	for (const relativeFilePath of requiredProductionFiles) {
		const fullFilePath = path.join(projectRootDirectory, relativeFilePath);
		if (!fs.existsSync(fullFilePath)) {
			validationErrors.push(`Berkas produksi Stage 3 tidak ditemukan: ${relativeFilePath}`);
		}
	}

	// 3. Verifikasi 1-Line Container Swap
	const containerFilePath = path.join(projectRootDirectory, 'src', 'lib', 'container.ts');
	if (fs.existsSync(containerFilePath)) {
		const containerContent = fs.readFileSync(containerFilePath, 'utf-8');
		if (!containerContent.includes('productionAdapters')) {
			validationErrors.push('src/lib/container.ts belum beralih ke productionAdapters');
		}
	} else {
		validationErrors.push('src/lib/container.ts tidak ditemukan');
	}

	// 4. Verifikasi Migrasi Skema Prisma
	const migrationsDirectoryPath = path.join(projectRootDirectory, 'prisma', 'migrations');
	if (!fs.existsSync(migrationsDirectoryPath)) {
		validationErrors.push('Folder prisma/migrations tidak ditemukan');
	} else {
		const migrationEntries = fs.readdirSync(migrationsDirectoryPath);
		const hasMigrationDirs = migrationEntries.some(
			(entryName) =>
				entryName !== 'migration_lock.toml' &&
				fs.statSync(path.join(migrationsDirectoryPath, entryName)).isDirectory()
		);
		if (!hasMigrationDirs) {
			validationErrors.push('Belum ada migration yang dibuat di prisma/migrations');
		}
	}

	if (validationErrors.length > 0) {
		console.error('❌ Kegagalan Verifikasi DoD Stage 3:');
		for (const errorMessage of validationErrors) {
			console.error(`  - ${errorMessage}`);
		}
		return false;
	}

	console.log(
		'✅ Stage 3: Database Integration, Production Adapters, Container Swap, Hooks, and Healthcheck verified.'
	);
	return true;
}

const isStage1Valid = verifyStage1Status();
if (!isStage1Valid) {
	process.exit(1);
}

if (targetStageNumber >= 2) {
	const isStage2Valid = verifyStage2Status();
	if (!isStage2Valid) {
		process.exit(1);
	}
}

if (targetStageNumber >= 3) {
	const isStage3Valid = verifyStage3Status();
	if (!isStage3Valid) {
		process.exit(1);
	}
}

console.log(`\n🎉 Seluruh verifikasi DoD sampai Tahap ${targetStageNumber} BERHASIL LULUS 100%!\n`);
process.exit(0);
