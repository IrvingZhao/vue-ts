import {HorScrollBar, ScrollBar, VerScrollBar} from "./ScrollBar";

function getScrollbarWidth(): number {
    const e = document.createElement("div");
    let sw: number;
    e.style.position = "absolute";
    e.style.top = "-9999px";
    e.style.width = "100px";
    e.style.height = "100px";
    e.style.overflow = "scroll";
    e.style.msOverflowStyle = "scrollbar";
    document.body.appendChild(e);
    sw = (e.offsetWidth - e.clientWidth);
    document.body.removeChild(e);
    return sw;
}

function isIE(): boolean {
    const agent = navigator.userAgent.toLowerCase();
    return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
}

interface GeminiScrollbarConfig {
    element: HTMLElement;
    autoShow?: boolean;
    createElements?: boolean;
    forceGemini?: boolean;
    onResize?: () => void;
    minThumbSize?: number;
    offsetX?: number;
    offsetY?: number;
}

interface EventCache {
    scrollHandle?: (e: Event) => void;
}

class GeminiScroll {

    public SCROLLBAR_WIDTH: number = getScrollbarWidth();

    private element: HTMLElement;
    private autoShow: boolean;
    private createElements: boolean;
    private forceGemini: boolean;
    private onResize?: () => void;
    private minThumbSize: number;
    private offsetX: number;
    private offsetY: number;
    private DONT_CREATE_GEMINI: boolean = ((this.SCROLLBAR_WIDTH === 0) && this.forceGemini);

    // private cache = {events: {}};
    private eventCache: EventCache = {};
    private created: boolean = false;
    private cursorDown: boolean = false;

    private document: HTMLDocument = document;
    private viewElement: HTMLElement | null = null;
    private resizeTriggerElement: HTMLElement | null = null;

    private horizontalScrollBar?: ScrollBar;
    private verticalScrollbar?: ScrollBar;

    constructor(config: GeminiScrollbarConfig) {
        this.element = config.element;
        this.autoShow = config.autoShow || false;
        this.createElements = config.createElements !== false;
        this.forceGemini = config.forceGemini !== false;
        this.onResize = config.onResize;
        this.minThumbSize = config.minThumbSize === 0 ? 0 : config.minThumbSize || 20;
        this.offsetX = config.offsetX || 0;
        this.offsetY = config.offsetY || 0;
    }

    public create(this: GeminiScroll): GeminiScroll {
        if (this.created) {
            return this;
        }
        this.created = true;
        if (this.DONT_CREATE_GEMINI) {
            this.element.classList.add("gm-prevented");
            if (this.onResize) {
                // still need a resize trigger if we have an onResize callback, which
                // also means we need a separate _viewElement to do the scrolling.
                if (this.createElements) {
                    this.viewElement = document.createElement("div");
                    while (this.element.childNodes.length > 0) {
                        this.viewElement.appendChild(this.element.childNodes[0]);
                    }
                    this.element.appendChild(this.viewElement);
                } else {
                    this.viewElement = this.element.querySelector(".gm-scroll-view");
                }
                this.element.classList.add("gm-scrollbar-container");
                if (this.viewElement) {
                    this.viewElement.classList.add("gm-scroll-view");
                }

                this.createResizeTrigger();
            }
            return this;
        }
        if (this.autoShow) {
            this.element.classList.add("gm-autoshow");
        }
        if (this.createElements) {
            this.viewElement = document.createElement("div");
            this.horizontalScrollBar = new HorScrollBar(this.viewElement);
            this.verticalScrollbar = new VerScrollBar(this.viewElement);
            while (this.element.childNodes.length > 0) {
                this.viewElement.appendChild(this.element.childNodes[0]);
            }
            this.element.appendChild(this.horizontalScrollBar.barElement);
            this.element.appendChild(this.verticalScrollbar.barElement);
            this.element.appendChild(this.viewElement);
        } else {
            this.viewElement = this.element.querySelector(".gm-scroll-view");
            if (!this.viewElement) {
                throw new Error("Cannot find element with class \"gm-scroll-view\"");
            }
            const horBar: HTMLElement | null = this.element.querySelector(".gm-scrollbar.-horizontal");
            if (horBar) {
                const horThumb: HTMLElement | null = horBar.querySelector(".thumb");
                if (horThumb) {
                    if (this.horizontalScrollBar) {
                        this.horizontalScrollBar.bindEvent();
                    } else {
                        this.horizontalScrollBar = new HorScrollBar(this.viewElement, horBar, horThumb);
                    }
                }
            }
            const verBar: HTMLElement | null = this.element.querySelector(".gm-scrollbar.-vertical");
            if (verBar) {
                const verThumb: HTMLElement | null = verBar.querySelector(".thumb");
                if (verThumb) {
                    if (this.verticalScrollbar) {
                        this.verticalScrollbar.bindEvent();
                    } else {
                        this.verticalScrollbar = new VerScrollBar(this.viewElement, verBar, verThumb);
                    }
                }
            }
        }
        this.element.classList.add("gm-scrollbar-container");
        this.viewElement.classList.add("gm-scroll-view");

        this.createResizeTrigger();

        return this.bindEvents().update();
    }

