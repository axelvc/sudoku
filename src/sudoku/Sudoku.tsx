import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { difficulties, fetchSudoku } from './sudokuService'
import { setSudoku, updateLoading, updateSelectedboxOrFillBox } from './sudokuSlice'

import Controls from './controls/Controls'
import DropDown from '../common/DropDown/DropDown'
import Timer from './timer/Timer'
import { Box, SudokuHeader, Mark, SudokuGrid } from './Sudoku.style'
import { shallowEqual } from 'react-redux'

const Sudoku: FC = () => {
  const [difficulty, setDifficulty] = useState('easy')
  const loading = useAppSelector(state => state.loading)
  const puzzle = useAppSelector(state => state.puzzle)
  const numpadValue = useAppSelector(state => state.numpadValue)
  const selectedBox = useAppSelector(state => state.selectedBox)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateLoading(true))

    fetchSudoku(difficulty)
      .then(res => dispatch(setSudoku(res)))
      .catch(() => {
        // TODO: handle error
      })
      .finally(() => dispatch(updateLoading(false)))
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
                isLoading={loading}
                data-testid={`box-${row}-${col}`}
                blockIndex={Math.floor(row / 3) * 3 + Math.floor(col / 3)}
                hasMarks={box.marks.length >= 1}
                pressed={Boolean(
                  (numpadValue && numpadValue === box.value) ??
                    (selectedBox && shallowEqual(selectedBox, { row, col })),
                )}
                error={box.errors > 0}
                disabled={loading || box.blocked}
                onClick={() => dispatch(updateSelectedboxOrFillBox({ row, col }))}
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
