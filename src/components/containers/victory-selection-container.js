import PropTypes from "prop-types";
import React from "react";
import { VictoryContainer } from "victory-core";
import SelectionHelpers from "./selection-helpers";

export const selectionContainerMixin = (base) => class VictorySelectionContainer extends base {
  static displayName = "VictorySelectionContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    dimension: PropTypes.oneOf(["x", "y"]),
    onSelection: PropTypes.func,
    onSelectionCleared: PropTypes.func,
    selectionComponent: PropTypes.element,
    selectionStyle: PropTypes.object,
    standalone: PropTypes.bool
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
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
        return SelectionHelpers.onMouseDown(evt, targetProps);
      },
      onTouchStart: (evt, targetProps) => {
        return SelectionHelpers.onMouseDown(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        const mutations = SelectionHelpers.onMouseMove(evt, targetProps);

        if (mutations.id !== this.mouseMoveMutationId) { // eslint-disable-line
          this.mouseMoveMutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }

        return undefined;
      },
      onTouchMove: (evt, targetProps) => {
        const mutations = SelectionHelpers.onMouseMove(evt, targetProps);

        if (mutations.id !== this.mouseMoveMutationId) { // eslint-disable-line
          this.mouseMoveMutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }

        return undefined;
      },
      onMouseUp: (evt, targetProps) => {
        return SelectionHelpers.onMouseUp(evt, targetProps);
      },
      onTouchEnd: (evt, targetProps) => {
        return SelectionHelpers.onMouseUp(evt, targetProps);
      }
    }
  }];

  getRect(props) {
    const { x1, x2, y1, y2, selectionStyle, selectionComponent } = props;
    const width = Math.abs(x2 - x1) || 1;
    const height = Math.abs(y2 - y1) || 1;
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    return y2 && x2 && x1 && y1 ?
      React.cloneElement(selectionComponent, { x, y, width, height, style: selectionStyle }) : null;
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = React.Children.toArray(props.children);
    return [...children, this.getRect(props)].map((component, i) => {
      return component ? React.cloneElement(component, { key: i }) : null;
    });
  }
};

export default selectionContainerMixin(VictoryContainer);
