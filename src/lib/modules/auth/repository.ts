import type { AuthPort } from './port';
import type { AuthenticatedUser, UserSessionRecord } from './types';
import type { LoginInputDto } from './dto';

export class AuthRepository {
  private readonly authPortAdapter: AuthPort;

  public constructor(authPortAdapter: AuthPort) {
    this.authPortAdapter = authPortAdapter;
  }

  public async getUserByEmail(emailAddress: string): Promise<AuthenticatedUser | null> {
    return this.authPortAdapter.findUserByEmail(emailAddress);
  }

  public async verifyUserCredentials(loginInput: LoginInputDto): Promise<AuthenticatedUser | null> {
    return this.authPortAdapter.validateCredentials(loginInput);
  }

  public async generateUserSession(user: AuthenticatedUser): Promise<UserSessionRecord> {
    return this.authPortAdapter.createSession(user);
  }

  public async getSessionByToken(sessionToken: string): Promise<UserSessionRecord | null> {
    return this.authPortAdapter.findSessionByToken(sessionToken);
  }

  public async terminateSession(sessionToken: string): Promise<boolean> {
    return this.authPortAdapter.invalidateSession(sessionToken);
  }
}
