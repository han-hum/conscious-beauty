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
    name: 'Lanolin Cream with Vitamin E',
    image: 'https://static.openbeautyfacts.org/images/products/930/063/110/0019/front_en.73.400.jpg',
    brand: 'Healthy Care',
    quantity: '100g'
  },
  {
    name: 'Vaseline Blue Seal',
    image: 'https://static.openbeautyfacts.org/images/products/600/108/739/6355/front_en.18.400.jpg',
    brand: 'Vaseline',
    quantity: '50 ml'
  },
  {
    name: 'Cadum Hypoallergenic Wash',
    image: 'https://static.openbeautyfacts.org/images/products/359/649/000/5286/front_en.62.400.jpg',
    brand: 'Cadum',
    quantity: '750 ml'
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
