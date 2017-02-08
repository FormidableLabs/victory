import React from "react";
import { VictoryContainer } from "victory-core";
import SelectionHelpers from "./selection-helpers";
import { map } from "lodash";


export default class VictorySelectionContainer extends VictoryContainer {
  static displayName = "VictorySelectionContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    selectionStyle: React.PropTypes.object,
    onSelection: React.PropTypes.func,
    onSelectionCleared: React.PropTypes.func,
    dimension: React.PropTypes.oneOf(["x", "y"]),
    standalone: React.PropTypes.bool,
    selectionComponent: React.PropTypes.element
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    selectionStyle: {
      stroke: "transparent",
      fill: "black",
      fillOpacity: 0.1
    },
    standalone: true,
    selectionComponent: <rect/>
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        SelectionHelpers.onMouseMove.cancel();
        return SelectionHelpers.onMouseDown(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        evt.persist();
        return SelectionHelpers.onMouseMove(evt, targetProps);
      },
      onMouseUp: (evt, targetProps) => {
        SelectionHelpers.onMouseMove.cancel();
        return SelectionHelpers.onMouseUp(evt, targetProps);
      }
    }
  }];

  getRect(props) {
    const {x1, x2, y1, y2, selectionStyle, selectionComponent} = props;
    const width = Math.abs(x2 - x1) || 1;
    const height = Math.abs(y2 - y1) || 1;
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    return y2 && x2 && x1 && y1 ?
      React.cloneElement(selectionComponent, {x, y, width, height, style: selectionStyle}) : null;
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = React.Children.toArray(props.children);
    return map([...children, this.getRect(props)], (component, i) => {
      return component ? React.cloneElement(component, {key: i}) : null;
    });
  }
}
