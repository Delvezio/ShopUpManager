<!-- src/lib/components/dashboard/sidebar/Sidebar.svelte --> 

<script lang="ts">
    import SidebarNav from './SidebarNav.svelte';
    import SidebarNavItem from './SidebarNavItem.svelte';
    import { sidebarMainNav } from '$lib/constants/sidebarMainNav';
    import { sidebarUtilityNav } from '$lib/constants/sidebarUtilityNav';
    import { Settings } from 'lucide-svelte';
  </script>
  
  <aside class="flex flex-col w-64 bg-white border-r border-gray-200 p-4 justify-between h-full">
    <div>
      <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">Navigazione</h2>
      <SidebarNav items={sidebarMainNav} />
  
      <div class="mt-6 border-t border-gray-200 pt-4">
        <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">Strumenti</h2>
        <SidebarNav items={sidebarUtilityNav} />
      </div>
    </div>
  
    <!-- Impostazioni in fondo -->
    <div class="mt-6 pt-4 border-t border-gray-200">
      <SidebarNavItem label="Impostazioni" href="/settings" icon={Settings} />
    </div>
  </aside>
  