<template>
    <div class="page-content">
        <div class="page-head">
            <div class="head-left">
                <div class="page-title">
                    <slot name="title"></slot>
                </div>
                <div class="search-area">
                    <slot name="searchForm"></slot>
                </div>
            </div>
            <div class="tool-area">
                <slot name="tools"></slot>
            </div>
        </div>
        <div class="page-content" v-resize="heightChange">
            <slot name="content"></slot>
        </div>
        <div class="page-footer">
            <slot name="footer"></slot>
        </div>
        <div class="not-visible-area">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";

    @Component({
        name: "xlb-base-page",
    })
    export default class BasePage extends Vue {
        @Prop({type: Number})
        private pageContentHeight: number | undefined;

        get mountHeight() {
            return this.pageContentHeight;
        }

        set mountHeight(val) {
            this.$emit("update:pageContentHeight", val);
        }

        private activated() {
            this.heightChange();
        }

        private mounted() {
            this.heightChange();
        }

        private heightChange() {
            const tableContent = this.$refs.tableContent;
            if (tableContent instanceof HTMLElement) {
                this.$emit("update:pageContentHeight", tableContent.offsetHeight);
                this.mountHeight = tableContent.offsetHeight;
            }
        }
    }
</script>
