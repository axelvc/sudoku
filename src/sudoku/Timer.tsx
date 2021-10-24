import { FC, useEffect, useState } from 'react'

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
    <button role="timer" onClick={() => setRunning(!running)}>
      {padTime(mins)}:{padTime(secs)}
    </button>
  )
}

export default Timer
