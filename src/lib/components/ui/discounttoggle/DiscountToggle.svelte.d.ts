import type { SvelteComponentTyped } from 'svelte';

export default class DiscountToggle extends SvelteComponentTyped<{
  checked?: boolean;
  className?: string;
  ariaLabel?: string;
  indeterminate?: boolean;
  onToggle?: (checked: boolean) => void;
}> {}
