/*eslint no-magic-numbers: ["error", { "ignore": [0, 1, 5, 10] }]*/
import PropTypes from "prop-types";
import React from "react";
import { VictoryContainer, VictoryLabel, Line, Selection, Helpers } from "victory-core";
import { isNumber } from "lodash";
import CursorHelpers from "./cursor-helpers";

export const cursorContainerMixin = (base) => class VictoryCursorContainer extends base {
  static displayName = "VictoryCursorContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    defaultCursorValue: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    dimension: PropTypes.oneOf(["x", "y"]),
    labelComponent: PropTypes.element,
    labels: PropTypes.func,
    onChange: PropTypes.func,
    standalone: PropTypes.bool
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    labelComponent: <VictoryLabel/>,
    cursorComponent: <Line/>
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseLeave: () => {
        return [];
      },
      onMouseMove: (evt, targetProps) => {
        const mutations = CursorHelpers.onMouseMove(evt, targetProps);

        if (mutations.id !== this.mouseMoveMutationId) { // eslint-disable-line
          this.mouseMoveMutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }

        return [];
      }
    }
  }];

  getCursorPosition(props) {
    const { cursorPosition, defaultCursorValue, dimension } = props;
    if (cursorPosition) { return cursorPosition; }

    if (isNumber(defaultCursorValue)) {
      return {
        x: 0,
        y: 0,
        [dimension]: defaultCursorValue
      };
    }

    return defaultCursorValue;
  }

  getCursorElements(props) {
    const {
      scale, domain, dimension, labelComponent, labels, cursorComponent
    } = props;
    const cursorPosition = this.getCursorPosition(props);

    if (!cursorPosition) { return []; }

    const newElements = [];
    const domainCoordinates = Selection.getDomainCoordinates(scale, domain);

    const cursorCoordinates = {
      x: scale.x(cursorPosition.x),
      y: scale.y(cursorPosition.y)
    };
    if (labels) {
      newElements.push(React.cloneElement(labelComponent, {
        x: cursorCoordinates.x + 5,
        y: cursorCoordinates.y - 10,
        text: Helpers.evaluateProp(labels, cursorPosition, true),
        active: true,
        key: "cursor-tooltip"
      }));
    }

    if (dimension === "x" || dimension === undefined) {
      newElements.push(React.cloneElement(cursorComponent, {
        key: "x-cursor",
        x1: cursorCoordinates.x,
        x2: cursorCoordinates.x,
        y1: domainCoordinates.y[0],
        y2: domainCoordinates.y[1]
      }));
    }
    if (dimension === "y" || dimension === undefined) {
      newElements.push(React.cloneElement(cursorComponent, {
        key: "y-cursor",
        x1: domainCoordinates.x[0],
        x2: domainCoordinates.x[1],
        y1: cursorCoordinates.y,
        y2: cursorCoordinates.y
      }));
    }
    return newElements;
  }

  getTooltip(props) {
    const { labels, labelComponent, cursorPosition } = props;
    if (!labels || !cursorPosition) {
      return null;
    }
    return React.cloneElement(labelComponent, this.getLabelProps(cursorPosition));
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    return [
      ...React.Children.toArray(props.children),
      ...this.getCursorElements(props),
      this.getTooltip
    ];
  }
};

export default cursorContainerMixin(VictoryContainer);
