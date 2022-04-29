

export default {
	namespace:"hello",
	state: {
		list: {name:"lw"},
		name: 'lw'
	},
	effects: {
		getList(payload,{put,select}){
			// 触发当前的model的
			console.log(payload)
			put({
				type: 'update',
				payload: {
					name: 'llllll'
				}
			})
			// 触发别的model的
			this.dispatch({
				type: 'world/changename',
				payload:'13'
			})
			this.dispatch({
				type: 'world/update',
				payload: {
					age:'15'
				}
			})
		},
		ceshi(payload){
			console.log(payload,'我是测试effects')
		}
	},
	reducer: {
		update(payload,state){
			return {
				...state,
				...payload
			}
		}
	}
}
