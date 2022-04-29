import {createContext, useContext} from 'react'
import store from './redux'
import connect from './connect'


export default store


// hooks写法
class StoreHook{
  store={}
  init(arr:any[]){
    const ins = store.init(arr)
    this.store = ins
  }
}
const StoreIns = new StoreHook()
// @ts-ignore
const context = createContext(StoreIns)
const useStore = () => {
  const store = useContext(context)
  return store
}
const useState = () => {
  const store = useStore().store
  // @ts-ignore
  const state = store.getState()
  return state
}
const useDispatch = () => {
  const store = useStore().store
  // @ts-ignore
  return store.dispatch
}


export {connect, StoreIns, useStore, useState, useDispatch}

// use example
// import {Provide} from 'react-redux'
// import store from 'reduxLickDva'

// const store = store.init({model})   model和dva的model一致

// <Provider store={store}><App></Provider>

// 页面connect参考dva

// 本项目主应用不兼用改成mobx去处理下
