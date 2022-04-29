import React, {useEffect} from 'react'
import {useStore,useState,useDispatch} from '../../lib'

export default () => {
	const dispatch = useDispatch()
	const state = useState()
	const {world} = state
	const {age} = world
	useEffect(() => {
		dispatch({
			type: 'world/test'
		})
	},[])
	console.log(age)
	return (
		<div>world {age}</div>
	)
}
