import {CreateElement, VueConstructor} from "vue";
import ApiConfig from "@/platform/config/ApiConfig";
import StoreConfig from "@/platform/config/StoreConfig";
import RouterConfig from "@/platform/config/RouterConfig";
import Component from "./component";
import App from "@/platform/App.vue";
import {RouteConfig} from "vue-router";

let platformOption: any;

export default {
    install(Vue: VueConstructor, options: any) {
        Vue.use(StoreConfig);
        Vue.use(RouterConfig);
        Vue.use(ApiConfig);
        Vue.use(Component);
        platformOption = options;
    },
    getVueConfig(routes: RouteConfig[]) {
        const router = RouterConfig.getRouter(routes);
        const store = StoreConfig.getStore();
        if (platformOption) {
            store.commit("base_config/setLoginAuth", platformOption.loginAuth);
            store.commit("base_config/setPageAuth", platformOption.pageAuth);
            store.commit("base_config/setOperatorAuth", platformOption.operatorAuth);
        }
        return {
            render: (h: CreateElement) => h(App),
            router,
            store
        };
    }
};
