import {Module} from "vuex";
import Vue from "vue";

const getUserMenu = () => Vue.$axios.get("init/userModule");

interface MenuStoreState {
    menuTree: any[];
    menuMap: { [key: string]: any };
}

const store: Module<MenuStoreState, any> = {
    namespaced: true,
    state: {
        menuTree: [],
        menuMap: {},
    },
    mutations: {
        menuTree(state, data) {
            state.menuTree = data;
            const menuMap: { [key: string]: any } = {};
            const childArr: any[] = [...data];
            let childItem = childArr.shift();
            while (childItem) {
                menuMap[childItem.id] = childItem;
                if (childItem.child) {
                    childItem.child.forEach((item: any) => {
                        childArr.push(item);
                    });
                }
                childItem = childArr.shift();
            }
            state.menuMap = menuMap;
        }
    },
    actions: {
        initUserAuth({commit}) {
            getUserMenu().then(({code, data}: any) => {
                if ("000000" === code) {
                    commit("menuTree", data);
                }
            });
        }
    },
};

export default {
    store,
};
