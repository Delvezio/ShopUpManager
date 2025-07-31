<!-- src/lib/components/dashboard/topbar/TopbarUserMenu.svelte -->

<script lang="ts">
    import { User, LogOut } from 'lucide-svelte';
    import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
  
    let isOpen = false;
  </script>
  
  <div class="relative inline-block text-left">
    <button
      type="button"
      class="flex items-center gap-2 rounded-full bg-gray-100 p-1.5 hover:bg-gray-200 focus:outline-none"
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-label="Apri menu utente"
      on:click={() => (isOpen = !isOpen)}
    >
      <User class="size-5 text-gray-700" />
    </button>
  
    <DropdownMenu {isOpen} setIsOpen={(val) => (isOpen = val)}>
      <a
        href="/profilo"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        role="menuitem"
      >
        Profilo
      </a>
  
      <a
        href="/logout"
        class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        role="menuitem"
      >
        <LogOut class="size-4" />
        Esci
      </a>
    </DropdownMenu>
  </div>
  