<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const user = writable(null);

  onMount(async () => { //session page load
    const {
      data: { session }
    } = await supabase.auth.getSession();
    user.set(session?.user || null);

    //show if user is loged in/out
    supabase.auth.onAuthStateChange((_event, session) => {
      user.set(session?.user || null);
    });
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.set(null);
  };
</script>

<header>
    <nav class="header-right">
        <a href="/">Home</a>
        <a href="/login">Login / Sign Up</a>
      
        {#if $user}
          <span>Hello, {$user.email}</span>  <!-- this will be name -->
          <button on:click={handleLogout}>Log out</button>
        {/if}
    </nav>
</header>
<main>
    <slot />
    <!-- Content -->
</main>
<footer>
    <nav>
        <a href="/">Conscious Beauty</a>
      </nav>
</footer>
