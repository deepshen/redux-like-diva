import {makeAutoObservable} from 'mobx'



export interface Model{
	namespace: string,
		state: {[key:string]:any},
	effects: any
}

export interface UpdateProps{
	name: string,
		payload: {[key:string]:any}
}

export interface dispatchProps{
	type: string,
		payload?: {[key:string]:any} | string | number
}

export interface StoreIns{
	// state: {[key:string]:any},
	init: (models:Model[]) => void,
	getState: (name?:string) => ({[key:string]:any}),
	update: (val:UpdateProps) => void,
		dispatch: (val:dispatchProps) => void,
		[key:string]:any
}


class Store implements StoreIns{
	private state:any={}
	init(models:Model[]){
		let _this:StoreIns = this
		models.map((item:Model) => {
			const {namespace,state={},effects=[]} = item
			_this.state[namespace] = state
			Object.keys(effects).map(i => {
				_this[`${namespace}/${i}`] = (val:any) => effects[i](val,{update:_this.update,get:_this.getState,dispatch:_this.dispatch})
				return i
			})
			return item
		})
	}
	getState=(name:string | undefined) => {
		if(name){
			return this.state[name] || {}
		}
		return this.state || {}
	}
	update=(props:UpdateProps)=>{
		const {name,payload={}} = props || {}
		this.state[name] = {
			...this.state[name],
			...payload
		}
	}
	dispatch = ({type,payload}:dispatchProps) =>{
		const _this:StoreIns = this;
		_this[type](payload)
	}
	constructor() {
		makeAutoObservable(this)
	}
}

export default Store


