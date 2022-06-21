import React from "react";
import { PanResponder } from "react-native";
import { G, Rect } from "react-native-svg";
import PropTypes from "prop-types";
import { get } from "lodash";
import { VictoryBrushLine } from "victory-brush-line/es";

import LineSegment from "./victory-primitives/line-segment";
import NativeHelpers from "../helpers/native-helpers"; // ensure the selection component get native styles
import { wrapCoreComponent } from "../helpers/wrap-core-component";

const RectWithStyle = ({ style, ...otherProps }) => (
  <Rect {...otherProps} {...NativeHelpers.getStyle(style)} />
);

RectWithStyle.propTypes = {
  style: PropTypes.object,
};

const yes = () => true;
const no = () => false;

const vblDefaultEvents = VictoryBrushLine.defaultEvents;

class VictoryNativeBrushLine extends VictoryBrushLine {
  static displayName = "VictoryNativeBrushLine";
  static defaultEvents = function (props) {
    if (props.disable) return undefined;
    // refer to web victory brush line to see the events we're aliasing here
    // we're just remapping the existing default events to their mobile equivalent handlers
    const existingEventHandlers = vblDefaultEvents(props)[0].eventHandlers;
    return [
      {
        target: props.type,
        eventHandlers: {
          onTouchStart: existingEventHandlers.onMouseDown,
          onTouchMove: existingEventHandlers.onMouseMove,
          onTouchEnd: existingEventHandlers.onMouseUp,
        },
      },
    ];
  };

  constructor(props) {
    super(props);
    this.panResponder = this.getResponder();
  }

  // mimics victory-container responders, except for comment below
  getResponder() {
    let shouldBlockNativeResponder = no;
    if (
      this.props &&
      (this.props.allowDrag || this.props.allowDraw || this.props.allowResize)
    ) {
      shouldBlockNativeResponder = yes;
    }
    return PanResponder.create({
      onStartShouldSetPanResponder: yes,
      onStartShouldSetPanResponderCapture: no,
      onMoveShouldSetPanResponder: yes,
      onMoveShouldSetPanResponderCapture: yes,
      onShouldBlockNativeResponder: shouldBlockNativeResponder,
      // prevent parent responder (the VictoryContainer) from stealing touches
      onPanResponderTerminationRequest: no,
      onPanResponderGrant: this.handleResponderGrant.bind(this),
      onPanResponderMove: this.handleResponderMove.bind(this),
      onPanResponderRelease: this.handleResponderEnd.bind(this),
      onPanResponderTerminate: this.handleResponderEnd.bind(this),
    });
  }

  callOptionalEventCallback(eventName, evt) {
    const callback = get(this.props.events, eventName);
    if (callback) {
      evt.persist(); // RN nativeEvent is reused. see https://fb.me/react-event-pooling
      callback(evt, this.props, "__unknownEventKey__", eventName);
    }
  }

  handleResponderGrant(evt) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(evt);
    }
    this.callOptionalEventCallback("onTouchStart", evt);
  }

  handleResponderMove(evt) {
    const { touches } = evt.nativeEvent;
    if (touches && touches.length === 2) {
      this.callOptionalEventCallback("onTouchPinch", evt);
    } else {
      this.callOptionalEventCallback("onTouchMove", evt);
    }
  }

  handleResponderEnd(evt) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(evt);
    }
    this.callOptionalEventCallback("onTouchEnd", evt);
  }

  render() {
    return (
      <G {...this.props.events} {...this.panResponder.panHandlers}>
        {this.renderLine(this.props)}
        {this.renderBrushArea(this.props)}
        {this.renderBrush(this.props)}
        {this.renderHandles(this.props)}
      </G>
    );
  }
}

const NativeVictoryBrushLine = wrapCoreComponent({
  Component: VictoryNativeBrushLine,
  defaultProps: Object.assign({}, VictoryNativeBrushLine.defaultProps, {
    brushComponent: <RectWithStyle />,
    brushAreaComponent: <RectWithStyle />,
    handleComponent: <RectWithStyle />,
    groupComponent: <G />,
    lineComponent: <LineSegment />,
  }),
});

export default NativeVictoryBrushLine;
