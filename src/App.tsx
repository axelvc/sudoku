import { FC } from 'react'
import { Provider } from 'react-redux'

import Controls from './controls/Controls'
import store from './store/store'
import Sudoku from './sudoku/Sudoku'

const App: FC = () => (
  <main>
    <Provider store={store}>
      <Sudoku />
      <Controls />
    </Provider>
  </main>
)

export default App
