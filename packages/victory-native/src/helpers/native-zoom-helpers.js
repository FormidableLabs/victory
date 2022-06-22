import { throttle, isFunction, defaults } from "lodash";
import { Dimensions } from "react-native";
import isEqual from "react-fast-compare";
import { Collection } from "victory-core";
import { RawZoomHelpers } from "victory-zoom-container";

const hypotenuse = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

const screenSize = hypotenuse(
  Dimensions.get("window").width,
  Dimensions.get("window").height,
);

const Helpers = {
  ...RawZoomHelpers,
  onTouchEnd() {
    return [
      {
        target: "parent",
        mutation: () => {
          return { panning: false, originalPinchDistance: null };
        },
      },
    ];
  },

  // eslint-disable-next-line max-params
  onTouchPinch(evt, targetProps, eventKey, ctx) {
    const { onZoomDomainChange, zoomDimension, domain, zoomDomain } =
      targetProps;
    const { touches } = evt.nativeEvent;
    if (!targetProps.allowZoom) {
      return {};
    }
    const originalDomain = this.getDomain(targetProps);
    const lastDomain = defaults(
      {},
      targetProps.currentDomain || zoomDomain || originalDomain,
      domain,
    );
    const { x, y } = lastDomain;
    const currentDomain = {
      x:
        zoomDimension === "y"
          ? lastDomain.x
          : this.scaleNative(x, evt, targetProps, "x"),
      y:
        zoomDimension === "x"
          ? lastDomain.y
          : this.scaleNative(y, evt, targetProps, "y"),
    };
    const resumeAnimation = this.handleAnimation(ctx);
    const pinchDistance = this.getPinchDistance(touches);
    const originalPinchDistance =
      targetProps.originalPinchDistance || pinchDistance;

    const zoomActive =
      pinchDistance !== originalPinchDistance ||
      // if zoomActive is already set AND user hasn't zoommed out all the way
      (targetProps.zoomActive && !isEqual(originalDomain, lastDomain));

    if (isFunction(onZoomDomainChange)) {
      onZoomDomainChange(currentDomain);
    }
    return [
      {
        target: "parent",
        callback: resumeAnimation,
        mutation: () => {
          return {
            domain: currentDomain,
            currentDomain,
            originalDomain,
            cachedZoomDomain: zoomDomain,
            parentControlledProps: ["domain"],
            panning: false,
            originalPinchDistance,
            zoomActive,
          };
        },
      },
    ];
  },
  getPinchDistance([a, b]) {
    return hypotenuse(b.locationX - a.locationX, b.locationY - a.locationY);
  },

  getScaleFactorNative(evt, props) {
    const { touches } = evt.nativeEvent;
    const originalPinchDistance = props.originalPinchDistance || 0;
    const currentPinchDistance = this.getPinchDistance(touches);
    const scaledPinchChange =
      (currentPinchDistance - originalPinchDistance) / screenSize;
    return 1 - scaledPinchChange;
  },

  // eslint-disable-next-line max-params
  scaleNative(currentDomain, evt, props, axis) {
    const [from, to] = currentDomain;
    const range = Math.abs(to - from);
    const minimumZoom = props.minimumZoom && props.minimumZoom[axis];
    const factor = this.getScaleFactorNative(evt, props);
    if (minimumZoom && range <= minimumZoom && factor < 1) {
      return currentDomain;
    }
    const [fromBound, toBound] = this.getDomain(props)[axis];
    const percent = this.getScalePercent(evt, props, axis);
    const point = factor * from + percent * (factor * range);
    const minDomain = this.getMinimumDomain(point, props, axis);
    const [newMin, newMax] = this.getScaledDomain(
      currentDomain,
      factor,
      percent,
    );
    const newDomain = [
      newMin > fromBound && newMin < toBound ? newMin : fromBound,
      newMax < toBound && newMax > fromBound ? newMax : toBound,
    ];
    const domain =
      Math.abs(minDomain[1] - minDomain[0]) >
      Math.abs(newDomain[1] - newDomain[0])
        ? minDomain
        : newDomain;
    return Collection.containsDates([fromBound, toBound])
      ? [new Date(domain[0]), new Date(domain[1])]
      : domain;
  },
};

const makeThrottledHandler = (handler) => {
  // eslint-disable-next-line no-magic-numbers
  const throttledHandler = throttle(handler, 16, { leading: true });
  return (evt, ...otherParams) => {
    evt.persist(); // ensure that the react native event is persisted!
    return throttledHandler(evt, ...otherParams);
  };
};

export { Helpers, makeThrottledHandler };

export default {
  onTouchStart: Helpers.onMouseDown.bind(Helpers),
  onTouchEnd: Helpers.onTouchEnd.bind(Helpers),
  onTouchMove: makeThrottledHandler(Helpers.onMouseMove.bind(Helpers)),
  onTouchPinch: makeThrottledHandler(Helpers.onTouchPinch.bind(Helpers)),
};
