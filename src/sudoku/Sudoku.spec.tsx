import { RootStore } from '../store/store'
import { regex, render, screen, userEvent } from '../test/utils'

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

  describe('functionality with controls', () => {
    describe('numpad', () => {
      const numpadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(String)

      it('should fill box value', () => {
        const $box = screen.getByTestId('box-0-0')

        numpadNumbers.forEach(n => {
          const $control = screen.getByTestId(`numpad-${n}`)

          userEvent.click($control)
          userEvent.click($box)

          expect($box).toHaveTextContent(n)
        })
      })

      it('should add mark value', () => {
        const $box = screen.getByTestId('box-0-0')
        const $marks = screen.getByRole('button', { name: regex('marks') })

        userEvent.click($marks)

        numpadNumbers.forEach(n => {
          const $control = screen.getByTestId(`numpad-${n}`)

          userEvent.click($control)
          userEvent.click($box)
        })

        expect($box).toHaveTextContent(numpadNumbers.join(''))
      })

      it('should add selected styles on click', () => {
        const $box = screen.getByTestId('box-0-0')
        const $control = screen.getByTestId('numpad-1')

        userEvent.click($control)
        userEvent.click($box)

        expect($box).toMatchSnapshot()
      })
    })

    describe('utils', () => {
      it('should clean box on click with "erase" control enabled', () => {
        const $box = screen.getByTestId('box-0-0')
        const $erase = screen.getByRole('button', { name: regex('erase') })
        const $numpadControl = screen.getByTestId('numpad-1')

        userEvent.click($numpadControl)
        userEvent.click($box)
        userEvent.click($erase)
        userEvent.click($box)

        expect($box).toHaveTextContent('')
      })

      it('should add error styles on click "validate" control', () => {
        const $validate = screen.getByRole('button', { name: regex('validate') })
        const $box = screen.getByTestId('box-0-0')
        const $numpad1 = screen.getByTestId('numpad-1')

        userEvent.click($numpad1)
        userEvent.click($box)
        userEvent.click($validate)

        expect($box).toHaveStyleRule('--color', 'var(--color-red-500)')
        expect($box).toHaveStyleRule('--background', 'var(--color-red-100)')
        expect($box).toMatchSnapshot()
      })

      it('should restore value on click "undo" control after set value', () => {
        const $undo = screen.getByRole('button', { name: regex('undo') })
        const $box = screen.getByTestId('box-0-0')
        const $numpad1 = screen.getByTestId('numpad-1')

        userEvent.click($numpad1)
        userEvent.click($box)
        userEvent.click($undo)

        expect($box).toHaveTextContent('')
      })

      it('should restore all changed values on click "reset" control', () => {
        const $reset = screen.getByRole('button', { name: regex('reset') })
        const $box1 = screen.getByTestId('box-0-0')
        const $box2 = screen.getByTestId('box-0-1')
        const $numpad1 = screen.getByTestId('numpad-1')

        userEvent.click($numpad1)
        userEvent.click($box1)
        userEvent.click($box2)

        userEvent.click($reset)
        expect($box1).toHaveTextContent('')
        expect($box2).toHaveTextContent('')
      })
    })
  })
})
