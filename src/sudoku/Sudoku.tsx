import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { difficulties } from './sudokuService'
import { fetchNewSudoku, updateSelectedboxOrFillBox } from './sudokuSlice'

import Button from '../common/Button'
import DropDown from '../common/DropDown/DropDown'
import Modal from '../common/Modal/Modal'
import Controls from './controls/Controls'
import Timer from './timer/Timer'
import { Box, SudokuHeader, Mark, SudokuGrid, SuccessDifficulty } from './Sudoku.style'
import { shallowEqual } from 'react-redux'

const Sudoku: FC = () => {
  const [difficulty, setDifficulty] = useState('easy')
  const [error, setError] = useState(false)
  const loading = useAppSelector(state => state.loading)
  const completed = useAppSelector(state => state.completed)
  const puzzle = useAppSelector(state => state.puzzle)
  const numpadValue = useAppSelector(state => state.numpadValue)
  const selectedBox = useAppSelector(state => state.selectedBox)
  const dispatch = useAppDispatch()

  function newSudoku(): void {
    dispatch(fetchNewSudoku(difficulty))
      .unwrap()
      .catch(() => setError(true))
  }

  useEffect(newSudoku, [difficulty])

  return (
    <>
      {error && (
        <Modal variant="error" title="Error to connect">
          <p>Please check your network connection and try again</p>
          <Button
            size="large"
            onClick={() => {
              setError(false)
              newSudoku()
            }}
          >
            Try again
          </Button>
        </Modal>
      )}

      {completed && (
        <Modal title="Great job!">
          <div>
            {/* TODO: get real time */}
            <p>Time: 00:00</p>
            <SuccessDifficulty>Difficulty: {difficulty}</SuccessDifficulty>
          </div>
          <Button size="large" onClick={newSudoku}>
            Let's do again
          </Button>
        </Modal>
      )}

      <section>
        <SudokuHeader>
          {/* TODO: start timer when get a sudoku */}
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
