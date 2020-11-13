import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

// DEFAULT STATE
interface defaultStateInterface {
  runs: any[]
}

// const createRun = (
//   runName: string, 
//   simulationName: string, 
//   projectName: string, 
//   status: string,
//   progress: Float32Array,
//   ) => {
//   return {
//     "runName": runName,
//     "simulationName": simulationName,
//     "projectName": projectName,
//     "status": status,
//     "progress": progress,

//   }
// }

// let r = []
// for (let i=1; i<10; i++) {
//   r.push(createRun(`run ${i}`, `sim ${i}`, `proj ${i}`))
// }

// export const defaultState: defaultStateInterface = {
//   runs: r,
// }

// const fetchStuff = async () => {
//   const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
//   store.dispatch({
//     type: 'GET_USERS',
//     payload: res.data
//   })
// }

// MIDDLEWARE
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// STORE
const store = createStore(reducer, {}, composedEnhancer)

store.subscribe(() => {
  console.log(store.getState())
})

// fetchStuff()

export default store