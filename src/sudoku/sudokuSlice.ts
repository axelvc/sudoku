import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sudoku, ResponseType } from './sudokuService'
import checkCollisions from './utils/checkCollisions'

export interface Coords {
  row: number
  col: number
}

export interface FillData extends Coords {
  value: number
  isMark?: boolean
}

export interface BoxData {
  value: number
  marks: number[]
  errors: number
  blocked: boolean
}

export interface SudokuState {
  solution: Sudoku
  puzzle: BoxData[][]
}

function parsePuzzle(puzzle: Sudoku): BoxData[][] {
  return puzzle.map(row =>
    row.map(value => ({
      value,
      marks: [],
      errors: 0,
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
      const oldValue = box.value

      if (box.blocked) return

      if (value === 0) {
        box.value = 0
        box.marks = []
      } else if (isMark) {
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

      if (oldValue !== box.value) {
        checkCollisions(state, { row, col }, oldValue)
      }
    },
    validateSudoku(state) {
      const { puzzle, solution } = state

      puzzle.forEach((row, rI) =>
        row.forEach((box, cI) => {
          const { value, errors } = box
          const rightValue = solution[rI][cI]

          if (value && !errors && value !== rightValue) {
            box.errors++
          }
        }),
      )
    },
  },
})

export const { setSudoku, fillBox, validateSudoku } = sudokuSlice.actions

export default sudokuSlice.reducer
