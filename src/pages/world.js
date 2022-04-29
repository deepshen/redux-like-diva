import React, {useEffect} from 'react'
import {useModel,useDispatch} from '../../lib'

export default () => {
	const state = useModel()
	console.log(state)
	const {world={}} = state

	const dispatch = useDispatch()
	// console.log(state)
	useEffect(() => {
		dispatch({
			type: 'world/update',
			payload: {
				age : '14'
			}
		})
	},[])
	const handleAdd = () => {
		dispatch({
			type: 'world/update',
			payload: {
				age: 19
			}
		})
	}
	return (
		<div>
			world {world.age}
			<button onClick={handleAdd}>测试</button>
		</div>
	)
}
