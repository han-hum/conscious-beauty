<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { PUBLIC_ADMIN_EMAIL } from '$env/static/public';
  import { user, userLoaded } from '$lib/stores';



  onMount(async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const currentUser = session?.user || null;
    user.set(currentUser);
    userLoaded.set(true); //Session check true

    //Only redirect if already on /profile and it's admin!
    if (
      currentUser?.email === PUBLIC_ADMIN_EMAIL &&
      window.location.pathname === '/profile'
    ) {
      goto('/admin');
    }

    // Listen for future auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user || null;
      user.set(newUser);

      if (
        newUser?.email === PUBLIC_ADMIN_EMAIL &&
        window.location.pathname === '/profile'
      ) {
        goto('/admin');
      }
    });
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.set(null);
    userLoaded.set(false);
  };
</script>


<header>
  
  <a href="/" class="logo-container">
    <img src="/logoPG.png" alt="ILUS.me logo" class="logo-img" />
  </a>

  <nav class="header-right">
    <a href="/">Home</a>
    <a href="/products">Products</a>
    <a href="/about">About</a>
  
    {#if !$user}
      <a href="/login">Login/Sign Up</a>
    {:else}
      <div class="nav-auth-buttons">
        <a href="/profile"><button class="nav-button">Profile</button></a>
        <button class="nav-button" on:click={handleLogout}>Log out</button>
      </div>
    {/if}
  </nav>
  
</header>
<main>
    <slot />
</main>
<footer>
    <nav>
        <a href="/">Conscious Beauty</a>
      </nav>
</footer>
