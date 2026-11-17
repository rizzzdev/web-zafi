import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import type {
	AuthPort,
	AuthenticatedUser,
	UserSessionRecord,
	LoginInputDto
} from '$lib/modules/auth';
import { prisma, UserRole } from '$lib/db';

export class PrismaAuthAdapter implements AuthPort {
	private readonly sessionMemoryCache: Map<string, UserSessionRecord> = new Map();

	public async findUserByEmail(emailAddress: string): Promise<AuthenticatedUser | null> {
		const normalizedEmailAddress = emailAddress.trim().toLowerCase();
		const matchedUser = await prisma.user.findFirst({
			where: {
				email: normalizedEmailAddress,
				deletedAt: null
			}
		});

		if (!matchedUser) {
			return null;
		}

		return {
			id: matchedUser.id,
			email: matchedUser.email,
			fullName: matchedUser.fullName,
			role: matchedUser.role === 'ADMIN' ? UserRole.ADMIN : UserRole.ADMIN
		};
	}

	public async validateCredentials(loginInput: LoginInputDto): Promise<AuthenticatedUser | null> {
		const normalizedEmailAddress = loginInput.emailAddress.trim().toLowerCase();
		const matchedUser = await prisma.user.findFirst({
			where: {
				email: normalizedEmailAddress,
				deletedAt: null
			}
		});

		if (!matchedUser) {
			return null;
		}

		const isPasswordMatching = await bcrypt.compare(
			loginInput.plainPassword,
			matchedUser.passwordHash
		);

		if (!isPasswordMatching) {
			return null;
		}

		return {
			id: matchedUser.id,
			email: matchedUser.email,
			fullName: matchedUser.fullName,
			role: matchedUser.role === 'ADMIN' ? UserRole.ADMIN : UserRole.ADMIN
		};
	}

	public async createSession(user: AuthenticatedUser): Promise<UserSessionRecord> {
		const sessionToken = `session-${crypto.randomUUID()}`;
		const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 Hari Sesi Aktif

		const sessionRecord: UserSessionRecord = {
			sessionToken,
			user,
			expiresAt: expirationDate
		};

		this.sessionMemoryCache.set(sessionToken, sessionRecord);
		return sessionRecord;
	}

	public async findSessionByToken(sessionToken: string): Promise<UserSessionRecord | null> {
		const cachedSession = this.sessionMemoryCache.get(sessionToken);
		if (!cachedSession) {
			return null;
		}

		const currentTimestamp = new Date();
		if (cachedSession.expiresAt < currentTimestamp) {
			this.sessionMemoryCache.delete(sessionToken);
			return null;
		}

		// Verifikasi database aktif: Pastikan user masih ada dan belum dihapus (soft-delete)
		const verifiedUserRecord = await prisma.user.findFirst({
			where: {
				id: cachedSession.user.id,
				deletedAt: null
			}
		});

		if (!verifiedUserRecord) {
			this.sessionMemoryCache.delete(sessionToken);
			return null;
		}

		return cachedSession;
	}

	public async invalidateSession(sessionToken: string): Promise<boolean> {
		return this.sessionMemoryCache.delete(sessionToken);
	}
}
