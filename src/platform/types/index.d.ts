import {AxiosInstance} from "axios";
import {BreadOperator} from "./Bread";

export * from "./Bread";

declare module "vue/types/vue" {
    interface Vue {
        $axios: AxiosInstance;
        $bread: BreadOperator;
    }

    interface VueConstructor {
        $axios: AxiosInstance;
        $bread: BreadOperator;
    }
}
