<script lang="ts">
  import SettingsModal from '$lib/components/ui/SettingsModal.svelte';
  let showModal = false;

  function openSettings() {
    showModal = true;
  }

  function closeSettings() {
    showModal = false;
  }
</script>

<SettingsModal isOpen={showModal} onClose={closeSettings} />

<div class="p-6">
  <h1 class="mb-4 text-2xl font-semibold">Impostazioni</h1>
  <button
    on:click={openSettings}
    class="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
  >
    Apri impostazioni
  </button>
</div>
