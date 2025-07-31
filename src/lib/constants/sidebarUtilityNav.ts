// src/lib/constants/sidebarUtilityNav.ts

import { Calendar, Folder, ClipboardList } from 'lucide-svelte';

export const sidebarUtilityNav = [
  { label: 'Calendar', href: '/calendar', icon: Calendar },
  { label: 'Documents', href: '/documents', icon: Folder },
  { label: 'Tasks', href: '/tasks', icon: ClipboardList }
];
