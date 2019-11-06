import Vue from "vue";
// @ts-ignore
import App from "./app.vue";
import Plugin from "../src/plugin";

Vue.use(Plugin);
import "../src/plugin/style/index.scss";

new Vue({
    render(createElement) {
        return createElement(App);
    }
}).$mount("#app");
