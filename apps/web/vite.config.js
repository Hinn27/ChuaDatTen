import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      '@mui/material': path.resolve(__dirname, '../../node_modules/@mui/material'),
      '@mui/icons-material': path.resolve(__dirname, '../../node_modules/@mui/icons-material'),
      '@emotion/react': path.resolve(__dirname, '../../node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, '../../node_modules/@emotion/styled'),
    }
  }
})
