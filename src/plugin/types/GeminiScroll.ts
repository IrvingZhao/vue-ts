import {VNodeDirective} from "vue";
import {GeminiScroll} from "@/plugin/feature/geminiScrollbar/GeminiScroll";

export interface GeminiScrollConfig {
    autoCreate?: boolean;
    instance?: GeminiScroll;
    autoShow?: boolean;
    createElements?: boolean;
    forceGemini?: boolean;
    onResize?: typeof Function;
    minThumbSize?: number;
    offsetX?: number;
    offsetY?: number;
}

export interface GeminiScrollDirective extends VNodeDirective {
    name: "gemini-scroll";
    value: GeminiScrollConfig;
}
