import {Vue} from "vue-property-decorator";
import {RawLocation, Route} from "vue-router";

export default abstract class RouterMethod extends Vue {
    public routerAppendTo(to: RawLocation): Promise<Route> {
        const current = this.$route;
        const {location} = this.$router.resolve(to, current, true);
        return this.$router.push(location);
    }

    public routerPushTo(to: RawLocation): Promise<Route> {
        return this.$router.push(to);
    }
}
