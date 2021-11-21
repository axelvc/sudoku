import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
import { AppThunk } from '../store/store'
import { Sudoku, ResponseType, fetchSudoku } from './sudokuService'
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
  loading: boolean
  solution: Sudoku
  puzzle: BoxData[][]
  history: HistoryData[]
  marksEnabled: boolean
  numpadValue: number | null
  selectedBox: Coords | null
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
  loading: false,
  solution: Array(9).fill(Array(9).fill(0)),
  puzzle: parsePuzzle(Array(9).fill(Array(9).fill(0))),
  history: [],
  numpadValue: null,
  marksEnabled: false,
  selectedBox: null,
}

export const fetchNewSudoku = createAsyncThunk(
  'sudoku/fetchSudoku',
  async (difficulty: string) => {
    return await fetchSudoku(difficulty)
  },
)

const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    updateLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setMarksEnabled(state, { payload }: PayloadAction<boolean>) {
      state.marksEnabled = payload
    },
    updateNumpadValue(state, { payload }: PayloadAction<number>) {
      const newValue = state.numpadValue === payload ? null : payload

      state.numpadValue = newValue
    },
    updateSelectedBox(state, { payload }: PayloadAction<Coords>) {
      if (shallowEqual(state.selectedBox, payload)) {
        state.selectedBox = null
      } else {
        state.selectedBox = payload
      }
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
  extraReducers(builder) {
    builder
      .addCase(fetchNewSudoku.pending, state => {
        Object.assign(state, initialState, { loading: true })
      })
      .addCase(fetchNewSudoku.fulfilled, (state, { payload: { puzzle, solution } }) => {
        state.solution = solution
        state.puzzle = parsePuzzle(puzzle)
        state.loading = false
      })
      .addCase(fetchNewSudoku.rejected, state => {
        state.loading = false
      })
  },
})

export const {
  updateLoading,
  setMarksEnabled,
  updateNumpadValue,
  updateSelectedBox,
  setSudoku,
  fillBox,
  validate,
  undo,
  reset,
} = sudokuSlice.actions

export const updateSelectedboxOrFillBox =
  (coords: Coords): AppThunk =>
  (dispatch, getState) => {
    const { numpadValue } = getState()

    if (typeof numpadValue === 'number') {
      dispatch(fillBox({ ...coords, value: numpadValue }))
    } else {
      dispatch(updateSelectedBox(coords))
    }
  }

export const UpdateNumpadValueOrFillBox =
  (value: number): AppThunk =>
  (dispatch, getState) => {
    const { selectedBox } = getState()

    if (selectedBox) {
      dispatch(fillBox({ ...selectedBox, value }))
    } else {
      dispatch(updateNumpadValue(value))
    }
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
