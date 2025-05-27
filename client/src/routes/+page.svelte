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
    name: 'Garnier Micellar Water',
    image: 'https://static.openbeautyfacts.org/images/products/3600542040651/front_en.63.400.jpg',
    brand: 'Garnier',
    quantity: '400 ml'
  },
  {
    name: 'CeraVe Moisturizing Cream',
    image: 'https://static.openbeautyfacts.org/images/products/3337875597195/front_en.72.400.jpg',
    brand: 'CeraVe',
    quantity: '340 g'
  },
  {
    name: 'The Ordinary Niacinamide 10%',
    image: 'https://static.openbeautyfacts.org/images/products/769915190778/front_en.89.400.jpg',
    brand: 'The Ordinary',
    quantity: '30 ml'
  }
];


</script>



<section class="hero" style={`background-image: url(${images[currentImage]});`}>
  <div class="overlay">
    {#if user}
      <p class="greeting">Hello, {user.email}</p>
    {/if}
    <h1>Conscious Beauty Starts Here</h1><br>
    <input type="text" placeholder="Search for a product..." /><br>
    <button>🔍</button>
  </div>
</section>


<section class="product-preview">
  <h2>Recently Scanned Products</h2>
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
