import { resolve } from 'path';
import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === "production";


export default defineConfig({
  mode: isProduction ? "production" : "development",
  build: {
    outDir: "build",
    minify: false, //isProduction,
    sourcemap: !isProduction,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/leaflet-maptilersdk.ts'),
      name: 'leafletmaptilersdk',
      // the proper extensions will be added
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['umd'],
    },
    
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "leaflet",
        "@maptiler/sdk",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "leaflet": "L",
          "@maptiler/sdk": "maptilersdk",
        },

        // make sure the global Leaflet object `L` is extended and not overwritten
        extend: true,
        
        // Add a footer to the UMD bundle where we add to the L object all the content of the
        // `leafletmaptilersdk` namespace
        footer: `
          // Assign exported modules to L.maptiler in UMD mode
          if (typeof L !== "undefined" && typeof leafletmaptilersdk !== "undefined") {
            L.maptiler = {};
            Object.keys(leafletmaptilersdk).forEach(key => {
              L.maptiler[key] = leafletmaptilersdk[key];
            });
          }
        `
      },
    },
  },
  plugins: [],
})