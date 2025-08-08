<script lang="ts">
  export let title: string = 'Conferma azione';
  export let message: string = 'Sei sicuro?';

  export let buttons: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
    disabled?: boolean;
  }> = [];
</script>

<dialog
  open
  aria-labelledby="dialog-title"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
>
  <div
    tabindex="-1"
    class="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white px-6 pt-5 pb-6 text-left shadow-xl"
  >
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
    <div class="mt-4 text-center">
      <h3 id="dialog-title" class="text-base font-semibold text-gray-900">{title}</h3>
      <p class="mt-2 text-sm whitespace-normal text-gray-500">{message}</p>
    </div>

    {#if buttons.length > 0}
      <div class="mt-6 grid grid-cols-3 gap-3">
        {#each buttons as btn}
          <button
            type="button"
            on:click={btn.onClick}
            class={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow focus:outline-2 focus:outline-offset-2
              ${
                btn.variant === 'primary'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-indigo-600'
                  : 'bg-white text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50'
              }
              ${btn.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={btn.disabled}
          >
            {btn.label}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</dialog>
