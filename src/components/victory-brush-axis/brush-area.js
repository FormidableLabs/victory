import React from "react";
import PropTypes from "prop-types";
import { Collection, Helpers } from "victory-core";
import { assign } from "lodash";

export default class BrushArea extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    datum: PropTypes.any,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number
  };

  static defaultEvents = [{
    target: "brushArea",
    eventHandlers: {
      onClick: () => {
        console.log("WOO")
      }
    }
  }]

  // componentWillMount() {
  //   this.style = this.getStyle(this.props);
  // }

  // shouldComponentUpdate(nextProps) {
    // const { className, datum, x1, x2, y1, y2 } = this.props;
    // const style = this.getStyle(nextProps);
    // if (!Collection.allSetsEqual([
    //   [className, nextProps.className],
    //   [x1, nextProps.x1],
    //   [x2, nextProps.x2],
    //   [y1, nextProps.y1],
    //   [y2, nextProps.y2],
    //   [style, this.style],
    //   [datum, nextProps.datum]
    // ])) {
    //   this.style = style;
    //   return true;
    // }
    // return false;
  // }

  // getStyle(props) {
  //   const { style, datum, active } = props;
  //   return Helpers.evaluateStyle(assign({ stroke: "black" }, style), datum, active);
  // }

  // // Overridden in victory-core-native
  // renderAxisLine(props, style, events) {
  //   const { role, shapeRendering, className } = this.props;
  //   return (
  //     <line
  //       {...props}
  //       className={className}
  //       style={style}
  //       role={role || "presentation"}
  //       shapeRendering={shapeRendering || "auto"}
  //       vectorEffect="non-scaling-stroke"
  //       {...events}
  //     />
  //   );
  // }

  // render() {
  //   const { x1, x2, y1, y2, events } = this.props;
  //   return this.renderAxisLine({ x1, x2, y1, y2 }, this.style, events);
  // }

  render() {
    // const { x, y, width, height } = this.props;
    const style = { fill: "grey", opacity: 0.4 };
    console.log(this.props)
    return (
      <rect
        {...this.props}
        {...this.props.events}
        style={style}
      />
    );
  }
}
