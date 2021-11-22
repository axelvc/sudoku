import { useEffect, useState } from 'react'

interface TimerState {
  time: string
  running: boolean
  reset: () => void
  setRunning: (running: boolean) => void
}

const SECOND_IN_MILLISECONDS = 1_000
const MINUTE_IN_SECONDS = 60

function padTime(time: number): string {
  return `${time}`.padStart(2, '0')
}

export default function useTimer(): TimerState {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const minutes = Math.floor(time / MINUTE_IN_SECONDS)
  const seconds = time % MINUTE_IN_SECONDS

  useEffect(() => {
    if (!running) return

    const id = setInterval(() => setTime(time => time + 1), SECOND_IN_MILLISECONDS)

    return () => clearInterval(id)
  }, [running])

  function reset(): void {
    setRunning(false)
    setTime(0)
  }

  return {
    time: `${padTime(minutes)}:${padTime(seconds)}`,
    running,
    setRunning,
    reset,
  }
}
