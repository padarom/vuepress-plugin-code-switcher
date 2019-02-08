# `vuepress-plugin-code-switcher`

### Installation
Install `vuepress-plugin-code-switcher` as a dependency and add it to your config's plugin list:

```js
module.exports = {
    plugins: [ 'code-switcher' ]
}
```

### Example
```markdown
<CodeSwitcher :languages="{js:'JavaScript',ts:'TypeScript'}">
<template v-slot:js>

    ```js
    module.exports = function (str) {
        return typeof str === 'string' && str.trim() === str
    }
    ```

</template>
<template v-slot:ts>

    ```ts
    export default function isString (str: string) : str is string {
        return typeof str === 'string' && str.trim() === str
    }
    ```

</template>
</CodeSwitcher>
```

The extra newline between the `<template>` tags and their content is necessary if you want to have Markdown interpreted within the component.