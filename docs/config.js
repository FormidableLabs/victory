export default {
  routing: {
    base: "/"
  },
  headerText: "Looking for a custom dashboard? Need help leveling up your data visualizations? Let’s talk!",
  components: [
    {
      text: "VictoryAnimation",
      slug: "victory-animation",
      docs: require("victory-core/docs/victory-animation/docs")
    }, {
      text: "VictoryAxis",
      slug: "victory-axis",
      docs: require("victory-chart/docs/victory-axis/docs")
    }, {
      text: "VictoryBar",
      slug: "victory-bar",
      docs: require("victory-chart/docs/victory-bar/docs")
    }, {
      text: "VictoryChart",
      slug: "victory-chart",
      docs: require("victory-chart/docs/victory-chart/docs")
    }, {
      text: "VictoryLabel",
      slug: "victory-label",
      docs: require("victory-core/docs/victory-label/docs")
    }, {
      text: "VictoryLine",
      slug: "victory-line",
      docs: require("victory-chart/docs/victory-line/docs")
    }, {
      text: "VictoryPie",
      slug: "victory-pie",
      docs: require("victory-pie/docs/docs")
    }, {
      text: "VictoryScatter",
      slug: "victory-scatter",
      docs: require("victory-chart/docs/victory-scatter/docs")
    }
  ]
};
