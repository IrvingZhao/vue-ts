import {Vue} from "vue-property-decorator";

declare interface LoadingBarProps {
    color: string;
    failedColor: string;
    height: number;
}

declare interface LoadingBarUpdate {
    percent?: number;
    status?: string;
    show?: boolean;
}

declare interface LoadingBarInstance {
    component: Vue;

    update(options: LoadingBarUpdate): void;

    destroy(): void;
}

declare interface LoadingBarOptions extends LoadingBarProps {
    duration: number;
}

declare interface LoadingBar {
    start(): void;

    update(percent: number): void;

    finish(): void;

    error(): void;

    config(options: LoadingBarOptions): void;

    destroy(): void;
}

declare module "vue/types/vue" {
    interface Vue {
        $loadingBar: LoadingBar;
    }

    interface VueConstructor {
        $loadingBar: LoadingBar;
    }
}
