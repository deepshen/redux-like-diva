

export default {
	namespace:"hello",
	state: {
		list: {name:"lw"},
		name: 'lw'
	},
	effects: {
		getList(payload,{put}){
			console.log(this)
			put({
				type: 'update',
				payload: {
					name: 'llllll'
				}
			})
			// put({
			// 	type: 'ceshi',
			// 	payload: '123'
			// })
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
