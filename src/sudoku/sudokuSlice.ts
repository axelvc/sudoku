import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import { Sudoku, ResponseType } from './sudokuService'
import checkCollisions from './utils/checkCollisions'

export interface Coords {
  row: number
  col: number
}

export interface FillData extends Coords {
  value: number
}

export interface BoxData {
  value: number
  marks: number[]
  errors: number
  blocked: boolean
}

interface HistoryData extends Coords, BoxData {}

export interface SudokuState {
  solution: Sudoku
  puzzle: BoxData[][]
  history: HistoryData[]
  numpadValue: number | null
  marksEnabled: boolean
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

function saveHistory(state: SudokuState, data: HistoryData): void {
  data.marks = data.marks.slice()

  state.history.push(data)
}

const initialState: SudokuState = {
  solution: Array(9).fill(Array(9).fill(0)),
  puzzle: parsePuzzle(Array(9).fill(Array(9).fill(0))),
  history: [],
  numpadValue: null,
  marksEnabled: false,
}

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setMarksEnabled(state, { payload }: PayloadAction<boolean>) {
      state.marksEnabled = payload
    },
    updateNumpadValue(state, { payload }: PayloadAction<number>) {
      const newValue = state.numpadValue === payload ? null : payload

      state.numpadValue = newValue
    },
    setSudoku(state, { payload: { puzzle, solution } }: PayloadAction<ResponseType>) {
      state.solution = solution
      state.puzzle = parsePuzzle(puzzle)
    },
    fillBox(state, { payload: { row, col, value } }: PayloadAction<FillData>) {
      const box = state.puzzle[row][col]
      const oldValue = box.value

      if (box.blocked) return

      saveHistory(state, { ...box, row, col })

      if (value === 0) {
        box.value = 0
        box.marks = []
      } else if (state.marksEnabled) {
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
    validate(state) {
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
    undo(state) {
      const last = state.history.pop()

      if (!last) return

      const { row, col, ...boxData } = last
      const { value: oldValue, errors } = state.puzzle[row][col]

      state.puzzle[row][col] = {
        ...boxData,
        errors, // set actual errors to remove posible actual collisions
      }

      checkCollisions(state, { row, col }, oldValue)
    },
    reset(state) {
      state.history = []
      state.puzzle.forEach(row =>
        row.forEach(box => {
          box.errors = 0

          if (!box.blocked) {
            box.value = 0
            box.marks = []
          }
        }),
      )
    },
  },
})

export const {
  setMarksEnabled,
  updateNumpadValue,
  setSudoku,
  fillBox,
  validate,
  undo,
  reset,
} = sudokuSlice.actions

export const fillBoxwithNumpadValue =
  (coords: Coords): AppThunk =>
  (dispatch, getState) => {
    const { numpadValue } = getState()

    if (numpadValue === null) return

    dispatch(fillBox({ ...coords, value: numpadValue }))
  }

export const helpFill = (): AppThunk => (dispatch, getState) => {
  const { puzzle, solution } = getState()
  const total = puzzle.length ** 2
  const visited = new Set<number>()
  let row: number
  let col: number

  do {
    if (visited.size === total) return

    row = Math.floor(Math.random() * 9)
    col = Math.floor(Math.random() * 9)

    visited.add(row * 9 + col)
  } while (puzzle[row][col].value === solution[row][col])

  dispatch(fillBox({ row, col, value: solution[row][col] }))
}

export default sudokuSlice.reducer
