import type { AuthenticatedUser, UserSessionRecord } from './types';
import type { LoginInputDto } from './dto';

export interface AuthPort {
  findUserByEmail(emailAddress: string): Promise<AuthenticatedUser | null>;
  validateCredentials(loginInput: LoginInputDto): Promise<AuthenticatedUser | null>;
  createSession(user: AuthenticatedUser): Promise<UserSessionRecord>;
  findSessionByToken(sessionToken: string): Promise<UserSessionRecord | null>;
  invalidateSession(sessionToken: string): Promise<boolean>;
}
