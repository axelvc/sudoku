import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux'
import store, { AppDispatch, RootState } from './store'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => typeof store = useStore
