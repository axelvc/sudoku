import { render } from 'react-dom'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)
