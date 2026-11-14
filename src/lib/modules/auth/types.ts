import type { User, UserRole } from '$lib/db';

export interface AuthenticatedUser {
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly role: UserRole;
}

export interface UserSessionRecord {
  readonly sessionToken: string;
  readonly user: AuthenticatedUser;
  readonly expiresAt: Date;
}
