import {VueConstructor} from "vue";
import DateFormatter from "./dateFormatter";
import LoadingBar from "./loadingBar";
import {GeminiScroll} from "@/plugin/feature/geminiScrollbar/GeminiScroll";

export default function install(Vue: VueConstructor) {
    Vue.filter("simpleDate", (val: Date | number) => {
        return DateFormatter(val, "yyyy-MM-dd");
    });

    Vue.filter("fullDate", (val: Date | number) => {
        return DateFormatter(val, "yyyy-MM-dd HH:mm:ss");
    });

    Vue.filter("dateFormat", (val: Date | number, pattern: string) => {
        return DateFormatter(val, pattern);
    });

    Vue.$loadingBar = LoadingBar;
    Vue.prototype.$loadingBar = LoadingBar;
}

export {
    DateFormatter, GeminiScroll
};
