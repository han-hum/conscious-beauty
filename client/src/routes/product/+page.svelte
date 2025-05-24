<script>
    const mockProducts = [
      {
        name: 'Lanolin Cream',
        brand: 'Healthy Care',
        image: 'https://static.openbeautyfacts.org/images/products/931/625/489/3000/front_en.6.200.jpg',
        quantity: '100g'
      },
      {
        name: 'Cadum Hypo Shampoo',
        brand: 'Cadum',
        image: 'https://static.openbeautyfacts.org/images/products/327/381/161/0064/front_fr.4.200.jpg',
        quantity: '750ml'
      },
      {
        name: 'Vaseline Jar',
        brand: 'Vaseline',
        image: 'https://static.openbeautyfacts.org/images/products/003/052/100/1223/front_en.9.200.jpg',
        quantity: '100ml'
      }
    ];
  </script>
  
  <h2>Explore Products</h2>
  
  <div class="product-grid">
    {#each mockProducts as product}
      <div class="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
        <p>{product.quantity}</p>
        <button>View</button>
      </div>
    {/each}
  </div>
  