<template>
    <div class="code-switcher">
        <div class="tab-header">
            <ul>
                <li v-for="(name, shorthand) in actualLanguages"
                    :key="shorthand"
                    @click="switchLanguage(shorthand)"
                    :class="{ active: selectedLanguage === shorthand }"
                > {{ name }}
                </li>
            </ul>
        </div>

        <div class="tab-content"
            :key="shorthand"
            v-for="(name, shorthand) in actualLanguages"
            v-show="shorthand === selectedLanguage"
        > 
            <slot :name="shorthand"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: 'default'
        },
        isolated: {
            type: Boolean,
            default: false
        },
        languages: {
            type: Object,
            required: false,
        }
    },

    data () {
        return {
            selectedLanguage: this.languages ? Object.keys(this.languages)[0] : null,
            actualLanguages: this.languages,
        }
    },

    computed: {
        root () {
            let parent = this, p
            while (p = parent.$parent) {
                parent = p
            }

            return parent
        },

        localStorageKey () {
            return `vuepress-plugin-code-switcher@${this.name}`
        },
    },

    methods: {
        switchLanguage (value) {
            if (this.isolated) {
                return this.selectedLanguage = value
            }

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(this.localStorageKey, value)
            }
            this.root.$emit('change', { name: this.name, value })
        },

        setConfiguredDefaultLanguages () {
            // No need to override the language list if we already have manually
            // specified languages
            if (this.languages) return

            const options = this.$page.codeSwitcherOptions
            if (options && options.groups && options.groups[this.name]) {
                this.actualLanguages = options.groups[this.name]
                this.selectedLanguage = Object.keys(this.actualLanguages)[0]
            }
        }
    },

    created () {
        if (this.isolated) return

        this.setConfiguredDefaultLanguages()
        if (!this.actualLanguages) {
            throw new Error('You must specify either the "languages" prop or use the "groups" option when configuring the plugin.')
        }

        if (typeof localStorage !== 'undefined') {
            let selected = localStorage.getItem(this.localStorageKey)
            if (selected && Object.keys(this.actualLanguages).indexOf(selected) !== -1)
                this.selectedLanguage = selected
        }

        this.root.$on('change', ({ name, value }) => {
            if (name === this.name)
                this.selectedLanguage = value
        })
    }
}
</script>

<style>

</style>
