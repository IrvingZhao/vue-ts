import {MutationTree} from "vuex";

export interface PageInfo {
    pageIndex: number;
    pageSize: number;
    total: number;
}

export interface PageStateInterface {
    pageInfo: PageInfo;
    query: { [key: string]: any };
}

export interface PageMutationInterface<S extends PageStateInterface> extends MutationTree<S> {
    updatePageIndex(state: S, pageIndex: number): void;

    updatePageSize(state: S, pageSize: number): void;

    updateQuery(state: S, query: { [key: string]: any }): void;
}

const PageStates: PageStateInterface = {
    pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
    },
    query: {},
};

const PageMutations: PageMutationInterface<PageStateInterface> = {
    updatePageIndex(state: PageStateInterface, pageIndex: number): void {
        state.pageInfo.pageIndex = pageIndex;
    },
    updatePageSize(state: PageStateInterface, pageSize: number): void {
        state.pageInfo.pageSize = pageSize;
    },
    updateQuery(state: PageStateInterface, query: { [p: string]: any }): void {
        state.query = query;
    }
};

export {
    PageStates, PageMutations
};
