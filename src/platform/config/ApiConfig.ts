import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {VueConstructor} from "vue";
import StoreConfig from "./StoreConfig";
import RouterConfig from "./RouterConfig";
import {Notification} from "element-ui";
import {LoadingBar} from "@/plugin/types";

let loadingBarOperator: LoadingBar;

function initAxios() {
    const store = StoreConfig.getStore();
    const UserStore = store.state.base_user;

    const config: AxiosRequestConfig = {
        baseURL: "/api",
        transformRequest(data) {
            const form = new FormData();
            for (const item in data) {
                if (data.hasOwnProperty(item)) {
                    form.append(item, data[item]);
                }
            }
            return form;
        }
    };

    const axiosInstance: AxiosInstance = axios.create(config);

    axiosInstance.interceptors.request.use((cfg: AxiosRequestConfig) => {
        loadingBarOperator.start();
        if (UserStore.token) {
            cfg.headers["access-token"] = UserStore.token;
        }
        return cfg;
    });

    axiosInstance.interceptors.response.use((res) => {
        const {code, msg} = res.data;
        if (code) {
            if (code === "000000") {
                loadingBarOperator.finish();
            } else {
                loadingBarOperator.error();
                Notification({
                    message: "",
                    type: "error",
                    title: msg,
                    duration: 2000
                });
            }
            if (code === "000003" || code === "000005") {
                RouterConfig.getRouter().push("/login");
            }
        }
        return res.data;
    });

    return axiosInstance;
}

export default {
    install(Vue: VueConstructor) {
        const axiosInstance = initAxios();
        Vue.$axios = axiosInstance;
        Vue.prototype.$axios = axiosInstance;
        loadingBarOperator = Vue.$loadingBar;
    }
};
