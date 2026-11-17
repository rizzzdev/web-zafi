import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import type { FileStoragePort, StoredFileRecord } from '$lib/modules/storage';

export class DiskFileStorageAdapter implements FileStoragePort {
	private readonly uploadDirectoryPath: string;
	private readonly fileMetadataStore: Map<string, StoredFileRecord> = new Map();

	public constructor() {
		this.uploadDirectoryPath = path.resolve(process.cwd(), 'uploads');
	}

	private async ensureUploadDirectoryExists(): Promise<void> {
		try {
			await fs.mkdir(this.uploadDirectoryPath, { recursive: true });
		} catch (directoryError: unknown) {
			console.error('Gagal membuat direktori upload:', directoryError);
		}
	}

	public async saveFileBuffer(
		fileName: string,
		mimeType: string,
		fileBuffer: Buffer
	): Promise<StoredFileRecord> {
		await this.ensureUploadDirectoryExists();

		const allowedMimeTypesList = ['image/jpeg', 'image/png', 'application/pdf'];
		if (!allowedMimeTypesList.includes(mimeType)) {
			throw new Error(`Format file '${mimeType}' tidak diizinkan. Hanya JPG, PNG, dan PDF.`);
		}

		const maxFileSizeBytes = 5 * 1024 * 1024; // 5 MB
		if (fileBuffer.byteLength > maxFileSizeBytes) {
			throw new Error('Ukuran file melebihi batas maksimal 5MB.');
		}

		const fileId = crypto.randomUUID();
		const sanitizedBaseFileName = path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');
		const storedFileName = `${fileId}-${sanitizedBaseFileName}`;
		const destinationDiskPath = path.join(this.uploadDirectoryPath, storedFileName);

		await fs.writeFile(destinationDiskPath, fileBuffer);

		const publicUrl = `/uploads/${storedFileName}`;
		const storedFileRecord: StoredFileRecord = {
			fileId,
			originalFileName: sanitizedBaseFileName,
			mimeType,
			fileSizeBytes: fileBuffer.byteLength,
			publicUrl,
			createdAt: new Date()
		};

		this.fileMetadataStore.set(fileId, storedFileRecord);
		return storedFileRecord;
	}

	public async removeFileById(fileId: string): Promise<boolean> {
		const existingMetadata = this.fileMetadataStore.get(fileId);
		if (!existingMetadata) {
			return false;
		}

		const storedFileName = path.basename(existingMetadata.publicUrl);
		const destinationDiskPath = path.join(this.uploadDirectoryPath, storedFileName);

		try {
			await fs.unlink(destinationDiskPath);
			this.fileMetadataStore.delete(fileId);
			return true;
		} catch {
			return false;
		}
	}

	public async getPublicFileUrl(fileId: string): Promise<string | null> {
		const existingMetadata = this.fileMetadataStore.get(fileId);
		return existingMetadata ? existingMetadata.publicUrl : null;
	}
}
