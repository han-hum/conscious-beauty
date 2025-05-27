<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  let products = [];
  let user = null;

  let images = [
    '/photos/carousel1.jpg',
    '/photos/carousel2.jpg',
    '/photos/carousel3.jpg'
  ];
  let currentImage = 0;

  onMount(async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      products = data;
      console.log('Fetched products:', products);
    }

    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user;

    // Refresh user state when auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
    });
  });

  setInterval(() => {
      currentImage = (currentImage + 1) % images.length;
    }, 5000);
  
  
    import ProductCard from '$lib/ProductCard.svelte';

    const mockProducts = [
  {
    name: 'Everyday Humans Sunscreen SPF50',
    image: '/photos/fallback2.jpg',
    brand: 'Garnier',
    quantity: '400 ml'
  },
  {
    name: 'Moisturizing Cream',
    image: '/photos/fallback.png',
    brand: 'unknown'
  },
  {
    name: 'The Ordinary Niacinamide 10%',
    image: 'photos/fallback3.jpg',
    brand: 'The Ordinary',
  }
];

import { goto } from '$app/navigation';

let searchTerm = '';

function handleSearch() {
  if (searchTerm.trim()) {
    goto(`/products?search=${encodeURIComponent(searchTerm)}`);
  }
}

</script>


<section class="hero" style={`background-image: url(${images[currentImage]});`}>
  <div class="overlay">
    {#if user}
      <p class="greeting">Hello, {user.email}</p>
    {/if}
    <h1>Conscious Beauty Starts Here</h1><br>
    <input
    type="text"
    bind:value={searchTerm}
    placeholder="Search for a product..."
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
  /><br>
  <button on:click={handleSearch}>🔍</button>
  </div>
</section>


<section class="product-preview">
  <h2>Recently Added Products</h2>
  <div class="product-grid">
    {#each mockProducts as product}
      <ProductCard 
        name={product.name}
        image={product.image}
        brand={product.brand}
        quantity={product.quantity}
      />
    {/each}
  </div>
</section>
