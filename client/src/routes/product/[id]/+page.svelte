<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  let user = null;

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user;
  });
</script>

<h1>Welcome to ILUS.me, {$user?.email || 'User'}!</h1>
<p>This is your landing page after login.</p>
