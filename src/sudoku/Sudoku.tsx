import { FC, useState } from 'react'
import { useAppSelector } from '../store/hooks'

import DropDown from '../common/DropDown'
import Timer from './Timer'

const DIFFICULTIES = ['easy', 'medium', 'hard']

const Sudoku: FC = () => {
  const [difficulty, setDifficulty] = useState('easy')
  const puzzle = useAppSelector(state => state.sudoku.puzzle)

  return (
    <section>
      <header>
        <Timer />
        <DropDown
          options={DIFFICULTIES}
          selected={difficulty}
          onChange={value => setDifficulty(value)}
        />
      </header>

      <div>
        {puzzle.map((row, rI) =>
          row.map((value, cI) => <button key={`${rI}${cI}`}>{value}</button>),
        )}
      </div>
    </section>
  )
}

export default Sudoku
