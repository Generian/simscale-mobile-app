import { createStore } from 'redux'
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

// STORE
const store = createStore(reducer, composeWithDevTools())

store.subscribe(() => {
  console.log(store.getState())
})

export default store