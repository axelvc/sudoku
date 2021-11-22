import { render, screen, regex, act, userEvent } from '../test/utils'
import { FC } from 'react'

import useTimer from './useTimer'

const Wrapper: FC = () => {
  const { time, running, setRunning, reset } = useTimer()

  return (
    <div>
      <button onClick={reset}>reset</button>
      <button role="timer" data-running={running} onClick={() => setRunning(!running)}>
        {time}
      </button>
    </div>
  )
}

beforeAll(() => jest.useFakeTimers())
afterAll(() => jest.useRealTimers())
beforeEach(() => render(<Wrapper />))

function advanceSecs(secs: number): void {
  act(() => {
    jest.advanceTimersByTime(secs * 1_000)
  })
}

describe('useTimer', () => {
  it('should be not running by default', () => {
    const $timer = screen.getByRole('timer')

    expect($timer).toHaveTextContent(regex('00:00'))
    advanceSecs(1)
    expect($timer).toHaveTextContent(regex('00:00'))
  })

  it('should play/pause timer', () => {
    const $timer = screen.getByRole('timer')

    // play
    userEvent.click($timer)
    advanceSecs(1)
    expect($timer).toHaveTextContent(regex('00:01'))

    // pause
    userEvent.click($timer)
    advanceSecs(1)
    expect($timer).toHaveTextContent(regex('00:01'))
  })

  it('should update timer correctly', () => {
    const $timer = screen.getByRole('timer')

    userEvent.click($timer)
    advanceSecs(61)
    expect($timer).toHaveTextContent(regex('01:01'))
  })

  it('should reset timer', () => {
    const $timer = screen.getByRole('timer')
    const $reset = screen.getByRole('button', { name: 'reset' })

    userEvent.click($timer)
    advanceSecs(5)
    userEvent.click($reset)
    expect($timer).toHaveTextContent(regex('00:00'))
  })
})
