/*eslint no-magic-numbers: ["error", { "ignore": [0, 1, 2] }]*/
import PropTypes from "prop-types";
import React from "react";
import { VictoryContainer, VictoryLabel, Line, Selection, Helpers } from "victory-core";
import { isNumber } from "lodash";
import CursorHelpers from "./cursor-helpers";

export const cursorContainerMixin = (base) => class VictoryCursorContainer extends base {
  static displayName = "VictoryCursorContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    defaultCursorValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
    ]),
    dimension: PropTypes.oneOf(["x", "y"]),
    labelComponent: PropTypes.element,
    labelOffset: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
    ]),
    labels: PropTypes.func,
    onChange: PropTypes.func,
    standalone: PropTypes.bool
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    labelComponent: <VictoryLabel/>,
    labelOffset: {
      x: 5,
      y: -10
    },
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
    const { cursorValue, defaultCursorValue, dimension, domain } = props;
    if (cursorValue) { return cursorValue; }

    if (isNumber(defaultCursorValue)) {
      return {
        x: (domain.x[0] + domain.x[1]) / 2,
        y: (domain.y[0] + domain.y[1]) / 2,
        [dimension]: defaultCursorValue
      };
    }

    return defaultCursorValue;
  }

  getLabelOffset(props) {
    const { labelOffset } = props;

    if (isNumber(labelOffset)) {
      return {
        x: labelOffset,
        y: labelOffset
      };
    }

    return labelOffset;
  }

  getCursorElements(props) {
    const {
      scale, domain, dimension, labelComponent, labels, cursorComponent
    } = props;
    const cursorValue = this.getCursorPosition(props);
    const labelOffset = this.getLabelOffset(props);

    if (!cursorValue) { return []; }

    const newElements = [];
    const domainCoordinates = Selection.getDomainCoordinates(scale, domain);

    const cursorCoordinates = {
      x: scale.x(cursorValue.x),
      y: scale.y(cursorValue.y)
    };
    if (labels) {
      newElements.push(React.cloneElement(labelComponent, {
        x: cursorCoordinates.x + labelOffset.x,
        y: cursorCoordinates.y + labelOffset.y,
        text: Helpers.evaluateProp(labels, cursorValue, true),
        active: true,
        key: "cursor-label"
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

  // Overrides method in VictoryContainer
  getChildren(props) {
    return [
      ...React.Children.toArray(props.children),
      ...this.getCursorElements(props)
    ];
  }
};

export default cursorContainerMixin(VictoryContainer);
