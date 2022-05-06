import React from 'react'
import {useDispatch,useModel} from '../../lib'

export default () => {
	const data= useModel()
	const dispatch = useDispatch()
	const {world={}} = data
	const {age} = world


	const handleAdd = () => {
		dispatch.world.test({
			payload: '14'
		})
	}
	return (
		<div>
			world {age}
			<button onClick={handleAdd}>测试</button>
		</div>
	)
}
