import PropTypes from "prop-types";
import React from "react";
import { defaults, get } from "lodash";
import ZoomHelpers from "./zoom-helpers";
import {
  VictoryContainer, VictoryClipContainer, Data, PropTypes as CustomPropTypes
} from "victory-core";

const DEFAULT_DOWNSAMPLE = 150;

export const zoomContainerMixin = (base) => class VictoryZoomContainer extends base {
  static displayName = "VictoryZoomContainer";

  static propTypes = {
    ...VictoryContainer.propTypes,
    allowPan: PropTypes.bool,
    allowZoom: PropTypes.bool,
    clipContainerComponent: PropTypes.element.isRequired,
    downsample: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),
    minimumZoom: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    onZoomDomainChange: PropTypes.func,
    zoomDimension: PropTypes.oneOf(["x", "y"]),
    zoomDomain: PropTypes.shape({
      x: CustomPropTypes.domain,
      y: CustomPropTypes.domain
    })
  };

  static defaultProps = {
    ...VictoryContainer.defaultProps,
    clipContainerComponent: <VictoryClipContainer/>,
    allowPan: true,
    allowZoom: true,
    zoomActive: false
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        return ZoomHelpers.onMouseDown(evt, targetProps);
      },
      onTouchStart: (evt, targetProps) => {
        return ZoomHelpers.onMouseDown(evt, targetProps);
      },
      onMouseUp: (evt, targetProps) => {
        return ZoomHelpers.onMouseUp(evt, targetProps);
      },
      onTouchEnd: (evt, targetProps) => {
        return ZoomHelpers.onMouseUp(evt, targetProps);
      },
      onMouseLeave: (evt, targetProps) => {
        return ZoomHelpers.onMouseLeave(evt, targetProps);
      },
      onTouchCancel: (evt, targetProps) => {
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
      onTouchMove: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params
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

  clipDataComponents(children, props) {
    const { scale, clipContainerComponent, polar, origin } = props;
    const rangeX = scale.x.range();
    const rangeY = scale.y.range();
    const plottableWidth = Math.abs(rangeX[0] - rangeX[1]);
    const plottableHeight = Math.abs(rangeY[0] - rangeY[1]);
    const radius = Math.max(...rangeY);
    const groupComponent = React.cloneElement(clipContainerComponent, {
      clipWidth: plottableWidth,
      clipHeight: plottableHeight,
      translateX: Math.min(...rangeX),
      translateY: Math.min(...rangeY),
      polar,
      origin: polar ? origin : undefined,
      radius: polar ? radius : undefined,
      ...clipContainerComponent.props
    });
    return React.Children.toArray(children).map((child) => {
      const role = child && child.type && child.type.role;
      if (role === "axis" || role === "legend" || role === "label") {
        return child;
      } else {
        return React.cloneElement(child, { groupComponent });
      }
    });
  }

  modifyPolarDomain(domain, originalDomain) {
    // Only zoom the radius of polar charts. Zooming angles is very confusing
    return {
      x: originalDomain.x,
      y: [0, domain.y[1]]
    };
  }

  downsampleZoomData(props, childProps, domain) {
    const { downsample } = props;
    const rawData = get(childProps, "data");
    // return undefined if downsample is not run, then default() will replace with child.props.data
    if (!downsample || !rawData || !domain) { return undefined; }

    // if data accessors are not used, skip calling expensive Data.formatData
    const data = (childProps.x || childProps.y) ? Data.formatData(rawData, childProps) : rawData;
    const maxPoints = (downsample === true) ? DEFAULT_DOWNSAMPLE : downsample;
    const dimension = props.zoomDimension || "x";

    // important: assumes data is ordered by dimension
    // get the start and end of the data that is in the current visible domain
    let startIndex = data.findIndex((d) => d[dimension] >= domain[dimension][0]);
    let endIndex = data.findIndex((d) => d[dimension] > domain[dimension][1]);
    // pick one more point (if available) at each end so that VictoryLine, VictoryArea connect
    if (startIndex !== 0) { startIndex -= 1; }
    if (endIndex !== -1) { endIndex += 1; }

    const visibleData = data.slice(startIndex, endIndex);

    return Data.downsample(visibleData, maxPoints, startIndex);
  }

  modifyChildren(props) {
    const childComponents = React.Children.toArray(props.children);

    //eslint-disable-next-line max-statements
    return childComponents.map((child) => {
      const role = child && child.type && child.type.role;
      const currentChild = child;
      const { currentDomain, zoomActive, allowZoom } = props;
      const originalDomain = defaults({}, props.originalDomain, props.domain);
      const zoomDomain = defaults({}, props.zoomDomain, props.domain);
      const cachedZoomDomain = defaults({}, props.cachedZoomDomain, props.domain);
      const checkDomainEquality = (a, b) => {
        return +a.x[0] === +b.x[0] &&
          +a.x[1] === +b.x[1] &&
          +a.y[0] === +b.y[0] &&
          +a.y[1] === +b.y[1];
      };
      let domain;
      if (!checkDomainEquality(zoomDomain, cachedZoomDomain)) {
        // if zoomDomain has been changed, use it
        domain = zoomDomain;
      } else if (allowZoom && !zoomActive) {
        // if user has zoomed all the way out, use the child domain
        domain = currentChild.props.domain;
      } else {
        // default: use currentDomain, set by the event handlers
        domain = defaults({}, currentDomain, originalDomain);
      }

      let newDomain = props.polar ? this.modifyPolarDomain(domain, originalDomain) : domain;
      if (newDomain && props.zoomDimension) {
        // if zooming is restricted to a dimension, don't squash changes to zoomDomain in other dim
        newDomain = {
          ...zoomDomain,
          [props.zoomDimension]: newDomain[props.zoomDimension]
        };
      }
      const newChild = React.cloneElement(
        currentChild,
        defaults({
          domain: newDomain,
          data: role === "legend" ?
            undefined : this.downsampleZoomData(props, currentChild.props, newDomain)
        }, currentChild.props)
      );
      return newChild;
    });
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = this.modifyChildren(props);
    return this.clipDataComponents(children, props);
  }
};

export default zoomContainerMixin(VictoryContainer);
