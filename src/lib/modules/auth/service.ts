import { AuthRepository } from './repository';
import { AuthValidator } from './validator';
import type { AuthenticatedUser, UserSessionRecord } from './types';

export class AuthService {
  private readonly authRepository: AuthRepository;

  public constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public async authenticateAdmin(rawCredentials: {
    readonly emailAddress: string;
    readonly plainPassword: string;
  }): Promise<{
    readonly isSuccess: boolean;
    readonly sessionRecord?: UserSessionRecord;
    readonly errorMessage?: string;
  }> {
    const validationResult = AuthValidator.validateLoginInput(rawCredentials);
    if (!validationResult.isSuccess || !validationResult.validatedData) {
      return {
        isSuccess: false,
        errorMessage: validationResult.validationError ?? 'Format kredensial tidak valid',
      };
    }

    const authenticatedUser = await this.authRepository.verifyUserCredentials(validationResult.validatedData);
    if (!authenticatedUser) {
      return {
        isSuccess: false,
        errorMessage: 'Email atau kata sandi tidak valid',
      };
    }

    const sessionRecord = await this.authRepository.generateUserSession(authenticatedUser);
    return {
      isSuccess: true,
      sessionRecord,
    };
  }

  public async validateSessionToken(sessionToken: string | undefined): Promise<AuthenticatedUser | null> {
    if (!sessionToken) {
      return null;
    }

    const sessionRecord = await this.authRepository.getSessionByToken(sessionToken);
    if (!sessionRecord) {
      return null;
    }

    const currentTimestamp = new Date();
    if (sessionRecord.expiresAt < currentTimestamp) {
      await this.authRepository.terminateSession(sessionToken);
      return null;
    }

    return sessionRecord.user;
  }

  public async logoutSession(sessionToken: string | undefined): Promise<boolean> {
    if (!sessionToken) {
      return false;
    }
    return this.authRepository.terminateSession(sessionToken);
  }
}
