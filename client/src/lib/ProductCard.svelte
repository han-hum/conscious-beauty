<script>
  export let name;
  export let image;
  export let brand;
  export let quantity;
</script>

<div class="product-card">
  <img
    src={image}
    alt={name}
    on:error={(e) => e.target.style.display = 'none'}
    loading="lazy"
  />
  <h3>{name}</h3>
  <p>{brand}</p>
  <p>{quantity}</p>
  <button>View</button>
</div>
