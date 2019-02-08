const { resolve } = require('path')

module.exports = (options, ctx) => ({
    
    name: 'vuepress-plugin-code-switcher',

    enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.js'),

    plugins: [
        [
            '@vuepress/register-components',
            {
                componentsDir: resolve(__dirname, './components')
            }
        ]
    ]

})