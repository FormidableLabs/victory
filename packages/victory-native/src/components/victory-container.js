import React from "react";
import PropTypes from "prop-types";
import Svg, { Rect } from "react-native-svg";
import { assign, get } from "lodash";
import { View, PanResponder } from "react-native";
import { VictoryContainer } from "victory-core/es";
import NativeHelpers from "../helpers/native-helpers";
import Portal from "./victory-portal/portal";

const yes = () => true;
const no = () => false;

export default class extends VictoryContainer {
  static propTypes = assign({}, VictoryContainer.propTypes, {
    disableContainerEvents: PropTypes.bool,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func
  });

  constructor(props) {
    super(props);
    this.panResponder = this.getResponder();
  }

  getResponder() {
    let shouldBlockNativeResponder = no;
    if (
      this.props &&
      (this.props.allowDrag ||
        this.props.allowDraw ||
        this.props.allowResize ||
        this.props.allowSelection ||
        this.props.allowPan ||
        this.props.allowZoom)
    ) {
      shouldBlockNativeResponder = yes;
    }

    return PanResponder.create({
      onStartShouldSetPanResponder: yes,

      onStartShouldSetPanResponderCapture: no,

      onMoveShouldSetPanResponder: yes,

      onMoveShouldSetPanResponderCapture: yes,

      onShouldBlockNativeResponder: shouldBlockNativeResponder,

      onPanResponderTerminationRequest: yes,
      // User has started a touch move
      onPanResponderGrant: this.handleResponderGrant.bind(this),
      // Active touch or touches have moved
      onPanResponderMove: this.handleResponderMove.bind(this),
      // The user has released all touches
      onPanResponderRelease: this.handleResponderEnd.bind(this),
      // Another component has become the responder
      onPanResponderTerminate: this.handleResponderEnd.bind(this)
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

  // Overrides method in victory-core
  renderContainer(props, svgProps, style) {
    const {
      title,
      desc,
      className,
      width,
      height,
      portalZIndex,
      responsive,
      disableContainerEvents
    } = props;
    const children = this.getChildren(props);
    const dimensions = responsive
      ? { width: "100%", height: "100%" }
      : { width, height };
    const baseStyle = NativeHelpers.getStyle(style, ["width", "height"]);
    const divStyle = assign({}, baseStyle, { position: "relative" });
    const portalDivStyle = {
      zIndex: portalZIndex,
      position: "absolute",
      top: 0,
      left: 0
    };
    const portalSvgStyle = assign({ overflow: "visible" }, dimensions);
    const portalProps = {
      width,
      height,
      viewBox: svgProps.viewBox,
      style: portalSvgStyle
    };
    const handlers = disableContainerEvents
      ? {}
      : this.panResponder.panHandlers;
    return (
      <View
        {...handlers}
        style={divStyle}
        pointerEvents="box-none"
        className={className}
        ref={props.containerRef}
        {...this.getOUIAProps(props)}
      >
        <Svg
          {...svgProps}
          style={dimensions}
          accessible={props["aria-labelledby"] && title ? true : undefined}
          accessibilityLabel={
            props["aria-labelledby"] && title ? title : undefined
          }
          accessibilityHint={
            props["aria-describedby"] && desc ? desc : undefined
          }
        >
          {/*
            The following Rect is a temporary solution until the following RNSVG issue is resolved
            https://github.com/react-native-svg/react-native-svg/issues/1488
          */}
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            style={{ fill: "none" }}
          />
          {title ? <title id="title">{title}</title> : null}
          {desc ? <desc id="desc">{desc}</desc> : null}
          {children}
        </Svg>
        <View style={portalDivStyle} pointerEvents="box-none">
          <Portal {...portalProps} ref={this.savePortalRef} />
        </View>
      </View>
    );
  }
}
