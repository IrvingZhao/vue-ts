import {VueConstructor} from "vue";
import {AddButton, EditButton, DeleteButton, CustomButton} from "@/platform/component/Buttons";
import ConfigColumnGrid from "@/platform/component/ConfigColumnGrid";
import MoreDrop from "@/platform/component/MoreDrop.vue";
import OperatorAuth from "@/platform/component/OperatorAuth";

export default {
    install(Vue: VueConstructor) {
        Vue.component("xlb-operator-auth", OperatorAuth);
        Vue.component("xlb-more-drop", MoreDrop);
        Vue.component("xlb-add-button", AddButton);
        Vue.component("xlb-edit-button", EditButton);
        Vue.component("xlb-delete-button", DeleteButton);
        Vue.component("xlb-custom-button", CustomButton);
        Vue.component("xlb-config-column-grid", ConfigColumnGrid);
    }
};

export {
    AddButton, EditButton, DeleteButton, CustomButton,
    ConfigColumnGrid,
    MoreDrop,
    OperatorAuth,
};
