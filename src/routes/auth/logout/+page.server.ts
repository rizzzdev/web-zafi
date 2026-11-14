import type { Actions } from './$types';
import { container } from '$lib/container';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ cookies }) => {
    const sessionToken = cookies.get('session_token');
    await container.authService.logoutSession(sessionToken);

    cookies.delete('session_token', { path: '/' });
    throw redirect(303, '/auth/login');
  },
};
