import {DirectiveOptions} from "vue";

function eventCompat(event: any): Event {
    const type = event.type;
    if (type === "DOMMouseScroll" || type === "mousewheel") {
        event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    }
    // alert(event.delta);
    if (event.srcElement && !event.target) {
        event.target = event.srcElement;
    }
    if (!event.preventDefault && event.returnValue !== undefined) {
        event.preventDefault = () => {
            event.returnValue = false;
        };
    }
    /*
       ......其他一些兼容性处理 */
    return event;
}


const addEvent = ((window: any, document: any) => {
    if (window.addEventListener) {
        return (el: HTMLElement, type: string, fn: (this: HTMLElement, event: any) => void, capture?: boolean) => {
            if (type === "mousewheel" && document.mozFullScreen !== undefined) {
                type = "DOMMouseScroll";
            }
            el.addEventListener(type, function(this: HTMLElement, event: any) {
                fn.call(this, eventCompat(event));
            }, capture || false);
        };
    } else if (window.attachEvent) {
        return (el: any, type: string, fn: (this: HTMLElement, event: any) => void, capture?: boolean) => {
            el.attachEvent("on" + type, function(this: HTMLElement, event: any) {
                event = event || window.event;
                fn.call(el, eventCompat(event));
            });
        };
    }
    return () => null;
})(window, document);

function scrollListener(this: HTMLElement, e: any): void {
    const elScrollTop = this.scrollTop;
    this.scrollTo(0, elScrollTop + e.delta * -120);
}

export default class MockScroll implements DirectiveOptions {
    public bind(el: HTMLElement) {
        el.style.overflow = "hidden";
        addEvent(el, "mousewheel", scrollListener);
    }
}
