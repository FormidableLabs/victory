import { assign } from "lodash";

// *
// * Colors
// *
const colors = [
  "#ffffff",
  "#f0f0f0",
  "#d9d9d9",
  "#bdbdbd",
  "#969696",
  "#737373",
  "#525252",
  "#252525",
  "#000000"
];

const charcoal = "#252525";
// *
// * Typography
// *
const sansSerif = "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: "transparent"
};
// *
// * Strokes
// *
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

export default {
  area: {
    style: {
      data: {
        fill: charcoal
      },
      labels: baseLabelStyles
    }
  },
  axis: {
    style: {
      axis: {
        fill: "none",
        stroke: charcoal,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: assign({}, baseLabelStyles, {
        padding: 25
      }),
      grid: {
        fill: "none",
        stroke: "transparent",
      },
      ticks: {
        fill: "none",
        padding: 10,
        size: 1,
        stroke: "transparent"
      },
      tickLabels: baseLabelStyles
    }
  },
  bar: {
    style: {
      data: {
        fill: charcoal,
        padding: 10,
        stroke: "transparent",
        strokeWidth: 0,
        width: 8
      },
      labels: baseLabelStyles
    }
  },
  candlestick: {
    style: {
      data: {
        stroke: charcoal,
        strokeWidth: 1
      },
      labels: assign({}, baseLabelStyles, {
        padding: 25,
        textAnchor: "end"
      })
    },
    candleColors: {
      positive: "#ffffff",
      negative: charcoal
    }
  },
  errorbar: {
    style: {
      data: {
        fill: "none",
        stroke: charcoal,
        strokeWidth: 2
      },
      labels: assign({}, baseLabelStyles, {
        textAnchor: "start"
      })
    }
  },
  line: {
    style: {
      data: {
        fill: "none",
        stroke: charcoal,
        strokeWidth: 2
      },
      labels: assign({}, baseLabelStyles, {
        textAnchor: "start"
      })
    }
  },
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: "none",
        strokeWidth: 1
      },
      labels: assign({}, baseLabelStyles, {
        padding: 200,
        textAnchor: "middle"
      })
    },
    colorScale: colors
  },
  scatter: {
    style: {
      data: {
        fill: charcoal,
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: Object.assign({}, baseLabelStyles, {
        textAnchor: "middle"
      })
    }
  },
  props: Object.assign({}, baseProps,
    {
      colorScale: colors
    }
  )
};
