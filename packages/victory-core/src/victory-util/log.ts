/* global console process */
/* eslint-disable no-console */

export function warn(message: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - Webpack DefinePlugin will replace process.env.NODE_ENV
  if (process.env.NODE_ENV !== "production") {
    if (console && console.warn) {
      console.warn(message);
    }
  }
}
