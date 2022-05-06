

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
		async test(payload,{put}){
			const data = await new Promise((resolve,reject) => {
				setTimeout(() => {
					resolve(payload)
				},1000)
			})
			put({
				type: 'update',
				payload: {
					age: data
				}
			})
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
