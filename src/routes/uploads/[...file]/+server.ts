import fs from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const MIME_TYPE_MAP: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.pdf': 'application/pdf'
};

export const GET: RequestHandler = async ({ params }) => {
	const rawFileName = params.file;
	if (!rawFileName) {
		return new Response('Nama file wajib disertakan', { status: 400 });
	}

	const safeFileName = path.basename(rawFileName);
	const uploadsDirectory = path.resolve(process.cwd(), 'uploads');
	const targetFilePath = path.resolve(uploadsDirectory, safeFileName);

	// Proteksi path traversal: Pastikan path yang diselesaikan berada di dalam uploadsDirectory
	if (!targetFilePath.startsWith(uploadsDirectory)) {
		return new Response('Akses ditolak (Path Traversal Detected)', { status: 403 });
	}

	try {
		const fileBuffer = await fs.readFile(targetFilePath);
		const fileExtension = path.extname(safeFileName).toLowerCase();
		const contentType = MIME_TYPE_MAP[fileExtension] || 'application/octet-stream';

		return new Response(fileBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=86400',
				'X-Content-Type-Options': 'nosniff'
			}
		});
	} catch (fileAccessError: unknown) {
		console.warn('Gagal membaca file upload streaming:', fileAccessError);
		return new Response('File tidak ditemukan', { status: 404 });
	}
};
