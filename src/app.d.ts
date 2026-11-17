import type { AuthenticatedUser } from '$lib/modules/auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AuthenticatedUser | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
