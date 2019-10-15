<template>
    <div class="scroll-area">
        <div :class="'scroll-control '+(componentData.disableLeft ? 'disable' : '')" :style="scrollAreaStyle">
            <i class="sys-icon-prevpage" @click="scrollLeft"></i>
        </div>
        <div class="scroll-content" ref="scrollContent">
            <slot></slot>
        </div>
        <div :class="'scroll-control ' + (componentData.disableRight ? 'disable' : '')" :style="scrollAreaStyle">
            <i class="sys-icon-nextpage" @click="scrollRight"></i>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Provide, Vue} from "vue-property-decorator";

    interface DataType {
        scrollContent: HTMLElement | null;
        disableLeft: boolean;
        disableRight: boolean;
        computedItemWidth: string;
    }

    export type ScrollType = "page" | "item";

    @Component<ScrollArea>({
        name: "xlb-scroll-area",
        mounted() {
            if (this.$refs.scrollContent instanceof HTMLElement) {
                this.componentData.scrollContent = this.$refs.scrollContent;
                this.componentData.computedItemWidth = this.getItemWidth();
            }
        },
    })
    export default class ScrollArea extends Vue {

        @Prop({type: [Number, String]})
        public itemWidth!: number | string;

        @Prop({type: Number})
        public perSize!: number;

        @Prop({type: [String, Number], default: "page"})
        public scrollType!: ScrollType | number;

        @Provide("scrollArea")
        private scrollArea: ScrollArea = this;

        private componentData: DataType = {
            scrollContent: null,
            disableLeft: false,
            disableRight: false,
            computedItemWidth: "0px",
        };

        private controlSize = 12;
        private scrollSize = 0;

        constructor(props: any) {
            super(props);
        }

        get scrollAreaStyle() {
            return "font-size:" + this.controlSize + "px;flex:0 0 " + this.controlSize + "px";
        }

        get maxScrollSize() {
            const $scrollContent = this.componentData.scrollContent;
            if (!$scrollContent) {
                return 0;
            }
            if (this.scrollType === "page") {
                return Math.ceil($scrollContent.scrollWidth / $scrollContent.offsetWidth) - 1; // 总页数
            } else if (this.scrollType === "item") {
                if (this.perSize) {
                    const slots = this.$slots.default;
                    if (slots) {
                        return slots.length - this.perSize; // 超出内容区个数
                    }
                }
                if (this.itemWidth) {
                    let width: number;
                    if (typeof this.itemWidth === "string") {
                        width = Number.parseInt(this.itemWidth.replace("px", ""), 10);
                    } else {
                        width = this.itemWidth;
                    }
                    return Math.ceil(($scrollContent.scrollWidth - $scrollContent.offsetWidth) / width); // 超出内容区个数
                }
                throw new Error("scroll type cannot be 'item', when there are no itemWidth or perSize ");
            } else {
                return Math.ceil(($scrollContent.scrollWidth - 300) / this.scrollType);
            }
        }

        private getItemWidth(): string {
            if (!this.componentData.scrollContent) {
                return "auto";
            }
            if (this.itemWidth) {
                if (typeof this.itemWidth === "string") {
                    return this.itemWidth;
                } else {
                    return this.itemWidth + "px";
                }
            }
            if (this.perSize) {// 每页N个，计算百分比
                const parent = this.componentData.scrollContent;
                const value = this.perSize;
                return Math.floor(parent.offsetWidth / value) + "px";
            }
            return "auto";
        }

        private getScrollWidth(scrollIndex: number): string {// scrollIndex，左侧滚动数
            if (!this.componentData.scrollContent) {
                return "auto";
            }
            if (this.scrollType === "page") {
                return (this.componentData.scrollContent.offsetWidth * scrollIndex) + "px";
            } else if (this.scrollType === "item") {
                if (this.perSize) {
                    if (scrollIndex === 0) {
                        return "0%";
                    } else {
                        return (100 / (this.perSize)) * scrollIndex + "%";
                    }
                }
                if (this.itemWidth) {
                    if (typeof this.itemWidth === "string") {
                        return Number.parseInt(this.itemWidth.replace("px", ""), 10) * scrollIndex + "px";
                    } else {
                        return (this.itemWidth * scrollIndex) + "px";
                    }
                }
                return "auto";
            } else {
                return this.scrollType * scrollIndex + "px";
            }
        }

        public scrollLeft() {
            if (this.scrollSize === 0) {
                return;
            }
            this.componentData.disableRight = false;
            this.scrollSize -= 1;
            if (this.scrollSize === 0) {
                this.componentData.disableLeft = true;
            }
            this.scroll();
        }

        public scrollRight() {
            if (this.scrollSize >= this.maxScrollSize) {
                return;
            }
            this.componentData.disableLeft = false;
            this.scrollSize += 1;
            if (this.scrollSize >= this.maxScrollSize) {
                this.componentData.disableRight = true;
            }
            this.scroll();
        }

        private scroll() {
            if (!this.componentData.scrollContent) {
                return;
            }
            const firstScrollItem = this.componentData.scrollContent.children.item(0);
            const scrollWidth = this.getScrollWidth(this.scrollSize * -1);
            if (firstScrollItem && firstScrollItem instanceof HTMLElement) {
                firstScrollItem.style.marginLeft = scrollWidth;
            }
        }

    }
</script>
