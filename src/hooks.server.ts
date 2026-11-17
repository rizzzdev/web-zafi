import type { Handle, RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { container } from '$lib/container';

interface SlidingWindowRateLimitEntry {
	timestamps: number[];
	lastAccessedAt: number;
}

class MemorySlidingWindowRateLimiter {
	private readonly rateLimitEntries: Map<string, SlidingWindowRateLimitEntry> = new Map();
	private readonly windowDurationMs: number;
	private readonly maximumAllowedRequests: number;
	private readonly cleanupIntervalMs: number;
	private lastGlobalCleanupTimestamp: number = Date.now();

	public constructor(
		windowDurationMs: number = 60 * 1000, // 1 menit window
		maximumAllowedRequests: number = 15, // Maksimal 15 request per menit
		cleanupIntervalMs: number = 5 * 60 * 1000 // Bersihkan memori setiap 5 menit
	) {
		this.windowDurationMs = windowDurationMs;
		this.maximumAllowedRequests = maximumAllowedRequests;
		this.cleanupIntervalMs = cleanupIntervalMs;
	}

	public isRateLimited(clientIdentifier: string): boolean {
		const currentTimestamp = Date.now();

		// Trigger auto-purge jika sudah melewati cleanup interval untuk mencegah memory leak
		if (currentTimestamp - this.lastGlobalCleanupTimestamp > this.cleanupIntervalMs) {
			this.purgeExpiredEntries(currentTimestamp);
			this.lastGlobalCleanupTimestamp = currentTimestamp;
		}

		const existingEntry = this.rateLimitEntries.get(clientIdentifier);
		if (!existingEntry) {
			this.rateLimitEntries.set(clientIdentifier, {
				timestamps: [currentTimestamp],
				lastAccessedAt: currentTimestamp
			});
			return false;
		}

		// Filter timestamp yang masih berada di dalam jendela waktu geser (sliding window)
		const thresholdTimestamp = currentTimestamp - this.windowDurationMs;
		const activeTimestamps = existingEntry.timestamps.filter(
			(recordedTimestamp) => recordedTimestamp > thresholdTimestamp
		);

		activeTimestamps.push(currentTimestamp);
		existingEntry.timestamps = activeTimestamps;
		existingEntry.lastAccessedAt = currentTimestamp;

		return activeTimestamps.length > this.maximumAllowedRequests;
	}

	private purgeExpiredEntries(currentTimestamp: number): void {
		const expirationThreshold = currentTimestamp - this.windowDurationMs;
		for (const [clientIdentifier, rateLimitEntry] of this.rateLimitEntries.entries()) {
			if (rateLimitEntry.lastAccessedAt < expirationThreshold) {
				this.rateLimitEntries.delete(clientIdentifier);
			}
		}
	}
}

// Inisialisasi Sliding Window Rate Limiter untuk rute sensitif autentikasi
const authLoginRateLimiter = new MemorySlidingWindowRateLimiter(60 * 1000, 10, 3 * 60 * 1000);

function resolveClientIpAddress(event: RequestEvent): string {
	const forwardedHeader = event.request.headers.get('x-forwarded-for');
	if (forwardedHeader) {
		const primaryIpAddress = forwardedHeader.split(',')[0].trim();
		if (primaryIpAddress) {
			return primaryIpAddress;
		}
	}

	const realIpHeader = event.request.headers.get('x-real-ip');
	if (realIpHeader) {
		return realIpHeader.trim();
	}

	try {
		return event.getClientAddress();
	} catch {
		return '127.0.0.1';
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	// 1. Rate Limiting pada percobaan autentikasi login (POST /auth/login)
	const isLoginPostRequest =
		event.url.pathname === '/auth/login' && event.request.method === 'POST';

	if (isLoginPostRequest) {
		const clientIpAddress = resolveClientIpAddress(event);
		const isExceeded = authLoginRateLimiter.isRateLimited(clientIpAddress);

		if (isExceeded) {
			return new Response(
				JSON.stringify({
					error: 'Terlalu banyak percobaan masuk. Mohon tunggu 1 menit sebelum mencoba kembali.'
				}),
				{
					status: 429,
					headers: {
						'Content-Type': 'application/json',
						'Retry-After': '60'
					}
				}
			);
		}
	}

	// 2. OWASP Verified Session Token Resolution
	const rawSessionToken = event.cookies.get('session_token');
	if (rawSessionToken) {
		const verifiedUserRecord = await container.authService.validateSessionToken(rawSessionToken);
		event.locals.user = verifiedUserRecord;
	} else {
		event.locals.user = null;
	}

	// 3. Proteksi Akses Server-Side Panel Admin
	const isRequestingAdminRoute = event.url.pathname.startsWith('/admin');
	if (isRequestingAdminRoute && !event.locals.user) {
		const encodedTargetUrl = encodeURIComponent(event.url.pathname);
		throw redirect(303, `/auth/login?redirectUrl=${encodedTargetUrl}`);
	}

	// 4. Eksekusi Request Handler SvelteKit
	const originalResponse = await resolve(event);

	// 5. OWASP Top 10 Security Headers Enforcement
	originalResponse.headers.set('X-Frame-Options', 'DENY');
	originalResponse.headers.set('X-Content-Type-Options', 'nosniff');
	originalResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	originalResponse.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=()'
	);

	return originalResponse;
};
