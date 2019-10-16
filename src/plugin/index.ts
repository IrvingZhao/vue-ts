import {VueConstructor} from "vue";

import Components from "./component";
import Directives from "./directives";
import Features from "./feature";
import Utils from "./util";

export default {
    install(Vue: VueConstructor) {
        Vue.use(Components);
        Vue.use(Directives);
        Vue.use(Features);
        Vue.use(Utils);
    }
};

export * from "./component";
export * from "./directives";
export * from "./feature";
export * from "./util";
