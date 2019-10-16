<template>
    <transition name="fade">
        <div :class="classes" :style="outerStyles" v-show="show">
            <div :class="innerClasses" :style="styles"></div>
        </div>
    </transition>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

const prefixCls = "ivu-loading-bar";

@Component<LoadingBar>({
    name: "XlbLoadingBar",
})
export default class LoadingBar extends Vue {

    get classes() {
        return `${prefixCls}`;
    }

    get innerClasses() {
        return [
            `${prefixCls}-inner`,
            {
                [`${prefixCls}-inner-color-primary`]: this.color === "primary" && this.status === "success",
                [`${prefixCls}-inner-failed-color-error`]: this.failedColor === "error" && this.status === "error"
            }
        ];
    }

    get outerStyles() {
        return {
            height: `${this.height}px`
        };
    }

    get styles() {
        const style = {
            width: `${this.percent}%`,
            height: `${this.height}px`,
            backgroundColor: "",
        };

        if (this.color !== "primary" && this.status === "success") {
            style.backgroundColor = this.color;
        }

        if (this.failedColor !== "error" && this.status === "error") {
            style.backgroundColor = this.failedColor;
        }

        return style;
    }

    public percent = 0;
    public status = "success";
    public show = false;

    @Prop({type: String, default: "primary"})
    private color!: string;

    @Prop({type: String, default: "error"})
    private failedColor!: string;

    @Prop({type: Number, default: 2})
    private height!: number;
}
</script>
