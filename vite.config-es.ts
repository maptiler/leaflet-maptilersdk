import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  mode: isProduction ? "production" : "development",
  build: {
    minify: isProduction,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/leaflet-maptilersdk.ts'),
      name: 'leafletmaptilersdk',
      fileName: () => "leaflet-maptilersdk.min.js",
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: [
        "leaflet",
        "@maptiler/sdk",
      ],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {},
      },
    },
  },
  plugins: [
    dts({insertTypesEntry: true}),
  ],
});
