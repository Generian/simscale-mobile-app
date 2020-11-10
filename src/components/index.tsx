import  React from 'react'
import  ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './../reducers'
import {Provider} from 'react-redux'
import { App } from "./App";

// STORE
const store = createStore(reducer, composeWithDevTools())

store.subscribe(() => {
  console.log(store.getState())
})

// DISPATCH
// store.dispatch(getRuns())

// ReactDOM.render(
//   <Provider store={store}>
//     {/* <App /> */}
//   </Provider>,
//   document.getElementById('root')
// )

ReactDOM.render(
  <Provider store={store}>
    <App userName="Beveloper" lang="TypeScript" />
  </Provider>,
  document.getElementById("main")
);