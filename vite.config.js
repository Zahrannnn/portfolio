import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import process from "node:process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // ANALYZE=1 npm run build -> dist/stats.html bundle treemap
    process.env.ANALYZE &&
      visualizer({ filename: "dist/stats.html", emitFile: true }),
  ].filter(Boolean),
  worker: {
    format: "es",
  },
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            // react-dom must stay in the entry chunk: without this group it gets
            // welded into "three", which then lands on the critical path via
            // modulepreload (~275 KB gz) and defeats the HeroCanvas lazy split.
            { name: "react", test: /[\\/]node_modules[\\/](?:react|react-dom|scheduler)[\\/]/, priority: 10 },
            // SplitText is only imported by the lazy Tools section — keep it out
            // of the eagerly-loaded gsap chunk.
            { name: "gsap-split", test: /[\\/]node_modules[\\/]gsap[\\/]SplitText/, priority: 5 },
            { name: "three", test: /[\\/]node_modules[\\/](?:@react-three|three)[\\/]/ },
            { name: "gsap", test: /[\\/]node_modules[\\/](?:@gsap|gsap)[\\/]/ },
          ],
        },
      },
    },
  },
});
