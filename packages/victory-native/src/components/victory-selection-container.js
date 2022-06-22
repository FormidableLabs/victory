import React from "react";
import { flow } from "lodash";
import PropTypes from "prop-types";
import { Rect } from "react-native-svg";
import {
  VictorySelectionContainer,
  SelectionHelpers,
  selectionContainerMixin as originalSelectionMixin,
} from "victory-selection-container";
import VictoryContainer from "./victory-container";
import NativeHelpers from "../helpers/native-helpers";

// ensure the selection component get native styles
const DefaultSelectionComponent = ({ style, ...otherProps }) => (
  <Rect {...otherProps} {...NativeHelpers.getStyle(style)} />
);

DefaultSelectionComponent.propTypes = {
  style: PropTypes.object,
};

const nativeSelectionMixin = (base) =>
  class VictoryNativeSelectionContainer extends base {
    // eslint-disable-line max-len
    // assign native specific defaultProps over web `VictorySelectionContainer` defaultProps
    static defaultProps = {
      ...VictorySelectionContainer.defaultProps,
      standalone: true,
      selectionComponent: <DefaultSelectionComponent />,
    };

    // overrides all web events with native specific events
    static defaultEvents = (props) => {
      return [
        {
          target: "parent",
          eventHandlers: {
            onTouchStart: (evt, targetProps) => {
              if (props.disable) {
                return {};
              }
              SelectionHelpers.onMouseMove.cancel();
              return SelectionHelpers.onMouseDown(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : SelectionHelpers.onMouseMove(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              if (props.disable) {
                return {};
              }
              SelectionHelpers.onMouseMove.cancel();
              return SelectionHelpers.onMouseUp(evt, targetProps);
            },
          },
        },
      ];
    };
  };

const combinedMixin = flow(originalSelectionMixin, nativeSelectionMixin);

export const selectionContainerMixin = (base) => combinedMixin(base);

export default selectionContainerMixin(VictoryContainer);
