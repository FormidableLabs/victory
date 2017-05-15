/* eslint-disable func-style */
export default {
  continuousTransitions() {
    return {
      onLoad: {
        duration: 2000
      },
      onExit: {
        duration: 500
      },
      onEnter: {
        duration: 500
      }
    };
  },

  discreteTransitions() {
    return {
      onLoad: {
        duration: 2000,
        before: () => ({ opacity: 0 }),
        after: (datum) => datum
      },
      onExit: {
        duration: 600,
        before: () => ({ opacity: 0 })
      },
      onEnter: {
        duration: 600,
        before: () => ({ opacity: 0 }),
        after: (datum) => datum
      }
    };
  }
};
