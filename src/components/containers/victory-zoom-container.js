import React, {PropTypes} from "react";
import { defaults, isEqual } from "lodash";
import ZoomHelpers from "./zoom-helpers";
import { VictoryContainer, VictoryClipContainer, PropTypes as CustomPropTypes } from "victory-core";

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
      onMouseDown: (evt, targetProps) => {
        ZoomHelpers.getHandlers().onMouseMove.cancel();
        ZoomHelpers.getHandlers().onWheel.cancel();
        return ZoomHelpers.getHandlers().onMouseDown(evt, targetProps);
      },
      onMouseUp: (evt, targetProps) => {
        ZoomHelpers.getHandlers().onMouseMove.cancel();
        ZoomHelpers.getHandlers().onWheel.cancel();
        return ZoomHelpers.getHandlers().onMouseUp(evt, targetProps);
      },
      onMouseLeave: (evt, targetProps) => {
        ZoomHelpers.getHandlers().onMouseMove.cancel();
        ZoomHelpers.getHandlers().onWheel.cancel();
        return ZoomHelpers.getHandlers().onMouseLeave(evt, targetProps);
      },
      onMouseMove: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
        evt.preventDefault();
        evt.persist();
        ZoomHelpers.getHandlers().onWheel.cancel();
        return ZoomHelpers.getHandlers().onMouseMove(evt, targetProps, eventKey, ctx);
      },
      onWheel: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
        evt.preventDefault();
        evt.persist();
        ZoomHelpers.getHandlers().onMouseMove.cancel();
        return ZoomHelpers.getHandlers().onWheel(evt, targetProps, eventKey, ctx);
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
