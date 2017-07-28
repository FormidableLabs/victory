import PropTypes from "prop-types";
import React from "react";
import { defaults, isEqual } from "lodash";
import ZoomHelpers from "./zoom-helpers";
import { VictoryContainer, VictoryClipContainer, PropTypes as CustomPropTypes } from "victory-core";

export const zoomContainerMixin = (base) => class VictoryZoomContainer extends base {
  static displayName = "VictoryZoomContainer";

  static propTypes = {
    ...VictoryContainer.propTypes,
    allowZoom: PropTypes.bool,
    clipContainerComponent: PropTypes.element.isRequired,
    dimension: PropTypes.oneOf(["x", "y"]),
    minimumZoom: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    onDomainChange: PropTypes.func,
    zoomDomain: PropTypes.shape({
      x: CustomPropTypes.domain,
      y: CustomPropTypes.domain
    })
  };

  static defaultProps = {
    ...VictoryContainer.defaultProps,
    clipContainerComponent: <VictoryClipContainer/>,
    allowZoom: true,
    zoomActive: false
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        return ZoomHelpers.onMouseDown(evt, targetProps);
      },
      onMouseUp: (evt, targetProps) => {
        return ZoomHelpers.onMouseUp(evt, targetProps);
      },
      onMouseLeave: (evt, targetProps) => {
        return ZoomHelpers.onMouseLeave(evt, targetProps);
      },
      onMouseMove: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
        evt.preventDefault();
        const mutations = ZoomHelpers.onMouseMove(evt, targetProps, eventKey, ctx);

        if (mutations.id !== this.mouseMoveMutationId) { // eslint-disable-line
          this.mouseMoveMutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }

        return undefined;
      },
      onWheel: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
        if (targetProps.allowZoom) {
          evt.preventDefault();
        }

        const mutations = ZoomHelpers.onWheel(evt, targetProps, eventKey, ctx);

        if (mutations.id !== this.wheelMutationId) { // eslint-disable-line
          this.wheelMutationId = mutations.id; // eslint-disable-line
          return mutations.mutations;
        }

        return undefined;
      }
    }
  }];

  clipDataComponents(children, props) { //eslint-disable-line max-statements
    const { scale, clipContainerComponent, polar, origin } = props;
    const rangeX = scale.x.range();
    const rangeY = scale.y.range();
    const plottableWidth = Math.abs(rangeX[0] - rangeX[1]);
    const plottableHeight = Math.abs(rangeY[0] - rangeY[1]);
    const childComponents = [];
    let group = [];
    let groupNumber = 0;
    const radius = Math.max(...rangeY);
    const makeGroup = (arr, index) => {
      return Array.isArray(arr) && arr.length ?
        React.cloneElement(clipContainerComponent, {
          key: `ZoomClipContainer-${index}`,
          clipWidth: plottableWidth,
          clipHeight: plottableHeight,
          translateX: Math.min(...rangeX),
          translateY: Math.min(...rangeY),
          children: arr,
          polar,
          origin: polar ? origin : undefined,
          radius: polar ? radius : undefined
        }) :
        null;
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
      } else {
        group.push(children[i]);
      }
    }
    childComponents.push(makeGroup(group, groupNumber));
    return childComponents.filter(Boolean);
  }

  modifyPolarDomain(domain, originalDomain) {
    // Only zoom the radius of polar charts. Zooming angles is very confusing
    return {
      x: originalDomain.x,
      y: [0, domain.y[1]]
    };
  }

  modifyChildren(props) {
    const childComponents = React.Children.toArray(props.children);

    return childComponents.map((child) => {
      const { currentDomain, zoomActive } = props;
      const originalDomain = defaults({}, props.originalDomain, props.domain);
      const zoomDomain = defaults({}, props.zoomDomain, props.domain);
      const cachedZoomDomain = defaults({}, props.cachedZoomDomain, props.domain);

      let domain;
      if (!isEqual(zoomDomain, cachedZoomDomain)) {
        // if zoomDomain has been changed, use it
        domain = zoomDomain;
      } else if (!zoomActive) {
        // if user has zoomed all the way out, use the child domain
        domain = child.props.domain;
      } else {
        // default: use currentDomain, set by the event handlers
        domain = defaults({}, currentDomain, originalDomain);
      }

      let newDomain = props.polar ? this.modifyPolarDomain(domain, originalDomain) : domain;
      if (newDomain && props.dimension) {
        // if zooming is restricted to a dimension, don't squash changes to zoomDomain in other dim
        newDomain = {
          ...zoomDomain,
          [props.dimension]: newDomain[props.dimension]
        };
      }
      return React.cloneElement(
        child, defaults({ domain: newDomain }, child.props)
      );
    });
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = this.modifyChildren(props);
    return this.clipDataComponents(children, props);
  }
};

export default zoomContainerMixin(VictoryContainer);
