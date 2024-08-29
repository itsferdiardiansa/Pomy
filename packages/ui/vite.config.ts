import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import typescript2 from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import sassDts from 'vite-plugin-sass-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  // plugins: [
  //   vue(),
  //   svgLoader(),
  //   cssInjectedByJsPlugin(),
  //   dts({
  //     insertTypesEntry: true,
  //   }),
  //   sassDts(),
  //   cssInjectedByJsPlugin(),
  //   viteStaticCopy({
  //     targets: [
  //       { src: 'src/styles/main.scss', dest: 'dist/assets' },
  //     ],
  //   }),
  //   typescript2({
  //     check: false,
  //     include: ['src/components/**/*.vue'],
  //     tsconfigOverride: {
  //       compilerOptions: {
  //         outDir: 'dist',
  //         sourceMap: true,
  //         declaration: true,
  //         declarationMap: true,
  //       },
  //     },
  //     exclude: ['vite.config.ts'],
  //   }),
  // ],
  // build: {
  //   cssCodeSplit: true,
  //   lib: {
  //     entry: 'src/main.ts',
  //     name: 'pomy-ui',
  //     formats: ['es', 'cjs', 'umd'],
  //     fileName: format => `pomy-ui.${format}.js`,
  //   },
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(__dirname, 'src/main.ts'),
  //     },
  //     external: ['vue'],
  //     output: {
  //       assetFileNames: (assetInfo: any) => {
  //         if (assetInfo.name === 'main.css') return 'pomy-ui.min.css'
  //         return assetInfo.name
  //       },
  //       exports: 'named',
  //       globals: {
  //         vue: 'Vue',
  //       },
  //     },
  //   },
  // },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  // },
})
