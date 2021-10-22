/* eslint-disable import/export */
import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

import controlsSlice from '../controls/controlsSlice'

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  const store = configureStore({ reducer: { controls: controlsSlice } })

  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export function regex(exp: string, flags = 'i'): RegExp {
  return new RegExp(exp, flags)
}

export { userEvent }
export * from '@testing-library/react'
