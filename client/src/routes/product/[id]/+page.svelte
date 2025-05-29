<script>
  import { supabase } from '$lib/supabaseClient';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let product = null;
  let error = '';
  let user = null;

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user;

    const id = $page.params.id;
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError.message);
      error = 'Product not found.';
    } else {
      product = data;
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else if !product}
  <p>Loading product details...</p>
{:else}
  <h1>{product.name}</h1>
  <img src={product.image_url} alt={product.name} style="max-width: 300px;" />
  <p><strong>Description:</strong> {product.description}</p>
  {#if product.brand}
    <p><strong>Brand:</strong> {product.brand}</p>
  {/if}
  {#if product.quantity}
    <p><strong>Quantity:</strong> {product.quantity}</p>
  {/if}
  <p><strong>Added by:</strong> {product.user_email}</p>
{/if}
