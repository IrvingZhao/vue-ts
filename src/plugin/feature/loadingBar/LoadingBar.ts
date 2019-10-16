import LoadingBar from "./loading-bar.vue";
import Vue from "vue";
import {LoadingBarInstance, LoadingBarProps, LoadingBarUpdate} from "@/plugin/types/LoadingBar";

export function newInstance(properties?: LoadingBarProps): LoadingBarInstance {
    const props = properties || {};
    const instance = new Vue({
        data: props,
        render(h) {
            return h(LoadingBar, {
                props,
            });
        }
    });

    const component = instance.$mount();
    const loadingBarEl = component.$el;
    document.body.appendChild(loadingBarEl);
    const $loadingBar: Vue = instance.$children[0];

    return {
        update(options: LoadingBarUpdate) {
            if (options.percent) {
                $loadingBar.$data.percent = options.percent;
            }
            if (options.status) {
                $loadingBar.$data.status = options.status;
            }
            if (options.show !== undefined) {
                $loadingBar.$data.show = options.show;
            }
        },
        component: $loadingBar,
        destroy() {
            document.body.removeChild(loadingBarEl);
        }
    };
}

export default LoadingBar;
