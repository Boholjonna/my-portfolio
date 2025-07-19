import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createClient } from '@supabase/supabase-js';

export default defineConfig({
  base: "/my-portfolio/", // ← this must match your repo name
  plugins: [react()],
});
