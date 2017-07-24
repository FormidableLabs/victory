import PropTypes from "prop-types";
import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import BrushHelpers from "./brush-helpers";
import { assign, defaults, isEqual } from "lodash";

export const brushContainerMixin = (base) => class VictoryBrushContainer extends base {
  static displayName = "VictoryBrushContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    dimension: PropTypes.oneOf(["x", "y"]),
    handleComponent: PropTypes.element,
    handleStyle: PropTypes.object,
    handleWidth: PropTypes.number,
    onDomainChange: PropTypes.func,
    selectedDomain: PropTypes.shape({
      x: PropTypes.array,
      y: PropTypes.array
    }),
    selectionComponent: PropTypes.element,
    selectionStyle: PropTypes.object
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    handleComponent: <rect/>,
    handleStyle: {
      stroke: "transparent",
      fill: "transparent"
    },
    handleWidth: 8,
    selectionComponent: <rect/>,
    selectionStyle: {
      stroke: "transparent",
      fill: "black",
      fillOpacity: 0.1
    }
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        return BrushHelpers.onMouseDown(evt, targetProps);
      },
      onTouchStart: (evt, targetProps) => {
        return BrushHelpers.onMouseDown(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        const mutations = BrushHelpers.onMouseMove(evt, targetProps);

        if (mutations.id !== this.mouseMoveMutationId) { // eslint-disable-line
          this.mouseMoveMutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }

        return undefined;
      },
      onTouchMove: (evt, targetProps) => {
        const mutations = BrushHelpers.onMouseMove(evt, targetProps);

        if (mutations.id !== this.mouseMoveMutationId) { // eslint-disable-line
          this.mouseMoveMutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }

        return undefined;
      },
      onMouseUp: (evt, targetProps) => {
        return BrushHelpers.onMouseUp(evt, targetProps);
      },
      onTouchEnd: (evt, targetProps) => {
        return BrushHelpers.onMouseUp(evt, targetProps);
      },
      onMouseLeave: (evt, targetProps) => {
        return BrushHelpers.onMouseLeave(evt, targetProps);
      },
      onTouchCancel: (evt, targetProps) => {
        return BrushHelpers.onMouseLeave(evt, targetProps);
      }
    }
  }];

  getSelectBox(props, coordinates) {
    const { x, y } = coordinates;
    const { selectionStyle, selectionComponent } = props;
    const selectionComponentStyle = selectionComponent.props && selectionComponent.props.style;
    return x[0] !== x[1] && y[0] !== y[1] ?
      React.cloneElement(selectionComponent, {
        width: Math.abs(x[1] - x[0]) || 1,
        height: Math.abs(y[1] - y[0]) || 1,
        x: Math.min(x[0], x[1]),
        y: Math.min(y[0], y[1]),
        cursor: "move",
        style: defaults({}, selectionComponentStyle, selectionStyle)
      }) : null;
  }

  getHandles(props, coordinates) {
    const { dimension, handleWidth, handleStyle, handleComponent } = props;
    const { x, y } = coordinates;
    const width = Math.abs(x[1] - x[0]) || 1;
    const height = Math.abs(y[1] - y[0]) || 1;
    const handleComponentStyle = handleComponent.props && handleComponent.props.style || {};
    const style = defaults({}, handleComponentStyle, handleStyle);
    const yProps = { style, width, height: handleWidth, cursor: "ns-resize" };
    const xProps = { style, width: handleWidth, height, cursor: "ew-resize" };
    const handleProps = {
      top: dimension !== "x" && assign({ x: x[0], y: y[1] - (handleWidth / 2) }, yProps),
      bottom: dimension !== "x" && assign({ x: x[0], y: y[0] - (handleWidth / 2) }, yProps),
      left: dimension !== "y" && assign({ y: y[1], x: x[0] - (handleWidth / 2) }, xProps),
      right: dimension !== "y" && assign({ y: y[1], x: x[1] - (handleWidth / 2) }, xProps)
    };
    const handles = ["top", "bottom", "left", "right"].reduce((memo, curr) => {
      memo = handleProps[curr] ?
        memo.concat(React.cloneElement(
          handleComponent,
          assign({ key: `handle-${curr}` }, handleProps[curr]
        ))) : memo;
      return memo;
    }, []);
    return handles.length ? handles : null;
  }

  getRect(props) {
    const { currentDomain, cachedSelectedDomain } = props;
    const selectedDomain = defaults({}, props.selectedDomain, props.domain);
    const domain = isEqual(selectedDomain, cachedSelectedDomain) ?
      defaults({}, currentDomain, selectedDomain) : selectedDomain;
    const coordinates = Selection.getDomainCoordinates(props, domain);
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
    return [...children, this.getRect(props)].map((component, i) => {
      return component ? React.cloneElement(component, { key: i }) : null;
    });
  }
};

export default brushContainerMixin(VictoryContainer);
