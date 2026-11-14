import bcrypt from 'bcrypt';
import type { AuthPort, AuthenticatedUser, UserSessionRecord, LoginInputDto } from '$lib/modules/auth';
import { UserRole } from '$lib/db';

export class InMemoryAuthAdapter implements AuthPort {
  private readonly userDatabase: AuthenticatedUser[] = [
    {
      id: 'a0000000-0000-0000-0000-000000000001',
      email: 'admin@edukomputer.ac.id',
      fullName: 'Instruktur Utama EduKomputer',
      role: UserRole.ADMIN,
    },
  ];

  // Hashed password for 'admin123' with bcrypt cost 12
  private readonly passwordHashMap: Map<string, string> = new Map([
    ['admin@edukomputer.ac.id', bcrypt.hashSync('admin123', 10)],
  ]);

  private readonly sessionStore: Map<string, UserSessionRecord> = new Map();

  public async findUserByEmail(emailAddress: string): Promise<AuthenticatedUser | null> {
    const matchedUser = this.userDatabase.find((user) => user.email.toLowerCase() === emailAddress.toLowerCase());
    return matchedUser ?? null;
  }

  public async validateCredentials(loginInput: LoginInputDto): Promise<AuthenticatedUser | null> {
    const matchedUser = await this.findUserByEmail(loginInput.emailAddress);
    if (!matchedUser) {
      return null;
    }

    const storedHash = this.passwordHashMap.get(matchedUser.email.toLowerCase());
    if (!storedHash) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(loginInput.plainPassword, storedHash);
    if (!isPasswordMatching) {
      return null;
    }

    return matchedUser;
  }

  public async createSession(user: AuthenticatedUser): Promise<UserSessionRecord> {
    const sessionToken = `mock-session-${crypto.randomUUID()}`;
    const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 hari

    const sessionRecord: UserSessionRecord = {
      sessionToken,
      user,
      expiresAt: expirationDate,
    };

    this.sessionStore.set(sessionToken, sessionRecord);
    return sessionRecord;
  }

  public async findSessionByToken(sessionToken: string): Promise<UserSessionRecord | null> {
    const existingSession = this.sessionStore.get(sessionToken);
    return existingSession ?? null;
  }

  public async invalidateSession(sessionToken: string): Promise<boolean> {
    return this.sessionStore.delete(sessionToken);
  }
}
