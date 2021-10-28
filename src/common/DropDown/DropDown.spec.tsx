import { regex, render, screen, userEvent } from '../../test/utils'

import DropDown from './DropDown'

const OPTIONS = ['option 1', 'option 2', 'option 3']
const SELECTED = OPTIONS[0]
const onChange = jest.fn()
let container: HTMLElement

beforeEach(() => {
  const result = render(
    <DropDown options={OPTIONS} selected={SELECTED} onChange={onChange} />,
  )

  container = result.container
})

function openMenu(): void {
  const $combobox = screen.getByRole('combobox')

  userEvent.click($combobox)
}

describe('DropDown component', () => {
  it('should render combobox', () => {
    const $combobox = screen.queryByRole('combobox')

    expect($combobox).toBeInTheDocument()
    expect($combobox).toHaveTextContent(regex(SELECTED))
  })

  it('should not render options', () => {
    const $options = screen.queryAllByRole('option')

    expect($options).toHaveLength(0)
  })

  it('should render options on click select', () => {
    openMenu()

    const $options = screen.queryAllByRole('option')

    expect($options).toHaveLength(OPTIONS.length)
  })

  it('should call callback on change option', () => {
    openMenu()

    const $options = screen.getAllByRole('option')

    userEvent.click($options[1])

    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(OPTIONS[1])
  })

  describe('interact with options', () => {
    it('should autofocus selected option', () => {
      openMenu()

      const $selectedOption = screen.getByRole('option', { name: regex(SELECTED) })

      expect($selectedOption).toHaveFocus()
    })

    it('should focus option on hover', () => {
      openMenu()

      const $options = screen.getAllByRole('option')

      $options.forEach($option => {
        userEvent.hover($option)

        expect($option).toHaveFocus()
      })
    })

    it('should focus next option on arrow down', () => {
      openMenu()

      const $options = screen.getAllByRole('option')

      // next option
      $options.push($options.shift() as HTMLElement) // set selected at end

      $options.forEach($option => {
        userEvent.keyboard('{arrowdown}')

        expect($option).toHaveFocus()
      })

      // previous options
      $options.unshift($options.pop() as HTMLElement) // restore selected at start

      $options.reverse().forEach($option => {
        userEvent.keyboard('{arrowup}')

        expect($option).toHaveFocus()
      })
    })
  })

  describe('hide options', () => {
    it('should hide options on click ouside', () => {
      openMenu()

      userEvent.click(container)

      const $options = screen.queryAllByRole('option')

      expect($options).toHaveLength(0)
    })

    it('should hide options on tab', () => {
      openMenu()

      userEvent.tab()

      const $options = screen.queryAllByRole('option')

      expect($options).toHaveLength(0)
    })

    it('should hide options on escape', () => {
      openMenu()

      userEvent.keyboard('{esc}')

      const $options = screen.queryAllByRole('option')

      expect($options).toHaveLength(0)
    })
  })
})
