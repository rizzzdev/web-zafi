import type { LayoutServerLoad } from './$types';
import { container } from '$lib/container';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const sessionToken = cookies.get('session_token');
  const sessionUser = await container.authService.validateSessionToken(sessionToken);

  if (!sessionUser) {
    throw redirect(303, `/auth/login?redirectUrl=${encodeURIComponent(url.pathname)}`);
  }

  return {
    adminUser: sessionUser,
    currentPathname: url.pathname,
  };
};
