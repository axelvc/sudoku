import { render, screen, userEvent, regex } from './test/utils'
import App from './App'

jest.mock('./sudoku/sudokuService')

beforeEach(() => render(<App />))

describe('integration between controls and sudoku', () => {
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
  })

  describe('utils controls', () => {
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
  })
})
