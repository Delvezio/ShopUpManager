<!-- src/lib/components/ForgotPasswordForm.svelte -->

<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import AuthLink from '$lib/components/ui/AuthLink.svelte';
  
    let email = '';
  
    function handleSubmit() {
      // Per ora solo un log di debug
      console.log('Password reset link inviato a:', email);
    }
  </script>
  
  <div class="flex flex-1 items-center justify-center p-6">
    <div class="w-full max-w-md space-y-6">
      <h1 class="text-3xl font-semibold text-(--color-primary)">Recupera password</h1>
  
      <p class="text-sm text-gray-600">
        Inserisci la tua email. Ti invieremo un link per reimpostare la password.
      </p>
  
      <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            class="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-(--color-primary) focus:ring-(--color-primary)"
          />
        </div>
  
        <Button type="submit" variant="primary">Invia link</Button>
      </form>
  
      <div class="mt-4 text-sm">
        <span>Hai già un account?</span>
        <AuthLink href="/login" label=" Accedi" />
      </div>
    </div>
  </div>
  