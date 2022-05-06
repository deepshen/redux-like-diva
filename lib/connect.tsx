import React from 'react';
import { connect } from 'react-redux';
import root from './redux';


export type MapState = (state:any) => object

export default (mapStateToProps:MapState, mapDispatch = {}, effectsArr = []) => {
  return (Component:any) => {
    const NewComponent = (props:any) => {
      const { effects, dispatch } = root;
      effectsArr.forEach(item => {
        if (effects[item]) {
          // @ts-ignore
          dispatch[`${item}`] = effects[item];
        }
      });
      return (
        <Component {...props} dispatch={dispatch} />
      )
    };

    return connect(mapStateToProps, mapDispatch)(NewComponent);
  };
};
