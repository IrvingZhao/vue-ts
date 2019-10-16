import {VueConstructor} from "vue";

import ActiveHeight from "@/plugin/directives/activeHeight";
import GeminiScrollbar from "@/plugin/directives/geminiScrollbar";
import Resize from "@/plugin/directives/resize";
import MockScroll from "./mockScroll";

export default function install(Vue: VueConstructor) {
    Vue.directive("active-height", new ActiveHeight());
    Vue.directive("gemini-scroll", new GeminiScrollbar());
    Vue.directive("resize", new Resize());
    Vue.directive("mock-scroll", new MockScroll());
}

export {
    ActiveHeight,
    GeminiScrollbar,
    Resize,
    MockScroll,
};
