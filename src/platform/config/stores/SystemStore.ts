import Vue from "vue";
import {ActionContext, Module, Store} from "vuex";

interface SystemState {
    activeRouterView: boolean;
    renderNoAuth: boolean;
}

const store: Module<SystemState, any> = {
    namespaced: true,
    state: {
        activeRouterView: true,
        renderNoAuth: false,
    },
    mutations: {
        setActiveRouterView(state, activeRouterView) {
            state.activeRouterView = activeRouterView;
        },
        setNoAuth(state) {
            state.renderNoAuth = true;
        },
        setNormal(state) {
            state.renderNoAuth = false;
        }
    },
    actions: {
        reload(context: ActionContext<SystemState, any>) {
            context.commit("setActiveRouterView", false);
            Vue.nextTick(() => {
                context.commit("setActiveRouterView", true);
            });
        }
    }
};
const operator = (str: Store<any>) => {
    return {
        reload() {
            return str.dispatch("base_system/reload");
        }
    };
};
export default {
    store, operator, name: "base_system"
};
