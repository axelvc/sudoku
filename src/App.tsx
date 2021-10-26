import { FC } from 'react'
import { Provider } from 'react-redux'

import Controls from './controls/Controls'
import store from './store/store'
import Sudoku from './sudoku/Sudoku'
import GlobalStyles from './globalStyles'

const App: FC = () => (
  <main>
    <GlobalStyles />
    <Provider store={store}>
      <Sudoku />
      <Controls />
    </Provider>
  </main>
)

export default App
