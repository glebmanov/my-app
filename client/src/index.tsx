import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import './styles/App.scss'
import App from './App'

const root = document.createElement('div')
root.id = 'app'
document.body.append(root)

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
