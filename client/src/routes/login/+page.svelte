<script>
// @ts-nocheck

  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let email = '';
  let password = '';
  let error = '';
  let message = '';

  const handleLogin = async () => {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (loginError) {
      error = loginError.message;
      message = '';
    } else {
      message = 'Logged in successfully!';
      error = '';
      goto('/profile');
    }
  };

  const handleSignUp = async () => {
    console.log("SIGNUP ATTEMPT:", { email, password });

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      error = signUpError.message;
      message = '';
    } else {
      message = 'Signup successful! Check your email.';
      error = '';
    }
  };
</script>

<style>
  form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

input[type="email"],
input[type="password"] {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
}

button {
  padding: 0.75rem 1rem;
  background-color: #6d8a7b;
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #5c796d;
}

h1 {
  text-align: center;
  margin-top: 2rem;
  color: #2e2e2e;
}

p {
  text-align: center;
}
.logo-container {
  margin:auto;
}
</style>

<h1>Login / Sign Up</h1>

<a href="/" class="logo-container">
  <img src="/logoDark.png" alt="ILUS.me logo" class="logo-img" />
</a>

<form on:submit|preventDefault={(e) => {
  // eslint-disable-next-line
  const action = e.submitter?.name;

  if (action === 'login') handleLogin();
  else if (action === 'signup') handleSignUp();
}}>

  <input type="email" placeholder="Email" bind:value={email} required />
  <input type="password" placeholder="Password" bind:value={password} required />
  <button type="submit" name="login">Log In</button>
  <button type="submit" name="signup">Sign Up</button>
</form>


{#if message}
  <p style="color: green;">{message}</p>
{/if}
{#if error}
  <p style="color: red;">{error}</p>
{/if}
