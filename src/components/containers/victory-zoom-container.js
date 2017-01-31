import React, {PropTypes} from "react";
import { defaults, isFunction, isEqual } from "lodash";
import Helpers from "./helper-methods";
import {
  VictoryContainer, VictoryClipContainer, PropTypes as CustomPropTypes, Selection, Timer
} from "victory-core";

export default class VictoryZoomContainer extends VictoryContainer {
  static displayName = "VictoryZoomContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    zoomDomain: PropTypes.shape({
      x: CustomPropTypes.domain,
      y: CustomPropTypes.domain
    }),
    onDomainChange: PropTypes.func,
    clipContainerComponent: PropTypes.element.isRequired,
    allowZoom: PropTypes.bool
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    clipContainerComponent: <VictoryClipContainer/>,
    allowZoom: true
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
        evt.preventDefault();
        const getTimer = targetProps.getTimer || ctx.context && ctx.context.getTimer || new Timer();
        const originalDomain = targetProps.originalDomain || targetProps.domain;
        const currentDomain = targetProps.currentDomain || targetProps.zoomDomain || originalDomain;
        const {x} = Selection.getSVGEventCoordinates(evt);
        return [{
          target: "parent",
          mutation: () => {
            return {
              startX: x, domain: currentDomain, cachedZoomDomain: targetProps.zoomDomain,
              originalDomain, currentDomain, getTimer, isPanning: true,
              parentControlledProps: ["domain"]
            };
          }
        }];
      },
      onMouseUp: () => {
        return [{
          target: "parent",
          mutation: () => {
            return {isPanning: false};
          }
        }];
      },
      onMouseLeave: () => {
        return [{
          target: "parent",
          mutation: () => {
            return {isPanning: false};
          }
        }];
      },
      onMouseMove: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params, max-statements, max-len
        if (targetProps.isPanning) {
          const { scale, startX, onDomainChange, domain, zoomDomain } = targetProps;
          const {x} = Selection.getSVGEventCoordinates(evt);
          const originalDomain = targetProps.originalDomain || domain;
          const lastDomain = targetProps.currentDomain || targetProps.zoomDomain || originalDomain;
          const calculatedDx = (startX - x) / Helpers.getDomainScale(lastDomain, scale);
          const nextXDomain = Helpers.pan(lastDomain.x, originalDomain.x, calculatedDx);
          const currentDomain = { x: nextXDomain, y: originalDomain.y };
          const getTimer = isFunction(ctx.getTimer) && ctx.getTimer.bind(ctx);
          let resumeAnimation;
          if (getTimer && isFunction(getTimer().bypassAnimation)) {
            getTimer().bypassAnimation();
            resumeAnimation = isFunction(getTimer().resumeAnimation) ?
              () => getTimer().resumeAnimation() : undefined;
          }
          if (isFunction(onDomainChange)) {
            onDomainChange(currentDomain);
          }
          return [{
            target: "parent",
            callback: resumeAnimation,
            mutation: () => {
              return {
                domain: currentDomain, currentDomain, originalDomain, cachedZoomDomain: zoomDomain
              };
            }
          }];
        }
      },
      onWheel: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params, max-statements, max-len
        if (!targetProps.allowZoom) {
          return {};
        }
        evt.preventDefault();
        const deltaY = evt.deltaY;
        const { onDomainChange, domain, zoomDomain } = targetProps;
        const originalDomain = targetProps.originalDomain || domain;
        const lastDomain = targetProps.currentDomain || zoomDomain || originalDomain;
        const {x} = lastDomain;
        const xBounds = originalDomain.x;
        // TODO: Check scale factor
        const nextXDomain = Helpers.scale(x, xBounds, 1 + (deltaY / 300));
        const currentDomain = { x: nextXDomain, y: originalDomain.y };
        const getTimer = isFunction(ctx.getTimer) && ctx.getTimer.bind(ctx);
        let resumeAnimation;
        if (getTimer && isFunction(getTimer().bypassAnimation)) {
          getTimer().bypassAnimation();
          resumeAnimation = isFunction(getTimer().resumeAnimation) ?
            () => getTimer().resumeAnimation() : undefined;
        }
        if (isFunction(onDomainChange)) {
          onDomainChange(currentDomain);
        }
        return [{
          target: "parent",
          callback: resumeAnimation,
          mutation: () => {
            return {
              domain: currentDomain, currentDomain, originalDomain, cachedZoomDomain: zoomDomain,
              parentControlledProps: ["domain"]
            };
          }
        }];
      }
    }
  }];

  clipDataComponents(children, props) { //eslint-disable-line max-statements
    const { scale, height, clipContainerComponent } = props;
    const rangeX = scale.x.range();
    const plottableWidth = Math.abs(rangeX[0] - rangeX[1]);
    const childComponents = [];
    let group = [];
    let groupNumber = 0;

    const makeGroup = (arr, index) => {
      return React.cloneElement(clipContainerComponent, {
        key: `ZoomClipContainer-${index}`,
        clipWidth: plottableWidth,
        clipHeight: height,
        translateX: rangeX[0],
        children: arr
      });
    };

    const findNextAxis = (start) => {
      const subset = children.slice(start);
      return subset.findIndex((child) => child.type.displayName === "VictoryAxis") + start;
    };

    let axisIndex = findNextAxis(0);

    if (axisIndex === -1) {
      return makeGroup(children, groupNumber);
    }
    for (let i = 0, len = children.length; i < len; i++) {
      if (i === axisIndex) {
        childComponents.push(makeGroup(group, groupNumber), children[i]);
        axisIndex = findNextAxis(i + 1);
        group = [];
        groupNumber++;
      }
      group.push(children[i]);
    }
    childComponents.push(makeGroup(group, groupNumber));
    return childComponents;
  }

  modifyChildren(props) {
    const childComponents = React.Children.toArray(props.children);
    const newChildren = [];
    for (let index = 0, len = childComponents.length; index < len; index++) {
      const child = childComponents[index];
      const {zoomDomain, cachedZoomDomain, currentDomain} = props;
      const domain = isEqual(zoomDomain, cachedZoomDomain) ?
        currentDomain || zoomDomain : zoomDomain;
      newChildren[index] = React.cloneElement(
        child, defaults({domain}, child.props)
      );
    }
    return newChildren;
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = this.modifyChildren(props);
    return this.clipDataComponents(children, props);
  }
}
