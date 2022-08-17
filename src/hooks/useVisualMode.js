import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(mode, replace = false) {
    setMode(mode)
    if  (replace === false) {

      setHistory((prev) => {
      return [...prev, mode]
    })
    } else { setHistory((prev) => {
      return [...prev.slice(0, prev.length - 1), mode]
    })}

  }

  function back() {
    if (history.length >= 2) {
      
      setMode(history[history.length -2])
    }
    setHistory((prev) => {
      if (prev.length < 2) return prev;
      return prev.slice(0, prev.length - 1);
    });
  }

  return { mode, transition, back };
}
