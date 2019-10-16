// tslint:disable:max-classes-per-file
import {Button} from "element-ui";
import {Component, Vue} from "vue-property-decorator";

@Component<AddButton>({
    name: "xlb-add-button",
    mixins: [Button],
    props: {
        type: {
            default: "primary"
        },
        icon: {
            default: "el-icon-plus"
        },
        round: {
            default: true
        }
    }
})
export class AddButton extends Vue {
}

@Component<EditButton>({
    name: "xlb-edit-button",
    mixins: [Button],
    props: {
        type: {
            default: "primary"
        },
        icon: {
            default: "el-icon-edit"
        },
        size: {
            default: "mini"
        },
        circle: {
            default: true
        }
    }
})
export class EditButton extends Vue {
}

@Component<DeleteButton>({
    name: "xlb-delete-button",
    mixins: [Button],
    props: {
        type: {
            default: "danger"
        },
        icon: {
            default: "el-icon-delete"
        },
        size: {
            default: "mini"
        },
        circle: {
            default: true
        }
    }
})
export class DeleteButton extends Vue {

}

@Component<CustomButton>({
    name: "xlb-custom-button",
    mixins: [Button],
    props: {
        type: {
            default: "custom"
        },
        size: {
            default: "mini"
        },
        round: {
            default: true
        }
    }
})
export class CustomButton extends Vue {

}
