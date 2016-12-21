import React from "react";
import { VictoryContainer } from "victory-core";
import VoronoiHelpers from "./helper-methods";
import { assign } from "lodash";

export default class VictoryVoronoiContainer extends VictoryContainer {
  static displayName = "VictoryVoronoiContainer";
  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt) => {
        const {x, y} = VoronoiHelpers.getMousePosition(evt);
        return {
          target: "parent",
          mutation: (props) => {
            return assign({}, props, {x1: x, y1: y, select: true, x2: null, y2: null});
          }
        };
      },
      onMouseMove: (evt, containerProps) => {
        if (!containerProps.select) {
          return;
        } else {
          const {x, y} = VoronoiHelpers.getMousePosition(evt);
          return {
            target: "parent",
            mutation: (props) => {
              return assign({}, props, {x2: x, y2: y});
            }
          };
        }
      },
      onMouseUp: (evt) => {
        const {x, y} = VoronoiHelpers.getMousePosition(evt);
        return {
          target: "parent",
          mutation: (props) => {
            return assign({}, props, {x2: x, y2: y, select: false});
          }
        };
      }
    }
  }];

  getRect(props) {
    const {x1, x2, y1, y2} = props;
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    return y2 && x2 && x1 && y1 ?
      <rect x={x} y={y} width={width} height={height} fill="none" stroke="red"/> : null;
  }
  renderContainer(props, svgProps, style) {
    const { title, desc, children, portalComponent, className } = props;
    return (
      <svg {...svgProps} style={style} className={className}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        {this.getRect(props)}
        {children}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </svg>
    );
  }
}
