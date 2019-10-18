import {Component, Prop, Vue} from "vue-property-decorator";
import {GeminiScrollConfig} from "@/plugin/types/GeminiScroll";
import {VNode} from "vue";
import TableRow from "@/plugin/component/treeTable/TableRow";
import {ColumnRenderConfig} from "@/plugin/types/TreeTable";

@Component<TableBody>({
    name: "xlb-tree-table-head",
    components: {TableRow},
    updated() {
        this.$refs.tableBodyContent.style.width = this.$refs.tableBodyContent.scrollWidth + "px";
        if (this.scrollConfig.instance) {
            this.scrollConfig.instance.create();
        }
    },
    directives: {
        tableHeadScroll: {
            bind(el, binding, vNode) {
                const context = vNode.context;
                el.addEventListener("scroll", (e) => {
                    const target = e.target;
                    // context.$refs.tableHead.scrollTo(target.scrollLeft, 0);
                    if (context) {
                        context.$emit("tableBodyScroll", target);
                    }
                });
            }
        }
    },
    render(): VNode {
        const activeHeightParam = {
            active: false,
        };

        const renderRow = (item: any, rIndex: number) => {
            return <table-row columns={this.columns} row={item} rIndex={rIndex} childProp={this.childProp}/>;
        };

        const rows = this.data.map(renderRow);

        return (
            <div class="table-body-content" v-gemini-scroll={this.scrollConfig}>
                <div class="gm-scrollbar -vertical">
                    <div class="thumb"/>
                </div>
                <div class="gm-scrollbar -horizontal">
                    <div class="thumb"/>
                </div>
                <div class="gm-scroll-view" v-table-head-scroll>
                    <div ref="tableBodyContent" v-resize={this.tableContentAreaResizeHandle}>
                        {rows}
                    </div>
                </div>
            </div>
        );
    }
})
export default class TableBody extends Vue {

    public $refs!: {
        tableBodyContent: HTMLElement
    };

    @Prop(Object)
    private columns!: ColumnRenderConfig[];

    @Prop(Array)
    private data!: any[];

    @Prop(String)
    private childProp!: string;

    private scrollConfig: GeminiScrollConfig = {
        createElements: false,
        autoCreate: false,
        instance: undefined,
        offsetX: 0
    };

    public resize(): void {
        this.$refs.tableBodyContent.style.width = "auto";
        this.$refs.tableBodyContent.style.width = this.$refs.tableBodyContent.scrollWidth + "px";
        if (this.scrollConfig.instance) {
            this.scrollConfig.instance.update();
        }
    }

    private tableContentAreaResizeHandle(): void {
        if (this.scrollConfig.instance) {
            this.scrollConfig.instance.update();
        }
    }

}
