<template>
    <sub-menu-mock v-if="menuData.child && menuData.child.length > 0" :index="menuData.id+''" :route="menuData.page">
        <template slot="title">
            <i v-if="menuData.icon" :class="'sys-icon-'+menuData.icon"></i>
            <span class="menu-title">{{menuData.name}}</span>
        </template>
        <menu-item v-for="(childMenu,index) in menuData.child" :menu-data="childMenu" :key="index"></menu-item>
    </sub-menu-mock>
    <menu-item-mock :route="menuData.view" :index="menuData.id+''" v-else>
        <i v-if="menuData.icon" :class="'sys-icon-'+menuData.icon"></i>
        <span class="menu-title-text" slot="title">{{menuData.name}}</span>
    </menu-item-mock>
</template>

<script lang="ts">

    import MenuItemMock from "./MenuItemMock";
    import SubMenuMock from "./SubMenuMock";
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component<MenuItem>({
        name: "MenuItem",
        components: {MenuItemMock, SubMenuMock},
    })
    export default class MenuItem extends Vue {
        @Prop()
        public menuData!: any[];
    }
</script>
