import {Route} from "vue-router";

const page = import(/* webpackChunkName:'template/index '*/ "./page.vue");
// webpackChunkName 中，template 替换为 所开发模块对应的目录

const route: Route[] = [
    // 编写路由信息
    // 路由中的各个配置的path属性，禁止以 / 开头
];

// 导出 路由配置信息 以及 路由对应页面
// 一级目录 有 外层 模块分配
export default {
    page, route
};
