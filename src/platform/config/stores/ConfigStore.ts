import {Module} from "vuex";

interface ConfigStoreState {
    loginAuth: boolean;
    pageAuth: boolean;
    operatorAuth: boolean;
}

const store: Module<ConfigStoreState, any> = {
    namespaced: true,
    state: {
        loginAuth: false,
        pageAuth: false,
        operatorAuth: false,
    },
    mutations: {
        setLoginAuth(state, loginAuth) {
            state.loginAuth = loginAuth;
        },
        setPageAuth(state, pageAuth) {
            state.pageAuth = pageAuth;
        },
        setOperatorAuth(state, operatorAuth) {
            state.operatorAuth = operatorAuth;
        }
    }
};

export default {
    store,
};
