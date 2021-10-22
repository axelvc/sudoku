import { createSlice } from '@reduxjs/toolkit'

interface SudokuState {
  solution: number[][]
  puzzle: number[][]
}

const initialState: SudokuState = {
  solution: Array(9).fill(Array(9).fill(0)),
  puzzle: Array(9).fill(Array(9).fill(0)),
}

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {},
})

export default sudokuSlice.reducer

// export const { } = sudokuSlice.actions
