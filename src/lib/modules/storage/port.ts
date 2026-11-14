export interface StoredFileRecord {
  readonly fileId: string;
  readonly originalFileName: string;
  readonly mimeType: string;
  readonly fileSizeBytes: number;
  readonly publicUrl: string;
  readonly createdAt: Date;
}

export interface FileStoragePort {
  saveFileBuffer(fileName: string, mimeType: string, fileBuffer: Buffer): Promise<StoredFileRecord>;
  removeFileById(fileId: string): Promise<boolean>;
  getPublicFileUrl(fileId: string): Promise<string | null>;
}
