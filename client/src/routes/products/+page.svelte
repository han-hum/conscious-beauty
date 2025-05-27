<script>
  import { supabase } from '$lib/supabaseClient';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';

  let products = [];
  let filteredProducts = [];

  // Set up a derived store to safely access query params
  const searchStore = derived(page, $page => $page.url.searchParams.get('search') || '');

  let search = '';

  // Subscribe to the searchStore
  const unsubscribe = searchStore.subscribe(value => {
    search = value;
    filterProducts();
  });

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
      filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase())
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
</style>

<h1>All Products</h1>

<div class="product-grid">
  {#each filteredProducts as product}
    <div class="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  {/each}
</div>


