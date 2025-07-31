<!-- src/routes/+page.svelte -->

<script lang="ts">
  import AuthLink from '$lib/components/ui/AuthLink.svelte';
</script>

<div class="bg-white">
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">ShopUpManager</span>
          <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Apri menu</span>
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="#funzionalità" class="text-sm font-semibold text-gray-900">Funzionalità</a>
        <a href="#automazioni" class="text-sm font-semibold text-gray-900">Automazioni</a>
        <a href="#integrazioni" class="text-sm font-semibold text-gray-900">Integrazioni</a>
        <a href="#supporto" class="text-sm font-semibold text-gray-900">Prezzi</a>
        <a href="#supporto" class="text-sm font-semibold text-gray-900">Supporto</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <AuthLink href="/login" label="Accedi →" variant="link" />
      </div>
    </nav>
  </header>

  <div class="relative isolate px-6 pt-32 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1 class="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Gestione prodotti e automazioni per il tuo store Shopify
        </h1>
        <p class="mt-8 text-lg text-gray-600 sm:text-xl">
          ShopUpManager ti aiuta a risparmiare tempo, aggiornare i tuoi prodotti automaticamente e potenziare le vendite, senza complicazioni.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <AuthLink href="/register" label="Registrati" variant="button" />
          <AuthLink href="#scopri" label="Scopri di più →" />
        </div>
      </div>
    </div>

    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
      <div
        class="relative left-1/2 aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[--color-primary] to-[--color-secondary] opacity-30"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      ></div>
    </div>

    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 bg-gradient-to-tr from-[--color-primary] to-[--color-secondary] opacity-30"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      ></div>
    </div>
  </div>
</div>
