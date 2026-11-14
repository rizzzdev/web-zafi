import type { FileStoragePort, StoredFileRecord } from '$lib/modules/storage';

export class InMemoryFileStorageAdapter implements FileStoragePort {
  private readonly storageMap: Map<string, { readonly record: StoredFileRecord; readonly buffer: Buffer }> = new Map();

  public async saveFileBuffer(fileName: string, mimeType: string, fileBuffer: Buffer): Promise<StoredFileRecord> {
    const fileId = `file-${crypto.randomUUID()}`;
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const publicUrl = `/uploads/${fileId}-${sanitizedFileName}`;

    const record: StoredFileRecord = {
      fileId,
      originalFileName: fileName,
      mimeType,
      fileSizeBytes: fileBuffer.length,
      publicUrl,
      createdAt: new Date(),
    };

    this.storageMap.set(fileId, { record, buffer: fileBuffer });
    return record;
  }

  public async removeFileById(fileId: string): Promise<boolean> {
    return this.storageMap.delete(fileId);
  }

  public async getPublicFileUrl(fileId: string): Promise<string | null> {
    const fileEntry = this.storageMap.get(fileId);
    return fileEntry ? fileEntry.record.publicUrl : null;
  }
}
