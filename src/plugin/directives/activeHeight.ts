import {DirectiveOptions, DirectiveBinding} from "vue/types/options";

function childActiveHandle(this: HTMLElement, e: any) {
    this.style.height = (this.offsetHeight + e.changeHeight) + "px";
}

function getTransactionEnd(data: any) {
    return function(this: HTMLElement) {
        if (data.active) {
            this.style.height = "auto";
        } else {
            if (data.remove) {
                this.remove();
            }
        }
    };
}

function append(nextNode: HTMLElement, curNode: HTMLElement, parentNode: HTMLElement) {
    if (nextNode) {
        nextNode.insertBefore(curNode, parentNode);
    } else {
        parentNode.appendChild(curNode);
    }
}

function changeHeight(el: HTMLElement, data: any) {
    if (data.transiction !== undefined && data.noTransictionClass !== undefined) {
        if (data.transiction) {
            el.classList.remove(data.noTransictionClass);
        } else {
            el.classList.add(data.noTransictionClass);
        }
    }
    if (data.active) {
        if (data.remove) {
            append(data.nextNode, el, data.parentNode);
        }
        el.style.height = el.scrollHeight + "px";
    } else {
        el.style.height = el.scrollHeight + "px";
        setTimeout(() => {
            el.style.height = 0 + "px";
        }, 0);
    }
}

const transitionEventArray = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd".split(" ");

export default class ActiveHeight implements DirectiveOptions {
    public bind(el: HTMLElement, binding: DirectiveBinding): void {
        el.addEventListener("active-height", childActiveHandle);
        transitionEventArray.forEach((item) => {
            el.addEventListener(item, getTransactionEnd(binding.value), true);
        });
    }

    public inserted(el: HTMLElement, binding: DirectiveBinding): void {
        const data = binding.value;
        data.nextNode = el.nextSibling;
        data.parentNode = el.parentNode;
        changeHeight(el, data);
    }

    public update(el: HTMLElement, binding: DirectiveBinding) {
        const data = binding.value;
        changeHeight(el, data);
    }
}
