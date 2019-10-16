import {Vue} from "vue-property-decorator";

declare interface LoadingBarProps {
    /**
     * 成功颜色
     * */
    color: string;
    /**
     * 失败颜色
     * */
    failedColor: string;
    /**
     * 高度
     * */
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
    /**
     * 加载条 关闭时的延迟时间
     * */
    duration: number;
}

declare interface LoadingBar {
    /**
     * 加载条开始
     * */
    start(): void;

    /**
     * 加载条设置百分比
     * @param percent 百分比数值
     * */
    update(percent: number): void;

    /**
     * 加载条正确结束
     * */
    finish(): void;

    /**
     * 加载条错误结束
     * */
    error(): void;

    /**
     * 加载条配置
     * @param options 配置项
     * */
    config(options: LoadingBarOptions): void;

    /**
     * 加载条销毁
     * */
    destroy(): void;
}

