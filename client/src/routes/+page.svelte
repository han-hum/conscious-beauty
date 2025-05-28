<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import ProductCard from '$lib/ProductCard.svelte';
  import { goto } from '$app/navigation';

  let products = [];
  let obfProducts = [];
  let user = null;
  let searchTerm = '';

  let images = [
    '/photos/carousel1.jpg',
    '/photos/carousel2.jpg',
    '/photos/carousel3.jpg'
  ];
  let currentImage = 0;

  // Hero image rotation
  setInterval(() => {
    currentImage = (currentImage + 1) % images.length;
  }, 5000);

  onMount(async () => {
    // Fetch Supabase products
    const { data, error } = await supabase.from('products').select('*');
    if (data) products = data;

    try {
  const res = await fetch('https://world.openbeautyfacts.org/api/v2/product?sort_by=created_t&fields=product_name,brands,image_url,quantity&page_size=6');
  const json = await res.json();
  obfProducts = json.products?.filter(p => p.image_url && p.product_name) || [];
} catch (err) {
  console.error('OBF API error:', err);
  obfProducts = []; // fallback just in case
}


    // Check login
    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user;

    // Update on auth change
    supabase.auth.onAuthStateChange((_event, session) => {
      user = session?.user || null;
    });
  });

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
    <h1>Conscious Beauty Starts Here</h1>
    <br />
    <input
      type="text"
      bind:value={searchTerm}
      placeholder="Search for a product..."
      on:keydown={(e) => e.key === 'Enter' && handleSearch()}
    /><br />
    <button on:click={handleSearch}>🔍</button>
  </div>
</section>

<section class="product-preview">
  <h2>Recently Added Products</h2>
  <div class="product-grid">
    {#each obfProducts as product}
      <ProductCard 
        name={product.product_name}
        image={product.image_url}
        brand={product.brands}
        quantity={product.quantity}
      />
    {/each}
  </div>
</section>

