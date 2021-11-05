import { RootStore } from '../store/store'
import { render, screen } from '../test/utils'

import Sudoku from './Sudoku'
import { Coords, fillBox } from './sudokuSlice'

jest.mock('./sudokuService')

let store: RootStore
beforeEach(() => {
  const r = render(<Sudoku />)

  store = r.store
})

describe('Sudoku component', () => {
  describe('collision feedback', () => {
    const cases: Array<[string, Coords]> = [
      ['row', { row: 0, col: 1 }],
      ['col', { row: 1, col: 0 }],
      ['block', { row: 1, col: 1 }],
    ]

    it.each(cases)('should add error styles by collision on %s', (_, coords) => {
      const $box = screen.getByTestId('box-0-0')

      store.dispatch(fillBox({ row: 0, col: 0, value: 1 }))
      store.dispatch(fillBox({ ...coords, value: 1 }))

      expect($box).toMatchSnapshot()
    })
  })
})
