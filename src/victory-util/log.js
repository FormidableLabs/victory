/* global console */
/* eslint-disable no-console */

// TODO: Use "warning" npm module like React is switching to.
export default {
  warn(message) {
    if (process.env.NODE_ENV !== "production") {
      if (console && console.warn) {
        console.warn(message);
      }
    }
  }
};
