/* global console */
/* eslint-disable no-console */

// TODO: Use "warning" npm module like React is switching to.
export const warn =
  process.env.NODE_ENV !== "production"
    ? console.warn
    : function ignoreWarning() {};
