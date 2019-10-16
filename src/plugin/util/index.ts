import * as Util from "./util";
import {VueConstructor} from "vue";

export default function install(Vue: VueConstructor) {
    Vue.$util = Util;
    Vue.prototype.$util = Util;
}

export {
    Util
};
