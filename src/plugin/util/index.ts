import * as Util from "./util";
import {VueConstructor} from "vue";

export default function install(Vue: VueConstructor) {

    Vue.prototype.$util = Util;

    Vue.filter("simpleDate", (val: Date | number) => {
        return Util.getSimpleDate(val);
    });

    Vue.filter("fullDate", (val: Date | number) => {
        return Util.getFullDate(val);
    });

    Vue.filter("dateFormat", (val: Date | number, pattern: string) => {
        return Util.dateFormat(val, pattern);
    });
}

export * from "./util";
