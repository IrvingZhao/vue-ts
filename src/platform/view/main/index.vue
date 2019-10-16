<template>
    <el-container class="pj-main">
        <el-aside class="aside" :class="{'layout-hide-text': isCollapse}" :width="isCollapse?'64px':'135px'">
            <div class="aside-title">
                <img v-if="!isCollapse" src="./asset/logo-all.png" class="logo-title big-logo">
                <img v-else="!isCollapse" src="./asset/logo-small.png" class="logo-title small-logo">
            </div>
            <el-menu class="aside-menu" v-mock-scroll="" :collapse="isCollapse"
                     :collapse-transition="false" @select="menuSelect" :unique-opened="true">
                <menu-item :menu-data="item" v-for="(item,index) in menuTreeList" :key="index"></menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="main-header" height="54px">
                <div class="menu-collapse">
                    <span class="sys-icon-menu" @click="toggleMenu"></span>
                </div>
                <div class="bread-nav">
                    <template v-for="(item,index) in breadList">
                        <span class="bread-split" v-if="index!==0">/</span>
                        <span :class="{'bread-item':true,'point':item.path||item.click}"
                              @click="breadClick(item,index)">{{item.name}}</span>
                    </template>
                </div>
                <div class="head-split"></div>
                <div class="user-info">
                    <div class="company-name">{{userInfo.userUrl.join("/")}}</div>
                    <div class="user-icon">
                        <img src=""/>
                    </div>
                    <div class="real-name">{{userInfo.realname}}</div>
                    <div class="split"></div>
                    <div class="exit" @click="logout">退出</div>
                </div>
            </el-header>
            <el-main class="page-content-main">
                <div v-if="renderNoAuth">页面无权限</div>
                <router-view v-else></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import MenuItem from "./component/MenuItem.vue";
import {ItemBread} from "@/platform/types";

const MenuStore = namespace("base_menu");
const SystemStore = namespace("base_system");
const UserStore = namespace("base_user");
const BreadStore = namespace("base_bread");

@Component<MainPage>({
    components: {MenuItem},
    mounted() {
        this.$bread.set([{name: "首页"}]);
        this.initUserAuth();
    }
})
export default class MainPage extends Vue {
    @MenuStore.Action("initUserAuth") public initUserAuth: any;

    @MenuStore.State("menuTree") public menuTreeList: any;
    @MenuStore.State("menuMap") public menuMap: any;

    @SystemStore.State("renderNoAuth") public renderNoAuth!: boolean;

    @UserStore.State("userInfo") public userInfo: any;

    @UserStore.Mutation("clearUserData") public clearUserData: any;

    @BreadStore.State("breadNav") public breadList?: ItemBread[];

    private isCollapse = false;

    private scrollBarParam = {
        createElements: false,
    };

    private breadClick(item: ItemBread, index: number) {
        if (item.path) {
            this.$router.push(item.path);
        } else if (item.click) {
            item.click();
            this.$bread.splice(index + 1);
        }
    }

    private toggleMenu() {
        this.isCollapse = !this.isCollapse;
    }

    private menuSelect(menuIndex: any, menuIndexTree: any, component: any) {
        console.info(menuIndexTree);
        menuIndexTree.forEach((item: any) => {
            console.info(this.menuMap[item]);
        });
        if (component.route) {
            this.$router.push(component.route); // 页面跳转
        }
    }

    private logout() {
        this.clearUserData(); // 清空 登录信息
        this.$router.push("/login");
    }
}
</script>

<style lang="scss" src="./css/main.scss">

</style>
