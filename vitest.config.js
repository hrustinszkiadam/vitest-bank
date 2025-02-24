import { defineConfig, defaultExclude } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		exclude: [...defaultExclude],
		coverage: {
			provider: 'v8',
			exclude: [...defaultExclude, 'src/index.js'],
		},
	},
});
