<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  /*dummydata for testing */
  let products = [
    {
      name: 'Test Serum',
      description: 'A nourishing serum with hyaluronic acid.',
      image_url: '/photos/carousel1.jpg'
    },
    {
      name: 'Glow Cleanser',
      description: 'Brightening daily face wash.',
      image_url: '/photos/carousel1.jpg'
    },
    {
      name: 'Hydration Cream',
      description: 'Intensive moisture for dry skin.',
      image_url: '/photos/carousel1.jpg'
    }
  ];


  /*
  onMount(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      products = data;
    }
  });
  */

</script>

<h1>ILUS.me</h1>  <!-- this will be logo -->

<section class="hero">
  <div class="overlay">
    <h1>Conscious Beauty Starts Here</h1>
    <input type="text" placeholder="Search for a product..." />
    <button>🔍</button>
  </div>
</section>

<section class="product-preview">
  <h2>Recently Added Products</h2>

  <div class="product-grid">
    {#each products as product}
      <div class="product-card">
        <img src={product.image_url} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <button>View</button>
      </div>
    {/each}
  </div>
</section>


<!--
<section class="product-preview">

  <h2>Recently Added Products</h2>

  <div class="product-grid">

    {#each products as product}
    <div class="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button>View</button>
    </div>

    <div class="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button>View</button>
    </div>

    <div class="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button>View</button>
    </div>

    {/each}

</section>
-->
