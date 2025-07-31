<!-- src/lib/components/dashboard/sidebar/SidebarNavItem.svelte -->

<script lang="ts">
    import { page } from '$app/state';
    export let label: string;
    export let href: string;
    export let icon: typeof import('lucide-svelte').Home;
    export let badge: number | null = null;
  
    // variabile reattiva
    $: isActive = page.url.pathname === href;
  </script>
  
  <li>
    <a
      href={href}
      class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-150"
      class:bg-gray-50={isActive}
      class:text-secondary-600={isActive}
      class:text-gray-700={!isActive}
      class:hover\:text-secondary-600={!isActive}
      class:hover\:bg-gray-50={!isActive}
    >
      <svelte:component
        this={icon}
        class={`size-6 shrink-0 ${isActive ? 'text-secondary-600' : 'text-gray-400'}`}
        aria-hidden="true"
      />
  
      {label}
  
      {#if badge !== null}
        <span class="ml-auto w-9 min-w-max rounded-full bg-white px-2.5 py-0.5 text-center text-xs/5 font-medium whitespace-nowrap text-gray-600 ring-1 ring-gray-200 ring-inset" aria-hidden="true">
          {badge}
        </span>
      {/if}
    </a>
  </li>
  
  