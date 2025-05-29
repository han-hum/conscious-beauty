<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PUBLIC_ADMIN_EMAIL } from '$env/static/public';

  let user = null;
  let products = [];

  onMount(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    user = session?.user;
    if (!user || user.email !== PUBLIC_ADMIN_EMAIL) goto('/');

    const { data, error } = await supabase.from('products').select('*');
    if (!error) products = data;
  });

  const deleteProduct = async (id) => {
    await supabase.from('products').delete().eq('id', id);
    products = products.filter((p) => p.id !== id);
  };
</script>

<style>
  .admin-container {
    padding: 2rem;
    border-radius: 1rem;
    border-color: #fbe0c3;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .card {
    padding: 1rem;
    border-radius: 1rem;
    border-color: #fbe0c3;
    background: #f8f8f8;
    box-shadow: 0 1px 7px rgba(247, 70, 70, 0.1);
  }
  .btn {
    margin-top: 0.5rem;
    background: #8aa191;
    color: #344648;
    padding: 0.4rem 0.8rem;
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;
  }
  .btn:hover {
    background: #fbe0c3;
  }
  .who {
    text-align: left;
  }
</style>

<div class="admin-container">
  <h1>Welcome to ILUS.me, admin!</h1>
  <p class="who" style="margin-top: 0.5rem;">Logged in as: {user?.email}</p>

  <h2 style="margin-top: 2rem;">Admin Controls</h2>
  <div class="grid">
    <div class="card">
      <h3>Page Management</h3>
      <button class="btn">Settings</button>
      <button class="btn">Layout</button>
      <a href="/products">
        <button class="btn">Go to Products</button>
      </a>
    </div>
    <div class="card">
      <h3>Data & Connections</h3>
      <a href="https://supabase.com/">
        <button class="btn">Supabase</button>
      </a>
      <a href="https://openfoodfacts.github.io/openfoodfacts-server/api/ref-v2//">
        <button class="btn">API</button>
      </a> 
    </div>
    <div class="card">
      <h3>Recent Activity</h3>
      <div style="height:100px; background:#ddd;"><img src="/logoDark.png" alt="ILUS.me logo" class="logo-img" /></div>
    </div>
    <div class="card">
      <h3>Users</h3>
      <a href="https://supabase.com/">
        <button class="btn">Manage Users</button>
      </a>
    </div>
  </div>

  <h2 style="margin-top: 3rem;">Product Management (CRUD)</h2>
  <div class="grid">
    {#each products as product}
      <div class="card">
        <h4>{product.name}</h4>
        <p>{product.brand}</p>
        <p>{product.quantity}</p>
        <button class="btn" on:click={() => deleteProduct(product.id)}
          >Delete</button
        >
      </div>
    {/each}
  </div>
</div>
