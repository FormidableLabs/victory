export default {
  axis: {
    style: {
      axis: {
        fill: "transparent",
        strokeWidth: 3,
        stroke: "#90A4AE"
      },
      grid: {
        fill: "transparent",
        stroke: "#ECEFF1",
        strokeWidth: 3
      },
      ticks: {
        size: 15
      },
      tickLabels: {
        fill: "#00796B"
      }
    },
    width: 500,
    height: 400,
    padding: 25
  },
  independentAxis: {
    style: {
      axis: {
        stroke: "#F4511E"
      },
      ticks: {
        strokeWidth: 3,
        stroke: "#F4511E"
      }
    },
    offsetY: 200
  },
  dependentAxis: {
    style: {
      axis: {
        strokeWidth: 1
      },
      grid: {
        strokeWidth: 1
      },
      tickLabels: {
        fill: "#000000"
      }
    },
    offsetX: 250
  }
};
