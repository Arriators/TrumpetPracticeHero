import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensure relative asset paths for local Electron and WebView deployments
  build: {
    outDir: 'dist'
  }
});
