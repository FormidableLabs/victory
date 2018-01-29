import React from "react";
import PropTypes from "prop-types";
import { Selection, Line } from "victory-core";
import { assign, defaults, isEqual, isFunction } from "lodash";

const toRange = (props, domain) => {
  const scale = props.scale[props.dimension];
  return [scale(Math.min(...domain)), scale(Math.max(...domain))];
};

const toDomain = (props, range) => {
  const scale = props.scale[props.dimension];
  return [scale.invert(Math.min(...range)), scale.invert(Math.max(...range))];
};

const getFullRange = (props) => {
  const scale = props.scale[props.dimension];
  return scale.range();
};

const getHandles = (props, range) => {
  const min = Math.min(...range);
  const max = Math.max(...range);
  const handleWidth = props.handleWidth / 2;
  return {
    min: [min - handleWidth, min + handleWidth], max: [max - handleWidth, max + handleWidth]
  };
};

const withinBound = (value, bound) => {
  return value >= Math.min(...bound) && value <= Math.max(...bound);
};

const getMinimumDomain = () => {
  return [0, 1 / Number.MAX_SAFE_INTEGER];
};

const panBox = (props, position) => {
  const { brushDomain, startPosition } = props;
  const range = toRange(props, brushDomain);
  const fullRange = getFullRange(props);
  const size = Math.abs(range[1] - range[0]);
  const globalMin = Math.min(...fullRange);
  const globalMax = Math.max(...fullRange);
  const delta = startPosition ? startPosition - position : 0;
  const min = Math.min(...range) - delta;
  const max = Math.max(...range) - delta;
  const constrainedMin = max > globalMax ? globalMax - size : min;
  const constrainedMax = min < globalMin ? globalMin + size : max;
  return [constrainedMin, constrainedMax];
};

const getCurrentDomain = (props) => {
  const { dimension, currentDomain } = props;
  const scale = props.scale[dimension];
  const fullDomain = props.fullDomain || scale && scale.domain();
  const brushDomain = props.brushDomain || fullDomain;
  return currentDomain || brushDomain || getMinimumDomain();
};

