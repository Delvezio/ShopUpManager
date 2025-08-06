<!-- src/lib/components/dashboard/sidebar/Sidebar.svelte -->
<script lang="ts">
  import SidebarNav from './SidebarNav.svelte';
  import SidebarNavItem from './SidebarNavItem.svelte';
  import { sidebarMainNav } from '$lib/constants/sidebarMainNav';
  import { sidebarUtilityNav } from '$lib/constants/sidebarUtilityNav';
  import { Settings } from 'lucide-svelte';
  import SettingsModal from '$lib/components/ui/SettingsModal.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  let showSettingsModal = false;

  function openSettings() {
    showSettingsModal = true;
  }

  function closeSettings() {
    showSettingsModal = false;
  }
</script>

<aside class="flex h-full w-64 flex-col justify-between border-r border-gray-200 bg-white p-4">
  <div>
    <h2 class="mb-2 px-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
      Navigazione
    </h2>
    <SidebarNav items={sidebarMainNav} />

    <div class="mt-6 border-t border-gray-200 pt-4">
      <h2 class="mb-2 px-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Strumenti
      </h2>
      <SidebarNav items={sidebarUtilityNav} />
    </div>
  </div>

  <!-- Impostazioni in fondo (apre il modal) -->
  <div class="mt-6 border-t border-gray-200 pt-4">
    <Button onClick={openSettings} variant="primary">Impostazioni</Button>
  </div>
</aside>

<!-- Modal impostazioni utente -->
<SettingsModal isOpen={showSettingsModal} onClose={closeSettings} />
