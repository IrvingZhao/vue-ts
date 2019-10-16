<template>
    <div class="container">
        <img src="../assets/404.svg" alt="">
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Page404 extends Vue {
    }
</script>

<style scoped>
    img {
        display: block;
        margin: 0 auto;
        min-height: 500px;
    }
</style>
