import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import Helpers from "./container-helper-methods";
import { assign, isEqual } from "lodash";


export default class VictoryRangeContainer extends VictoryContainer {
  static displayName = "VictoryRangeContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    selectionStyle: React.PropTypes.object,
    handleStyle: React.PropTypes.object,
    dimension: React.PropTypes.oneOf(["x", "y"]),
    selectedDomain: React.PropTypes.shape({
      x: React.PropTypes.array,
      y: React.PropTypes.array
    }),
    onDomainChange: React.PropTypes.func,
    handleWidth: React.PropTypes.number,
    selectionComponent: React.PropTypes.element,
    handleComponent: React.PropTypes.element
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    selectionStyle: {
      stroke: "black",
      fill: "black",
      fillOpacity: 0.2
    },
    handleStyle: {
      stroke: "transparent",
      fill: "transparent"
    },
    handleWidth: 8,
    selectionComponent: <rect/>,
    handleComponent: <rect/>
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        evt.preventDefault();
        const { dimension, selectedDomain, domain, handleWidth } = targetProps;
        const fullDomainBox = targetProps.fullDomainBox ||
          Helpers.getDomainBox(targetProps, domain);
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        if (!Helpers.withinBounds({x, y}, fullDomainBox, handleWidth)) {
          return {};
        }

        const domainBox = Helpers.getDomainBox(targetProps, domain, selectedDomain);
        const handles = Helpers.getHandles(targetProps, domainBox);
        const activeHandles = Helpers.pickHandles({x, y}, handles);
        const standardMutation = Helpers.getStandardMutation({x, y}, domainBox, dimension);
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
        } else if (selectedDomain && !isEqual(domain, selectedDomain)) {
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
            y1: box.y2 > fullDomainBox.y2 ?
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
        const {x1, y1, x2, y2, domain} = targetProps;
        if (x1 === x2 || y1 === y2) {
          return [{
            target: "parent",
            mutation: () => {
              return {
                isPanning: false, isSelecting: false, selectedDomain: domain
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

  getSelectBox(props, coordinates) {
    const {x, y} = coordinates;
    const {selectionStyle, selectionComponent} = props;
    return x[0] !== x[1] && y[0] !== y[1] ?
      React.cloneElement(selectionComponent, {
        width: Math.abs(x[1] - x[0]) || 1,
        height: Math.abs(y[1] - y[0]) || 1,
        x: Math.min(x[0], x[1]),
        y: Math.min(y[0], y[1]),
        cursor: "move",
        style: selectionStyle
      }) : null;
  }

  getHandles(props, coordinates) {
    const {dimension, handleWidth, handleStyle, handleComponent} = props;
    const {x, y} = coordinates;
    const width = Math.abs(x[1] - x[0]) || 1;
    const height = Math.abs(y[1] - y[0]) || 1;
    const options = ["top", "bottom", "left", "right"];
    const yProps = { style: handleStyle, width, height: handleWidth, cursor: "ns-resize"};
    const xProps = { style: handleStyle, width: handleWidth, height, cursor: "ew-resize"};
    const handleProps = {
      top: dimension !== "x" && assign({x: x[0], y: y[1] - (handleWidth / 2)}, yProps),
      bottom: dimension !== "x" && assign({x: x[0], y: y[0] - (handleWidth / 2)}, yProps),
      left: dimension !== "y" && assign({y: y[1], x: x[0] - (handleWidth / 2)}, xProps),
      right: dimension !== "y" && assign({y: y[1], x: x[1] - (handleWidth / 2)}, xProps)
    };
    const handles = options.reduce((memo, curr) => {
      memo = handleProps[curr] ?
        memo.concat(React.cloneElement(
          handleComponent,
          assign({key: `handle-${curr}`}, handleProps[curr]
        ))) : memo;
      return memo;
    }, []);
    return handles.length ? handles : null;
  }

  getRect(props) {
    const {selectedDomain, scale} = props;
    const domain = selectedDomain || props.domain;
    const coordinates = Selection.getDomainCoordinates(scale, domain);
    const selectBox = this.getSelectBox(props, coordinates);
    return selectBox ?
      (
        <g>
          {selectBox}
          {this.getHandles(props, coordinates)}
        </g>
      ) : null;
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
