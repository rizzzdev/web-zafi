import type { PageServerLoad, Actions } from './$types';
import { container } from '$lib/container';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const sessionToken = cookies.get('session_token');
  const sessionUser = await container.authService.validateSessionToken(sessionToken);
  if (sessionUser) {
    throw redirect(303, '/admin/dashboard');
  }

  return {};
};

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();
    const emailAddress = formData.get('emailAddress')?.toString() || '';
    const plainPassword = formData.get('plainPassword')?.toString() || '';

    const authOutcome = await container.authService.authenticateAdmin({
      emailAddress,
      plainPassword,
    });

    if (!authOutcome.isSuccess || !authOutcome.sessionRecord) {
      return fail(401, {
        isSuccess: false,
        errorMessage: authOutcome.errorMessage ?? 'Email atau kata sandi tidak valid',
        emailAddress,
      });
    }

    // Set Secure HttpOnly Cookie
    cookies.set('session_token', authOutcome.sessionRecord.sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    throw redirect(303, '/admin/dashboard');
  },
};
