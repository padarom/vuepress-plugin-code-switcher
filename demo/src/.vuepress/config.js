module.exports = {
  title: 'Vuepress Plugin Code Switcher',

  themeConfig: {
    repo: 'https://github.com/padarom/vuepress-plugin-code-switcher',
    editLinks: true,
    docsDir: 'src',
    lastUpdated: true,
  },

  plugins: [
    [
      'code-switcher',
      {
        groups: {
          synchronized: { julia: 'Julia', kotlin: 'Kotlin', perl: 'Perl' },
          'group-1': { nim: 'Nim', ocaml: 'OCaml' },
          'group-2': { nim: 'Nim', ocaml: 'OCaml' },
        },
      },
    ],
  ]
}
