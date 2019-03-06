export interface IListElement {
    visited: boolean;
    value: string;
    position: number;
}

export interface ILinkedList {
    setFirstElement(firstElement: string): void;
    next(): string | null;
}

export default class LinkedList {

    private list: IListElement[];
    private current: IListElement;

    constructor(list: string[]) {
        this.list = list.map((elem, i) => ({
            position: i,
            value: elem,
            visited: false,
        }));
        this.current = this.list[0];
    }

    public setFirstElement(firstElement: string): void {
        this.current = this.list.find(({value}) => value === firstElement) || this.current;
    }

    public next(): string|null {

        this.current.visited = true;
        const nextIndex: number = this.current.position + 1;

        if (nextIndex < this.list.length && !this.list[nextIndex].visited) {
            this.current = this.list[nextIndex];
            return this.current.value;
        }

        if (!this.list[0].visited) {
            this.current = this.list[0];
            return this.current.value;
        }

        return null;
    }

}
