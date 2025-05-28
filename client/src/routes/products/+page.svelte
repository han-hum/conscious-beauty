<script>
  import { supabase } from '$lib/supabaseClient';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';
  import { user } from '$lib/stores';
  import { get } from 'svelte/store';

  let products = [];
  let filteredProducts = [];

  // Derived store for search
  const searchStore = derived(
    page,
    ($page) => $page.url.searchParams.get('search') || '',
  );
  let search = '';

  // Subscribe to query param search term
  const unsubscribe = searchStore.subscribe((value) => {
    search = value;
    filterProducts();
  });

  // Fetch products once
  onMount(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Supabase fetch error:', error.message);
    } else {
      products = data;
      filterProducts();
    }
  });

  function filterProducts() {
    if (search.trim()) {
      filteredProducts = products.filter(
        (p) =>
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()),
      );
    } else {
      filteredProducts = products;
    }
  }
</script>

<style>
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .product-card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    text-align: center;
    background: white;
  }

  .product-card img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }

  .add-button {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
</style>

<h1>Explore Products</h1>
<pre>{JSON.stringify(
    { products, filteredProducts, search, user: $user },
    null,
    2,
  )}</pre>

{#if $user}
  <a href="/add-product" class="add-button">
    <button>Add New Product</button>
  </a>
{/if}

<div class="product-grid">
  {#each filteredProducts as product}
    <div class="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  {/each}
</div>
