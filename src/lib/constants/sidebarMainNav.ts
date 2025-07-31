// src/lib/constants/sidebarMainNav.ts

import { Home, Users, FileText } from 'lucide-svelte';

export const sidebarMainNav = [
  { label: 'Dashboard', href: '/dashboard', icon: Home, badge: 5 },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Reports', href: '/reports', icon: FileText, badge: 2 }
];

