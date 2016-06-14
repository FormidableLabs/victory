const grayscaleBlack = "#252525";
const fontStack = "Poppins, Helvetica-Neue, sans-serif";
const letterSpace = 0.2;
const labelFontSize = 10;
const dataTickLabelPadding = 5;

export default {
  line: {
    data: {
      stroke: grayscaleBlack,
      strokeWidth: 2,
      fill: "none",
      opacity: 1
    },
    labels: {
      padding: dataTickLabelPadding,
      fontFamily: fontStack,
      letterSpacing: letterSpace,
      fontSize: labelFontSize,
      strokeWidth: 0,
      stroke: "transparent",
      textAnchor: "start"
    },
    parent: {
      // parent styles here
    }
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
    labels: {
      fontSize: labelFontSize,
      padding: dataTickLabelPadding,
      fill: grayscaleBlack,
      fontFamily: fontStack,
      letterSpacing: letterSpace
    },
    parent: {
      // parent styles here
    }
  },
  scatter: {
    data: {
      fill: grayscaleBlack,
      opacity: 1,
      stroke: "transparent",
      strokeWidth: 0
    },
    labels: {
      stroke: "transparent",
      fill: grayscaleBlack,
      fontFamily: fontStack,
      letterSpacing: letterSpace,
      fontSize: labelFontSize,
      textAnchor: "middle",
      padding: dataTickLabelPadding
    },
    parent: {
      // parent styles here
    }
  },
  axis: {
    axis: {
      stroke: grayscaleBlack,
      fill: "none",
      strokeWidth: 2,
      strokeLinecap: "round"
    },
    axisLabel: {
      stroke: "transparent",
      fill: grayscaleBlack,
      padding: 40,
      fontSize: labelFontSize,
      fontFamily: fontStack,
      letterSpacing: letterSpace
    },
    grid: {
      stroke: "#d9d9d9",
      fill: "none",
      strokeLinecap: "round"
    },
    ticks: {
      stroke: "none",
      fill: "none",
      padding: dataTickLabelPadding,
      strokeWidth: 2,
      strokeLinecap: "round",
      size: 4
    },
    tickLabels: {
      stroke: "transparent",
      fill: grayscaleBlack,
      fontFamily: fontStack,
      letterSpacing: letterSpace,
      fontSize: labelFontSize,
      padding: dataTickLabelPadding
    }
  },
  area: {
    data: {
      fill: grayscaleBlack
    },
    labels: {
      fontSize: labelFontSize,
      padding: dataTickLabelPadding,
      fill: grayscaleBlack,
      fontFamily: fontStack,
      letterSpacing: letterSpace
    },
    parent: {
      // parent styles here
    }
  },
  pie: {
    data: {
      // data styles here
    },
    labels: {
      // labels styles here
    },
    parent: {
      // parent styles here
    }
  },
  colorScale: [grayscaleBlack, "#636363", "#969696", "#bdbdbd", "#d9d9d9"]
};
