import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@components": resolve(__dirname, "./src/components"),
			"@utils": resolve(__dirname, "./src/utils"),
			"@config": resolve(__dirname, "./src/config"),
			"@templates": resolve(__dirname, "./src/templates"),
		},
	},
	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': ['react', 'react-dom', 'react-router-dom'],
					'ui-vendor': ['framer-motion', 'lucide-react', 'react-icons', 'react-colorful'],
					'utils-vendor': ['date-fns', 'axios', 'zustand', '@dnd-kit/core']
				}
			}
		}
	}
});
