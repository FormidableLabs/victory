import React from "react";
import PropTypes from "prop-types";
import { Rect } from "react-native-svg";
import { flow } from "lodash";
import {
  VictoryBrushContainer,
  BrushHelpers,
  brushContainerMixin as originalBrushMixin
} from "victory-brush-container";
import VictoryContainer from "./victory-container";
import NativeHelpers from "../helpers/native-helpers";

// ensure the selection component get native styles
const RectWithStyle = ({ style, ...otherProps }) => (
  <Rect {...otherProps} {...NativeHelpers.getStyle(style)} />
);

RectWithStyle.propTypes = {
  style: PropTypes.object
};

const nativeBrushMixin = (base) =>
  class VictoryNativeSelectionContainer extends base {
    // eslint-disable-line max-len
    // assign native specific defaultProps over web `VictoryBrushContainer` defaultProps
    static defaultProps = {
      ...VictoryBrushContainer.defaultProps,
      brushComponent: <RectWithStyle />,
      handleComponent: <RectWithStyle />
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
              BrushHelpers.onGlobalMouseMove.cancel();
              return BrushHelpers.onMouseDown(evt, targetProps);
            },
            onTouchMove: (evt, targetProps) => {
              return props.disable
                ? {}
                : BrushHelpers.onGlobalMouseMove(evt, targetProps);
            },
            onTouchEnd: (evt, targetProps) => {
              if (props.disable) {
                return {};
              }
              BrushHelpers.onGlobalMouseMove.cancel();
              return BrushHelpers.onGlobalMouseUp(evt, targetProps);
            }
          }
        }
      ];
    };
  };

const combinedMixin = flow(originalBrushMixin, nativeBrushMixin);

export const brushContainerMixin = (base) => combinedMixin(base);

export default brushContainerMixin(VictoryContainer);
