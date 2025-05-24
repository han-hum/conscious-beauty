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
