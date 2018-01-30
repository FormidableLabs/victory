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

const getFullDomain = (props) => {
  const scale = props.scale[props.dimension];
  return scale.domain();
};

const getHandles = (props, range) => {
  const { handleWidth } = props;
  const min = Math.min(...range);
  const max = Math.max(...range);
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

const getCurrentDomain = (props) => {
  const { currentDomain, cachedBrushDomain, brushDomain } = props;
  // if (brushDomain && !isEqual(brushDomain, cachedBrushDomain)) {
  //   return brushDomain;
  // }
  return currentDomain || brushDomain || getFullDomain();
};

const panBox = (props, position) => {
  const { brushDomain, startPosition, currentDomain } = props;
  const range = currentDomain ? toRange(props, currentDomain) : toRange(props, brushDomain);
  const fullRange = getFullRange(props);
  const size = Math.abs(range[1] - range[0]);
  const globalMin = Math.min(...fullRange);
  const globalMax = Math.max(...fullRange);
  const delta = startPosition ? startPosition - position : 0;
  const min = Math.min(...range) - delta;
  const max = Math.max(...range) - delta;
  const constrainedMin = min > globalMax - size ? globalMax - size : Math.max(min, globalMin);
  const constrainedMax = max < globalMin + size ? globalMin + size : Math.min(max, globalMax);
  return [constrainedMin, constrainedMax];
};

export default class VictoryBrushLine extends React.Component {
  static propTypes = {
    allowDrag: PropTypes.bool,
    allowResize: PropTypes.bool,
    brushAreaComponent: PropTypes.element,
    brushAreaStyle: PropTypes.object,
    brushComponent: PropTypes.element,
    brushDimension: PropTypes.oneOf(["x", "y"]),
    brushDomain: PropTypes.array,
    brushStyle: PropTypes.object,
    brushWidth: PropTypes.number,
    className: PropTypes.string,
    dimension: PropTypes.oneOf(["x", "y"]),
    events: PropTypes.object,
    groupComponent: PropTypes.element,
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
      cursor: "move",
      opacity: 0.15
    },
    brushWidth: 10,
    groupComponent: <g/>,
    handleComponent: <rect/>,
    handleStyle: {
      stroke: "none",
      fill: "none"
    },
    handleWidth: 10,
    lineComponent: <Line/>
  };

  static defaultEvents = function (props) {
    return [{
      target: props.type,
      eventHandlers: {
        onMouseDown: (evt, targetProps) => {
          evt.preventDefault();
          const {
            scale, allowResize, allowDrag, dimension, brushDomain
          } = targetProps;

          // Don't trigger events for static brushes
          if (!allowResize && !allowDrag) {
            return [];
          }

          const fullDomain = targetProps.fullDomain || scale[dimension].domain();
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
              mutation: () => ({
                isPanning: allowDrag, startPosition: position,
                currentDomain, cachedBrushDomain: brushDomain
              })
            }];
          } else {
            // if the event occurs outside the region, or if the whole domain is selected,
            // start a new selection
            return allowResize ? [{
              mutation: () => ({
                isSelecting: allowResize,
                currentDomain: getMinimumDomain(),
                cachedBrushDomain: brushDomain,
                startPosition: position
              })
            }] : [];
          }
        },
        onMouseMove: (evt, targetProps) => { // eslint-disable-line max-statements, complexity
          if (!targetProps.isPanning && !targetProps.isSelecting) {
            return [];
          }
          const {
            isPanning, isSelecting, allowResize, allowDrag, dimension, onBrushDomainChange,
            cachedBrushDomain
          } = targetProps;
          const position = Selection.getSVGEventCoordinates(evt)[dimension];
          if (allowDrag && isPanning) {
            const fullRange = getFullRange(targetProps);
            const range = panBox(targetProps, position);
            const currentDomain = toDomain(targetProps, range);
            const startPosition = Math.max(...range) >= Math.max(...fullRange) ||
              Math.min(...range) <= Math.min(...fullRange) ?
              targetProps.startPosition : position;
            const mutatedProps = {
              startPosition, isPanning: true, currentDomain, cachedBrushDomain
            };

            if (isFunction(onBrushDomainChange)) {
              onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
            }
            return [{
              mutation: () => mutatedProps
            }];
          } else if (allowResize && isSelecting) {
            const range = toRange(targetProps, targetProps.currentDomain);
            const handles = getHandles(targetProps, range);
            const min = withinBound(position, handles.max) ?
              Math.min(...range) : Math.min(targetProps.startPosition, position);
            const max = withinBound(position, handles.min) ?
              Math.max(...range) : Math.max(targetProps.startPosition, position);
            const currentDomain = toDomain(targetProps, [min, max]);
            const mutatedProps = {
              currentDomain, startPosition: targetProps.startPosition,
              isSelecting, cachedBrushDomain
            };
            if (isFunction(onBrushDomainChange)) {
              onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
            }
            return [{
              mutation: () => (mutatedProps)
            }];
          }
          return [];
        },
        onMouseUp(evt, targetProps) {
          const { onBrushDomainChange, currentDomain, allowResize } = targetProps;
          // if the mouse hasn't moved since a mouseDown event, select the whole domain region
          const mutatedProps = {
            isPanning: false, isSelecting: false, currentDomain, cachedBrushDomain: currentDomain,
            brushDomain: currentDomain,
            startPosition: null
          };
          if (allowResize && isFunction(onBrushDomainChange)) {
            onBrushDomainChange(currentDomain, defaults({}, mutatedProps, targetProps));
          }
          return [{
            mutation: () => mutatedProps
          }];
        },
        onMouseLeave(evt, targetProps) {
          const { currentDomain, cachedBrushDomain } = targetProps;
          return [{
            mutation: () => ({
              isPanning: false, isSelecting: false, currentDomain, cachedBrushDomain,
              startPosition: null
            })
          }];
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

  getHandleDimensions(props) {
    const { dimension, brushWidth, handleWidth, x1, x2, y1, y2 } = props;
    const domain = getCurrentDomain(props);
    const range = toRange(props, domain);
    const defaultX = Math.min(x1, x2) - (brushWidth / 2);
    const defaultY = Math.min(y1, y2) - (brushWidth / 2);
    const x = {
      min: dimension === "x" ? Math.min(...range) : defaultX,
      max: dimension === "x" ? Math.max(...range) - handleWidth : defaultX
    };
    const y = {
      min: dimension === "y" ? Math.max(...range) - handleWidth : defaultY,
      max: dimension === "y" ? Math.min(...range) : defaultY
    };
    const width = dimension === "x" ? handleWidth : brushWidth;
    const height = dimension === "x" ? brushWidth : handleWidth;

    return {
      min: { x: x.min, y: y.min, width, height },
      max: { x: x.max, y: y.max, width, height }
    };
  }

  renderHandles(props) {
    const { handleComponent, handleStyle, dimension } = props;
    const handleDimensions = this.getHandleDimensions(props);
    const cursor = dimension === "x" ? "ew-resize" : "ns-resize";
    const style = assign({ cursor }, handleStyle);
    return [
      React.cloneElement(handleComponent, assign({ key: "min", style }, handleDimensions.min)),
      React.cloneElement(handleComponent, assign({ key: "max", style }, handleDimensions.max))
    ];
  }

  renderBrush(props) {
    const { brushComponent, brushStyle } = props;
    const rectDimensions = this.getRectDimensions(props);
    const brushProps = assign({ style: brushStyle }, rectDimensions);
    return React.cloneElement(brushComponent, brushProps);
  }

  renderBrushArea(props) {
    const { brushAreaComponent, brushAreaStyle } = props;
    const rectDimensions = this.getRectDimensions(props, getFullDomain(props));
    const brushAreaProps = assign({ style: brushAreaStyle }, rectDimensions);
    return React.cloneElement(brushAreaComponent, brushAreaProps);
  }

  renderLine(props) {
    return <Line {...props}/>;
  }

  render() {
    return (
      <g {...this.props.events}>
        {this.renderLine(this.props)}
        {this.renderBrushArea(this.props)}
        {this.renderBrush(this.props)}
        {this.renderHandles(this.props)}
      </g>
    );
  }
}
