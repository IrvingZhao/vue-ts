import {Prop, Vue, Watch} from "vue-property-decorator";

export default abstract class EditPage extends Vue {

    abstract get editBread(): any;

    abstract get addBread(): any;
    protected breadSplice: number = 3;

    @Prop({required: true})
    private id: any;
    private hasWatch: boolean = false;

    public abstract reset(): void;

    public abstract loadData(): void;

    private activated(): void {
        if (!this.hasWatch) {
            this.updateData();
        }
    }

    @Watch("id")
    private watchId() {
        this.hasWatch = true;
        this.updateData();
    }

    private deactivated() {
        this.reset();
        this.hasWatch = false;
    }

    private updateData() {
        this.$bread.splice(this.breadSplice);
        if (this.id) {
            this.loadData();
            if (!this.editBread) {
                throw new Error("未找到 editBread 对象");
            }
            this.$bread.push(this.editBread);
        } else {
            this.reset();
            if (!this.addBread) {
                throw new Error("未找到 addBread 对象");
            }
            this.$bread.push(this.addBread);
        }
    }

}
