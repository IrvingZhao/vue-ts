import {GeminiScroll} from "../feature/geminiScrollbar/GeminiScroll";
import {DirectiveOptions, DirectiveBinding} from "vue/types/options";
import Vue from "vue";

const instanceCache: { [key: string]: GeminiScroll } = {};

export default class GeminiScrollbar implements DirectiveOptions {
    public bind(el: HTMLElement, binding: DirectiveBinding) {
        const scroll = new GeminiScroll({
            element: el,
            ...binding.value,
        });
        if (binding.value.autoCreate) {
            Vue.nextTick(() => {
                scroll.create();
            });
        }
        binding.value.instance = scroll;
        const scrollId = "geminiScroll_" + Date.now();
        instanceCache[scrollId] = scroll;
        el.dataset.geminiScroll = scrollId;
    }

    public unbind(el: HTMLElement, binding: DirectiveBinding) {
        const scrollId = el.dataset["gemini-scroll"];
        if (scrollId && instanceCache[scrollId]) {
            instanceCache[scrollId].destroy();
            delete instanceCache[scrollId];
        }
    }

    public componentUpdated(el: HTMLElement, binding: DirectiveBinding) {
        const scrollId = el.dataset.geminiScroll;
        if (scrollId && instanceCache[scrollId]) {
            instanceCache[scrollId].update();
        }
    }
}
