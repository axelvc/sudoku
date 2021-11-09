import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { difficulties, fetchSudoku } from './sudokuService'
import { fillBoxwithNumpadValue, setSudoku } from './sudokuSlice'

import Controls from './controls/Controls'
import DropDown from '../common/DropDown/DropDown'
import Timer from './timer/Timer'
import { Box, SudokuHeader, Mark, SudokuGrid } from './Sudoku.style'

const Sudoku: FC = () => {
  const [difficulty, setDifficulty] = useState('easy')
  const puzzle = useAppSelector(state => state.puzzle)
  const numpadValue = useAppSelector(state => state.numpadValue)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchSudoku(difficulty)
      .then(res => dispatch(setSudoku(res)))
      .catch(() => {
        // TODO: handle error
      })
  }, [difficulty])

  return (
    <>
      <section>
        <SudokuHeader>
          <Timer />
          <DropDown
            options={difficulties}
            selected={difficulty}
            onChange={value => setDifficulty(value)}
          />
        </SudokuHeader>

        <SudokuGrid rows={9} cols={9}>
          {puzzle.map((arr, row) =>
            arr.map((box, col) => (
              <Box
                key={`${row}${col}`}
                data-testid={`box-${row}-${col}`}
                blockIndex={Math.floor(row / 3) * 3 + Math.floor(col / 3)}
                hasMarks={box.marks.length >= 1}
                selected={Boolean(numpadValue) && numpadValue === box.value}
                error={box.errors > 0}
                disabled={box.blocked}
                onClick={() => dispatch(fillBoxwithNumpadValue({ row, col }))}
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

      <Controls />
    </>
  )
}

export default Sudoku
