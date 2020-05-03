import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle } from "react";
import ms from "pretty-ms";
import { ConfigParameters } from "./MainCard";


export type TimeRef = {
  startTimer: (config: ConfigParameters) => void;
  stopTimer: () => void;
}

const Timer = forwardRef((props, ref: Ref<TimeRef>) => {
  const [state, setState] = useState({ time: 0, start: 0 });
  const startTimer = (config: ConfigParameters) => {
    setState({ time: config.roundMinutes * 60000, start: Date.now() });
  };
  const stopTimer = () => {
    setState({ time: 0, start: 0 });
  };

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (state.time >= 0) {
        setState({ ...state, ...{ time: state.time - 1000 } });
      }
    }, 1000);

    if (state.time > 0) {
      document.title = ms(state.time, { colonNotation: true, secondsDecimalDigits: 0 });
    }

    return () => clearInterval(intervalId);
  }, [state]);

  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer
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
