import AnimationDocs from "victory-core/docs/victory-animation/docs";
import AreaDocs from "victory-chart/docs/victory-area/docs";
import AxisDocs from "victory-chart/docs/victory-axis/docs";
import BarDocs from "victory-chart/docs/victory-bar/docs";
import ChartDocs from "victory-chart/docs/victory-chart/docs";
import LabelDocs from "victory-core/docs/victory-label/docs";
import LineDocs from "victory-chart/docs/victory-line/docs";
import PieDocs from "victory-pie/docs/docs";
import ScatterDocs from "victory-chart/docs/victory-scatter/docs";

const routing = {
  base: "/"
};
const headerText = "Looking for a custom dashboard? Need help leveling up your data visualizations?"
  + " Let’s talk!";

const components = [
  {
    text: "VictoryAnimation",
    slug: "victory-animation",
    docs: AnimationDocs
  }, {
    text: "VictoryArea",
    slug: "victory-area",
    docs: AreaDocs
  }, {
    text: "VictoryAxis",
    slug: "victory-axis",
    docs: AxisDocs
  }, {
    text: "VictoryBar",
    slug: "victory-bar",
    docs: BarDocs
  }, {
    text: "VictoryChart",
    slug: "victory-chart",
    docs: ChartDocs
  }, {
    text: "VictoryLabel",
    slug: "victory-label",
    docs: LabelDocs
  }, {
    text: "VictoryLine",
    slug: "victory-line",
    docs: LineDocs
  }, {
    text: "VictoryPie",
    slug: "victory-pie",
    docs: PieDocs
  }, {
    text: "VictoryScatter",
    slug: "victory-scatter",
    docs: ScatterDocs
  }
];

export {
  routing,
  headerText,
  components
};
