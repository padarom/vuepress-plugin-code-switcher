<template>
    <div class="code-switcher">
        <div class="tab-header">
            <ul>
                <li v-for="(name, shorthand) in languages"
                    @click="selectedLanguage = shorthand"
                    :class="{ active: selectedLanguage === shorthand }"
                > {{ name }}
                </li>
            </ul>
        </div>

        <div class="tab-content"
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
        languages: Object
    },

    data () {
        return {
            selectedLanguage: 'js'
        }
    }
}
</script>

<style>

</style>