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
        <a href="/add-product"><button>Add Product</button></a>
      </div>
    </div>
  </div>
</div>

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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .profile-card {
    padding: 1rem;
    border-radius: 1rem;
    border-color: #fbe0c3;
    background: #f8f8f8;
    box-shadow: 0 1px 7px rgba(247, 70, 70, 0.1);
    width: 50%;
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
