const grayscaleBlack = "#252525";
const fontStack = "Poppins, 'Century Gothic', 'Trebuchet MS', sans-serif";
const letterSpace = 0.2;
const labelFontSize = 10;
const dataTickLabelPadding = 5;
const strokeCap = "round";
const colors = ["#252525", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];
const baseLabelStyles = {
  fontFamily: fontStack,
  fontSize: labelFontSize,
  letterSpacing: letterSpace,
  padding: dataTickLabelPadding,
  fill: grayscaleBlack
};
const baseProps = {
  width: 250,
  height: 250
};

export default {
  line: {
    data: {
      stroke: grayscaleBlack,
      strokeWidth: 2,
      fill: "none",
      opacity: 1
    },
    labels: Object.assign({}, baseLabelStyles,
      {
        strokeWidth: 0,
        stroke: "transparent",
        textAnchor: "start"
      }),
    parent: {}
  },
  bar: {
    data: {
      width: 8,
      padding: 6,
      stroke: "transparent",
      strokeWidth: 0,
      fill: grayscaleBlack,
      opacity: 1
    },
    labels: baseLabelStyles,
    parent: {}
  },
  scatter: {
    data: {
      fill: grayscaleBlack,
      opacity: 1,
      stroke: "transparent",
      strokeWidth: 0
    },
    labels: Object.assign({}, baseLabelStyles,
      {
        stroke: "transparent",
        textAnchor: "middle"
      }),
    parent: {}
  },
  axis: {
    axis: {
      stroke: grayscaleBlack,
      fill: "none",
      strokeWidth: 2,
      strokeLinecap: strokeCap
    },
    axisLabel: Object.assign({}, baseLabelStyles,
      {
        stroke: "transparent",
        padding: dataTickLabelPadding * 2
      }),
    grid: {
      stroke: "#d9d9d9",
      fill: "none",
      strokeLinecap: strokeCap
    },
    ticks: {
      stroke: "none",
      fill: "none",
      padding: dataTickLabelPadding,
      strokeWidth: 2,
      strokeLinecap: strokeCap,
      size: 4
    },
    tickLabels: Object.assign({}, baseLabelStyles,
      {
        stroke: "transparent",
        fill: (tick, index) => typeof tick === "number" && index % 2 !== 0 ?
        "transparent" : grayscaleBlack
      })
  },
  area: {
    data: {
      fill: grayscaleBlack
    },
    labels: baseLabelStyles,
    parent: {}
  },
  pie: {
    props: Object.assign({}, baseProps,
      {colorScale: ["#252525", "#636363", "#969696", "#bdbdbd", "#d9d9d9", "#f7f7f7"]}),
    style: {
      data: {
        padding: dataTickLabelPadding,
        stroke: "#f7f7f7",
        strokeWidth: 1
      },
      labels: Object.assign({}, baseLabelStyles,
        {
          padding: 200,
          strokeWidth: 0,
          stroke: "transparent",
          textAnchor: "middle"
        }),
      parent: {}
    }
  },
  props: Object.assign({}, baseProps,
    {colorScale: colors})
};
