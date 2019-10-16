// tslint:disable:max-classes-per-file

abstract class ScrollBar {
    public barElement: HTMLElement;
    public thumbElement: HTMLElement;
    public naturalThumbSize: number;
    public thumbSize: number;
    public scrollMax: number;
    public trackMax: number;
    public prevPage: number;

    protected viewElement: HTMLElement;

    protected cursorDown = false;
    private readonly barMouseDownHandleCache: (e: MouseEvent) => void;
    private readonly thumbMouseDownHandleCache: (e: MouseEvent) => void;
    private readonly mouseMoveHandleCache: (e: MouseEvent) => void;
    private readonly mouseUpHandleCache: (e: MouseEvent) => void;

    public constructor(viewElement: HTMLElement, barElement?: HTMLElement, thumbElement?: HTMLElement) {
        if (!barElement || !thumbElement) {
            barElement = document.createElement("div");
            thumbElement = document.createElement("div");

            const barClass = this.barClasses();
            barElement.classList.add.apply(barElement.classList, barClass);
            thumbElement.classList.add("thumb");

            barElement.append(thumbElement);
        }
        this.viewElement = viewElement;
        this.barElement = barElement;
        this.thumbElement = thumbElement;
        this.naturalThumbSize = 0;
        this.thumbSize = 0;
        this.scrollMax = 300;
        this.trackMax = 0;
        this.prevPage = 0;

        this.barMouseDownHandleCache = this.trackHandle.bind(this);
        this.mouseMoveHandleCache = this.documentMoveHandle.bind(this);
        this.mouseUpHandleCache = this.thumbMouseUpHandle.bind(this);
        this.thumbMouseDownHandleCache = this.thumbMouseDownHandle.bind(this);

        this.bindEvent();
        // document.addEventListener('mouseup', this.thumbMouseUpHandle.bind(this));
    }

    public abstract update(minThumbSize: number): ScrollBar;

    public abstract scrollHandle(this: ScrollBar): void;

    public bindEvent() {
        this.barElement.addEventListener("mousedown", this.barMouseDownHandleCache);
        this.thumbElement.addEventListener("mousedown", this.thumbMouseDownHandleCache);
    }

    public destroy() {
        this.barElement.removeEventListener("mousedown", this.barMouseDownHandleCache);
        this.thumbElement.removeEventListener("mousedown", this.thumbMouseDownHandleCache);
    }

    protected abstract barClasses(): string[];

    protected abstract trackHandle(e: MouseEvent): any;

    protected abstract thumbMouseDownHandle(e: MouseEvent): any;

    protected abstract documentMoveHandle(e: MouseEvent): any;

    protected startDrag() {
        this.cursorDown = true;
        document.body.classList.add("gm-scrollbar-disable-selection");
        document.addEventListener("mousemove", this.mouseMoveHandleCache);
        document.addEventListener("mouseup", this.mouseUpHandleCache);
        document.onselectstart = () => false;
    }

    private thumbMouseUpHandle(): any {
        this.cursorDown = false;
        this.prevPage = 0;
        document.body.classList.remove("gm-scrollbar-disable-selection");
        document.removeEventListener("mousemove", this.mouseMoveHandleCache);
        document.removeEventListener("mouseup", this.mouseUpHandleCache);
        document.onselectstart = null;
    }

}


class HorScrollBar extends ScrollBar {

    public scrollHandle(this: HorScrollBar): void {
        const pos = (this.viewElement.scrollLeft * this.trackMax / this.scrollMax) || 0;
        this.thumbElement.style.transform = "translate3d(" + pos + "px, 0, 0)";
    }

