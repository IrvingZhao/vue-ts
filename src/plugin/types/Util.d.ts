declare interface UtilInstance {
    setItem(key: string, value: any): void;

    getItem(key: string): any;

    clearStorage(): void;

    getSimpleDate(date: Date | number): string;

    getFullDate(date: Date | number): string;

    generateTree(data: any[], parentNodeKey: string, mapCache?: any, idKey?: string, parentKey?: string, childrenKey?: string): any[];

    getTreePath(data: any, fromId: string, pushId?: string, parentNode?: string): any[];

    setCurrentAndChildProp(current: any, propKey: string, propValue: any, childrenNode?: string): void;

    getCurrentAndChildProp(current: any, propKey: string, childrenNode?: string): void;

    dateFormat(date: Date | number, pattern: string): string;

}
