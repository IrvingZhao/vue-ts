<template>
    <div class="scroll-item" v-item-width="scrollArea.componentData.computedItemWidth">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Inject, Vue} from "vue-property-decorator";
    import ScrollArea from "@/plugin/component/scrollArea/index.vue";

    @Component<ScrollItem>({
        name: "xlb-scroll-item",
        created() {
            if (!this.scrollArea) {
                throw new Error("scroll-item must be child of scroll-area");
            }
        },
        directives: {
            itemWidth: {
                componentUpdated(el, binding) {
                    el.style.flex = "0 0 " + binding.value;
                },
            }
        }
    })
    export default class ScrollItem extends Vue {
        @Inject("scrollArea")
        public scrollArea!: ScrollArea;
    }
</script>
