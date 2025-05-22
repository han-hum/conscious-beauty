<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

let products = [];

onMount(async () => {  /*!CORS is used just for development fetch and will be replaced later!*/
  const response = await fetch('https://corsproxy.io/?https://world.openbeautyfacts.org/category/cosmetics.json');

  const json = await response.json();

  //fetch 10 example products
  products = (json.products || [])
    .filter(p => p.product_name && p.image_url)
    .slice(0, 10)
    .map(p => ({
      name: p.product_name,
      description: p.brands || 'No brand info',
      image_url: p.image_url
    }));
});

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
