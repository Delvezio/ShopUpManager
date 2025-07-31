<!-- src/routes/dashboard/+layout.svelte -->

<script lang="ts">
    import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
  </script>
  
  <DashboardLayout>
    <slot />
  </DashboardLayout>