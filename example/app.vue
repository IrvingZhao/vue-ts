<template>
    <div class="content">
        <div class="labels">
            <div :class="{'label-item':true,active:activeItem === item.key}" v-for="item in labels" @click="activeLabel(item)">{{item.text}}</div>
        </div>
        <div class="body">
            <base-page v-if="activeItem === 'base-page'"></base-page>
            <tree-table v-else-if="activeItem === 'tree-table'"></tree-table>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import BasePage from "./BasePage.vue";
    import TreeTable from "./treeTable.vue";

    @Component<App>({
        components: {TreeTable, BasePage}
    })
    export default class App extends Vue {
        private labels = [
            {key: "base-page", text: "基础页面"},
            {key: "tree-table", text: "树表"}
        ];
        private activeItem: string = "tree-table";

        private activeLabel(item: any) {
            this.activeItem = item.key;
        }
    }
</script>
<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
    }
</style>
<style scoped lang="scss">
    .content {
        display: flex;
        flex-direction: column;
        height: 100%;

        .labels {
            flex: 0 0 auto;
            display: flex;
            flex-direction: row;
            margin: 10px;

            .label-item {
                flex: 0 0 auto;
                margin: 0 10px;
                cursor: pointer;

                &.active {
                    color: #4A90E2;
                }
            }
        }

        .body {
            flex: 1 1;
            margin: 10px;
            overflow: auto;
            border: 1px solid #D8D8D8;
        }
    }
</style>
