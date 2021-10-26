import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useAppStore } from '../store/hooks'
import { difficulties, fetchSudoku } from './sudokuService'
import { fillBox, setSudoku, FillData } from './sudokuSlice'

import DropDown from '../common/DropDown'
import Timer from './Timer'

const Sudoku: FC = () => {
  const [difficulty, setDifficulty] = useState('easy')
  const puzzle = useAppSelector(state => state.sudoku.puzzle)
  const dispatch = useAppDispatch()
  const store = useAppStore()

  useEffect(() => {
    fetchSudoku(difficulty)
      .then(res => dispatch(setSudoku(res)))
      .catch(() => {
        // TODO: handle error
      })
  }, [difficulty])

  function fillBoxWithControlValue({ row, col }: Omit<FillData, 'value'>): void {
    const { fillValue: value } = store.getState().controls

    if (value === null) return

    dispatch(fillBox({ row, col, value: value }))
  }

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
        {puzzle.map((arr, row) =>
          arr.map((box, col) => (
            <button
              key={`${row}${col}`}
              disabled={box.blocked}
              onClick={() => fillBoxWithControlValue({ row, col })}
            >
              {box.value}
            </button>
          )),
        )}
      </div>
    </section>
  )
}

export default Sudoku
