import React, {ReactNode} from 'react';
import { connect } from 'react-redux';
import root from './redux';


export type MapState = (state:any) => object

export default (mapStateToProps:MapState, mapDispatch = {}, effectsArr = []) => {
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

      // const effectsProps:{[key:string]:any} = {};
      effectsArr.forEach(item => {
        if (effects[item]) {
          // 直接增加到组件props上,没必要，过多的增加了组件的无用属性
          // effectsProps[`${item}Effects`] = effects[item];
          // dispatch增加属性直接触发effect，像dispatch.testEffects.getList使用
          // @ts-ignore
          myDispatch[`${item}`] = effects[item];
        }
      });

      return (
        // @ts-ignore
        <Component {...props} dispatch={myDispatch} />
      )
    };

    return connect(mapStateToProps, mapDispatch)(NewComponent);
  };
};
