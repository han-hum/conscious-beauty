<script>
  export let name;
  export let image;
  export let brand;
  export let quantity;
  export let viewUrl;
</script>

<div class="product-card">
  <img
    src={image}
    alt={name}
    on:error={(e) => (e.target.src = '/photos/fallback2.jpg')}
    loading="lazy"
  />

  <h3>{name}</h3>
  {#if brand}<p><strong>Brand:</strong> {brand}</p>{/if}
  {#if quantity}<p><strong>Qty:</strong> {quantity}</p>{/if}

  {#if viewUrl}
    <a href={viewUrl} target="_blank" rel="noopener noreferrer">
      <button>View</button>
    </a>
  {/if}
</div>
