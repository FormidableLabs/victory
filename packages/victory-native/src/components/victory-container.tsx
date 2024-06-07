import React, { RefObject } from "react";
import Svg, { Rect } from "react-native-svg";
import { get } from "lodash";
import { View, PanResponder } from "react-native";
import {
  VictoryContainerProps,
  VictoryEventHandler,
  mergeRefs,
  useVictoryContainer,
  PortalProvider,
  PortalOutlet,
} from "victory-core/es";
import NativeHelpers from "../helpers/native-helpers";
import { Portal } from "./victory-portal/portal";

const yes = () => true;
const no = () => false;

export interface VictoryContainerNativeProps extends VictoryContainerProps {
  disableContainerEvents?: boolean;
  onTouchStart?: VictoryEventHandler;
  onTouchEnd?: VictoryEventHandler;
}

export const VictoryContainer = (initialProps: VictoryContainerNativeProps) => {
  const props = useVictoryContainer<VictoryContainerNativeProps>(initialProps);
  const {
    title,
    desc,
    width,
    height,
    dimensions,
    children,
    style,
    ouiaId,
    ouiaSafe,
    ouiaType,
    ariaLabelledBy,
    ariaDescribedBy,
    portalZIndex,
    viewBox,
    preserveAspectRatio,
    userProps,
    containerRef,
    events,
    onTouchStart,
    onTouchEnd,
    localContainerRef,
    disableContainerEvents,
  } = props;

  const callOptionalEventCallback = (eventName, event) => {
    const callback = get(events, eventName);
    if (callback) {
      event.persist(); // RN nativeEvent is reused. see https://fb.me/react-event-pooling
      callback(event, props, "__unknownEventKey__", eventName);
    }
  };

  const handleResponderGrant = (event) => {
    if (onTouchStart) {
      onTouchStart(event);
    }
    callOptionalEventCallback("onTouchStart", event);
  };

  const handleResponderMove = (event) => {
    const { touches } = event.nativeEvent;
    if (touches && touches.length === 2) {
      callOptionalEventCallback("onTouchPinch", event);
    } else {
      callOptionalEventCallback("onTouchMove", event);
    }
  };

  const handleResponderEnd = (event) => {
    if (onTouchEnd) {
      onTouchEnd(event);
    }
    callOptionalEventCallback("onTouchEnd", event);
  };

  const getResponder = () => {
    let shouldBlockNativeResponder = no;
    const {
      allowDrag,
      allowDraw,
      allowResize,
      allowSelection,
      allowPan,
      allowZoom,
    } = props as any;

    if (
      allowDrag ||
      allowDraw ||
      allowResize ||
      allowSelection ||
      allowPan ||
      allowZoom
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
      onPanResponderGrant: handleResponderGrant, // User has started a touch move
      onPanResponderMove: handleResponderMove, // Active touch or touches have moved
      onPanResponderRelease: handleResponderEnd, // The user has released all touches
      onPanResponderTerminate: handleResponderEnd, // Another component has become the responder
    });
  };

  const panResponder = getResponder();
  const handlers = disableContainerEvents ? {} : panResponder.panHandlers;

  const baseStyle = NativeHelpers.getStyle(style, ["width", "height"]);

  return (
    <View
      {...handlers}
      style={{ ...baseStyle, position: "relative" }}
      pointerEvents="box-none"
      data-ouia-component-id={ouiaId}
      data-ouia-component-type={ouiaType}
      data-ouia-safe={ouiaSafe}
      ref={mergeRefs<View>([
        localContainerRef as unknown as RefObject<View>,
        containerRef as unknown as RefObject<View>,
      ])}
    >
      <Svg
        width={width}
        height={height}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        // @ts-expect-error - style prop does not seem to be recognized by react-native-svg
        // preserved during refactor for compatibility, if it ever worked
        style={dimensions}
        accessible={ariaLabelledBy && title ? true : undefined}
        accessibilityLabel={ariaLabelledBy && title ? title : undefined}
        accessibilityHint={ariaDescribedBy && desc ? desc : undefined}
        {...events}
        {...userProps}
      >
        {/* The following Rect is a temporary solution until the following RNSVG issue is resolved https://github.com/react-native-svg/react-native-svg/issues/1488 */}
        <Rect x={0} y={0} width={width} height={height} fill="none" />
        {title ? <title id="title">{title}</title> : null}
        {desc ? <desc id="desc">{desc}</desc> : null}
        <PortalProvider>
          {children}
          <View
            style={{
              zIndex: portalZIndex,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            pointerEvents="box-none"
          >
            <PortalOutlet
              as={<Portal />}
              width={width}
              height={height}
              viewBox={viewBox}
              style={{ ...dimensions, overflow: "visible" }}
            />
          </View>
        </PortalProvider>
      </Svg>
    </View>
  );
};

VictoryContainer.role = "container";
