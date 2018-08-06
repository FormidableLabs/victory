/* globals window */
/*eslint-disable no-magic-numbers,react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import { range, merge, random, minBy, maxBy, last, round } from "lodash";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryStack } from "../../packages/victory-stack/src/index";
import { VictoryGroup } from "../../packages/victory-group/src/index";
import { VictoryAxis } from "../../packages/victory-axis/src/index";
import { VictoryArea } from "../../packages/victory-area/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryLine } from "../../packages/victory-line/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryZoomContainer } from "../../packages/victory-zoom-container/src/index";
import { VictoryTooltip } from "../../packages/victory-tooltip/src/index";
import { VictoryLegend } from "../../packages/victory-legend/src/index";
import {
  VictoryTheme, VictoryClipContainer, VictoryPortal
} from "../../packages/victory-core/src/index";

const allData = range(0, 10, 0.001).map((x) => ({
  x, y: Math.sin(Math.PI * x / 2) * x / 10
}));

class CustomChart extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    maxPoints: PropTypes.number,
    style: PropTypes.object
  };

  constructor(props) {
    super();
    this.entireDomain = this.getEntireDomain(props);
    this.state = {
      zoomedXDomain: this.entireDomain.x
    };
  }

  onDomainChange(domain) {
    this.setState({
      zoomedXDomain: domain.x
    });
  }

  getData() {
    const { zoomedXDomain } = this.state;
    const { data, maxPoints } = this.props;
    const filtered = data.filter(
      (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1])
    );

    if (filtered.length > maxPoints) {
      const k = Math.ceil(filtered.length / maxPoints);
      return filtered.filter(
        (d, i) => ((i % k) === 0)
      );
    }
    return filtered;
  }

  getEntireDomain(props) {
    const { data } = props;
    return {
      y: [minBy(data, (d) => d.y).y, maxBy(data, (d) => d.y).y],
      x: [ data[0].x, last(data).x ]
    };
  }
  getZoomFactor() {
    const { zoomedXDomain } = this.state;
    const factor = 10 / (zoomedXDomain[1] - zoomedXDomain[0]);
    return round(factor, factor < 3 ? 1 : 0);
  }

  render() {
    const renderedData = this.getData();
    return (
      <VictoryChart
        style={this.props.style}
        domain={this.entireDomain}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            onZoomDomainChange={this.onDomainChange.bind(this)}
            minimumZoom={{ x: 1 / 10000 }}
          />
        }
      >
        <VictoryScatter data={renderedData} />
      </VictoryChart>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      arrayData: this.getArrayData(),
      style: {
        stroke: "blue",
        strokeWidth: 2
      },
      zoomDomain: this.getZoomDomain()
    };
  }

  state = {
    barData: range(-50, 75).map((i) => ({ x: i, y: Math.random() }))
  };

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData(),
        style: this.getStyles()
      });
    }, 10000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getZoomDomain() {
    return {
      y: [random(0, 0.4, 0.1), random(0.6, 1, 0.1)]
    };
  }

  getTransitionData() {
    const lines = random(6, 10);
    return range(lines).map((line) => {
      return { x: line, y: random(2, 10) };
    });
  }

  getData() {
    return range(50).map((i) => {
      return {
        x: i + 20,
        y: Math.random()
      };
    });
  }
  getArrayData() {
    return range(40).map((i) => [i, i + (Math.random() * 3)]);
  }

  getStyles() {
    const colors = ["red", "orange", "cyan", "green", "blue", "purple"];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }
  render() {
    const parentStyle = { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" };
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div className="demo" style={containerStyle}>


          <VictoryChart
            style={{ parent: parentStyle }}
            containerComponent={<VictoryZoomContainer/>}
          >
            <VictoryBar horizontal
              style={{ data: { stroke: "#333", fill: "#888", opacity: 0.4 } }}
              data={this.state.data}

            />
            <VictoryAxis/>
            <VictoryAxis dependentAxis/>
          </VictoryChart>



      </div>
    );
  }
}
