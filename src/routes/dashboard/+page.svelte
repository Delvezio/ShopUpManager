<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { rawUploads } from '$lib/stores/rawUploads';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import CSVUploadForm from '$lib/components/dashboard/CSVUploadForm.svelte';
  import ProductTable from '$lib/components/dashboard/product/ProductTable.svelte';
</script>

<div class="flex h-full flex-1 flex-col">
  <!-- Header: form CSV + Export button -->
  <div class="flex items-center justify-between bg-white p-6 shadow">
    <CSVUploadForm />
    {#if $rawUploads.length}
      <Button
        variant="outline"
        on:click={() => goto(`/export/${$rawUploads[$rawUploads.length - 1].id}`)}
      >
        Esporta CSV
      </Button>
    {/if}
  </div>

  <!-- Corpo: scroll interno verticale e orizzontale sempre visibile -->
  <div class="flex min-h-0 flex-1">
    <div class="min-h-0 flex-1 overflow-y-auto">
      <div class="min-w-max overflow-x-auto bg-white shadow-sm">
        <ProductTable />
      </div>
    </div>
  </div>
</div>
