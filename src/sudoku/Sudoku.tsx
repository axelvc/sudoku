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

  function fillBoxWithControlValue(coords: Omit<FillData, 'value'>): void {
    const { fillValue: value, marksEnabled } = store.getState().controls

    if (value === null) return

    dispatch(fillBox({ ...coords, value, isMark: marksEnabled }))
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
            <div key={`${row}${col}`}>
              <button
                disabled={box.blocked}
                onClick={() => fillBoxWithControlValue({ row, col })}
              >
                {Boolean(box.value) && box.value}
              </button>
              {box.marks.map(mark => (
                <span key={mark}>{mark}</span>
              ))}
            </div>
          )),
        )}
      </div>
    </section>
  )
}

export default Sudoku
