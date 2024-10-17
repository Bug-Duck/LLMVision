import { defineConfig } from 'tsup'
import { copyFile } from 'fs'

export default defineConfig({
  entry: ['src/index.ts', 'src/client/index.ts'],
  format: ['cjs', 'esm'],
  tsconfig: './tsconfig.json',
  splitting: true,
  clean: true,
  dts: true,
  async onSuccess() {
    copyFile('./src/document/main.md', './dist/client/main.md', () => {})
  },
})
