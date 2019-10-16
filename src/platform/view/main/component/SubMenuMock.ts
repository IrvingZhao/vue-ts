import {Submenu} from "element-ui";
import {Component, Vue} from "vue-property-decorator";

@Component<SubMenuMock>({
    name: "sub-menu-mock",
    mixins: [Submenu],
    props: ["route"],
    computed: {
        paddingStyle() {
            return {padding: "0px"};
        }
    }
})
export default class SubMenuMock extends Vue {

}
