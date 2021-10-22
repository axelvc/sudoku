import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import controlsSlice from '../controls/controlsSlice'

const store = configureStore({
  reducer: {
    controls: controlsSlice,
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
