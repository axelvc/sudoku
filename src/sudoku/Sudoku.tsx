import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useAppStore } from '../store/hooks'
import { difficulties, fetchSudoku } from './sudokuService'
import { fillBox, setSudoku, Coords } from './sudokuSlice'

import DropDown from '../common/DropDown/DropDown'
import Timer from './timer/Timer'
import { Box, Header, Mark, SudokuGrid } from './Sudoku.style'

const Sudoku: FC = () => {
  const [difficulty, setDifficulty] = useState('easy')
  const puzzle = useAppSelector(state => state.sudoku.puzzle)
  const fillValue = useAppSelector(state => state.controls.fillValue)
  const dispatch = useAppDispatch()
  const store = useAppStore()

  useEffect(() => {
    fetchSudoku(difficulty)
      .then(res => dispatch(setSudoku(res)))
      .catch(() => {
        // TODO: handle error
      })
  }, [difficulty])

  function fillBoxWithControlValue(coords: Coords): void {
    const { marksEnabled } = store.getState().controls

    if (fillValue === null) return

    dispatch(fillBox({ ...coords, value: fillValue, isMark: marksEnabled }))
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

      <SudokuGrid rows={9} cols={9}>
        {puzzle.map((arr, row) =>
          arr.map((box, col) => (
            <Box
              key={`${row}${col}`}
              data-testid={`box-${row}-${col}`}
              blockIndex={Math.floor(row / 3) * 3 + Math.floor(col / 3)}
              hasMarks={box.marks.length >= 1}
              selected={Boolean(fillValue) && fillValue === box.value}
              error={box.errors > 0}
              disabled={box.blocked}
              onClick={() => fillBoxWithControlValue({ row, col })}
            >
              {box.value ? (
                <span>{box.value}</span>
              ) : (
                box.marks.map(mark => (
                  <Mark key={mark} mark={mark}>
                    {mark}
                  </Mark>
                ))
              )}
            </Box>
          )),
        )}
      </SudokuGrid>
    </section>
  )
}

export default Sudoku
