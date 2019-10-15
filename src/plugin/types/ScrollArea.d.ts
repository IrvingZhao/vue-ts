import {Vue} from "vue-property-decorator";

export type ScrollType = "page" | "item";

export declare class XlbScrollArea extends Vue {
    public itemWidth: string | number;
    public perSize: number;
    public scrollType: ScrollType | number;

    public scrollLeft(): void;

    public scrollRight(): void;
}
