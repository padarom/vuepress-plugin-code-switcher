import { computed, defineComponent, onBeforeMount, ref, reactive, h, useSlots, PropType, withDirectives, vShow } from 'vue'
import { DefaultGroups } from '../../shared/types'
import Emitter from '../emitter'

export const CodeSwitcher = defineComponent({
  name: 'CodeSwitcher',

  props: {
    name: {
      type: String,
      default: 'default',
    },
    isolated: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: Object,
      required: false,
    },
    groups: {
      type: Object as PropType<DefaultGroups>,
      default: {},
    }
  },

  setup (props) {
    const selectedLanguage = ref(props.languages ? Object.keys(props.languages)[0] : null)
    const $slots = useSlots()

    const localStorageKey = computed(() => `vuepress-plugin-code-switcher@${props.name}`)

    const switchLanguage = (language) => {
      if (props.isolated) {
        return selectedLanguage.value = language
      }

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(localStorageKey.value, language)
      }

      Emitter.$emit('change', { name: props.name, value: language })
    }

    const getLanguageList = () => {
      // No need to override the language list if we already have manually
      // specified languages
      if (props.languages) return props.languages

      if (props.groups && props.groups[props.name]) {
        // Either use the global groups option to determine the language list
        // from the "groups" prop ...
        return props.groups[props.name]
      }

      // ... or simply use the provided slot names for the language list
      return Object.keys($slots).reduce((list, language) => {
        // Capitalize the language name
        list[language] = language.charAt(0).toUpperCase() + language.slice(1)
        return list
      }, {})
    }

    const actualLanguages = getLanguageList()
    selectedLanguage.value = Object.keys(actualLanguages)[0]
    if (!actualLanguages) {
      throw new Error('You must specify either the "languages" prop or use the "groups" option when configuring the plugin.')
    }
    
    onBeforeMount(() => {
      if (props.isolated) return

      if (typeof localStorage !== 'undefined') {
        let selected = localStorage.getItem(localStorageKey.value)
        if (selected && Object.keys(actualLanguages).indexOf(selected) !== -1)
          selectedLanguage.value = selected
      }

      Emitter.$on('change', ({ name, value: language }) => {
        if (name === props.name) selectedLanguage.value = language
      })
    })

    const slotNotFound = ({ shorthand }: { shorthand: string }): ReturnType<typeof h> => {
      return h(
        'div',
        null,
        `Did not find a slot with name ${shorthand}.`
      )
    }

    return () =>
      h(
        'div',
        { class: 'code-switcher' },
        [
          h(
            'div',
            { class: 'tab-header' },
            h(
              'ul',
              null,
              Object.keys(actualLanguages).map((shorthand) => (
                h(
                  'li',
                  {
                    class: `tab-header ${selectedLanguage.value == shorthand ? 'active' : ''}`,
                    key: shorthand,
                    onClick() { switchLanguage(shorthand) },
                  },
                  actualLanguages[shorthand]
                )
              ))
            )
          ),
          
          Object.keys(actualLanguages).map((shorthand) => withDirectives(
            h(
              'div',
              {
                class: 'tab-content',
                key: shorthand,
              },
              ($slots[shorthand] || slotNotFound)({ shorthand })
            ),
            [[vShow, shorthand == selectedLanguage.value]])
          ),
        ]
      )
  },
})
