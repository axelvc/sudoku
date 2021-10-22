import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ControlsState {
  fillValue: number | null
  marksEnabled: boolean
}

const initialState: ControlsState = {
  fillValue: null,
  marksEnabled: false,
}

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setMarksEnabled(state, { payload }: PayloadAction<boolean>) {
      state.marksEnabled = payload
    },
    setFillValue(state, { payload }: PayloadAction<number | null>) {
      state.fillValue = payload
    },
  },
})

export default controlsSlice.reducer

export const { setMarksEnabled, setFillValue } = controlsSlice.actions
