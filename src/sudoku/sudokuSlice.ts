import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sudoku, ResponseType } from './sudokuService'

export interface FillData {
  row: number
  col: number
  value: number
  isMark?: boolean
}

interface BoxData {
  value: number
  marks: number[]
  error: boolean
  blocked: boolean
}

interface SudokuState {
  solution: Sudoku
  puzzle: BoxData[][]
}

function parsePuzzle(puzzle: Sudoku): BoxData[][] {
  return puzzle.map(row =>
    row.map(value => ({
      value,
      marks: [],
      error: false,
      blocked: value !== 0,
    })),
  )
}

const initialState: SudokuState = {
  solution: Array(9).fill(Array(9).fill(0)),
  puzzle: parsePuzzle(Array(9).fill(Array(9).fill(0))),
}

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setSudoku(state, { payload: { puzzle, solution } }: PayloadAction<ResponseType>) {
      state.solution = solution
      state.puzzle = parsePuzzle(puzzle)
    },
    fillBox(state, { payload: { row, col, value, isMark } }: PayloadAction<FillData>) {
      const box = state.puzzle[row][col]

      if (box.blocked) return

      if (isMark) {
        const index = box.marks.indexOf(value)

        if (index === -1) {
          box.marks.push(value)
        } else {
          box.marks.splice(index, 1)
        }

        box.value = 0
      } else {
        box.value = box.value === value ? 0 : value
        box.marks = []
      }
    },
  },
})

export const { setSudoku, fillBox } = sudokuSlice.actions

export default sudokuSlice.reducer
