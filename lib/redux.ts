import { createStore } from 'redux';


export type AddIns = (obj:object,name:string) => {[key:string]:any};
export interface Obj{
  [key:string]: any
}

export interface Model{
  namespace: string,
  state: {[key:string]:any},
  effects: {[key:string]:any},
  reducer:{[key:string]:any},
}
export interface Action{
  type: string,
  payload: any
}


const addNamespace:AddIns = (obj, name) => {
  const newObj:Obj = {};
  Object.keys(obj).forEach((item) => {
    // @ts-ignore
    newObj[`${name}/${item}`] = obj[item];
  });
  return newObj;
};

class Root {
  state: {[key:string]:any}
  models: {[key:string]:any}
  reducers: {[key:string]:any}
  effects: {[key:string]:any}
  store: any
  allReducers: {[key:string]:any}
  constructor() {
    this.state = {};
    this.models = {};
    this.reducers = {};
    this.effects = {};
    this.store = {};
    this.allReducers = {};
  }

  init(models:Model[]) {
    Object.values(models).forEach(item => {
      this.model(item);
    });

    return this.createStore();
  }

  // 加载模块 model 方法
  model(modelObj:Model) {
    const { state, reducer, effects, namespace } = modelObj;
    this.state[namespace] = state;
    this.models[namespace] = modelObj;

    const newReducer = addNamespace(reducer, namespace);
    this.reducers[namespace] = newReducer;
    this.allReducers = { ...this.allReducers, ...newReducer };

    this.effects[namespace] = effects;
  }

  createStore() {
    // 全部 state
    const allState = (this.store.getState && this.store.getState()) || this.state;

    // 合并 reducer
    const reducer = (state = allState, action:Action) => {
      let newState = state;

      const { type, payload } = action;
      const [namespace] = type.split('/');

      // 根据 namespace 获取对应 model 中 reducer 函数对象
      const currentState = newState[namespace];
      const currentReducer = this.reducers[namespace];
      // 如果 action 对应 reducer 存在，则根据函数修改 state，否则直接返回原 state
      if (currentReducer && currentReducer[type] && currentState) {
        newState[namespace] = currentReducer[type](payload, currentState);
        // 修改后的 state 必须是新的对象，这样才不会覆盖旧的 state，才可以修改生效
        newState = { ...newState };
      }

      return newState;
    };

    // 创建 store
    this.store = createStore(reducer);

    const { dispatch, getState } = this.store;

    // 给每个 model 的 effects 对象添加 dispatch、getState 方法
    Object.keys(this.effects).forEach(namespace => {
      // put方法只触发当前model的
      const put = ({ type, payload }:{type:string,payload:any}) => {
        const effects = this.effects[namespace]
        if(effects[type]){
          return effects[type](payload)
        }else {
          return dispatch({ type: `${namespace}/${type}`, payload });
        }
      }
      // 重写每个effects，添加新的属性进去
      Object.keys(this.effects[namespace]).forEach(item => {
        let fn = this.effects[namespace][item]
        this.effects[namespace][item] = function (payload:any){
          return fn.call(this,payload,{select: () => getState(),put})
          // return fn(payload,{select:() => getState()[namespace],put,})
        }
      })

      this.effects[namespace].dispatch = dispatch;
      this.effects[namespace].getState = getState;
    });

    return this.store;
  }
}

export default new Root();
