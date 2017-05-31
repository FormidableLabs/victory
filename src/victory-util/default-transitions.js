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

  continuousPolarTransitions() {
    return {
      onLoad: {
        duration: 2000,
        before: () => ({ _y: 0, _y1: 0, _y0: 0 }),
        after: (datum) => ({ _y: datum._y, _y1: datum._y1, _y0: datum._y0 })
      },
      onExit: {
        duration: 500,
        before: (datum, index, data) => {
          const adjacent = (attr) => {
            const adj = index === 0 ? data[index + 1] : data[index - 1];
            return adj[attr];
          };
          return { _x: adjacent("_x"), _y: adjacent("_y"), _y0: adjacent("_y0") };
        }
      },
      onEnter: {
        duration: 500,
        before: (datum, index, data) => {
          const adjacent = (attr) => {
            const adj = index === 0 ? data[index + 1] : data[index - 1];
            return adj[attr];
          };
          return { _x: adjacent("_x"), _y: adjacent("_y"), _y0: adjacent("_y0") };
        },
        after: (datum) => ({ _x: datum._x, _y: datum._y, _y1: datum._y1, _y0: datum._y0 })
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
