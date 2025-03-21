/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		environment: 'happy-dom',
	},
	plugins: [tailwindcss()],
});
