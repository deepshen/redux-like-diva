import React, {useEffect} from 'react'
import {connect} from '../../lib'

const Hello = (props) => {
	const {list,dispatch,name,age} = props
	useEffect(() => {
		// dispatch.hello.getList('我是hello')
		dispatch({
			type: 'hello/update',
			payload: {
				name: '刘玮'
			}
		})
	},[])
	const handleAdd = () => {
		dispatch({
			type: 'hello/update',
			payload: {
				name: 'sss'
			}
		})
	}
	return (
		<div>
			hello  {name} {age}
			<button onClick={handleAdd}>add</button>
		</div>
	)
}
export default connect(
	state => ({
		...state.hello,
		...state.world
	}),
	{},
	['hello']
)(Hello)
