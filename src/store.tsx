import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// STORE
const store = createStore(reducer, composedEnhancer)

store.subscribe(() => {
  console.log(store.getState())
})

import { fetchRuns } from './reducers/getRunsSlice'

store.dispatch(fetchRuns)

export default store