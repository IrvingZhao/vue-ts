import VueRouter, {RawLocation, Route, RouteConfig} from "vue-router";
import {VueConstructor} from "vue";
import StoreConfig from "./StoreConfig";
import {Store} from "vuex";

const Login = () => import(/* webpackChunkName:'login' */ "@/platform/view/login/index.vue");
const MainPage = () => import(/* webpackChunkName:'main' */ "@/platform/view/main/index.vue");
const Page404 = () => import(/* webpackChunkName:'404' */ "@/platform/view/404.vue");

const baseRouterConfig: RouteConfig[] = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            auth: false,
        }
    }
];

const rootRouterBaseChild: RouteConfig[] = [
    {
        name: "main-404",
        path: "*",
        component: Page404,
        meta: {
            auth: false,
        }
    }
];

const rootRouterConfig: RouteConfig = {
    name: "root",
    path: "/",
    component: MainPage,
    children: []
};

function initRouter(routes: RouteConfig[]): VueRouter {
    const routerConfig = [...baseRouterConfig];
    routes.forEach((item) => {
        if (rootRouterConfig.children) {
            rootRouterConfig.children.push(item);
        }
    });
    // 追加默认路由信息，包括404、401等页面信息
    rootRouterBaseChild.forEach((item) => {
        if (rootRouterConfig.children) {
            rootRouterConfig.children.push(item);
        }
    });
    routerConfig.push(rootRouterConfig);
    return new VueRouter({
        mode: "hash",
        routes: routerConfig
    });
}

function loginCheckGuard(to: Route, from: Route, next: (to?: RawLocation) => void): void {
    if (userStore.token) { // token 存在时，访问登录页，自动跳转首页
        if (to.name === "login") {
            next("/"); // TODO 首页跳转逻辑
        } else {
            next();
        }
    } else {
        if (to.meta.auth !== false) {
            // store.commit("");
            next("/login");
        } else {
            next();
        }
    }
}

function loggerGuard(to: Route, from: Route, next: (to?: RawLocation) => void): void {
    console.info("======================== router - info ================");
    console.info(to);
    console.info(from);
    next();
}

let router: VueRouter;
let userStore: any;
let configStore: any;

function getRouter(routes: RouteConfig[] = []): VueRouter {
    if (!router) {
        router = initRouter(routes);
    }
    return router;
}

function setGuard() {
    if (process.env.NODE_ENV !== "production") {
        router.beforeEach(loggerGuard);
    }
    if (configStore.loginAuth) {
        router.beforeEach(loginCheckGuard);
    }
}

export default {
    getRouter,
    install(Vue: VueConstructor) {
        Vue.use(VueRouter);
        const store = StoreConfig.getStore();
        userStore = store.state.base_user;
        configStore = store.state.base_config;
    },
};
