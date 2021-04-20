const { resolve } = require('path')

module.exports = (options, ctx) => ({
    extendPageData($page) {
        $page.codeSwitcherOptions = options
    },
    name: 'vuepress-plugin-code-switcher',
    enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.js'),
    plugins: [
        [
            '@vuepress/register-components',
            { componentsDir: resolve(__dirname, './components') }
        ]
    ]
})
