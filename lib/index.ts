import store from './redux'
import connect from './connect'

export default store

const useModel = () => {
  return store.store.getState()
}
const useDispatch = () => {
  const ins = store
  return ins.dispatch
}


// hooks写法

export {connect,useModel,useDispatch}

// use example
// import {Provide} from 'react-redux'
// import store from 'reduxLickDva'

// const store = store.init({model})   model和dva的model一致

// <Provider store={store}><App></Provider>

// 页面connect参考dva

// 本项目主应用不兼用改成mobx去处理下
