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
      constructor() {
          this.state = {};
          this.models = {};
          this.reducers = {};
          this.effects = {};
          this.store = {};
          this.allReducers = {};
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
                  // 修改后的 state 必须是新的对象，这样才不会覆盖旧的 state，才可以修改生效
                  newState = { ...newState };
              }
              return newState;
          };
          // 创建 store
          this.store = redux.createStore(reducer);
          const { dispatch, getState } = this.store;
          // 给每个 model 的 effects 对象添加 dispatch、getState 方法
          Object.keys(this.effects).forEach(namespace => {
              this.effects[namespace].dispatch = ({ type, payload }) => 
              // 修改 action type，添加 namespace
              dispatch({ type: `${namespace}/${type}`, payload });
              this.effects[namespace].getState = getState;
          });
          return this.store;
      }
  }
  var store = new Root();

  var connect = (mapState, mapDispatch = {}, effectsArr = []) => {
      return (Component) => {
          const NewComponent = (props) => {
              const { effects, store: store$1 } = store;
              const { dispatch } = store$1;
              // 修改组件中 dispatch 触发 effects 中对应方法，而不是 reducer
              const myDispatch = ({ type, payload }) => {
                  const [typeId, typeName] = type.split('/');
                  const { effects, reducers } = store;
                  // 触发effects
                  if (effects[typeId] && effects[typeId][typeName]) {
                      return effects[typeId][typeName](payload);
                  }
                  // 触发reducers
                  if (reducers[typeId] && reducers[typeId][type]) {
                      dispatch({ type, payload });
                  }
              };
              const effectsProps = {};
              effectsArr.forEach(item => {
                  if (effects[item]) {
                      effectsProps[`${item}Effects`] = effects[item];
                      // dispatch增加属性直接触发effect，像dispatch.testEffects.getList使用
                      // @ts-ignore
                      myDispatch[`${item}Effects`] = effects[item];
                  }
              });
              return (
              // @ts-ignore
              React__default["default"].createElement(Component, { ...props, dispatch: myDispatch, ...effectsProps }));
          };
          return reactRedux.connect(mapState, mapDispatch)(NewComponent);
      };
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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
