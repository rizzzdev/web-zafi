import { FileStorageRepository } from './repository';
import type { StoredFileRecord } from './port';

export class FileStorageService {
  private readonly fileStorageRepository: FileStorageRepository;

  public constructor(fileStorageRepository: FileStorageRepository) {
    this.fileStorageRepository = fileStorageRepository;
  }

  public async storeUploadedFile(
    fileName: string,
    mimeType: string,
    fileBuffer: Buffer
  ): Promise<StoredFileRecord> {
    return this.fileStorageRepository.uploadFile(fileName, mimeType, fileBuffer);
  }

  public async getFileUrl(fileId: string): Promise<string | null> {
    return this.fileStorageRepository.fetchPublicUrl(fileId);
  }
}
