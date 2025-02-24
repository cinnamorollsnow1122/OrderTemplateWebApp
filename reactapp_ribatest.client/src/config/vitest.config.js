// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom', // This ensures jsdom is used for testing DOM-related code
  },
});