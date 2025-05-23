<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';


  let user = null;

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user;

    if (!user) {
      goto('/login'); // back to login if not auth
    }
  });
</script>

<h1>Admin Panel</h1>

{#if user}
  <p>Welcome, {user.email}</p>

  <section class="admin-controls">
    <h2>Admin Controls</h2> <!--placeholder controls-->
    <ul>
      <li><button disabled>Manage Products</button></li>
      <li><button disabled>Review Moderation</button></li>
      <li><button disabled>Settings</button></li>
    </ul>
  </section>
{/if}

<style src="./admin.css" global></style>
