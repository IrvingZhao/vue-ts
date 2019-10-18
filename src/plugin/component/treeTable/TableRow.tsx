import {Component, Prop, Vue} from "vue-property-decorator";
import {ColumnRenderConfig} from "@/plugin/types/TreeTable";
import {VNode} from "vue";

@Component<TableRow>({
    name: "xlb-tree-table-row",
    render(h): VNode {
        const children = [];
        const rowChildren = this.row[this.childProp];
        const hasChildren = rowChildren && rowChildren.length > 0;
        const bodyColumn = this.columns.forEach((column: ColumnRenderConfig, cIndex: number) => {
            return column.renderCell(h, {});
        });
        children.push(
            <div class="row body" key={"row" + this.rIndex} onClick={this.rowClick()}>
                {bodyColumn}
            </div>
        );
        if (hasChildren && rowChildren instanceof Array) {
            const expandRows = rowChildren.map((childRow: any, childRIndex: number) => {
                return <xlb-tree-table-row row={childRow} rIndex={childRIndex} columns={this.columns} childLevel={this.childLevel + 1}
                                           childProp={this.childProp}/>;
            });
            children.push(
                <div class="expand" v-active-height={this.activeHeightParam}>
                    {expandRows}
                </div>
            );
        }
        return children.length > 1 ? <div>{children}</div> : children[0];
    }
})
export default class TableRow extends Vue {
    @Prop(Object)
    private row!: any;

    @Prop(Number)
    private rIndex!: number;

    @Prop(Array)
    private columns!: ColumnRenderConfig[];

    @Prop(Number)
    private childLevel: number = 0;

    @Prop(String)
    private childProp!: string;

    private activeHeightParam = {
        active: false,
        remove: true
    };

    private rowClick() {
        this.activeHeightParam.active = !this.activeHeightParam.active;
    }
}
