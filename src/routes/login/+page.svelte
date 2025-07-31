<!-- src/routes/login/+page.svelte -->

<script>
    import LoginForm from '$lib/components/LoginForm.svelte';
    import LoginSideImage from '$lib/components/LoginSideImage.svelte';
  </script>
  
  <div class="flex min-h-screen bg-white">
    <LoginForm />
    <LoginSideImage />
  </div>
  