<template>
    <div class="xlb-tree-table " v-resize="pageResizeHandle">
        <div class="table-head-area" ref="tableHead">
            <div class="table-head-content" ref="tableHeadContent">
                <table-head ref="tableHeaderComponent" :columns="columns"></table-head>
            </div>
        </div>
        <div class="table-body-area" ref="tableBody">
            <table-body ref="tableBodyComponent" :columns="columns" :data="data"
                        @tableBodyScroll="tableBodyScroll" :childProp="childProp"></table-body>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Provide, Vue} from "vue-property-decorator";
    import TableHead from "@/plugin/component/treeTable/TableHead";
    import TableBody from "@/plugin/component/treeTable/TableBody";
    import {ColumnRenderConfig, TreeTableClass} from "@/plugin/types/TreeTable";

    @Component<TreeTable>({
        name: "xlb-tree-table",
        components: {TableHead, TableBody}
    })
    export default class TreeTable extends Vue implements TreeTableClass {

        public $refs!: { tableHead: HTMLElement, tableHeaderComponent: TableHead, tableBodyComponent: TableBody };

        @Prop({type: String})
        public normalIcon!: string;

        @Prop({type: String})
        public openIcon!: string;

        @Prop({type: String})
        public closeIcon!: string;

        @Prop(Array)
        private data!: any[];

        @Prop({type: String, default: "children"})
        private childProp!: string;

        @Provide("table")
        private table: TreeTableClass = this;

        private columns: ColumnRenderConfig[] = [];

        public addColumns(column: ColumnRenderConfig): void {
            column.index = this.columns.length;
            this.columns.push(column);
        }

        public tableBodyScroll(target: HTMLElement) {
            this.$refs.tableHead.scrollTo(target.scrollLeft, 0);
        }

        public pageResizeHandle() {
            this.$refs.tableHeaderComponent.resize();
            this.$refs.tableBodyComponent.resize();
        }
    }
</script>

<style scoped lang="scss">

</style>
