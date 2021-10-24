import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sudoku, ResponseType } from './sudokuService'

interface SudokuState {
  solution: Sudoku
  puzzle: Sudoku
}

const initialState: SudokuState = {
  solution: Array(9).fill(Array(9).fill(0)),
  puzzle: Array(9).fill(Array(9).fill(0)),
}

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setSudoku(state, { payload: { puzzle, solution } }: PayloadAction<ResponseType>) {
      state.solution = solution
      state.puzzle = puzzle
    },
  },
})

export default sudokuSlice.reducer

export const { setSudoku } = sudokuSlice.actions
