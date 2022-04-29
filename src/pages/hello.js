import React, {useEffect} from 'react'
import {connect} from '../../lib'

const Hello = (props) => {
	const {list,dispatch,name,age} = props
	useEffect(() => {
		dispatch.hello.getList('我是hello')
	},[])
	return (
		<div>
			hello  {name} {age}
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
