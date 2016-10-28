/* globals setTimeout clearTimeout */
import React, {Component, PropTypes} from "react";
import { addEvents, Data, Domain, VictorySharedEvents, VictoryContainer} from "victory-core/src";
import { assign, throttle } from "lodash";
import ChartHelpers from "../victory-chart/helper-methods";

// TODO: [x] Get calculated domain
// TODO: [x] Get chart width or fallback
// TODO: [ ] targetBounds of SVG rather than event target.
// TODO: [ ] Get true axis width
// TODO: [x] What is the correct way to calculate zoom?
// TODO: [x] Limit zoom to data bounds
// TODO: [ ] Zoom from mouse position

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const scale = (factor, [from, to]) => {
  const range = Math.abs(from - to);
  const midpoint = from + (range / 2);
  const newRange = (range * factor) / 2;
  return [midpoint - newRange, midpoint + newRange];
};

class VictoryZoom extends Component {
  static displayName = "VictoryZoom";
  static role = "zoom";

  constructor(props) {
    super(props);

    const chart = React.Children.only(this.props.children);
    const chartChildren = React.Children.toArray(chart);
    const domain = {
      x: ChartHelpers.getDomain(chart.props, "x", chartChildren)
    };

    this.state = {
      domain,
      lastDomain: domain,
      startX: 0,
      isPanning: false,
      width: chart.props.width || fallbackProps.width
    };
  }

  static propTypes = {
    children: PropTypes.node,
    domain: PropTypes.array
  }

  getTargetContainer = () => {
    const chart = React.Children.only(this.props.children);
    console.log(chart.props.containerComponent);
  }

  render() {
    const events = [{
      target: "parent",
      eventHandlers: {
        onMouseDown: (evt) => {
          this.getTargetContainer();
          this.targetBounds = evt.target.getBoundingClientRect();
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
          if (!this.throttleTimer && this.isPanning) {
            this.throttleTimer = setTimeout(() => {
              const {x: [from, to]} = this.lastDomain;
              const delta = this.startX - (clientX - this.targetBounds.left);
              const ratio = this.targetBounds.width / this.state.width;
              const absoluteAxisWidth = ratio * 350;
              const domainDeltaRatio = absoluteAxisWidth / (to - from);
              const nextXDomain = [
                from + (delta / domainDeltaRatio),
                to + (delta / domainDeltaRatio)
              ];

              this.setState({domain: {x: nextXDomain}});
              clearTimeout(this.throttleTimer);
              this.throttleTimer = null;
            }, 50);
          }
        },
        onWheel: (evt) => {
          evt.preventDefault();
          const deltaY = evt.deltaY;
          const {x} = this.state.domain;
          const nextXDomain = scale(1 + (deltaY / 100), x);
          this.setState({domain: {x: nextXDomain}});
        }
      }
    }];

    const chart = React.Children.only(this.props.children);
    const nextProps = assign({
      events,
      domain: this.state.domain
    }, chart.props);
    return React.cloneElement(chart, nextProps);
  }

}
export default VictoryZoom;
