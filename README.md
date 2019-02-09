# vuepress-plugin-code-switcher
Component that allows having synchronized language switchable code blocks (e.g. to switch between Java and Kotlin examples). Selected languages are persisted to local storage to have language selection be permanent across page requests.

## Installation
```
$ npm install vuepress-plugin-code-switcher --save
```

After installing, add it to your Vuepress configuration's plugin list:

```js
module.exports = {
    plugins: [ 'code-switcher' ]
}
```

### Usage
````markdown
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
````

> The extra newline between the `<template>` tags and their content is necessary if you want to have Markdown interpreted within the component.

#### Props
| Prop | Description | Type | Default |
| ----- | ----- | ---- | ---- |
| languages | The languages that can be switched between. The object expects shorthands as keys and the tab title as values. The shorthands will also be used as slot names | Object | --- |
| name | All code switchers on one page with the same name will be synchronized | String | `'default'` |
| isolated | if true, this block will not synchronize with any others or load/save its state to/from localstorage | Boolean | `false` |
