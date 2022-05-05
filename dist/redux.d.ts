export declare type AddIns = (obj: object, name: string) => {
    [key: string]: any;
};
export interface Obj {
    [key: string]: any;
}
export interface Model {
    namespace: string;
    state: {
        [key: string]: any;
    };
    effects: {
        [key: string]: any;
    };
    reducer: {
        [key: string]: any;
    };
}
export interface Action {
    type: string;
    payload: any;
}
export interface Dispatch {
    type: string;
    payload?: any;
}
declare class Root {
    state: {
        [key: string]: any;
    };
    models: {
        [key: string]: any;
    };
    reducers: {
        [key: string]: any;
    };
    effects: {
        [key: string]: any;
    };
    store: any;
    allReducers: {
        [key: string]: any;
    };
    dispatch: (val: Dispatch) => void;
    constructor();
    init(models: Model[]): any;
    model(modelObj: Model): void;
    createStore(): any;
}
declare const _default: Root;
export default _default;
