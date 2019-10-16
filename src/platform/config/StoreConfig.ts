import {VueConstructor} from "vue";
import Vuex, {Store} from "vuex";
import SystemStore from "./stores/SystemStore";
import UserStore from "./stores/UserStore";
import MenuStore from "./stores/MenuStore";
import BreadStore from "./stores/BreadStore";
import ConfigStore from "./stores/ConfigStore";

let store: Store<any>;

const getStore = () => {
    if (!store) {
        const modules = {
            base_system: SystemStore.store,
            base_user: UserStore.store,
            base_menu: MenuStore.store,
            base_bread: BreadStore.store,
            base_config: ConfigStore.store,
        };
        store = new Vuex.Store({
            strict: process.env.NODE_ENV !== "production",
            modules,
        });
    }
    return store;
};

export default {
    getStore,
    install(Vue: VueConstructor) {
        Vue.use(Vuex);
        Vue.prototype.$system = SystemStore.operator(getStore());
        Vue.prototype.$bread = BreadStore.operator(getStore());
    }
};

