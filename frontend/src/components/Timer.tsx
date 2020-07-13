import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle } from "react";
import ms from "pretty-ms";
import { ConfigParameters } from "../models/types";


export type TimeRef = {
  startTimer: (config: ConfigParameters) => void;
  resetTime: () => void;
  stopTimer: () => void;
  continueTimer: () => void;
}

const Timer = forwardRef((props: { onFinish: () => void }, ref: Ref<TimeRef>) => {
  const [started, setStarted] = useState(false);
  const [state, setState] = useState({ time: 0, start: 0 });
  const startTimer = (config: ConfigParameters) => {
    setStarted(true);
    const time = config.break ? config.breakMinutes : config.roundMinutes;
    setState({ time: time * 60000, start: Date.now() });
  };
  const stopTimer = () => {
    setStarted(false);
  };
  const continueTimer = () => {
    setStarted(true);
    setState({ time: state.time, start: state.start });
  };
  const resetTime = () => {
    setState({ time: 0, start: Date.now() });
  }

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (state.time >= 0 && started) {
        setState({ ...state, ...{ time: state.time - 1000 } });
      }
      if (state.time < 0 && started) {
        props.onFinish();
      }


    }, 1000);

    if (state.time > 0) {
      document.title = ms(state.time, { colonNotation: true, secondsDecimalDigits: 0 });
    }

    return () => clearInterval(intervalId);
  }, [state, props, started]);

  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer,
    continueTimer,
    resetTime
  }));

  const timer =
    state.time <= 0
      ? "00:00"
      : ms(state.time, { colonNotation: true, secondsDecimalDigits: 0 });

  return (
    <div>
      <h1 style={style}>{timer}</h1>
    </div>
  );
});

const style = {
  fontSize: 100,
};

export default Timer;
