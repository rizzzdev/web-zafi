import { prisma } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const startTimestampMs = performance.now();
	try {
		await prisma.$queryRaw`SELECT 1`;
		const databaseLatencyMilliseconds = Math.round(performance.now() - startTimestampMs);
		const processMemoryStatistics = process.memoryUsage();

		return json({
			status: 'healthy',
			environment: process.env.NODE_ENV ?? 'development',
			timestamp: new Date().toISOString(),
			databaseLatencyMilliseconds,
			memory: {
				rssInMegabytes: Math.round(processMemoryStatistics.rss / 1024 / 1024),
				heapUsedInMegabytes: Math.round(processMemoryStatistics.heapUsed / 1024 / 1024),
				heapTotalInMegabytes: Math.round(processMemoryStatistics.heapTotal / 1024 / 1024)
			}
		});
	} catch (healthcheckError: unknown) {
		console.error('Deep healthcheck error:', healthcheckError);
		return json(
			{
				status: 'unhealthy',
				timestamp: new Date().toISOString(),
				errorMessage: 'Database connection failed'
			},
			{ status: 503 }
		);
	}
};
