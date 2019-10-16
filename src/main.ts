import Vue from "vue";
import Plugin from "./plugin";
import Platform, {PlatformOption} from "./platform";
import ElementUI from "element-ui";
import Routes from "./routes";

import "./assets/iconfont.scss";
import "./assets/index.scss";

const platformOptions: PlatformOption = {
    loginAuth: false,
    pageAuth: false,
    operatorAuth: false
};

Vue.use(ElementUI);
Vue.use(Plugin);
Vue.use(Platform, platformOptions);

const vueConfig = Platform.getVueConfig(Routes);
new Vue(vueConfig).$mount("#app");
