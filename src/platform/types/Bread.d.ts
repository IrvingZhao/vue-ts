export interface ItemBread {
    path?: string;
    click?: typeof Function;
    name: string;
}

export interface BreadOperator {
    set(breads: ItemBread[] | null): void;

    push(breads: ItemBread | ItemBread[]): void;

    clear(): void;

    splice(index: number): void;

    getBread(): ItemBread[];
}
