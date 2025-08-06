<!-- src/lib/components/dashboard/DashboardLayout.svelte -->
<script lang="ts">
  import Sidebar from './sidebar/Sidebar.svelte';
  import Topbar from './topbar/Topbar.svelte';
</script>

<div class="flex h-screen bg-gray-50">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Contenuto principale -->
  <div class="flex flex-1 flex-col overflow-hidden">
    <!-- Topbar -->
    <Topbar />

    <!-- Area contenuti dinamici -->
    <main class="flex flex-1 flex-col overflow-hidden">
      <!-- Zona header (es. CSVUploadForm) -->
      <slot name="header" />

      <!-- Contenuto principale con scroll verticale gestito qui -->
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </main>
  </div>
</div>
