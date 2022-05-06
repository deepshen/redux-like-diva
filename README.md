# use redux like dva

## 引入方式
```markdown
npm i redux-dva --save 或者
yarn add redux-dva -D

自己项目需要支持
react redux react-redux
```

## 配置方式 app主入口
```ecmascript 6
import store from 'redux-dva'
import {Provider} from 'react-redux'

import model from '自己的model配置如下'

const storeIns = store.init([model])

export default () => {
  
  return (
    <Provider store={storeIns}>
      route配置
    </Provider>
  )
}

```

## model配置，和dva差不多
```ecmascript 6
export default {
  namespace: 'test',
  state: {
    data: '1234'
  },
  effects: {
    async getData(payload,{select,put}){
      // select获取当前model的state，put调用当前model的effect和reducer
      const curretModelState = select()
      put({
        type: 'update',
        payload: ''
      })
      
      const allState = this.getState() // 获取store所有的state
      const {test} = allState
      console.log(test)
      // this.disaptch可以调用其他model的effect和reducer
      // 所有dispatch方法都会调用effect和reducer，所以最好不要重名，不然先effect，reducer不会调用
      this.dispatch({
        type: 'othernamespace/update',
        payload: {
          data: 'change'
        }
      })
    }
  },
  reducer: {
    update(payload,state){
      // payload传入参数，state是本model的state的值
      return {
        ...state,
        ...payload
      }
    }
  }
}
```

## 组件使用

```ecmascript 6
import React,{useEffect} from "react";
import {connect} from 'redux-dva'

const Com = (props) => {
    const {data,dispatch} = props
    useEffect(() => {
        // connect后的dispatch支持如下写法	
       // dispatch.test.getList({data:123}) 和下同效果
        dispatch({
          type: 'test/getList',
          payload: {
            data:'123'
          }
        })
    },[])
    return (
        <div>
            hello world
            {data}
        </div>
    )
}

export default connect(
  state => ({
    ...state.test
  })
)(Com)

// 也支持hooks写法  函数组件中
import {useDispatch,useModel} from 'redux-dva'

export default () => {
  const dispath = useDispatch()
  const data = useModel()  // 获取的是所有model的state
  const {test} = data
  return (
    <div>
      {test.xxx}
      hello world
    </div>
  )
}

```

