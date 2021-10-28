import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSvgPlugin from 'vite-plugin-react-svg'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    react(),
    reactSvgPlugin({
      defaultExport: 'component',
    }),
    checker({
      typescript: true,
      eslint: {
        files: ['./src'],
        extensions: ['.ts', '.tsx'],
      },
    }),
  ],
})
