import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import Helpers from "./helper-methods";
import { assign, isEqual, isFunction } from "lodash";


export default class VictoryBrushContainer extends VictoryContainer {
  static displayName = "VictoryBrushContainer";
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
      stroke: "transparent",
      fill: "black",
      fillOpacity: 0.1
    },
    handleStyle: {
      stroke: "transparent",
      fill: "transparent"
    },
    dimension: "x",
    handleWidth: 8,
    selectionComponent: <rect/>,
    handleComponent: <rect/>
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => { // eslint-disable-line max-statements
        evt.preventDefault();
        const {
          dimension, selectedDomain, domain, handleWidth, onDomainChange, cachedSelectedDomain
        } = targetProps;
        const fullDomainBox = targetProps.fullDomainBox ||
          Helpers.getDomainBox(targetProps, domain);
        const currentDomain = isEqual(selectedDomain, cachedSelectedDomain) ?
          targetProps.currentDomain || selectedDomain || domain : selectedDomain || domain;
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        // Ignore events that occur outside of the maximum domain region
        if (!Helpers.withinBounds({x, y}, fullDomainBox, handleWidth)) {
          return {};
        }
        const domainBox = Helpers.getDomainBox(targetProps, domain, currentDomain);
        const activeHandles = Helpers.getActiveHandles({x, y}, targetProps, domainBox);
        // If the event occurs in any of the handle regions, start a resize
        if (activeHandles) {
          return [{
            target: "parent",
            mutation: () => {
              return {
                isSelecting: true, domainBox, fullDomainBox,
                cachedSelectedDomain: selectedDomain, currentDomain,
                ...Helpers.getResizeMutation(domainBox, activeHandles)
              };
            }
          }];
        } else if (
            Helpers.withinBounds({x, y}, domainBox) &&
            !isEqual(domain, currentDomain)
          ) {
          // if the event occurs within a selected region start a panning event, unless the whole
          // domain is selected
          return [{
            target: "parent",
            mutation: () => ({
              isPanning: true, startX: x, startY: y, domainBox, fullDomainBox, currentDomain,
              cachedSelectedDomain: selectedDomain
            })
          }];
        } else {
          // if the event occurs outside the region, or if the whole domain is selected,
          // start a new selection
          const minimumDomain = Helpers.getMinimumDomain();
          if (isFunction(onDomainChange)) {
            onDomainChange(minimumDomain);
          }
          return [{
            target: "parent",
            mutation: () => {
              return {
                isSelecting: true, domainBox, fullDomainBox,
                cachedSelectedDomain: selectedDomain,
                currentDomain: Helpers.getMinimumDomain(),
                ...Helpers.getSelectionMutation({x, y}, domainBox, dimension)
              };
            }
          }];
        }
      },
      onMouseMove: (evt, targetProps) => { // eslint-disable-line max-statements
        // if a panning or selection has not been started, ignore the event
        if (!targetProps.isPanning && !targetProps.isSelecting) {
          return {};
        }
        const {
          dimension, scale, isPanning, isSelecting, fullDomainBox, onDomainChange
        } = targetProps;
        const {x, y} = Selection.getSVGEventCoordinates(evt);
         // Ignore events that occur outside of the maximum domain region
        if (!Helpers.withinBounds({x, y}, fullDomainBox)) {
          return {};
        }
        if (isPanning) {
          const {startX, startY} = targetProps;
          const pannedBox = Helpers.panBox(targetProps, {x, y});
          const constrainedBox = Helpers.constrainBox(pannedBox, fullDomainBox);
          const currentDomain = Selection.getBounds({...constrainedBox, scale});
          if (isFunction(onDomainChange)) {
            onDomainChange(currentDomain);
          }
          return [{
            target: "parent",
            mutation: () => {
              return {
                currentDomain,
                startX: pannedBox.x2 >= fullDomainBox.x2 || pannedBox.x1 <= fullDomainBox.x1 ?
                  startX : x,
                startY: pannedBox.y2 >= fullDomainBox.y2 || pannedBox.y1 <= fullDomainBox.y1 ?
                  startY : y,
                ...constrainedBox
              };
            }
          }];
        } else if (isSelecting) {
          const x2 = dimension !== "y" ? x : targetProps.x2;
          const y2 = dimension !== "x" ? y : targetProps.y2;
          const currentDomain =
            Selection.getBounds({x2, y2, x1: targetProps.x1, y1: targetProps.y1, scale});
          if (isFunction(onDomainChange)) {
            onDomainChange(currentDomain);
          }
          return [{
            target: "parent",
            mutation: () => {
              return {
                x2, y2, currentDomain
              };
            }
          }];
        }
      },
      onMouseUp: (evt, targetProps) => {
        const {x1, y1, x2, y2, domain, onDomainChange} = targetProps;
        // if the mouse hasn't moved since a mouseDown event, select the whole domain region
        if (x1 === x2 || y1 === y2) {
          if (isFunction(onDomainChange)) {
            onDomainChange(domain);
          }
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
    const {selectedDomain, currentDomain, cachedSelectedDomain, scale} = props;
    const domain = isEqual(selectedDomain, cachedSelectedDomain) ?
      currentDomain || selectedDomain || props.domain : selectedDomain || props.domain;
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

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = React.Children.toArray(props.children);
    const components = [...children, this.getRect(props)];
    return components.map((component, i) => {
      return component ? React.cloneElement(component, {key: i}) : null;
    });
  }
}
