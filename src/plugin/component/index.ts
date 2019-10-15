import {VueConstructor} from "vue";

import BasePage from "./basePage/index.vue";
import ScrollArea from "@/plugin/component/scrollArea/index.vue";
import ScrollItem from "@/plugin/component/scrollArea/scrollItem.vue";
import TimesIterator from "@/plugin/component/timesIterator";

export default {
    install(Vue: VueConstructor) {
        Vue.component("xlb-base-page", BasePage);
        Vue.component("xlb-scroll-area", ScrollArea);
        Vue.component("xlb-scroll-item", ScrollItem);
        Vue.component("xlb-time-iterator", TimesIterator);
    },
};

export {
    BasePage, ScrollArea, ScrollItem, TimesIterator
};