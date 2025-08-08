<!-- src/routes/export/[uploadId]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { derived, writable, get } from 'svelte/store';
  import { rawUploads, type UploadedFile } from '$lib/stores/rawUploads';
  import Button from '$lib/components/ui/Button.svelte';
  import { json2csv } from '$features/csv/services'; // util to implement later

  // Parametro dinamico uploadId
  const uploadId = derived(page, ($page) => $page.params.uploadId);

  // Recupera l'upload corrispondente
  const upload = derived(
    [rawUploads, uploadId],
    ([$rawUploads, $uploadId]) => $rawUploads.find((u) => u.id === $uploadId) as UploadedFile
  );

  // Lista di tutte le colonne (header) dal primo record
  const headers = derived(upload, ($upload) => ($upload ? Object.keys($upload.data[0] || {}) : []));

  // Store delle colonne selezionate per l'export
  const selectedColumns = writable<string[]>([]);

  // Aggiorna la selezione
  function toggleColumn(col: string) {
    selectedColumns.update((cols) =>
      cols.includes(col) ? cols.filter((c) => c !== col) : [...cols, col]
    );
  }

  // Genera e scarica CSV filtrato
  function exportFiltered() {
    const u = get(upload);
    const cols = get(selectedColumns);
    if (!u || !cols.length) return;
    const filteredData = u.data.map((row) => {
      const obj: Record<string, any> = {};
      cols.forEach((c) => (obj[c] = row[c]));
      return obj;
    });
    const csv = json2csv(filteredData, cols);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `export_${u.id}.csv`;
    link.click();
  }
</script>

<svelte:head>
  <title>Preview CSV – {$upload?.filename}</title>
</svelte:head>

<main class="space-y-6 p-6">
  <h1 class="text-2xl font-semibold">
    Preview CSV: {$upload?.filename}
  </h1>

  {#if $upload}
    <!-- Controlli di selezione colonne -->
    <div class="space-y-2">
      <h2 class="font-medium">Seleziona colonne da esportare:</h2>
      <div class="grid grid-cols-3 gap-2">
        {#each $headers as col}
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={$selectedColumns.includes(col)}
              on:change={() => toggleColumn(col)}
              class="form-checkbox"
            />
            <span>{col}</span>
          </label>
        {/each}
      </div>
    </div>

    <!-- Anteprima tabella -->
    <div class="overflow-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            {#each $selectedColumns as col}
              <th class="border-b px-4 py-2 text-left text-sm font-medium">{col}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each $upload.data.slice(0, 10) as row}
            <tr class="hover:bg-gray-50">
              {#each $selectedColumns as col}
                <td class="border-b px-4 py-2 text-sm">{row[col]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Bottone export -->
    <div>
      <Button onClick={exportFiltered} variant="primary">Esporta CSV filtrato</Button>
    </div>
  {:else}
    <p class="text-red-600">Upload non trovato.</p>
  {/if}
</main>
