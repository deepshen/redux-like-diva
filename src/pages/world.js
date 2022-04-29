import React, {useEffect} from 'react'
import {useState,useDispatch} from '../../lib'

export default () => {
	const state = useState()
	const dispatch = useDispatch()
	console.log(state)
	useEffect(() => {
		dispatch({
			type: 'world/test'
		})
	},[])
	return (
		<div>world</div>
	)
}
