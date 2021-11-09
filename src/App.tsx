import { FC } from 'react'

import Sudoku from './sudoku/Sudoku'
import GlobalStyles from './globalStyles'

const App: FC = () => (
  <main>
    <GlobalStyles />
    <Sudoku />
  </main>
)

export default App
