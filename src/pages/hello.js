import React, {useEffect} from 'react'
import {connect} from '../../lib'

const Hello = (props) => {
	const {list,dispatch,name} = props
	useEffect(() => {
		dispatch({
			type: "hello/getList",
			payload: {
				name: '123'
			}
		})
	},[])
	return (
		<div>
			hello  {name}
		</div>
	)
}
export default connect(
	state => ({
		...state.hello
	})
)(Hello)
