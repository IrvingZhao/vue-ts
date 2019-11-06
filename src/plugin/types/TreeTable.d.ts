import {CreateElement, VNode} from "vue";

export interface ColumnRenderConfig {
    label: string;
    index?: number;
    renderHeader: (h: CreateElement, config: RenderHeadConfig) => VNode;
    renderCell: (h: CreateElement, config: RenderCellConfig) => VNode;
}

export interface RenderCellConfig {
    row: any;
    rIndex: number;
    index: number;
    level: number;
    hasChildren: boolean;
    rowActive: boolean;
}

export interface RenderHeadConfig {
    label: string;
}

export interface TreeTableClass {

    normalIcon?: string;

    openIcon?: string;

    closeIcon?: string;

    addColumns(column: ColumnRenderConfig): void;

    tableBodyScroll(target: HTMLElement): void;

    pageResizeHandle(): void;

}

// export interface ItemColumn {
//     readerHeader: (createElement: CreateElement, column: ItemColumn) => VNode;
//     label: string;
//     renderCell: (createElement: CreateElement, columnConfig: ColumnRenderConfig) => VNode;
//     index?: number;
// }
//
// export interface ColumnRenderConfig {
//     column: ItemColumn;
//     row: any;
//     rowIndex: number;
//     level: number;
//     rowActive: boolean;
//     hasChildren: boolean;
// }
//
// export interface RenderCellConfig {
//
// }