    public update(this: HorScrollBar, minThumbSize: number): ScrollBar {
        this.scrollMax = this.viewElement.scrollWidth - this.viewElement.clientWidth;
        this.naturalThumbSize = this.barElement.clientWidth / this.viewElement.scrollWidth * this.barElement.clientWidth;
        if (this.naturalThumbSize < minThumbSize) {
            this.thumbElement.style.width = minThumbSize + "px";
        } else if (this.scrollMax) {
            this.thumbElement.style.width = this.naturalThumbSize + "px";
        } else {
            this.thumbElement.style.width = "0px"; // TODO 隐藏滚动条区域  调节 overflow
        }
        this.thumbSize = this.thumbElement.clientWidth;
        this.trackMax = this.barElement.clientWidth - this.thumbSize;
        this.scrollHandle();
        return this;
    }

    protected barClasses(): string[] {
        return ["gm-scrollbar", "-horizontal"];
    }

    protected trackHandle(e: MouseEvent) {
        if (e.target !== e.currentTarget) {
            return;
        }
        const offset = e.offsetX - this.naturalThumbSize * .5;
        const thumbPositionPercentage = offset * 100 / this.barElement.clientWidth;

        this.viewElement.scrollLeft = thumbPositionPercentage * this.viewElement.scrollWidth / 100;
    }

    protected thumbMouseDownHandle(e: MouseEvent): any {
        this.prevPage = this.thumbSize - e.offsetX;
        this.startDrag();
    }

    protected documentMoveHandle(e: MouseEvent): any {
        if (!this.cursorDown) {
            return;
        }
        if (this.prevPage) {
            const offset = e.clientX - this.barElement.getBoundingClientRect().left;
            const thumbClickPosition = this.thumbSize - this.prevPage;

            this.viewElement.scrollLeft = this.scrollMax * (offset - thumbClickPosition) / this.trackMax;
        }
    }
}

class VerScrollBar extends ScrollBar {

    public scrollHandle(): void {
        const pos = (this.viewElement.scrollTop * this.trackMax / this.scrollMax) || 0;
        this.thumbElement.style.transform = "translate3d(0, " + pos + "px, 0)";
    }

    public update(minThumbSize: number): ScrollBar {
        this.scrollMax = this.viewElement.scrollHeight - this.viewElement.clientHeight;
        this.naturalThumbSize = this.barElement.clientHeight / this.viewElement.scrollHeight * this.barElement.clientHeight;
        if (this.naturalThumbSize < minThumbSize) {
            this.thumbElement.style.height = minThumbSize + "px";
        } else if (this.scrollMax) {
            this.thumbElement.style.height = this.naturalThumbSize + "px";
        } else {
            this.thumbElement.style.height = "0px"; // TODO 隐藏滚动条区域   调节 overflow 属性
        }
        this.thumbSize = this.thumbElement.clientHeight;
        this.trackMax = this.barElement.clientHeight - this.thumbSize;
        this.scrollHandle();
        return this;
    }

    protected barClasses(): string[] {
        return ["gm-scrollbar", "-vertical"];
    }

    protected trackHandle(this: VerScrollBar, e: MouseEvent) {
        if (e.target !== e.currentTarget) {
            return;
        }
        const offset = e.offsetY - this.naturalThumbSize * .5;
        const thumbPositionPercentage = offset * 100 / this.barElement.clientHeight;

        this.viewElement.scrollTop = thumbPositionPercentage * this.viewElement.scrollHeight / 100;
    }

    protected thumbMouseDownHandle(e: MouseEvent): any {
        this.prevPage = this.thumbSize - e.offsetY;
        this.startDrag();
    }

    protected documentMoveHandle(e: MouseEvent): any {
        if (!this.cursorDown) {
            return;
        }
        if (this.prevPage) {
            const offset = e.clientY - this.barElement.getBoundingClientRect().top;
            const thumbClickPosition = this.thumbSize - this.prevPage;

            this.viewElement.scrollTop = this.scrollMax * (offset - thumbClickPosition) / this.trackMax;
        }
    }

}

export {
    ScrollBar,
    HorScrollBar,
    VerScrollBar,
};
