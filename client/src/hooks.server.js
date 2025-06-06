import { supabase } from '$lib/supabaseClient';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  event.locals.user = session?.user ?? null;

  return resolve(event);
}
