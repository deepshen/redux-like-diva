(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('redux'), require('react'), require('react-redux')) :
  typeof define === 'function' && define.amd ? define(['exports', 'redux', 'react', 'react-redux'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.reduxDva = {}, global.redux, global.React, global.reactRedux));
})(this, (function (exports, redux, React, reactRedux) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  const addNamespace = (obj, name) => {
      const newObj = {};
      Object.keys(obj).forEach((item) => {
          // @ts-ignore
          newObj[`${name}/${item}`] = obj[item];
      });
      return newObj;
  };
  class Root {
      state;
      models;
      reducers;
      effects;
      store;
      allReducers;
      dispatch;
      constructor() {
          this.state = {};
          this.models = {};
          this.reducers = {};
          this.effects = {};
          this.store = {};
          this.allReducers = {};
          this.dispatch = () => { };
      }
      init(models) {
          Object.values(models).forEach(item => {
              this.model(item);
          });
          return this.createStore();
      }
      // 加载模块 model 方法
      model(modelObj) {
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
          const reducer = (state = allState, action) => {
              let newState = state;
              const { type, payload } = action;
              const [namespace] = type.split('/');
              // 根据 namespace 获取对应 model 中 reducer 函数对象
              const currentState = newState[namespace];
              const currentReducer = this.reducers[namespace];
              // 如果 action 对应 reducer 存在，则根据函数修改 state，否则直接返回原 state
              if (currentReducer && currentReducer[type] && currentState) {
                  newState[namespace] = currentReducer[type](payload, currentState);
                  newState = { ...newState };
              }
              return newState;
          };
          // 创建 store
          this.store = redux.createStore(reducer);
          const { dispatch, getState } = this.store;
          // 统一处理dispatch
          this.dispatch = ({ type, payload }) => {
              const [name, fnName] = type.split('/');
              if (this.effects[name] && this.effects[name][fnName]) {
                  return this.effects[name][fnName](payload);
              }
              else {
                  return dispatch({ type, payload });
              }
          };
          // 给每个 model 的 effects 对象添加 dispatch、getState 方法
          Object.keys(this.effects).forEach(namespace => {
              // put方法只触发当前model的
              const put = ({ type, payload }) => {
                  return this.dispatch({ type: `${namespace}/${type}`, payload });
              };
              // 重写每个effects，添加新的属性进去
              Object.keys(this.effects[namespace]).forEach(item => {
                  let fn = this.effects[namespace][item];
                  this.effects[namespace][item] = function (payload) {
                      return fn.call(this, payload, { select: () => getState()[namespace], put });
                      // return fn(payload,{select:() => getState()[namespace],put,})
                  };
              });
              // 获取全量的方法
              this.effects[namespace].dispatch = this.dispatch;
              // this.effects[namespace].dispatch = ({type,payload}:{type:string,payload:any}) => {
              //   const [name,fnName]:string[] = type.split('/');
              //   if(this.effects[name] && this.effects[name][fnName]){
              //     return this.effects[name][fnName](payload)
              //   }
              //   return dispatch
              // }
              this.effects[namespace].getState = getState;
          });
          return this.store;
      }
  }
  var store = new Root();

  var connect = (mapStateToProps, mapDispatch = {}, effectsArr = []) => {
      return (Component) => {
          const NewComponent = (props) => {
              const { effects, dispatch } = store;
              // const {dispatch} = store
              // 修改组件中 dispatch 触发 effects 中对应方法，而不是 reducer
              // const myDispatch = ({ type, payload }:{type:string,payload?:any}) => {
              //   const [typeId, typeName] = type.split('/');
              //   const { effects, reducers } = root;
              //   // 触发effects
              //   if (effects[typeId] && effects[typeId][typeName]) {
              //     return effects[typeId][typeName](payload);
              //   }
              //   // 触发reducers
              //   if(reducers[typeId] && reducers[typeId][type]){
              //     dispatch({type,payload})
              //   }
              // };
              // const effectsProps:{[key:string]:any} = {};
              effectsArr.forEach(item => {
                  if (effects[item]) {
                      // 直接增加到组件props上,没必要，过多的增加了组件的无用属性
                      // effectsProps[`${item}Effects`] = effects[item];
                      // dispatch增加属性直接触发effect，像dispatch.testEffects.getList使用
                      // @ts-ignore
                      dispatch[`${item}`] = effects[item];
                  }
              });
              return (React__default["default"].createElement(Component, { ...props, dispatch: dispatch }));
          };
          return reactRedux.connect(mapStateToProps, mapDispatch)(NewComponent);
      };
  };

  const useModel = () => {
      return store.store.getState();
  };
  const useDispatch = () => {
      const ins = store;
      return ins.dispatch;
  };
  // use example
  // import {Provide} from 'react-redux'
  // import store from 'reduxLickDva'
  // const store = store.init({model})   model和dva的model一致
  // <Provider store={store}><App></Provider>
  // 页面connect参考dva
  // 本项目主应用不兼用改成mobx去处理下

  exports.connect = connect;
  exports["default"] = store;
  exports.useDispatch = useDispatch;
  exports.useModel = useModel;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
