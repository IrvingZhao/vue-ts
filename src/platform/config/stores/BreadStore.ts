import {Module, Store} from "vuex";
import {ItemBread} from "@/platform/types";

interface BreadStoreState {
    breadNav: ItemBread[];
}

const store: Module<BreadStoreState, any> = {
    namespaced: true,
    state: {
        breadNav: [],
    },
    mutations: {
        addBreadNav(state, breads: ItemBread[] | ItemBread) {
            if (breads instanceof Array) {
                breads.forEach((item) => {
                    state.breadNav.push(item);
                });
            } else {
                state.breadNav.push(breads);
            }
        },
        set(state, breads?: ItemBread[]) {
            state.breadNav = breads || [];
        },
        splice(state, index: number) {
            state.breadNav.splice(index);
        }
    }
};

const operator = (str: Store<any>) => {
    return {
        set(breads: ItemBread[]) {
            str.commit("base_bread/set", breads);
            return this;
        },
        push(breads: ItemBread | ItemBread[]) {
            str.commit("base_bread/addBreadNav", breads);
            return this;
        },
        clear() {
            str.commit("base_bread/set", []);
            return this;
        },
        splice(index: number) {
            str.commit("base_bread/splice", index);
        },
        getBread() {
            return str.state.base_bread.breadNav;
        }
    };
};

export default {
    store, operator
};
