import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import controlsSlice from '../controls/controlsSlice'
import sudokuSlice from '../sudoku/sudokuSlice'

const store = configureStore({
  reducer: {
    controls: controlsSlice,
    sudoku: sudokuSlice,
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
