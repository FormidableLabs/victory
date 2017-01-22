import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import { isFunction } from "lodash";


export default class VictoryBrushContainer extends VictoryContainer {
  static displayName = "VictorySelectionContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    selectionStyle: React.PropTypes.object,
    onSelection: React.PropTypes.func,
    onSelectionCleared: React.PropTypes.func,
    dimension: React.PropTypes.oneOf(["x", "y"])
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    selectionStyle: {
      stroke: "black",
      fill: "black",
      fillOpacity: 0.2
    },
    dimension: "x"
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        evt.preventDefault();
        const { dimension, scale } = targetProps;
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        const x1 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[0];
        const y1 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[0];
        const x2 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[1];
        const y2 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[1];
        if (isFunction(targetProps.onSelectionCleared)) {
          targetProps.onSelectionCleared();
        }
        return [
          {
            target: "parent",
            mutation: () => {
              return {x1, y1, select: true, x2, y2};
            }
          }
        ];
      },
      onMouseMove: (evt, targetProps) => {
        const {dimension, scale, select} = targetProps;
        if (!select) {
          return {};
        } else {
          const {x, y} = Selection.getSVGEventCoordinates(evt);
          const x2 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[1];
          const y2 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[1];
          return {
            target: "parent",
            mutation: () => {
              return { x2, y2 };
            }
          };
        }
      },
      onMouseUp: (evt, targetProps) => {
        const {x2, y2} = targetProps;
        const parentMutation = [{
          target: "parent",
          mutation: () => {
            return { select: false, x1: null, x2: null, y1: null, y2: null };
          }
        }];
        if (!x2 || !y2) {
          return parentMutation;
        }
      }
    }
  }];

  getRect(props) {
    const {x1, x2, y1, y2, selectionStyle} = props;
    const width = Math.abs(x2 - x1) || 1;
    const height = Math.abs(y2 - y1) || 1;
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    return y2 && x2 && x1 && y1 ?
      <rect x={x} y={y} width={width} height={height} style={selectionStyle}/> : null;
  }
  renderContainer(props, svgProps, style) {
    const { title, desc, children, portalComponent, className } = props;
    return (
      <g {...svgProps} style={style} className={className}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        {this.getRect(props)}
        {children}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </g>
    );
  }
}
