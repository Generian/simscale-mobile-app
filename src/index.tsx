import  React from 'react'
import  ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from "./components/App";
import store from './store'

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