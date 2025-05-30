<script>
  import { supabase } from '$lib/supabaseClient';
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import { derived, get } from 'svelte/store';
  import { user } from '$lib/stores';
  import ProductCard from '$lib/ProductCard.svelte';
  import { goto } from '$app/navigation';

  let products = [];
  let filteredProducts = [];

  const fallbackProducts = [
    {
      name: 'Gentle Cleanser',
      image_url: '/photos/fallback.png',
      description: 'A soft, fragrance-free facial cleanser.'
    },
    {
      name: 'Vitamin C Serum',
      image_url: '/photos/fallback2.jpg',
      description: 'Brightens and evens out skin tone.'
    },
    {
      name: 'Nourishing Moisturizer',
      image_url: '/photos/fallback3.jpg',
      description: 'Deep moisture for everyday use.'
    },
    {
      name: 'Micellar Water',
      image_url: '/photos/fallback.png',
      description: 'Gently removes makeup and cleans skin.'
    },
    {
      name: 'SPF 50 Sunscreen',
      image_url: '/photos/fallback2.jpg',
      description: 'Daily UV protection with lightweight feel.'
    },
    {
      name: 'Aloe Gel',
      image_url: '/photos/fallback.png',
      description: 'Soothing gel for irritated or dry skin.'
    }
  ];

  const searchStore = derived(page, ($page) => $page.url.searchParams.get('search') || '');
  let search = '';

  const unsubscribe = searchStore.subscribe((value) => {
    search = value;
    filterProducts();
  });

  onDestroy(() => {
    unsubscribe();
  });

  onMount(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error && data) {
      products = data;
      filterProducts();
    }
  });

  function filterProducts() {
    const source = get(user) ? products : fallbackProducts;
    filteredProducts = search.trim()
      ? source.filter(
          (p) =>
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase())
        )
      : source;
  }

  function handleSearch() {
    if (search.trim()) {
      goto(`/products?search=${encodeURIComponent(search)}`);
    }
  }
</script>
<style>
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 2rem 0;
  }

  .search-container input {
    padding: 0.75rem 1rem;
    width: 100%;
    max-width: 400px;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  .search-container button {
    padding: 0.75rem 1rem;
    background-color: #6d8a7b;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
  }

  .add-container {
    text-align: right;
    margin: 0 2rem 2rem;
  }

  .add-button {
    background-color: #6d8a7b;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    gap: 2rem;
    padding: 0 2rem 3rem;
  }

  .product-card {
    background: white;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .product-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .product-card h3 {
    margin: 0.5rem 0 0.25rem;
    font-size: 1.1rem;
  }

  .product-card p {
    font-size: 0.95rem;
    color: #555;
  }
</style>


<h1>Explore Products</h1>

<div class="search-container">
  <input
    type="text"
    bind:value={search}
    placeholder="Search for a product..."
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
  />
  <button on:click={handleSearch}>🔍</button>
</div>

{#if $user}
  <div class="add-container">
    <a href="/add-product">
      <button class="add-button">Add New Product</button>
    </a>
  </div>
{/if}

<div class="product-grid">
  {#each filteredProducts as product}
    <div class="product-card">
      <img
        src={product.image_url}
        alt={product.name}
        on:error={(e) => (e.target.src = '/photos/fallback1.jpg')}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  {/each}
</div>
