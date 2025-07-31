// src/lib/stores/rawUploads.ts
import { writable } from 'svelte/store';

export interface UploadedFile {
  id: string;        // uuid o timestamp
  name: string;
  data: string;      // contenuto grezzo CSV
  uploadedAt: Date;
}

export const rawUploads = writable<UploadedFile[]>([]);
