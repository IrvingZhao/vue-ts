import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {CreateElement, VNode} from "vue";
import {RenderCellConfig, RenderHeadConfig, TreeTableClass} from "@/plugin/types/TreeTable";

const getPropByPath = (obj: any, path: string, strict?: boolean): { o: any, k: string, v: any } => {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, ".$1");
    path = path.replace(/^\./, "");

    const keyArr = path.split(".");
    let i = 0;
    for (const len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) {
            break;
        }
        const key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        } else {
            if (strict) {
                throw new Error("please transfer a valid prop path to form item!");
            }
            break;
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null
    };
};

const DEFAULT_RENDER_CELL = (h: CreateElement, {row, column, $index}: { row: any, column: TableColumn, $index: number }): VNode => {
    if (column && column.formatter) {
        return column.formatter(h, row, column, $index);
    } else {
        const property = column.property;
        const value = property && getPropByPath(row, property).v;
        return (<span>{value}</span>);
    }
};

@Component<TableColumn>({
    name: "xlb-tree-table-column",
    created() {
        if (!this.table) {
            throw new Error("tree-table-column must be child of tree-table");
        }

        const renderHeader = (h: CreateElement, headConfig: RenderHeadConfig): VNode => {
            const headSlot = this.$scopedSlots.header;

            const render = () => {
                if (headSlot) {
                    return headSlot(headConfig);
                } else if (this.renderHeader) {
                    return this.renderHeader(h, headConfig);
                } else {
                    return headConfig.label;
                }
            };

            return (<div class="col" style={{flex: this.columnWidth}}>
                <div class="col-content">{render()}</div>
            </div>);
        };
        const me: TableColumn = this;

        const renderCell = (createElement: CreateElement, {row, rIndex, index, level, hasChildren, rowActive}: RenderCellConfig): VNode => {

            const render = () => {
                if (this.$scopedSlots.default) {
                    return this.$scopedSlots.default({row, column: me, $index: rIndex});
                } else {
                    return DEFAULT_RENDER_CELL(createElement, {row, column: me, $index: rIndex});
                }
            };

            return (
                <div class="col" style={{flex: this.columnWidth}} key={"column" + rIndex + index}>
                    <div class="col-content"
                         style={index === 0 ? ("padding-left:" + (level * 20 + 15) + "px") : ""}>{index === 0 ? (hasChildren ?
                        <i class={{
                            "expand-icon": true,
                            "el-icon-my-folder-open": rowActive,
                            "el-icon-my-folder-close": !rowActive
                        }}/> :
                        <i class="expand-icon el-icon-my-file"/>) : ""}{render()}</div>
                </div>
            );
        };

        if (this.table) {
            this.table.addColumns({
                label: "",
                renderHeader,
                renderCell
            });
        }

    }
})
export default class TableColumn extends Vue {

    get columnWidth(): string {
        let num = 0;
        if (typeof this.width === "string") {
            num = Number.parseInt(this.width.replace("px", ""), 10);
        } else {
            num = this.width;
        }
        return num + " 0 " + num + "px";
    }

    @Prop(String)
    public property!: string;

    @Prop(Function)
    public formatter!: (h: CreateElement, row: any, column: TableColumn, $index: number) => any;
    @Inject("table")
    private table!: TreeTableClass;

    @Prop(Function)
    private renderHeader!: (h: CreateElement, data: any) => void;

    @Prop(String)
    private prop!: string;

    @Prop(String)
    private label!: string;

    @Prop({type: [Number, String], required: true})
    private width!: number | string;

}
