import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: "three", test: /[\\/]node_modules[\\/](?:@react-three|three)[\\/]/ },
            { name: "gsap", test: /[\\/]node_modules[\\/](?:@gsap|gsap)[\\/]/ },
          ],
        },
      },
    },
  },
});
