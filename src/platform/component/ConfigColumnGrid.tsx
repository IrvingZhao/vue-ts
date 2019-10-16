import {GeminiScroll, Resize} from "@/plugin";
import Component from "vue-class-component";
import {Vue, Prop} from "vue-property-decorator";
import {ElTable} from "element-ui/types/table";
import {VNode} from "vue";

export interface ColumnConfig {
    key: string;
    value: string;
}

@Component<ColumnDefineGrid>({
    name: "xlb-config-column-grid",
    directives: {
        resize: new Resize(),
    },
    render(createElement) {
        const me = this;
        let slotEls: VNode[] = [];
        if (me.$slots.default) {
            slotEls = [...me.$slots.default];
        }
        me.visibleColumnComputed.forEach((item) => {
            const slotItem = me.$slots[item];
            if (slotItem && slotItem instanceof Array) {
                slotItem.forEach((vNodeItem, j) => {
                    if (!vNodeItem.key) { // 如果slot中的节点 没有 key时，补充一个key，避免出现slot渲染问题
                        vNodeItem.key = item + j;
                    }
                    slotEls.push(vNodeItem);
                });
            }
        });

        if (me.$slots.defaultRight) {
            me.$slots.defaultRight.forEach((item) => {
                slotEls.push(item);
            });
        }

        return createElement("div", {
            ref: "gridArea",
            style: {
                width: "100%",
                height: "100%",
            },
            directives: [
                {
                    name: "resize",
                    value() {
                        me.updateGridHeight();
                    },
                },
            ],
        }, [
            createElement("el-table", {
                class: "gm-scrollbar-container",
                ref: "table",
                props: me.tableParamComputed
            }, slotEls),
        ]);
    },
    mounted() {
        setTimeout(() => {
            const table = this.$refs.table;

            // 设置表格中滚动条信息
            const div = document.createElement("div");
            div.innerHTML = "<div class='gm-scrollbar -vertical'><div class='thumb'></div></div><div class='gm-scrollbar -horizontal'><div class='thumb'></div></div>";
            if (!(table.$refs.bodyWrapper instanceof HTMLElement) ||
                !(table.$refs.headerWrapper instanceof HTMLElement) ||
                !(table.$el instanceof HTMLElement)) {
                return;
            }

            table.$refs.bodyWrapper.classList.add("gm-scroll-view");
            const tableEl: HTMLElement = table.$el;

            for (let i = div.children.length - 1; i >= 0; i--) {
                const item = div.children.item(i);
                if (item) {
                    tableEl.appendChild(item);
                }
            }

            // 初始化滚动条
            const scroll = this.scroll = new GeminiScroll({
                element: tableEl,
                createElements: false,
                offsetY: 48,
            });
            scroll.create();

            setTimeout(() => {
                this.updateGridHeight();
            }, 0);

        }, 0);
    },
    updated() {
        if (this.scroll) {
            this.updateGridHeight();
        }
    },
})
export default class ColumnDefineGrid extends Vue {

    get tableParamComputed() {
        if (!this.tableParams.height) {
            this.tableParams.height = "auto";
        }
        return this.tableParams;
    }

    get visibleColumnComputed() {
        if (this.visibleColumn && this.visibleColumn.length > 0) {
            return this.visibleColumn;
        }
        if (this.allColumns) {
            return this.allColumns.map((item) => item.key);
        }
        return [];
    }

    public $refs!: { gridArea: HTMLElement, table: ElTable };

    @Prop({type: Object, required: true})
    private tableParams!: ElTable;

    @Prop(Array)
    private visibleColumn: string[] | undefined;

    @Prop({type: Array, required: true})
    private allColumns: ColumnConfig[] | undefined;

    private children: VNode[] = [];

    private scroll!: GeminiScroll;

    public updateGridHeight() {
        this.tableParams.height = this.$refs.gridArea.offsetHeight; // 设置表格高度
        this.scroll.update(); // scroll 重新计算 滚动区域高度
        setTimeout(() => {
            // 获取表格信息
            const table = this.$refs.table;
            const scrollBarWidth = this.scroll.SCROLLBAR_WIDTH;
            const wrapperHeight = this.$refs.gridArea.offsetHeight;
            const wrapperWidth = this.$refs.gridArea.offsetWidth;
            if (!(table.$refs.headerWrapper instanceof HTMLElement) ||
                !(table.$refs.bodyWrapper instanceof HTMLElement)) {
                return;
            }
            const bodyWrapper: HTMLElement = table.$refs.bodyWrapper;
            const headerWrapper: HTMLElement = table.$refs.headerWrapper;

            const wrapperBodyHeight = wrapperHeight - headerWrapper.offsetHeight; // 表格body区域大小
            // 左侧固定列
            const leftWrapper = table.$refs.fixedWrapper;
            if (leftWrapper && leftWrapper instanceof HTMLElement) {
                // 由于滚动条高度由减小，需重新设置 左侧固定列整体高度 及 body 高度
                leftWrapper.style.height = wrapperHeight + "px";
                const fixedBodyWrapper = table.$refs.fixedBodyWrapper;
                if (fixedBodyWrapper && fixedBodyWrapper instanceof HTMLElement) {
                    fixedBodyWrapper.style.height = (wrapperBodyHeight - 6) + "px";
                }
            }
            // 右侧固定列，同左侧
            const rightWrapper = table.$refs.rightFixedWrapper;
            if (rightWrapper && rightWrapper instanceof HTMLElement) {
                rightWrapper.style.height = wrapperHeight + "px";
                rightWrapper.style.right = "6px";
                const rightFixedBodyWrapper = table.$refs.rightFixedBodyWrapper;
                if (rightFixedBodyWrapper && rightFixedBodyWrapper instanceof HTMLElement) {
                    rightFixedBodyWrapper.style.height = (wrapperBodyHeight - 6) + "px"; // 去除滚动条区域
                }
            } else {
                // 当不具有右侧固定列时，右侧出现滚动条区域预留空间，由于滚动条宽度减少，重新设置 head 和 body区域宽度
                const body: HTMLElement | null = bodyWrapper.querySelector(".el-table__body");
                if (body) {
                    body.style.width = (wrapperWidth - 6) + "px";
                }
                const head: HTMLElement | null = headerWrapper.querySelector(".el-table__header");
                if (head) {
                    head.style.width = (wrapperWidth + scrollBarWidth - 6) + "px";
                }
            }
        }, 0);
    }

}
