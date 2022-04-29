

export default {
	namespace: 'world',
	state: {
		age: '12'
	},
	effects: {
		changename(payload,{put,select}){
			const data = select()
			console.log(data)
			console.log(payload)
			put({
				type: 'test'
			})
		},
		test(){
			console.log('我是world的')
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
