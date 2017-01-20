import React, {PropTypes} from "react";
import { defaults, isFunction } from "lodash";
import ZoomHelpers from "./zoom-helper-methods";
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
        const { scale } = targetProps;
        const svg = targetProps.svg || Selection.getParentSVG(evt.target);
        const matrix = targetProps.matrix = matrix || Selection.getTransformationMatrix(svg);
        const originalDomain = targetProps.originalDomain || ZoomHelpers.getOriginalDomain(scale);
        const zoomDomain = targetProps.zoomDomain || originalDomain;
        const startX = Selection.transformTarget(evt.clientX, matrix, "x");
        const lastDomain = zoomDomain;
        return [{
          target: "parent",
          mutation: () => {
            return {
              svg, matrix, originalDomain, startX, lastDomain, zoomDomain, getTimer, isPanning: true
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
          const { scale, startX, onDomainChange } = targetProps;
          const svg = targetProps.svg || Selection.getParentSVG(evt.target);
          const matrix = targetProps.matrix = matrix || Selection.getTransformationMatrix(svg);
          const originalDomain = targetProps.originalDomain || ZoomHelpers.getOriginalDomain(scale);
          const lastDomain = targetProps.lastDomain || targetProps.zoomDomain || originalDomain;
          const delta = startX - Selection.transformTarget(evt.clientX, matrix, "x");
          const calculatedDx = delta / ZoomHelpers.getDomainScale(lastDomain, scale);
          const nextXDomain = ZoomHelpers.pan(lastDomain.x, originalDomain.x, calculatedDx);
          const zoomDomain = { x: nextXDomain, y: lastDomain.y };
          const getTimer = isFunction(ctx.getTimer) && ctx.getTimer.bind(ctx);
          let resumeAnimation;
          if (getTimer && isFunction(getTimer().bypassAnimation)) {
            getTimer().bypassAnimation();
            resumeAnimation = isFunction(getTimer().resumeAnimation) ?
              () => getTimer().resumeAnimation() : undefined;
          }
          if (isFunction(onDomainChange)) {
            onDomainChange(zoomDomain);
          }
          return [{
            target: "parent",
            callback: resumeAnimation,
            mutation: () => {
              return {zoomDomain, originalDomain};
            }
          }];
        }
      },
      onWheel: (evt, targetProps, eventKey, ctx) => { // eslint-disable-line max-params, max-statements, max-len
        evt.preventDefault();
        const deltaY = evt.deltaY;
        const { scale, onDomainChange } = targetProps;
        const originalDomain = targetProps.originalDomain || ZoomHelpers.getOriginalDomain(scale);
        const lastDomain = targetProps.zoomDomain || originalDomain;
        const {x} = lastDomain;
        const xBounds = originalDomain.x;
        // TODO: Check scale factor
        const nextXDomain = ZoomHelpers.scale(x, xBounds, 1 + (deltaY / 300));
        const zoomDomain = { x: nextXDomain, y: originalDomain.y };
        const getTimer = isFunction(ctx.getTimer) && ctx.getTimer.bind(ctx);
        let resumeAnimation;
        if (getTimer && isFunction(getTimer().bypassAnimation)) {
          getTimer().bypassAnimation();
          resumeAnimation = isFunction(getTimer().resumeAnimation) ?
            () => getTimer().resumeAnimation() : undefined;
        }
        if (isFunction(onDomainChange)) {
          onDomainChange(zoomDomain);
        }
        return [{
          target: "parent",
          callback: resumeAnimation,
          mutation: () => {
            return {zoomDomain, originalDomain};
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
      newChildren[index] = React.cloneElement(
        child, defaults({domain: props.zoomDomain}, child.props)
      );
    }
    return newChildren;
  }

  renderContainer(props, svgProps, style) {
    const { title, desc, portalComponent, className } = props;
    const children = this.modifyChildren(props);
    const childGroups = this.clipDataComponents(children, props);
    return (
      <svg {...svgProps} style={style} className={className}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        {childGroups}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </svg>
    );
  }
}
