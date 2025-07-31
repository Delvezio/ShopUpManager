<!-- src/lib/components/RegisterForm.svelte -->

<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import AuthLink from '$lib/components/ui/AuthLink.svelte';
  
    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let acceptedTerms = false;
  
    function handleRegister() {
      if (!acceptedTerms) {
        alert('Devi accettare i Termini e le Condizioni');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('Le password non coincidono');
        return;
      }
  
      console.log({ firstName, lastName, email, password });
      // logica di registrazione futura
    }
  </script>
  
  
<div class="flex flex-1 items-center justify-center px-6 py-12 lg:px-8">
    <div class="w-full max-w-md space-y-6">
      <h1 class="text-3xl text-center font-semibold text-(--color-primary)">Crea il tuo account</h1>
      
      <form class="space-y-4" on:submit|preventDefault={handleRegister}>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
          <input
            id="name"
            type="text"
            bind:value={firstName}
            required
            class="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-(--color-primary) focus:ring-(--color-primary)"
          />
        </div>
  
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
  
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            required
            class="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-(--color-primary) focus:ring-(--color-primary)"
          />
        </div>
  
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Conferma Password</label>
          <input
            id="confirmPassword"
            type="password"
            bind:value={confirmPassword}
            required
            class="mt-1 block w-full rounded border border-gray-300 p-2 text-sm focus:border-(--color-primary) focus:ring-(--color-primary)"
          />
        </div>
        <div class="flex items-center justify-between mt-2">
            <label class="flex items-center gap-2 text-sm text-gray-700 font-semibold">
              <input type="checkbox" bind:checked={acceptedTerms} class="rounded border-gray-300 text-(--color-primary) focus:ring-(--color-primary)" />
              Accetta <AuthLink href="/terms-conditions" label="Termini e condizioni"/>
            </label>
          </div>
  
        <Button type="submit" variant="primary">Registrati</Button>
      </form>
      <div class="mt-6 text-center">
        <span>Hai già un account?
          <AuthLink href="/login" label=" Accedi" />
        </span>
      </div>
  
    </div>
  </div>