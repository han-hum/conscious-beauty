<script>
// @ts-nocheck

  import { supabase } from '$lib/supabaseClient';

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

<h1>Login / Sign Up</h1>

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
