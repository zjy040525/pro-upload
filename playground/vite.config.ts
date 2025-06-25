import React from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [React(), Inspect()],
})
