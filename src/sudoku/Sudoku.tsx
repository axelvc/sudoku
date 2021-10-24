import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { difficulties, fetchSudoku } from './sudokuService'
import { setSudoku } from './sudokuSlice'

import DropDown from '../common/DropDown'
import Timer from './Timer'

const Sudoku: FC = () => {
  const [difficulty, setDifficulty] = useState('easy')
  const puzzle = useAppSelector(state => state.sudoku.puzzle)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchSudoku(difficulty)
      .then(res => dispatch(setSudoku(res)))
      .catch(() => {
        // TODO: handle error
      })
  }, [difficulty])

  return (
    <section>
      <header>
        <Timer />
        <DropDown
          options={difficulties}
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
