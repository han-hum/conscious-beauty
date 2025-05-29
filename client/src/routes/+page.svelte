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
    '/photos/carousel3.jpg',
  ];
  let currentImage = 0;

  setInterval(() => {
    currentImage = (currentImage + 1) % images.length;
  }, 5000);

  onMount(async () => {
  // Fetch Supabase products
  const { data, error } = await supabase.from('products').select('*');
  if (data) products = data;

  // Fetch Open Beauty Facts products
  try {
    const res = await fetch('https://world.openbeautyfacts.org/api/v2/search?sort_by=created_t&fields=product_name,brands,image_front_url,quantity,url&page_size=20');
    const json = await res.json();

    // Safe fallback filtering
    obfProducts = json.products
      ?.filter(p => p.image_front_url)
      .map(p => ({
        product_name: p.product_name || 'Unnamed product',
        image_front_url: p.image_front_url,
        brands: p.brands || 'Unknown',
        quantity: p.quantity || '',
        url: p.url || '#'
      }))
      .slice(0, 3) || [];

    console.log('OBF products:', obfProducts);
  } catch (err) {
    console.error('OBF API error:', err);
    obfProducts = [];
  }

  // Auth session
  const { data: { session } } = await supabase.auth.getSession();
  user = session?.user;

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
        image={product.image_front_url}
        brand={product.brands}
        quantity={product.quantity}
        viewUrl={product.url}
      />
    {/each}
  </div>
</section>

