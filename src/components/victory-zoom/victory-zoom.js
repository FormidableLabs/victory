/* globals requestAnimationFrame */
import React, {Component, PropTypes} from "react";
import { assign } from "lodash";
import ChartHelpers from "../victory-chart/helper-methods";
import {VictoryClipContainer} from "victory-core/src";

// TODO: [x] Get calculated domain
// TODO: [x] Get chart width or fallback
// TODO: [x] targetBounds of SVG rather than event target.
// TODO: [ ] Get true axis width
// TODO: [x] What is the correct way to calculate zoom?
// TODO: [x] Limit zoom to data bounds on Zoom out
// TODO: [x] Limit pan to data bounds
// TODO: [ ] Zoom from mouse position?

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const scale = (factor, [fromBound, toBound], [from, to]) => {
  const range = Math.abs(from - to);
  const midpoint = from + (range / 2);
  const newRange = (range * factor) / 2;
  return [
    Math.max(midpoint - newRange, fromBound),
    Math.min(midpoint + newRange, toBound)
  ];
};

const pan = (currentDomain, originalDomain, delta) => {
  const [fromCurrent, toCurrent] = currentDomain;
  const [fromOriginal, toOriginal] = originalDomain;
  const lowerBound = fromCurrent + delta;
  const upperBound = toCurrent + delta;

  if (lowerBound > fromOriginal && upperBound < toOriginal) {
    return [lowerBound, upperBound];
  } else if (lowerBound < fromOriginal) { // Clamp to lower limit
    const dx = toCurrent - fromCurrent;
    return [fromOriginal, fromOriginal + dx];
  } else if (upperBound > toOriginal) { // Clamp to upper limit
    const dx = toCurrent - fromCurrent;
    return [toOriginal - dx, toOriginal];
  }
};


class VictoryZoom extends Component {
  static displayName = "VictoryZoom";
  static role = "zoom";

  constructor(props) {
    super(props);

    const chart = React.Children.only(this.props.children);
    const chartChildren = React.Children.toArray(chart);
    this.domain = {
      x: ChartHelpers.getDomain(chart.props, "x", chartChildren)
    };

    this.width = chart.props.width || fallbackProps.width;

    this.state = {
      domain: this.domain
    };
  }

  static propTypes = {
    children: PropTypes.node,
    domain: PropTypes.array
  }

  componentWillMount() {
    this.getChartRef = (chart) => { this.chartRef = chart; };
  }

  render() {
    const events = [{
      target: "parent",
      eventHandlers: {
        onMouseDown: (evt) => {
          this.targetBounds = this.chartRef.getSvgRef().getBoundingClientRect();
          const x = evt.clientX - this.targetBounds.left;
          this.isPanning = true;
          this.startX = x;
          this.lastDomain = this.state.domain;
        },
        onMouseUp: () => {
          this.isPanning = false;
        },
        onMouseLeave: () => {
          this.isPanning = false;
        },
        onMouseMove: (evt) => {
          const clientX = evt.clientX;
          if (this.isPanning) {
            requestAnimationFrame(() => {
              const {x: [from, to]} = this.lastDomain;
              const ratio = this.targetBounds.width / this.width;
              const absoluteAxisWidth = ratio * 350;
              const domainDeltaRatio = absoluteAxisWidth / (to - from);
              const delta = this.startX - (clientX - this.targetBounds.left);
              const calculatedDx = delta / domainDeltaRatio;

              const nextXDomain = pan(this.lastDomain.x, this.domain.x, calculatedDx);
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
            const nextXDomain = scale(1 + (deltaY / 100), xBounds, x);
            this.setState({domain: {x: nextXDomain}});
          });
        }
      }
    }];

    const chart = React.Children.only(this.props.children);
    const nextProps = assign({
      events,
      domain: this.state.domain,
      ref: this.getChartRef
    }, chart.props);
    return React.cloneElement(chart, nextProps);
  }

}
export default VictoryZoom;
