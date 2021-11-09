import { regex, render, screen, userEvent } from '../../test/utils'
import Controls from './Controls'

beforeEach(() => render(<Controls />))

describe('Controls component', () => {
  describe('utils buttons', () => {
    const UTILS_BUTTONS = ['marks', 'erase', 'help', 'validate', 'undo', 'reset']

    it.each(UTILS_BUTTONS)('should render %s button', name => {
      const $button = screen.queryByRole('button', { name: regex(name) })

      expect($button).toBeInTheDocument()
    })

    it.each(['marks', 'erase'])('should update %s pressed', name => {
      const $switch = screen.getByRole('button', { name: regex(name) })

      expect($switch).toHaveAttribute('aria-pressed', 'false')

      userEvent.click($switch)

      expect($switch).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('numpad buttons', () => {
    const NUMPAD_BUTTONS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(String)

    it.each(NUMPAD_BUTTONS)('should render numpad %s button and update pressed', name => {
      const $button = screen.getByRole('button', { name: regex(name), pressed: false })

      expect($button).toBeInTheDocument()

      userEvent.click($button)

      expect($button).toHaveAttribute('aria-pressed', 'true')
    })
  })
})
