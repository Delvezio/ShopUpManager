<!-- src/lib/components/dashboard/sidebar/SidebarNav.svelte -->
<script lang="ts">
    import SidebarNavItem from './SidebarNavItem.svelte';
    import type { Component } from 'svelte';

    interface NavItem {
        label: string;
        href: string;
        icon: typeof import('lucide-svelte').Home;
        badge?: number;
    }

    export let items: NavItem[] = [];
  </script>
  
  <nav class="flex flex-1 flex-col" aria-label="Sidebar">
    <ul role="list" class="-mx-2 space-y-1">
      {#each items as { label, href, icon, badge = null }}
        <SidebarNavItem {label} {href} {icon} {badge} />
      {/each}
    </ul>
  </nav>
  