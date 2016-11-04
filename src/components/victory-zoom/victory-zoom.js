/* globals requestAnimationFrame */
import React, {Component, PropTypes} from "react";
import { assign, groupBy } from "lodash";
import ChartHelpers from "../victory-chart/helper-methods";
import ZoomHelpers from "./helper-methods";
import {VictoryClipContainer, Helpers, PropTypes as CustomPropTypes} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

class VictoryZoom extends Component {
  static displayName = "VictoryZoom";
  static role = "zoom";

  static propTypes = {
    children: PropTypes.node,
    initialDomain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({
        x: CustomPropTypes.domain,
        y: CustomPropTypes.domain
      })
    ]),
    clipContainerComponent: PropTypes.element.isRequired
  }

  static defaultProps = {
    clipContainerComponent: <VictoryClipContainer/>
  }

  constructor(props) {
    super(props);

    const chart = React.Children.only(this.props.children);
    const chartChildren = React.Children.toArray(chart);

    this.domain = {
      x: ChartHelpers.getDomain(chart.props, "x", chartChildren)
    };

    const [rangex1, rangex0] = Helpers.getRange(
      Helpers.modifyProps(chart.props, {}, "chart"), // TODO: Don't presume chart role
      "x"
    );

    this.plottableWidth = rangex0 - rangex1;
    this.width = chart.props.width || fallbackProps.width;
    this.state = { domain: props.initialDomain || this.domain };

    this.events = this.initializeEvents();
    this.clipDataComponents = this.clipDataComponents.bind(this);
  }

  componentWillMount() {
    this.getChartRef = (chart) => { this.chartRef = chart; };
  }

  initializeEvents() {
    return [{
      target: "parent",
      eventHandlers: {
        onMouseDown: (evt) => {
          this.targetBounds = this.chartRef.getSvgBounds();
          const x = evt.clientX - this.targetBounds.left;
          this.isPanning = true;
          this.startX = x;
          this.lastDomain = this.state.domain;
        },
        onMouseUp: () => { this.isPanning = false; },
        onMouseLeave: () => { this.isPanning = false; },
        onMouseMove: (evt) => {
          const clientX = evt.clientX;
          if (this.isPanning) {
            requestAnimationFrame(() => {
              const delta = this.startX - (clientX - this.targetBounds.left);
              const calculatedDx = delta / this.getDomainScale();
              const nextXDomain = ZoomHelpers.pan(this.lastDomain.x, this.domain.x, calculatedDx);
              this.setState({domain: {x: nextXDomain}});
            });
          }
        },
        onWheel: (evt) => {
          evt.preventDefault();
          const deltaY = evt.deltaY;
          requestAnimationFrame(() => {
            const {x} = this.state.domain;
            const {x: xBounds} = this.domain;

            // TODO: Check scale factor
            const nextXDomain = ZoomHelpers.scale(x, xBounds, 1 + (deltaY / 100));
            this.setState({domain: {x: nextXDomain}});
          });
        }
      }
    }];
  }

  getDomainScale() {
    const {x: [from, to]} = this.lastDomain;
    const ratio = this.targetBounds.width / this.width;
    const absoluteAxisWidth = ratio * this.plottableWidth;
    return absoluteAxisWidth / (to - from);
  }

  clipDataComponents(children, props) {
    const {data, axes = []} = groupBy(children, (child) => {
      return child.type.displayName === "VictoryAxis"
      ? "axes"
      : "data";
    });

    const [rangex0, rangex1] = Helpers.getRange(props, "x");

    return [
      React.cloneElement(this.props.clipContainerComponent, {
        key: "ZoomClipContainer",
        clipWidth: rangex1 - rangex0,
        clipHeight: fallbackProps.height,
        translateX: rangex0,
        children: data
      }),
      ...axes
    ];
  }

  renderChart(chartElement, props) {
    return React.cloneElement(chartElement, props);
  }

  render() {
    const chart = React.Children.only(this.props.children);
    const nextProps = assign({}, chart.props, {
      events: chart.props.events ? chart.props.events.unshift(...this.events) : this.events,
      domain: this.state.domain,
      ref: this.getChartRef,
      modifyChildren: this.clipDataComponents
    });

    return this.renderChart(chart, nextProps);
  }

}
export default VictoryZoom;
