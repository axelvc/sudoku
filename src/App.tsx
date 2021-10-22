import { FC } from 'react'

import { Provider } from 'react-redux'
import Controls from './controls/Controls'
import store from './store/store'

const App: FC = () => (
  <main>
    <Provider store={store}>
      <Controls />
    </Provider>
  </main>
)

export default App
