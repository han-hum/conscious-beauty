<script>
    import { supabase } from '$lib/supabaseClient';
    let name = '';
    let description = '';
    let image_url = '';
    let message = '';
    let error = '';
  
    const handleAddProduct = async () => {
      const { error: insertError } = await supabase
        .from('products')
        .insert([{ name, description, image_url }]);
  
      if (insertError) {
        error = insertError.message;
        message = '';
      } else {
        message = 'Product added successfully!';
        error = '';
        // Optionally clear form
        name = '';
        description = '';
        image_url = '';
      }
    };
  </script>
  
  <h1>Add New Product</h1>
  
  <form on:submit|preventDefault={handleAddProduct}>
    <input bind:value={name} placeholder="Name" required />
    <input bind:value={description} placeholder="Description" required />
    <input bind:value={image_url} placeholder="Image URL" />
    <button type="submit">Add Product</button>
  </form>
  
  {#if message}
    <p style="color: green;">{message}</p>
  {/if}
  {#if error}
    <p style="color: red;">{error}</p>
  {/if}
  