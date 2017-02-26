import { Selection, Collection } from "victory-core";
import { throttle, isFunction } from "lodash";

const Helpers = {

  /**
   * Generates a new domain scaled by factor and constrained by the original domain.
   * @param  {[Number, Number]} currentDomain  The domain to be scaled.
   * @param  {[Number, Number]} originalDomain The original domain for the data set.
   * @param  {Number}           factor         The delta to translate by
   * @return {[Number, Number]}                The scale domain
   */
  scale(currentDomain, originalDomain, factor) {
    const [fromBound, toBound] = originalDomain;
    const [from, to] = currentDomain;
    const range = Math.abs(from - to);
    const midpoint = +from + (range / 2);
    const newRange = (range * Math.abs(factor)) / 2;
    const minDomain = Collection.containsDates(originalDomain) ?
      [ new Date(midpoint - 4), new Date(midpoint) ] : // 4ms is standard browser date precision
      [ midpoint - 1 / Number.MAX_SAFE_INTEGER, midpoint ];
    const newDomain = [
      Collection.getMaxValue([midpoint - newRange, fromBound]),
      Collection.getMinValue([midpoint + newRange, toBound])
    ];
    return Math.abs(minDomain[1] - minDomain[0]) > Math.abs(newDomain[1] - newDomain[0]) ?
      minDomain : newDomain;
  },

  /**
   * Generate a new domain translated by the delta and constrained by the original domain.
   * @param  {[Number, Number]} currentDomain  The domain to be translated.
   * @param  {[Number, Number]} originalDomain The original domain for the data set.
   * @param  {Number}           delta          The delta to translate by
   * @return {[Number, Number]}                The translated domain
   */
  pan(currentDomain, originalDomain, delta) {
    const [fromCurrent, toCurrent] = currentDomain.map((val) => +val);
    const [fromOriginal, toOriginal] = originalDomain.map((val) => +val);
    const lowerBound = fromCurrent + delta;
    const upperBound = toCurrent + delta;
    let newDomain;
    if (lowerBound > fromOriginal && upperBound < toOriginal) {
      newDomain = [lowerBound, upperBound];
    } else if (lowerBound < fromOriginal) { // Clamp to lower limit
      const dx = toCurrent - fromCurrent;
      newDomain = [fromOriginal, fromOriginal + dx];
    } else if (upperBound > toOriginal) { // Clamp to upper limit
      const dx = toCurrent - fromCurrent;
      newDomain = [toOriginal - dx, toOriginal];
    } else {
      newDomain = currentDomain;
    }
    return Collection.containsDates(currentDomain) || Collection.containsDates(originalDomain) ?
      newDomain.map((val) => new Date(val)) : newDomain;
  },

  getDomainScale(domain, scale) {
    const {x: [from, to]} = domain;
    const rangeX = scale.x.range();
    const plottableWidth = Math.abs(rangeX[0] - rangeX[1]);
    return plottableWidth / (to - from);
  },

  handleAnimation(ctx) {
    const getTimer = isFunction(ctx.getTimer) && ctx.getTimer.bind(ctx);
    if (getTimer && isFunction(getTimer().bypassAnimation)) {
      getTimer().bypassAnimation();
      return isFunction(getTimer().resumeAnimation) ?
        () => getTimer().resumeAnimation() : undefined;
    }
  },

  onMouseDown(evt, targetProps) {
    evt.preventDefault();
    const originalDomain = targetProps.originalDomain || targetProps.domain;
    const currentDomain = targetProps.currentDomain || targetProps.zoomDomain || originalDomain;
    const {x} = Selection.getSVGEventCoordinates(evt);
    return [{
      target: "parent",
      mutation: () => {
        return {
          startX: x, domain: currentDomain, cachedZoomDomain: targetProps.zoomDomain,
          originalDomain, currentDomain, panning: true,
          parentControlledProps: ["domain"]
        };
      }
    }];
  },

  onMouseUp() {
    return [{
      target: "parent",
      mutation: () => {
        return {panning: false};
      }
    }];
  },

  onMouseLeave() {
    return [{
      target: "parent",
      mutation: () => {
        return {panning: false};
      }
    }];
  },

  onMouseMove(evt, targetProps, eventKey, ctx) { // eslint-disable-line max-params
    if (targetProps.panning) {
      const { scale, startX, onDomainChange, domain, zoomDomain } = targetProps;
      const {x} = Selection.getSVGEventCoordinates(evt);
      const originalDomain = targetProps.originalDomain || domain;
      const lastDomain = targetProps.currentDomain || targetProps.zoomDomain || originalDomain;
      const calculatedDx = (startX - x) / this.getDomainScale(lastDomain, scale);
      const nextXDomain = this.pan(lastDomain.x, originalDomain.x, calculatedDx);
      const currentDomain = { x: nextXDomain, y: originalDomain.y };
      const resumeAnimation = this.handleAnimation(ctx);
      if (isFunction(onDomainChange)) {
        onDomainChange(currentDomain);
      }
      return [{
        target: "parent",
        callback: resumeAnimation,
        mutation: () => {
          return {
            parentControlledProps: ["domain"], startX: x,
            domain: currentDomain, currentDomain, originalDomain, cachedZoomDomain: zoomDomain
          };
        }
      }];
    }
  },

  onWheel(evt, targetProps, eventKey, ctx) { // eslint-disable-line max-params
    if (!targetProps.allowZoom) {
      return {};
    }
    const { onDomainChange, domain, zoomDomain } = targetProps;
    const originalDomain = targetProps.originalDomain || domain;
    const lastDomain = targetProps.currentDomain || zoomDomain || originalDomain;
    const {x} = lastDomain;
    const xBounds = originalDomain.x;
    const sign = evt.deltaY > 0 ? 1 : -1;
    const delta = Math.min(Math.abs(evt.deltaY / 300), 0.75); // TODO: Check scale factor
    const nextXDomain = this.scale(x, xBounds, 1 + sign * delta);
    const currentDomain = { x: nextXDomain, y: originalDomain.y };
    const resumeAnimation = this.handleAnimation(ctx);
    if (isFunction(onDomainChange)) {
      onDomainChange(currentDomain);
    }
    return [{
      target: "parent",
      callback: resumeAnimation,
      mutation: () => {
        return {
          domain: currentDomain, currentDomain, originalDomain, cachedZoomDomain: zoomDomain,
          parentControlledProps: ["domain"], panning: false
        };
      }
    }];
  }
};


export default {
  onMouseDown: Helpers.onMouseDown.bind(Helpers),
  onMouseUp: Helpers.onMouseUp.bind(Helpers),
  onMouseLeave: Helpers.onMouseLeave.bind(Helpers),
  onMouseMove: throttle(Helpers.onMouseMove.bind(Helpers), 16, {leading: true}),
  onWheel: throttle(Helpers.onWheel.bind(Helpers), 16, {leading: true})
};
