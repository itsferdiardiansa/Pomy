import type { StorybookConfig } from '@storybook/vue3-vite'

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  staticDirs: ['../src'],
  viteFinal: async config =>
    mergeConfig(config, {
      plugins: [nxViteTsPaths()],
      css: {
        postcss: null,
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import '../src/style.css';
            `,
          },
        },
      },
    }),
}

export default config
