import {VNodeDirective} from "vue";

export interface Resize extends VNodeDirective {
    name: "resize";
    value: typeof Function;
}
