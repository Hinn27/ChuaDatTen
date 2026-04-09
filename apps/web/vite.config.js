import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/api/v1': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@mui/material': path.resolve(__dirname, '../../node_modules/@mui/material'),
      '@mui/icons-material': path.resolve(__dirname, '../../node_modules/@mui/icons-material'),
      '@emotion/react': path.resolve(__dirname, '../../node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, '../../node_modules/@emotion/styled'),
    }
  }
})