export default class VictoryBrushLine extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    allowDrag: PropTypes.bool,
    allowResize: PropTypes.bool,
    brushAreaComponent: PropTypes.element,
    brushComponent: PropTypes.element,
    brushDimension: PropTypes.oneOf(["x", "y"]),
    brushWidth: PropTypes.number,
    brushDomain: PropTypes.array,
    brushStyle: PropTypes.object,
    brushAreaStyle: PropTypes.object,
    dimension: PropTypes.oneOf(["x", "y"]),
    handleComponent: PropTypes.element,
    handleStyle: PropTypes.object,
    handleWidth: PropTypes.number,
    lineComponent: PropTypes.element,
    onBrushDomainChange: PropTypes.func,
    scale: PropTypes.object,
    style: PropTypes.object,
    type: PropTypes.string
  };

  static defaultProps = {
    type: "axis",
    allowDrag: true,
    allowResize: true,
    brushAreaComponent: <rect/>,
    brushAreaStyle: {
      stroke: "transparent",
      fill: "black",
      fillOpacity: 0.1
    },
    brushComponent: <rect/>,
    brushStyle: {
      stroke: "black",
      fill: "black",
      opacity: 0.15
    },
    brushWidth: 10,
    handleComponent: <rect/>,
    handleStyle: {
      stroke: "transparent",
      fill: "transparent"
    },
    handleWidth: 8,
    lineComponent: <Line/>
  };

  static defaultEvents = function (props) {
    return [{
      target: props.type,
      eventHandlers: {
        onMouseLeave(evt, targetProps) {
          const { currentDomain, cachedBrushDomain } = targetProps;
          return [{
            mutation: () => ({
              isPanning: false, isSelecting: false, currentDomain, cachedBrushDomain
            })
          }];
        },
        onMouseMove: (evt, targetProps) => { // eslint-disable-line max-statements, complexity
          if (!targetProps.isPanning && !targetProps.isSelecting) {
            return [];
          }
          const {
            isPanning, isSelecting, allowResize, allowDrag, dimension, onBrushDomainChange,
            cachedBrushDomain
          } = targetProps;
          const fullRange = getFullRange(targetProps);
          const position = Selection.getSVGEventCoordinates(evt)[dimension];
          if (allowDrag && isPanning) {
            const range = panBox(targetProps, position);
            const currentDomain = toDomain(targetProps, range);
            // const startPosition = Math.max(...range) >= Math.max(...fullRange) ||
            //   Math.min(...range) <= Math.min(...fullRange) ?
            //   targetProps.startPosition : position;
            const startPosition = targetProps.startPosition;
            const mutatedProps = {
              startPosition, isPanning: true, currentDomain, cachedBrushDomain
            };

            if (isFunction(onBrushDomainChange)) {
              onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
            }
            return [{
              target: props.type,
              eventKey: 0,
              mutation: () => mutatedProps
            }];
          } else if (allowResize && isSelecting) {
            const currentDomain = toDomain(targetProps, [targetProps.startPosition, position]);
            const mutatedProps = {
              currentDomain, startPosition: targetProps.startPosition, isSelecting, cachedBrushDomain
            };
            if (isFunction(onBrushDomainChange)) {
              onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
            }
            return [{
              target: props.type,
              eventKey: 0,
              mutation: () => mutatedProps
            }];
          }
          return [];
        },
        onMouseUp(evt, targetProps) {
          const { onBrushDomainChange, currentDomain, allowResize, cachedBrushDomain } = targetProps;
          // if the mouse hasn't moved since a mouseDown event, select the whole domain region
          if (allowResize) {
            const mutatedProps = {
              isPanning: false, isSelecting: false, currentDomain, cachedBrushDomain
            };
            if (isFunction(onBrushDomainChange)) {
              onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
            }
            return [{
              target: props.type,
              eventKey: 0,
              mutation: () => mutatedProps
            }];
          }
          return [{
            mutation: () => ({
              isPanning: false, isSelecting: false, currentDomain, cachedBrushDomain
            })
          }];
        },
        onMouseDown: (evt, targetProps) => {
          evt.preventDefault();
          const {
            scale, allowResize, allowDrag, dimension
          } = targetProps;

          // Don't trigger events for static brushes
          if (!allowResize && !allowDrag) {
            return [];
          }

          const fullDomain = targetProps.fullDomain || scale[dimension].domain();
          const brushDomain = targetProps.brushDomain || fullDomain;
          const currentDomain = getCurrentDomain(targetProps);
          const position = Selection.getSVGEventCoordinates(evt)[dimension];
          const range = toRange(targetProps, currentDomain);
          const handles = getHandles(targetProps, range);

          const activeHandles = allowResize &&
            (withinBound(position, handles.min)) || (withinBound(position, handles.max));
          // If the event occurs in any of the handle regions, start a resize
          if (activeHandles) {
            return [{
              mutation: () => {
                return ({
                  isSelecting: true, currentDomain, cachedBrushDomain: brushDomain,
                  startPosition: position
                });
              }
            }];
          } else if (withinBound(position, range) && !isEqual(fullDomain, currentDomain)) {
            // if the event occurs within a selected region start a panning event, unless the whole
            // domain is selected
            return [{
              target: props.type,
              eventKey: 0,
              mutation: () => ({
                isPanning: allowDrag, startPosition: position,
                currentDomain, cachedBrushDomain: brushDomain
              })
            }];
          } else {
            // if the event occurs outside the region, or if the whole domain is selected,
            // start a new selection
            return allowResize ? [{
              target: props.type,
              eventKey: 0,
              mutation: () => ({
                isSelecting: allowResize,
                currentDomain: getMinimumDomain(),
                cachedBrushDomain: brushDomain,
                startPosition: position
              })
            }] : [];
          }
        }
      }
    }];
  };

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

  getFullDomain(props) {
    const scale = props.scale[props.dimension];
    return scale && scale.domain();
  }

  getRectDimensions(props, domain) {
    const { dimension, brushWidth } = props;
    domain = domain || getCurrentDomain(props);
    const range = toRange(props, domain);
    const coordinates = dimension === "x" ?
      { y1: props.y1, y2: props.y2, x1: Math.min(...range), x2: Math.max(...range) } :
      { x1: props.x1, x2: props.x2, y1: Math.min(...range), y2: Math.max(...range) };
    const { x1, x2, y1, y2 } = coordinates;
    const offset = {
      x: dimension === "x" ? 0 : brushWidth / 2,
      y: dimension === "y" ? 0 : brushWidth / 2
    };

    const x = Math.min(x1, x2) - offset.x;
    const y = Math.min(y1, y2) - offset.y;
    const width = Math.max(x1, x2) + offset.x - x;
    const height = Math.max(y1, y2) + offset.y - y;
    return { x, y, width, height };
  }

  renderBrush(props) {
    const { brushComponent, events, brushStyle } = props;
    const rectDimensions = this.getRectDimensions(props);
    const style = brushStyle;
    const brushProps = assign({ style }, rectDimensions, events);
    return React.cloneElement(brushComponent, brushProps);
  }

  renderBrushArea(props) {
    const { brushAreaComponent, events, brushAreaStyle } = props;
    const rectDimensions = this.getRectDimensions(props, this.getFullDomain(props));
    const style = brushAreaStyle;
    const brushAreaProps = assign({ style }, rectDimensions, events);
    return React.cloneElement(brushAreaComponent, brushAreaProps);
  }

  renderLine(props) {
    return <Line {...props}/>;
  }

  render() {
    return (
      <g>
        {this.renderLine(this.props)}
        {this.renderBrushArea(this.props)}
        {this.renderBrush(this.props)}
      </g>
    );
  }
}
