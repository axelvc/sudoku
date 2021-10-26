import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sudoku, ResponseType } from './sudokuService'

export interface FillData {
  row: number
  col: number
  value: number
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
      blocked: value === 0,
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
    fillBox(state, { payload: { row, col, value } }: PayloadAction<FillData>) {
      const box = state.puzzle[row][col]

      if (box.blocked) return

      box.value = box.value === value ? 0 : value
    },
  },
})

export const { setSudoku, fillBox } = sudokuSlice.actions

export default sudokuSlice.reducer
