/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useAppStore } from '../store/hooks'
import { difficulties, fetchSudoku } from './sudokuService'
import { fillBox, setSudoku, FillData } from './sudokuSlice'

import DropDown from '../common/DropDown'
import Timer from './Timer'
import { Box, BoxMarks, BoxValue, Header, Mark, SudokuGrid } from './Sudoku.style'

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
      <Header>
        <Timer />
        <DropDown
          options={difficulties}
          selected={difficulty}
          onChange={value => setDifficulty(value)}
        />
      </Header>

      <SudokuGrid>
        {puzzle.map((arr, row) =>
          arr.map((box, col) => (
            <Box key={`${row}${col}`}>
              <BoxValue
                disabled={box.blocked}
                onClick={() => fillBoxWithControlValue({ row, col })}
              >
                {Boolean(box.value) && box.value}
              </BoxValue>
              <BoxMarks>
                {box.marks.map(mark => (
                  <Mark key={mark} mark={mark}>
                    {mark}
                  </Mark>
                ))}
              </BoxMarks>
            </Box>
          )),
        )}
      </SudokuGrid>
    </section>
  )
}

export default Sudoku
