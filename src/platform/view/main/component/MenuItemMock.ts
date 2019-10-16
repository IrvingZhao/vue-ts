import {MenuItem} from "element-ui";
import {Component, Vue} from "vue-property-decorator";

@Component<MenuItemMock>({
    name: "menu-item-mock",
    mixins: [MenuItem],
    computed: {
        paddingStyle() {
            return {padding: "0px"};
        }
    }
})
export default class MenuItemMock extends Vue {

}
