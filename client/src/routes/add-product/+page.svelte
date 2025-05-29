<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let name = '';
  let description = '';
  let image_url = '';
  let user = null;
  let message = '';

  onMount(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    user = session?.user;

    if (!user) {
      goto('/login');
    }
  });

  const handleSubmit = async () => {
  if (!name.trim() || !description.trim() || !image_url.trim()) {
    message = 'Please fill in all fields.';
    return;
  }

  const { error } = await supabase
    .from('products')
    .insert([{ name, description, image_url }]);

  if (error) {
    message = 'Error adding product: ' + error.message;
  } else {
    message = 'Product added successfully!';
    name = '';
    description = '';
    image_url = '';
  }
};

</script>

<style>
  .admin-form {
    padding: 2rem;
    max-width: 600px;
    margin: auto;
  }
  .form-card {
    background-color: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(234, 3, 3, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  input,
  textarea {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }
  button {
    background-color: #6d8a7b;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .message {
    margin-top: 1rem;
    font-weight: bold;
    color: green;
  }
</style>

<section class="admin-form">
  <h1>Add New Product</h1>

  <div class="form-card">
    <label>Name</label>
    <input bind:value={name} placeholder="Enter product name" />

    <label>Description</label>
    <textarea bind:value={description} placeholder="Enter description"
    ></textarea>

    <label>Image URL</label>
    <input bind:value={image_url} placeholder="Enter image URL" />

    <button on:click={handleSubmit}>Add Product</button>
    {#if message}<p class="message">{message}</p>{/if}
  </div>
</section>
