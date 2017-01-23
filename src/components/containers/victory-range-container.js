import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import Helpers from "./container-helper-methods";
import { isEqual } from "lodash";


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
        const fullDomainBox = targetProps.fullDomainBox ||
          Helpers.getDomainBox(targetProps, fullDomain);
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        if (!Helpers.withinBounds({x, y}, fullDomainBox)) {
          return {};
        }
        const domainBox = Helpers.getDomainBox(targetProps, fullDomain, selectedDomain);
        const standardMutation = Helpers.getStandardMutation({x, y}, domainBox, dimension);
        if (!selectedDomain || isEqual(selectedDomain, fullDomain)) {
          return [{
            target: "parent",
            mutation: () => {
              return {
                isSelecting: true, domainBox, fullDomainBox,
                selectedDomain: Helpers.getMinimumDomain(),
                ...standardMutation
              };
            }
          }];
        }
        const handles = Helpers.getHandles(targetProps, domainBox);
        const activeHandles = Helpers.pickHandles({x, y}, handles);
        if (activeHandles) {
          const mutation = Helpers.getHandleMutation(domainBox, activeHandles);
          return [{
            target: "parent",
            mutation: () => {
              return {
                isSelecting: true, selectedDomain, domainBox, fullDomainBox,
                ...mutation
              };
            }
          }];
        } else if (Helpers.withinBounds({x, y}, domainBox)) {
          return [{
            target: "parent",
            mutation: () => ({
              isPanning: true, startX: x, startY: y, selectedDomain, domainBox, fullDomainBox
            })
          }];
        } else {
          return [{
            target: "parent",
            mutation: () => {
              return {
                isSelecting: true, domainBox, fullDomainBox,
                selectedDomain: Helpers.getMinimumDomain(),
                ...standardMutation
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
          dimension, scale, isPanning, isSelecting, startX, startY, fullDomainBox
        } = targetProps;
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        if (!Helpers.withinBounds({x, y}, fullDomainBox)) {
          return {};
        }
        if (isPanning) {
          const delta = {
            x: startX ? startX - x : 0,
            y: startY ? startY - y : 0
          };
          const {x1, y1, x2, y2} = targetProps;
          const box = {
            x1: dimension !== "y" ? Math.min(x1, x2) - delta.x : Math.min(x1, x2),
            x2: dimension !== "y" ? Math.max(x1, x2) - delta.x : Math.max(x1, x2),
            y1: dimension !== "x" ? Math.min(y1, y2) - delta.y : Math.min(y1, y2),
            y2: dimension !== "x" ? Math.max(y1, y2) - delta.y : Math.max(y1, y2)
          };
          const constrainedBox = {
            x1: box.x2 > fullDomainBox.x2 ?
              fullDomainBox.x2 - Math.abs(box.x2 - box.x1) : Math.max(box.x1, fullDomainBox.x1),
            y1: box.y1 > fullDomainBox.y2 ?
              fullDomainBox.y2 - Math.abs(box.y2 - box.y1) : Math.max(box.y1, fullDomainBox.y1),
            x2: box.x1 < fullDomainBox.x1 ?
              fullDomainBox.x1 + Math.abs(box.x2 - box.x1) : Math.min(box.x2, fullDomainBox.x2),
            y2: box.y1 < fullDomainBox.y1 ?
              fullDomainBox.y1 + Math.abs(box.y2 - box.y1) : Math.min(box.y2, fullDomainBox.y2)
          };
          const selectedDomain = Selection.getBounds({...constrainedBox, scale});

          return [{
            target: "parent",
            mutation: () => {
              return {
                selectedDomain,
                startX: box.x2 >= fullDomainBox.x2 || box.x1 <= fullDomainBox.x1 ? startX : x,
                startY: box.y2 >= fullDomainBox.y2 || box.y1 <= fullDomainBox.y1 ? startY : y,
                ...constrainedBox
              };
            }
          }];
        } else if (isSelecting) {
          const x2 = dimension !== "y" ? x : targetProps.x2;
          const y2 = dimension !== "x" ? y : targetProps.y2;
          const selectedDomain =
            Selection.getBounds({x2, y2, x1: targetProps.x1, y1: targetProps.y1, scale});
          return [{
            target: "parent",
            mutation: () => {
              return {
                x2, y2, selectedDomain
              };
            }
          }];
        }
      },
      onMouseUp: (evt, targetProps) => {
        const {x1, y1, x2, y2, fullDomain} = targetProps;
        if (x1 === x2 || y1 === y2) {
          return [{
            target: "parent",
            mutation: () => {
              return {
                isPanning: false, isSelecting: false, selectedDomain: fullDomain
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

  getRect(props) {
    const {selectionStyle, selectedDomain, scale} = props;
    const domain = selectedDomain || Helpers.getOriginalDomain(scale);
    const {x, y} = Selection.getDomainCoordinates(scale, domain);
    const width = Math.abs(x[1] - x[0]) || 1;
    const height = Math.abs(y[1] - y[0]) || 1;
    const xVal = Math.min(x[0], x[1]);
    const yVal = Math.min(y[0], y[1]);
    return x[0] !== x[1] && y[0] !== y[1] ?
      <rect x={xVal} y={yVal} width={width} height={height} style={selectionStyle}/> : null;
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
