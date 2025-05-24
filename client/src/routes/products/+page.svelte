<script>
    import ProductCard from '$lib/ProductCard.svelte';
  
    const mockProducts = [/* same data from above */];
  </script>
  
  <h2>Explore Products</h2>
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
  