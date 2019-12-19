import React from "react";
import Timer from "./timer";

/**
 * The React context object consumers may use to access or override the global
 * timer.
 */
const TimerContext = React.createContext({ globalTimer: new Timer() });
TimerContext.displayName = "TimerContext";

export default TimerContext;
