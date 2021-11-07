import { FC } from 'react'

import Controls from './controls/Controls'
import Sudoku from './sudoku/Sudoku'
import GlobalStyles from './globalStyles'

const App: FC = () => (
  <main>
    <GlobalStyles />
    <Sudoku />
    <Controls />
  </main>
)

export default App
