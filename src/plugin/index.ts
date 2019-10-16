import {VueConstructor} from "vue";

import Components, {BasePage, ScrollArea, ScrollItem, TimesIterator} from "./component";
import Directives, {ActiveHeight, GeminiScrollbar, Resize, MockScroll} from "./directives";
import Features, {DateFormatter} from "./feature";
import Utils, {Util} from "./util";

export default {
    install(Vue: VueConstructor) {
        Vue.use(Components);
        Vue.use(Directives);
        Vue.use(Features);
        Vue.use(Utils);
    }
};

export {
    BasePage, ScrollArea, ScrollItem, TimesIterator,
    ActiveHeight, GeminiScrollbar, Resize, MockScroll,
    DateFormatter,
    Util
};
