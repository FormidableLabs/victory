import React from "react";
import {
  VictoryContainer, Selection, PropTypes as CustomPropTypes, Domain
} from "victory-core";
import Helpers from "./container-helper-methods";
import { isFunction, isEqual, assign } from "lodash";


export default class VictoryRangeContainer extends VictoryContainer {
  static displayName = "VictoryRangeContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    selectionStyle: React.PropTypes.object,
    dimension: React.PropTypes.oneOf(["x", "y"]),
    selectedDomain: React.PropTypes.shape({
      x: React.PropTypes.array,
      y: React.PropTypes.array
    }),
    onDomainChange: React.PropTypes.func,
    handleWidth: React.PropTypes.number
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    selectionStyle: {
      stroke: "black",
      fill: "black",
      fillOpacity: 0.2
    },
    dimension: "x",
    handleWidth: 5
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        evt.preventDefault();
        const { dimension, scale, selectedDomain } = targetProps;
        const fullDomain = targetProps.fullDomain || Helpers.getOriginalDomain(scale);
        const fullDomainBox = Helpers.getDomainBox(targetProps, fullDomain);
        const domainBox = Helpers.getDomainBox(targetProps, fullDomain, selectedDomain);
        const box = targetProps.box || domainBox;
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        if (!selectedDomain || isEqual(selectedDomain, fullDomain)) {
          const x1 = dimension !== "y" ? x : domainBox.x[0];
          const y1 = dimension !== "x" ? y : domainBox.y[0];
          const x2 = dimension !== "y" ? x : domainBox.x[1];
          const y2 = dimension !== "x" ? y : domainBox.y[1];
          return [{
            target: "parent",
            mutation: () => {
              return {
                startX: x, startY: y, isSelecting: true, domainBox, fullDomainBox,
                box: {
                  x: [ Math.min(x1, x2), Math.max(x1, x2) ],
                  y: [ Math.min(y1, y2), Math.max(y1, y2) ]
                }
              };
            }
          }];
        }
        const handles = Helpers.getHandles(targetProps, domainBox);
        if (Helpers.withinBounds({x, y}, handles.left)) {
          const x1 = dimension !== "y" ? x : domainBox.x[0];
          const x2 = Math.max(...domainBox.x);
          return [{
            target: "parent",
            mutation: () => {
              return {
                isSelecting: true, negativeSelection: true, fullDomainBox, domainBox,
                box: assign({}, box, { x: [ Math.min(x1, x2), Math.max(x1, x2) ]})
              };
            }
          }];
        } else if (Helpers.withinBounds({x, y}, handles.right)) {
          const x2 = dimension !== "y" ? x : domainBox.x[1];
          const x1 = Math.min(...domainBox.x);
          return [{
            target: "parent",
            mutation: () => {
              return {
                isSelecting: true, fullDomainBox, domainBox,
                box: assign({}, box, { x: [ Math.min(x1, x2), Math.max(x1, x2) ]})
              };
            }
          }];
        } else if (Helpers.withinBounds({x, y}, domainBox)) {
          return [{
            target: "parent",
            mutation: () => ({ isPanning: true, startX: x, startY: y, fullDomain, selectedDomain, box })
          }];
        } else {
          const x1 = dimension !== "y" ? x : domainBox.x[0];
          const y1 = dimension !== "x" ? y : domainBox.y[0];
          const x2 = dimension !== "y" ? x : domainBox.x[1];
          const y2 = dimension !== "x" ? y : domainBox.y[1];
          return [{
            target: "parent",
            mutation: () => {
              return {
                startX: x, startY: y, isSelecting: true, domainBox,
                box: {
                  x: [ Math.min(x1, x2), Math.max(x1, x2) ],
                  y: [ Math.min(y1, y2), Math.max(y1, y2) ]
                }
              };
            }
          }];
        }
      },
      onMouseMove: (evt, targetProps) => {
        if (!targetProps.isPanning && !targetProps.isSelecting) {
          return {};
        }
        const {
          dimension, scale, isPanning, isSelecting, startX, startY, fullDomainBox, box
        } = targetProps;
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        if (isPanning) {
          const delta = {
            x: startX ? startX - x : 0,
            y: startY ? startY - y : 0
          };
          const x1 = dimension !== "y" ? box.x[0] - delta.x : box.x[0];
          const x2 = dimension !== "y" ? box.x[1] - delta.x : box.x[1];
          const y1 = dimension !== "x" ? box.y[0] - delta.y : box.y[0];
          const y2 = dimension !== "x" ? box.y[1] - delta.y : box.y[1];
          const selectedDomain = Selection.getBounds({x1, y1, x2, y2, scale});
          const newBox = {
            x: [Math.min(x1, x2), Math.max(x1, x2)], y: [Math.min(y1, y2), Math.max(y1, y2)]
          };
          return [{
            target: "parent",
            mutation: () => {
              return {
                selectedDomain, startX: x, startY: y,
                box: {
                  x: [
                    Math.max(newBox.x[0], fullDomainBox.x[0]),
                    Math.min(newBox.x[1], fullDomainBox.x[1])
                  ],
                  y: [
                    Math.max(newBox.y[0], fullDomainBox.y[0]),
                    Math.min(newBox.y[1], fullDomainBox.y[1])
                  ]
                }
              };
            }
          }];
        } else if (isSelecting) {
          const x2 = dimension !== "y" ? x : box.x[1];
          const y2 = dimension !== "x" ? y : box.y[1];
          const x1 = dimension !== "y" ? x : box.x[0];
          const y1 = dimension !== "x" ? y : box.y[0];
          const { negativeSelection } = targetProps;
          const selectedDomain = negativeSelection ?
            Selection.getBounds({x1, y1, x2: box.x[1], y2: box.y[1], scale}) :
            Selection.getBounds({x2, y2, x1: box.x[0], y1: box.y[0], scale});
          const newBox = {
            x: negativeSelection ?
              [Math.max(x1, fullDomainBox.x[0]), fullDomainBox.x[1]] :
              [fullDomainBox.x[0], Math.min(x2, fullDomainBox.x[1])],
            y: negativeSelection ?
              [Math.max(y1, fullDomainBox.y[0]), fullDomainBox.y[1]] :
              [fullDomainBox.y[0], Math.min(y2, fullDomainBox.y[1])],
          }
          return [{
            target: "parent",
            mutation: () => {
              return {box: newBox, selectedDomain}
            }
          }];
        }
      },
      onMouseUp: (evt, targetProps) => {
        const {box, fullDomainBox} = targetProps;
        if (box.x[0] === box.x[1] || box.y[0] === box.y[1]) {
          return [{
            target: "parent",
            mutation: () => {
              return {
                isPanning: false, isSelecting: false
              };
            }
          }];
        }
        return [{
          target: "parent",
          mutation: () => ({ isPanning: false, isSelecting: false })
        }];
      },
      onMouseLeave: () => {
        return [{
          target: "parent",
          mutation: () => ({ isPanning: false, isSelecting: false })
        }];
      }
    }
  }];

  getRect(x, y, style) {
    const width = Math.abs(x[1] - x[0]) || 1;
    const height = Math.abs(y[1] - y[0]) || 1;
    return y[1] && x[1] ?
      <rect x={x[0]} y={y[0]} width={width} height={height} style={style}/> : null;
  }

  renderRect(props) {
    const {selectionStyle, selectedDomain, fullDomain, scale, box} = props;
    if (!box) {
      const domain = selectedDomain || fullDomain || Helpers.getOriginalDomain(scale);
      const {x, y} = Selection.getDomainCoordinates(scale, domain);
      return this.getRect(x, y, selectionStyle);
    }
    return this.getRect(box.x, box.y, selectionStyle);

  }

  renderContainer(props, svgProps, style) {
    const { title, desc, children, portalComponent, className } = props;
    return (
      <svg {...svgProps} style={style} className={className}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        {this.renderRect(props)}
        {children}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </svg>
    );
  }
}
