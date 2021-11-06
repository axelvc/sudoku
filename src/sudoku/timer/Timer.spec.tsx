import { render, screen, userEvent, act } from '../../test/utils'

import Timer from './Timer'

beforeEach(() => {
  render(<Timer />)
  jest.useFakeTimers()
})

afterEach(() => {
  jest.useRealTimers()
})

describe('Timer component', () => {
  it('should print with "00:00"', () => {
    const $timer = screen.queryByRole('timer')

    expect($timer).toBeInTheDocument()
    expect($timer).toHaveTextContent('00:00')
  })

  it('should start/pause timer on click', () => {
    const $timer = screen.getByRole('timer')

    // ensure timer is not running
    expect($timer).toHaveTextContent('00:00')

    // start timer
    userEvent.click($timer)
    act(() => {
      jest.advanceTimersToNextTimer()
    })

    expect($timer).toHaveTextContent('00:01')

    // stop timer
    userEvent.click($timer)
    act(() => {
      jest.advanceTimersToNextTimer()
    })
    expect($timer).toHaveTextContent('00:01')
  })

  it('should update minutes correctly', () => {
    const $timer = screen.getByRole('timer')

    userEvent.click($timer)
    act(() => {
      jest.advanceTimersByTime(1_000 * 61)
    })

    expect($timer).toHaveTextContent('01:01')
  })
})
