import type { FileStoragePort, StoredFileRecord } from './port';

export class FileStorageRepository {
  private readonly fileStoragePortAdapter: FileStoragePort;

  public constructor(fileStoragePortAdapter: FileStoragePort) {
    this.fileStoragePortAdapter = fileStoragePortAdapter;
  }

  public async uploadFile(fileName: string, mimeType: string, fileBuffer: Buffer): Promise<StoredFileRecord> {
    return this.fileStoragePortAdapter.saveFileBuffer(fileName, mimeType, fileBuffer);
  }

  public async deleteFile(fileId: string): Promise<boolean> {
    return this.fileStoragePortAdapter.removeFileById(fileId);
  }

  public async fetchPublicUrl(fileId: string): Promise<string | null> {
    return this.fileStoragePortAdapter.getPublicFileUrl(fileId);
  }
}
