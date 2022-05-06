import store from './redux'
import connect from './connect'
import { useState} from "react";

export default store


const useModel = () => {
  const initState = store.state
  const [result,setResult] = useState(initState)
  store.proxy = new Proxy(store.state,{
    set(target: { [p: string]: any }, p: string | symbol, value: any, receiver: any): boolean {
      setResult({...target})
      return true
    }
  })
  return result
}

const useDispatch = () => {
  const ins = store
  return ins.dispatch
}




export {connect,useDispatch, useModel}

