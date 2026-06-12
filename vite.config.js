import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // GitHub Pages subdomain deployment: https://ilhncvn-png.github.io/iccreative-portfolio/
  // If you add a custom domain later, change this back to: base: '/'
  base: '/iccreative-portfolio/',

  resolve: {
    alias: { '@': '/src' },
  },

  build: {
    // Target modern browsers — enables native ESM, async/await, etc.
    target: 'es2020',

    // Raise the warning threshold for large chunks (portfolio images are external)
    chunkSizeWarningLimit: 600,

    // Asset inlining threshold — inline files < 4KB as base64 (avoids extra requests)
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // Stable chunk names for long-term caching
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',

        // Split vendor libraries for better cache reuse
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion'))  return 'vendor-motion'
          if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n'
          // Group react + react-dom + scheduler together to avoid circular deps
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) return 'vendor-react'
        },
      },
    },

    // Enable source maps for production debugging (remove if not needed)
    sourcemap: false,

    // CSS code splitting
    cssCodeSplit: true,

    // Minification
    minify: 'esbuild',
  },

  // Preview server settings (for testing the production build locally)
  preview: {
    port: 4173,
    headers: {
      // Cache static assets aggressively
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})
