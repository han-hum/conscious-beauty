<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { PUBLIC_ADMIN_EMAIL } from '$env/static/public';

  const user = writable(null);

  onMount(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const currentUser = session?.user || null;
    user.set(currentUser);

    // Redirect to /admin if admin logs in needs fixing
    if (currentUser?.email === PUBLIC_ADMIN_EMAIL && window.location.pathname === '/profile') {
      goto('/admin');
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user || null;
      user.set(newUser);

      // Redirect again for dynamic login
      if (newUser?.email === PUBLIC_ADMIN_EMAIL && window.location.pathname === '/profile') {
        goto('/admin');
      }
    });
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.set(null);
  };
</script>


<header>
  
  <a href="/" class="logo-container">
    <img src="/logoPG.png" alt="ILUS.me logo" class="logo-img" />
  </a>

    <nav class="header-right">

        <a href="/">Home</a>
        <a href="/product">Products</a>
        <a href="/about">About</a>
        {#if !$user}
        <a href="/login">Login/Sign Up</a>
      {:else}
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
