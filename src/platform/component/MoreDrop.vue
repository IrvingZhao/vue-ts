<template>
    <el-dropdown style="margin-left: 15px" @command="dropCommand" v-if="dropVisible">
        <el-button size="mini" type="custom" circle icon="el-icon-more"></el-button>
        <el-dropdown-menu slot="dropdown">
            <xlb-operator-auth>
                <el-dropdown-item v-for="item in data" :command="item" :slot="item.name" :key="item.name">
                    {{item.text}}
                </el-dropdown-item>
            </xlb-operator-auth>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {namespace} from "vuex-class";
    import {RouterMethod} from "@/platform/base";

    const ConfigStore = namespace("base_config");

    declare interface ItemDrop {
        name: string;
        text: string;
        path?: string;
        event?: string;
    }

    @Component<MoreDrop>({
        name: "xlb-more-drop",
    })
    export default class MoreDrop extends RouterMethod {
        @Prop({type: Object})
        private data: ItemDrop[] | undefined;

        @ConfigStore.State("operatorAuth")
        private operatorAuth!: boolean;

        get dropVisible(): boolean {
            if (!this.data || this.data.length === 0) { // 无数据时，取消下拉菜单展开
                return false;
            }
            if (!this.operatorAuth) {
                return true;
            }
            // 后续补充按钮权限信息 当下拉菜单中无 可用菜单时，下拉菜单取消展开
            return true;
        }

        public dropCommand(command: ItemDrop): void {
            if (command.path) {
                this.routerAppendTo(command.path);
            } else if (command.event) {
                this.$emit(command.event, command);
            }
        }

    }

</script>

<style scoped>

</style>
