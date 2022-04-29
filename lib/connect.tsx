import React, {ReactNode} from 'react';
import { connect } from 'react-redux';
import root from './redux';


export type MapState = (state:any) => object

export default (mapState:MapState, mapDispatch = {}, effectsArr = []) => {
  return (Component:ReactNode) => {

    const NewComponent = (props:any) => {
      const { effects, store } = root;
      const {dispatch} = store
      // 修改组件中 dispatch 触发 effects 中对应方法，而不是 reducer
      const myDispatch = ({ type, payload }:{type:string,payload?:any}) => {
        const [typeId, typeName] = type.split('/');
        const { effects, reducers } = root;
        // 触发effects
        if (effects[typeId] && effects[typeId][typeName]) {
          return effects[typeId][typeName](payload);
        }
        // 触发reducers
        if(reducers[typeId] && reducers[typeId][type]){
          dispatch({type,payload})
        }
      };

      const effectsProps:{[key:string]:any} = {};
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
        <Component {...props} dispatch={myDispatch} {...effectsProps} />
      )
    };

    return connect(mapState, mapDispatch)(NewComponent);
  };
};
