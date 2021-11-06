import { FC, useEffect, useState } from 'react'

import Button from '../../common/Button'
import Play from '../../common/svg/Play.svg'
import Pause from '../../common/svg/Pause.svg'
import { IconContainer } from './Timer.style'

const SECOND_IN_MILLISECONDS = 1_000
const MINUTE_IN_SECONDS = 60

function padTime(time: number): string {
  return `${time}`.padStart(2, '0')
}

const Timer: FC = () => {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    const id = setInterval(() => setSeconds(secs => secs + 1), SECOND_IN_MILLISECONDS)

    return () => clearInterval(id)
  }, [running])

  const mins = Math.floor(seconds / MINUTE_IN_SECONDS)
  const secs = seconds % MINUTE_IN_SECONDS

  return (
    <Button role="timer" onClick={() => setRunning(!running)}>
      <IconContainer>{running ? <Pause /> : <Play />}</IconContainer>
      {padTime(mins)}:{padTime(secs)}
    </Button>
  )
}

export default Timer
