import { defineConfig } from 'vite';

// Preact runs the same React code with a ~10x smaller runtime.
const reactAlias = {
  react: 'preact/compat',
  'react-dom/client': 'preact/compat/client',
  'react-dom': 'preact/compat',
  'react/jsx-runtime': 'preact/jsx-runtime',
};

export default defineConfig(({ mode }) => ({
  resolve: { alias: reactAlias },
  // Demo previews simulate the form and admin backend (no server needed)
  define: mode === 'demo' ? { 'import.meta.env.VITE_DEMO_FORM': JSON.stringify('true') } : {},
  esbuild: { jsx: 'automatic', jsxImportSource: 'preact' },
  ssr: { noExternal: true },
  build: {
    // demo: single-file preview, inline everything.
    // production: inline only the hero render (needed for first paint); all other
    // images and fonts are separate, cacheable files that lazy-load.
    assetsInlineLimit: mode === 'demo' ? 100_000_000 : 0,
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
    rollupOptions: { input: { main: 'index.html', admin: 'admin/index.html' } },
  },
}));
