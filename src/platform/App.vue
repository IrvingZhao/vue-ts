<template>
    <router-view v-if="activeRouterView"></router-view>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from "vuex-class";

    const SystemStore = namespace("base_system");
    @Component<App>({})
    export default class App extends Vue {
        @SystemStore.State("activeRouterView")
        private activeRouterView!: boolean;
    }
</script>

<style scoped>

</style>
