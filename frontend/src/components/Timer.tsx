import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle } from 'react'
import ms from 'pretty-ms'
import { ConfigParameters } from '../models/types'

export type TimeRef = {
  startTimer: (config: ConfigParameters) => void;
  resetTime: () => void;
  stopTimer: () => void;
  continueTimer: () => void;
}

const Timer = forwardRef((props: { onFinish: () => void }, ref: Ref<TimeRef>) => {
  const [started, setStarted] = useState(false)
  const [end, setEnd] = useState(1)
  const [timeState, setTimeState] = useState({ time: 0 })
  const startTimer = (config: ConfigParameters) => {
    setStarted(true)

    const minutes = config.break ? config.breakMinutes : config.roundMinutes
    const start = config.break ? config.breakDate : config.roundDate
    // const endDate = new Date(start + minutes * 60000).getTime()
    const endDate = new Date(start + minutes * 1000).getTime() // REmove THIS
    setEnd(endDate)
    const time = getTime()

    if (time > 0) {
      setTimeState({ time: time })
    }
  }
  const stopTimer = () => {
    setStarted(false)
  }
  const continueTimer = () => {
    setStarted(true)
    const endDate = new Date(Date.now() + timeState.time).getTime()
    setEnd(endDate)
  }
  const resetTime = () => {
    setStarted(false)
    setTimeState({ time: 0 })
  }
  const getTime = () => {
    return end - Date.now()
  }

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (timeState.time >= 0 && started) {
        setTimeState({ ...timeState, ...{ time: end - Date.now() } })
      }
      if (timeState.time < 0 && started) {
        setTimeState({ time: 0 })
        props.onFinish()
      }
    }, 1000)

    if (timeState.time > 0) {
      document.title = ms(timeState.time, { colonNotation: true, secondsDecimalDigits: 0 })
    }

    return () => clearInterval(intervalId)
  }, [timeState, props, started, end])

  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer,
    continueTimer,
    resetTime
  }))

  const timer =
    timeState.time <= 0
      ? '00:00'
      : ms(timeState.time, { colonNotation: true, secondsDecimalDigits: 0 })

  return (
    <div>
      <h1 style={style}>{timer}</h1>
    </div>
  )
})

const style = {
  fontSize: 100
}

export default Timer
