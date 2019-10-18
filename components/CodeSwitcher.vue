<template>
    <div class="code-switcher">
        <div class="tab-header">
            <ul>
                <li v-for="(name, shorthand) in languages"
                    :key="shorthand"
                    @click="switchLanguage(shorthand)"
                    :class="{ active: selectedLanguage === shorthand }"
                > {{ name }}
                </li>
            </ul>
        </div>

        <div class="tab-content"
            :key="shorthand"
            v-for="(name, shorthand) in languages"
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
        languages: Object,
    },

    data () {
        return {
            selectedLanguage: Object.keys(this.languages)[0]
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
        }
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
        }
    },

    created () {
        if (this.isolated) return

        if (typeof localStorage !== 'undefined') {
            let selected = localStorage.getItem(this.localStorageKey)
            if (selected) this.selectedLanguage = selected
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
