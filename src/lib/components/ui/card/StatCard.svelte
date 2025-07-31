<!-- src/lib/components/ui/card/StatCard.svelte -->

<script lang="ts">
    export let title: string;
    export let value: string | number;
    export let icon: typeof import("lucide-svelte").Icon;
    export let trend: 'up' | 'down' | null = null;
    export let trendValue: string | number = '';
    export let href: string = '#';
  </script>
  
  <div class="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow-sm sm:px-6 sm:pt-6">
    <dt>
      <div class="absolute rounded-md bg-primary-500 p-3">
        <svelte:component this={icon} class="size-6 text-white" />
      </div>
      <p class="ml-16 truncate text-sm font-medium text-gray-500">{title}</p>
    </dt>
  
    <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
      <p class="text-2xl font-semibold text-gray-900">{value}</p>
  
      {#if trend}
        <p class="ml-2 flex items-baseline text-sm font-semibold {trend === 'up' ? 'text-green-600' : 'text-red-600'}">
          <svg
            class="size-5 shrink-0 self-center {trend === 'up' ? 'text-green-500' : 'text-red-500'}"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            {#if trend === 'up'}
              <path fill-rule="evenodd" d="M10 17a.75.75..." clip-rule="evenodd" />
            {:else}
              <path fill-rule="evenodd" d="M10 3a.75.75..." clip-rule="evenodd" />
            {/if}
          </svg>
          <span class="sr-only">{trend === 'up' ? 'Increased' : 'Decreased'} by</span>
          {trendValue}
        </p>
      {/if}
  
      <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
        <div class="text-sm">
          <a href={href} class="font-medium text-primary-600 hover:text-primary-500">
            Vedi dettagli
            <span class="sr-only"> {title} </span>
          </a>
        </div>
      </div>
    </dd>
  </div>
  