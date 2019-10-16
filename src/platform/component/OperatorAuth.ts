import {Component, Prop, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import {CreateElement} from "vue";

const ConfigStore = namespace("base_config");

@Component<OperatorAuth>({
    name: "xlb-operator-auth",
    render(createElement: CreateElement) {
        let childArray = [];
        const slots = this.$scopedSlots;
        for (let key in slots) {
            if (slots.hasOwnProperty(key)) {
                let slotItem = slots[key];
                if (slotItem) {
                    let childNode = slotItem({});
                    if (childNode) {
                        childArray.push(createElement("template", {slot: key}, [...childNode]));
                    }
                }
            }
        }
        if (this.computedPageKey) {
            // 后续补充 按钮权限 处理
            // let operators = this.$menu.getPageOperatorByKey(this.comPageKey);
            // if (operators) {
            //     let authOperatorKeys = operators.map((item) => item.key);
            //     return _c("xlb-config-slot", {
            //         props: {
            //             enabled: this.operatorAuth,
            //             sort: this.sort,
            //             slotKeys: authOperatorKeys
            //         }
            //     }, childArray);
            // } else {
            //     return createElement("");
            // }
            return createElement("template", {}, childArray);
        } else {
            return createElement("template", {}, childArray);
        }
    }
})
export default class OperatorAuth extends Vue {

    @Prop({type: String})
    private pageKey!: string;

    @Prop({type: Array})
    private sort!: string[];

    @ConfigStore.State("operatorAuth")
    private operatorAuth!: boolean;

    get computedPageKey() {
        return this.pageKey || this.$route.meta.key;
    }

}
