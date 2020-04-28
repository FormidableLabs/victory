import React from "react";
import PropTypes from "prop-types";
import { VictoryBar, Bar } from "../../victory-bar/src";
import { VictoryAxis } from "../../victory-axis/src";
import { VictoryChart } from "../../victory-chart/src";
import {
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  CommonProps,
  Domain,
  addEvents
} from "../../victory-core/src";
import { getBaseProps, getData, getDomain } from "./helper-methods";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = Array.from({ length: 40 }, () => ({
  x: Math.max(18, Math.floor(Math.random() * 100))
}));

export class VictoryHistogram extends React.Component {
  static animationWhitelist = ["data", "domain", "height", "padding", "style", "width"];

  static displayName = "VictoryHistogram";

  static role = "histogram";

  static propTypes = {
    barSpacing: PropTypes.number,
    barWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    bins: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    data: PropTypes.any,
    style: PropTypes.any,
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    alignment: PropTypes.oneOf(["start", "middle", "end"]),
    barRatio: PropTypes.number,
    barWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    cornerRadius: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.func,
      PropTypes.shape({
        top: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        topLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        topRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottomLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
        bottomRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func])
      })
    ]),
    getPath: PropTypes.func,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    data: defaultData,
    dataComponent: <Bar />,
    groupComponent: <g role="presentation" />,
    labelComponent: <VictoryLabel />,
    samples: 50,
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static getDomain = getDomain;
  static getData = getData;
  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static expectedComponents = [
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent"
  ];

  get accessor() {
    return (d) => d.x;
  }

  get scale() {
    const scale = d3Scale
      .scaleLinear()
      .domain(d3Array.extent(this.props.data, this.accessor))
      .nice()
      .domain();

    return scale;
  }

  get data() {
    const { bins } = this.props;
    const bin1 = d3Array.bin().value(this.accessor);
    bin1.domain(this.scale.domain());

    if (bins) {
      bin1.thresholds(bins);
    }

    const binnedData = bin1(this.props.data);

    const formattedData = binnedData.map((bin) => ({
      x: bin.x0,
      end: bin.x1,
      y: bin.length
    }));

    return formattedData;
  }

  getDistance = ({ scale, datum }) => {
    const current = scale.x(datum.x);
    const next = scale.x(datum.end);

    return Math.abs(next - current);
  };

  brender() {
    const { barWidth, barSpacing, horizontal } = this.props;

    return (
      <VictoryChart>
        <VictoryBar
          {...this.props}
          domain={{ x: this.scale.domain() }}
          data={this.data}
          barWidth={(props) => {
            if (barSpacing) {
              return this.getDistance(props) - barSpacing;
            }

            return this.getDistance(props);
          }}
          alignment="start"
          style={{
            ...this.props.style
          }}
          barOffset={(props) => {
            if (barSpacing) {
              const distance = barSpacing / 2;
              return [distance, 0];
            }

            return [0, 0];
          }}
        />

        <VictoryAxis />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
  }

  // Overridden in native versions
  shouldAnimate() {
    return !!this.props.animate;
  }

  render() {
    const { animationWhitelist, role } = VictoryHistogram;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderData(props);
    return props.standalone ? this.renderContainer(props.containerComponent, children) : children;
  }
}

export default addEvents(VictoryHistogram);
