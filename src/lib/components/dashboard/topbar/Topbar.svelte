<!-- src/lib/components/dashboard/topbar/Topbar.svelte -->

<script lang="ts">
    import TopbarUserMenu from './TopbarUserMenu.svelte';
  </script>
  
  <header class="w-full bg-white border-b border-gray-200">
    <div class="mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
  
      <!-- Sinistra: Ricerca (placeholder) -->
      <div class="flex-1 pr-4 sm:pr-6 hidden md:block">
        <input
          type="text"
          placeholder="Cerca..."
          class="w-full border-0 border-b-1 border-gray-200 px-3 py-2 text-sm  focus:border-primary-400"
        />
      </div>
  
      <!-- Destra: Azioni + Menu utente -->
      <div class="flex items-center gap-4">
        <!-- Placeholder icona notifiche -->
        <span class="sr-only">Visualizza notifiche</span>
        <button class="text-gray-400 hover:text-primary-600" aria-label="Visualizza notifiche">
            <svg class="size-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 00-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        </button>
        <!-- Menu utente -->
        <TopbarUserMenu />
      </div>
    </div>
  </header>
  
  