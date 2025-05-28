<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { user, userLoaded } from '$lib/stores';

  onMount(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    user.set(session?.user || null);
    userLoaded.set(true);
  });
</script>

<style>
  .profile-page {
    padding: 2rem;
    font-family: 'Montserrat', sans-serif;
  }

  .profile-header {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .profile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
    margin-left: 25%;
    width: 50%;
  }

  .profile-card {
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 1.5rem;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .profile-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .profile-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .profile-buttons button {
    background-color: #6d8a7b;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }

  .profile-buttons button:hover {
    background-color: #5a7567;
  }
</style>

<div class="profile-page">
  {#if !$userLoaded}
    <p>Loading...</p>
  {:else}
    <h2>Welcome to ILUS.me, {$user?.email || 'User'}!</h2>
  {/if}

  <div class="profile-grid">
    <div class="profile-card">
      <h3>Account Settings</h3>
      <div class="profile-buttons">
        <button>Edit</button>
        <button>Security</button>
      </div>
    </div>

    <div class="profile-card">
      <h3>Added Products</h3>
      <div class="profile-buttons">
        <a href="/products">
          <button>Go to Products</button>
        </a>
        <button>Add New</button>
      </div>
    </div>
  </div>
</div>
