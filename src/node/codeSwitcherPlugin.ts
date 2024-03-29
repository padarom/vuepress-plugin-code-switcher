import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { PluginOptions } from '../shared/types'

const __dirname = getDirname(import.meta.url)

export const codeSwitcherPlugin = ({
  componentName = 'CodeSwitcher',
  groups = {},
}: PluginOptions = {}): Plugin => ({
  name: 'vuepress-plugin-code-switcher',

  clientConfigFile: () => path.resolve(__dirname, '../client/config.js'),

  define: {
    __CODE_SWITCHER_COMPONENT_NAME__: componentName,
    __CODE_SWITCHER_GROUPS__: groups,
  }
})
