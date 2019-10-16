import {Vue} from "vue-property-decorator";
import {Route} from "vue-router";

export default abstract class RouterMethod extends Vue {
    public routerAppendTo(to: Route): Promise<Route> {
        const current = this.$route;
        const {location} = this.$router.resolve(to, current, true);
        return this.$router.push(location);
    }

    public routerPushTo(to: Route): Promise<Route> {
        return this.$router.push(to);
    }
}
