/* eslint-disable*/
module.exports = {
  warn: function (message) {
    if (process.env.NODE_ENV !== "production") {
      if (console && console.warn) {
        console.warn(message);
      }
    }
  }
};
