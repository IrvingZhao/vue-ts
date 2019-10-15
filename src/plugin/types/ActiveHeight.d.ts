import {VNodeDirective} from "vue";

export interface ActiveHeight extends VNodeDirective {
    name: "active-height";
    value: typeof Function;
}
