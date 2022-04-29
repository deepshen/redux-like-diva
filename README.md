# use mobx like dva

## 引入方式
```markdown
npm install mobx-like-dva --save  或者
yarn add mobx-like-dva -D

and

npm i mobx mobx-react --save
```

## 使用方式

### 配置store
```ecmascript 6
import Store from 'mobx-like-dva'

import model1 from 'model1'

const store = new Store()
store.init([model1])

export default store
```
### 配置model
```ecmascript 6
export default {
  namespace: 'test',
  state: {
	name: 'mobx'	
  },
  effects: {
    async fn(payload={},{update,get,dispatch}){
      const {name} = payload
      // 异步方法 如请求
      // const data = await fetch(url)
      update({
        name: 'test', // model的namespace
        payload: {
          name: name			
        }
      })   
    }		
  }
}
```
### 组件使用
```ecmascript 6
// 类组件
import React from 'react'
import store from 'store'
import {observer} from 'mobx-react'

@observer
class Text extends React.Component{
  
	
  handleChange = () => {
     const {update,dispatch} = store
    // 直接改变
    update({
      name: 'test',
      payload: {
        name: 'change text'
      }
    })
    // 调用model中effects改变
    dispatch({
      type: 'test/fn',
      payload: {
         name: 'change text'
      }
    })
  }	
  render() {
    const state = store.getState('test')
    const {name} = state
    return (
      <div>
        {name}
        <button onClick={this.handleChange}>改变name</button>
      </div>			
    )  
  }
}


// 函数组件
const FnComponent = () => {
  // 用法和上述一样了	
  return (
    <div>hello world</div>
  )
}
export default observer(FnComponent)

```
## 实例属性 storeIns
| 属性名称     | 解析说明          | 类型                                         | 举例                                                    |  
|----------|---------------|--------------------------------------------|-------------------------------------------------------|   
| init     | 加载model       | model[]                                    | store.init([model1,model2])                           |
| getState | 获取store的state | (name?:string) => ({})                     | const data = store.getState('test')                   |
| update   | 更新state值      | ({name:string,payload:{[key:string]:any}}) | store.update({name:'test',{aa:'111'}})                |
| dispatch | 触发model的effects | ({type:string,payload:any}) => voild       | store.dispatch({type:'test/effectName',payload:1234}) |

## effects参数 (payload,{update,get,dispatch})

### payload： 随意传入的参数
### update: 对应实例的update方法
### get : 对应实例的getState方法
### dispatch: 对应实例的dispatch方法
