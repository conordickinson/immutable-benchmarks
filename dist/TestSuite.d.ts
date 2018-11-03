export declare abstract class TestSuite {
    readonly useFreeze: boolean;
    constructor(useFreeze: boolean);
    init(initialObject: any): any;
    get(obj: any, key: any): any;
    abstract set(obj: any, key: any, val: any): any;
    getDeep(obj: any, key1: any, key2: any): any;
    abstract setDeep(obj: any, key1: any, key2: any, val: any): any;
    getIn(obj: any, path: Readonly<any[]>): any;
    abstract setIn(obj: any, path: any, val: any): any;
    abstract merge(obj1: any, obj2: any): any;
    initArr(initialArray: any): any;
    getAt(arr: Readonly<any[]>, idx: number): any;
    abstract setAt(arr: Readonly<any[]>, idx: number, val: any): any;
    getAtDeep(arr: Readonly<any[][]>, idx1: number, idx2: number): any;
    abstract setAtDeep(arr: Readonly<any[][]>, idx1: number, idx2: number, val: any): any;
}
