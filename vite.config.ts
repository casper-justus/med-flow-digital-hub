import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Get the repository name from the environment variable (or hardcode it for local testing)
const REPO_NAME = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'med-flow-digital-hub';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Add this 'base' property
  base: `/${REPO_NAME}/`, // This is the crucial line for GitHub Pages project sites

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: { // It's good practice to explicitly define outDir, even if it's the default
    outDir: 'dist',
  },
}));
