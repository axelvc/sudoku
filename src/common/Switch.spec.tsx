import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Switch from './Switch'

describe('Switch component', () => {
  it('should render unpressed', () => {
    render(<Switch pressed={false} />)

    const $switch = screen.queryByRole('button', { pressed: false })

    expect($switch).toBeInTheDocument()
  })

  it('should render pressed', () => {
    render(<Switch pressed={true} />)

    const $switch = screen.queryByRole('button', { pressed: true })

    expect($switch).toBeInTheDocument()
  })

  it('should call callback on click', () => {
    const cb = jest.fn()
    render(<Switch pressed={false} onClick={cb} />)

    const $switch = screen.getByRole('button')

    expect(cb).not.toBeCalled()

    userEvent.click($switch)

    expect(cb).toBeCalledTimes(1)
  })
})
