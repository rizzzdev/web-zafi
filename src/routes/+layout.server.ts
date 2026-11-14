import type { LayoutServerLoad } from './$types';
import { container } from '$lib/container';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const sessionToken = cookies.get('session_token');
  const sessionUser = await container.authService.validateSessionToken(sessionToken);

  return {
    sessionUser,
    currentPathname: url.pathname,
  };
};
