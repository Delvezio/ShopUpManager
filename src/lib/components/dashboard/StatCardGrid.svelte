<!-- src/lib/components/dashboard/StatCardGrid.svelte  -->
 <script lang="ts">
    export let cols = 'lg:grid-cols-3';
  </script>
  
  <div class="p-4 sm:p-6">
    <dl class={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${cols}`}>
      <slot />
    </dl>
  </div>
  