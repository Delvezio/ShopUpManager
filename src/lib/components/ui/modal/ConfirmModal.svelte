<!-- src/lib/components/ui/modal/ConfirmModal.svelte -->
<script lang="ts">
  export let title: string = 'Conferma azione';
  export let message: string = 'Sei sicuro?';
  export let onConfirm: () => void;
  export let onCancel: () => void;
</script>

<!-- Overlay -->
<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  role="dialog"
  aria-labelledby="dialog-title"
>
  <!-- Modale -->
  <div class="w-full max-w-lg rounded-lg bg-white px-6 pt-5 pb-6 shadow-xl">
    <!-- Icona -->
    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
        class="h-6 w-6 text-green-600"
      >
        <path d="m4.5 12.75 6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <!-- Titolo e Messaggio -->
    <div class="mt-4 text-center">
      <h3 id="dialog-title" class="text-base font-semibold text-gray-900">{title}</h3>
      <p class="mt-2 text-sm text-gray-500">{message}</p>
    </div>

    <!-- Pulsanti -->
    <div class="mt-6 grid grid-cols-2 gap-3">
      <button
        class="rounded-md bg-white px-3 py-2 text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
        on:click={onCancel}
      >
        Annulla
      </button>
      <button
        class="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500"
        on:click={onConfirm}
      >
        Conferma
      </button>
    </div>
  </div>
</div>
