/* global console */
/* eslint-disable no-console */

// TODO: Use "warning" npm module like React is switching to.
// eslint-disable-next-line func-style
export function warn(message) {
  if (process.env.NODE_ENV !== "production") {
    if (console && console.warn) {
      console.warn(message);
    }
  }
}
