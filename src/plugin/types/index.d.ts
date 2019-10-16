import Vue from "vue";
import {XlbBasePage} from "./BasePage";
import {XlbScrollArea} from "./ScrollArea";
import {XlbScrollItem} from "./ScrollItem";
import {XlbTimesIterator} from "./TimesIterator";
import {LoadingBar} from "./LoadingBar";

export function install(vue: typeof Vue): void;

export class BasePage extends XlbBasePage {
}

export class ScrollArea extends XlbScrollArea {
}

export class ScrollItem extends XlbScrollItem {
}

export class TimesIterator extends XlbTimesIterator {
}


declare module "vue/types/vue" {
    interface Vue {
        $loadingBar: LoadingBar;
        $util: UtilInstance;
    }

    interface VueConstructor {
        $loadingBar: LoadingBar;
        $util: UtilInstance;
    }
}
