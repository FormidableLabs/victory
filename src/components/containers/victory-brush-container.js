import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import BrushHelpers from "./brush-helpers";
import { assign, isEqual } from "lodash";


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
      onMouseDown: (evt, targetProps) => {
        BrushHelpers.onMouseMove.cancel();
        return BrushHelpers.onMouseDown(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        evt.persist();
        return BrushHelpers.onMouseMove(evt, targetProps);
      },
      onMouseUp: (evt, targetProps) => {
        BrushHelpers.onMouseMove.cancel();
        return BrushHelpers.onMouseUp(evt, targetProps);
      },
      onMouseLeave: (evt, targetProps) => {
        BrushHelpers.onMouseMove.cancel();
        return BrushHelpers.onMouseLeave(evt, targetProps);
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
