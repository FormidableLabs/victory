import React from "react";
import Timer from "./timer";

/**
 * The React context object consumers may use to access or override the global
 * timer.
 */
const TimerContext = React.createContext({
  transitionTimer: new Timer(),
  animationTimer: new Timer(),
});
TimerContext.displayName = "TimerContext";

export default TimerContext;