    public update(this: GeminiScroll): GeminiScroll {
        if (this.DONT_CREATE_GEMINI) {
            return this;
        }

        if (!this.created) {
            // console.warn('calling on a not-yet-created object');
            return this;
        }
        if (!this.viewElement) {
            return this;
        }

        this.viewElement.style.width = ((this.element.offsetWidth + this.SCROLLBAR_WIDTH - this.offsetX).toString() + "px");
        this.viewElement.style.height = ((this.element.offsetHeight + this.SCROLLBAR_WIDTH - this.offsetY).toString() + "px");

        if (this.horizontalScrollBar) {
            this.horizontalScrollBar.update(this.minThumbSize);
        }
        if (this.verticalScrollbar) {
            this.verticalScrollbar.update(this.minThumbSize);
        }

        return this;
    }

    public bindEvents(this: GeminiScroll): GeminiScroll {
        const scrollHandle = this.eventCache.scrollHandle = this.scrollHandle.bind(this);

        if (this.viewElement) {
            this.viewElement.addEventListener("scroll", scrollHandle);
        }
        return this;
    }

    public destroy() {
        if (this.resizeTriggerElement) {
            this.element.removeChild(this.resizeTriggerElement);
            this.resizeTriggerElement = null;
        }
        if (this.DONT_CREATE_GEMINI || !this.created) {
            return;
        }
        if (!this.viewElement) {
            return;
        }
        this.element.classList.remove("gm-scrollbar-container", "gm-autoshow");
        const {scrollHandle} = this.eventCache;
        if (scrollHandle) {
            this.viewElement.removeEventListener("scroll", scrollHandle);
        }
        if (this.createElements) {
            if (this.horizontalScrollBar) {
                this.element.removeChild(this.horizontalScrollBar.barElement);
            }
            if (this.verticalScrollbar) {
                this.element.removeChild(this.verticalScrollbar.barElement);
            }
            while (this.viewElement.childNodes.length > 0) {
                this.element.appendChild(this.viewElement.childNodes[0]);
            }
            this.element.removeChild(this.viewElement);
        } else {
            this.viewElement.style.width = "";
            this.viewElement.style.height = "";
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.barElement.style.display = "none";
            }
            if (this.verticalScrollbar) {
                this.verticalScrollbar.barElement.style.display = "none";
            }
        }
        this.created = false;
    }

    private scrollHandle(this: GeminiScroll) {
        if (this.horizontalScrollBar) {
            this.horizontalScrollBar.scrollHandle();
        }
        if (this.verticalScrollbar) {
            this.verticalScrollbar.scrollHandle();
        }
    }

    private createResizeTrigger(this: GeminiScroll) {
        const obj = document.createElement("object");
        obj.classList.add("gm-resize-trigger");
        obj.type = "text/html";
        obj.setAttribute("tabindex", "-1");
        const resizeHandler: EventListenerOrEventListenerObject = this.resizeHandler.bind(this);
        obj.onload = () => {
            const win = obj.contentDocument ? obj.contentDocument.defaultView : null;
            if (win) {
                win.addEventListener("resize", resizeHandler);
            }
        };

        // IE: Does not like that this happens before, even if it is also added after.
        if (!isIE()) {
            obj.data = "about:blank";
        }

        this.element.appendChild(obj);

        // IE: This must occur after adding the object to the DOM.
        if (isIE()) {
            obj.data = "about:blank";
        }

        this.resizeTriggerElement = obj;
    }

    private resizeHandler(this: GeminiScroll): void {
        this.update();
        if (this.onResize) {
            this.onResize();
        }
    }
}

export {
    GeminiScroll,
    GeminiScrollbarConfig,
};
