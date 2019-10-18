import {Component, Prop, Vue} from "vue-property-decorator";
import {CreateElement, VNode} from "vue";
import {ColumnRenderConfig} from "@/plugin/types/TreeTable";

@Component<TableHead>({
    name: "xlb-tree-table-head",
    updated() {
        this.$refs.tableHeadContent.style.width = this.$refs.tableHeadContent.scrollWidth + "px";
    },
    render(h: CreateElement): VNode {
        const slots = [];
        const headers = this.columns.map((column: ColumnRenderConfig, index) => {
            return column.renderHeader(h, {
                label: column.label,
            });
        });
        return (
            <div class="table-head-content" ref="tableHeadContent">
                <div class="row head">
                    {headers}
                </div>
            </div>);
    }
})
export default class TableHead extends Vue {

    public $refs!: { tableHeadContent: HTMLElement };

    @Prop(Array)
    private columns!: ColumnRenderConfig[];

    public resize(): void {
        this.$refs.tableHeadContent.style.width = "auto";
        this.$refs.tableHeadContent.style.width = this.$refs.tableHeadContent.scrollWidth + "px";
    }
}
