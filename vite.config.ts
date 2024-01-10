import { defineConfig } from "vite";
import { join } from "path";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  // plugins: [react()],
  build: {
    outDir: "./docs",
    rollupOptions: {
			// plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
			plugins: [rollupNodePolyFill()]
		},
  },
  base: "./",
  resolve: {
    alias: {
      '@': join(__dirname, "./src"),
    }
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
}
});
