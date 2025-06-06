import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const user = locals.user;

  // Make sure PUBLIC_ADMIN_EMAIL is available
  const adminEmail = import.meta.env.PUBLIC_ADMIN_EMAIL;

  if (!user || user.email !== adminEmail) {
    throw redirect(302, '/');
  }

  return {
    user
  };
}
