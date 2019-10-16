import {Module} from "vuex";
import {Util} from "@/plugin/index";

interface UserInfo {
    area: string;
    roleFlag: any;
    userUrl: string[];
    realname: string;
}

interface UserConfig {
    "pc-map-xx": string;
    "pc-jd-ecard": string;
    "pc-map-dataReport": string;
}

interface UserStoreState {
    token: string;
    userInfo: UserInfo;
    config: UserConfig;
}

// 读取缓存中的数据
const cacheData = Util.getItem("login-user-info");
let storeState: UserStoreState;
if (cacheData) {
    storeState = {
        token: cacheData.token,
        userInfo: {
            area: cacheData.area,
            roleFlag: cacheData.roleFlag,
            userUrl: cacheData.userUrl,
            realname: cacheData.realname
        },
        config: {
            "pc-map-xx": cacheData["pc-map-xx"],
            "pc-jd-ecard": cacheData["pc-jd-ecard"],
            "pc-map-dataReport": cacheData["pc-map-dataReport"],
        },
    };
} else {
    storeState = {
        token: "",
        userInfo: {
            area: "",
            roleFlag: 0,
            userUrl: [],
            realname: ""
        },
        config: {
            "pc-map-xx": "OPERATION_REJECT",
            "pc-jd-ecard": "OPERATION_REJECT",
            "pc-map-dataReport": "OPERATION_REJECT",
        },
    };
}

const store: Module<UserStoreState, any> = {
    namespaced: true,
    state: storeState,
    mutations: {
        userData(state: UserStoreState, data: any) {
            console.info("user store userData");
            Util.setItem("login-user-info", data); // 写入缓存
            state.token = data.token;
            state.userInfo = {
                area: data.area,
                roleFlag: data.roleFlag,
                userUrl: data.userUrl,
                realname: data.realname,
            };
            state.config = {
                "pc-map-xx": data["pc-map-xx"],
                "pc-jd-ecard": data["pc-jd-ecard"],
                "pc-map-dataReport": data["pc-map-dataReport"],
            };
        },
        clearUserData(state: UserStoreState) {
            state.token = "";
            state.userInfo = {
                area: "",
                roleFlag: 0,
                userUrl: [],
                realname: ""
            };
            state.config = {
                "pc-map-xx": "OPERATION_REJECT",
                "pc-jd-ecard": "OPERATION_REJECT",
                "pc-map-dataReport": "OPERATION_REJECT",
            };
            Util.setItem("login-user-info", null);
        }
    }
};

export default {
    store,
};
