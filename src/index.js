import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './store'

import Hello from './pages/hello'
import World from './pages/world'

const App = () => {

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/hello' element={<Hello />}></Route>
					<Route path='/world' element={<World />}></Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}
const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)
