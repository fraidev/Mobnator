import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle } from "react";
import ms from "pretty-ms";


export type TimeRef = {
  startTimer: () => void;
}

const Timer = forwardRef((props, ref: Ref<TimeRef>) => {
  const [state, setState] = useState({ time: 0, start: 0 });
  const startTimer = () => {
    setState({ time: 1000, start: Date.now() });
  };

  useImperativeHandle(ref, () => ({
    startTimer
  }));

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (state.time !== 0) {
        setState({ ...state, ...{ time: Date.now() - state.start } });
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [state]);

  const timer =
    state.time <= 1000
      ? "0:00"
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
