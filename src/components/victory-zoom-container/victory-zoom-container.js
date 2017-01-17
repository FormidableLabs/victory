import React, {PropTypes} from "react";
import { assign, isFunction } from "lodash";
import ZoomHelpers from "./helper-methods";
import {
  VictoryContainer, VictoryClipContainer, Helpers, PropTypes as CustomPropTypes, Selection
} from "victory-core";

export default class VictorySelectionContainer extends VictoryContainer {
  static displayName = "VictorySelectionContainer";
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
        evt.preventDefault();
        const { domain, scale, zoomDomain } = targetProps;
        const svg = targetProps.svg || Selection.getParentSVG(evt.target);
        const matrix = targetProps.matrix = matrix || Selection.getTransformationMatrix(svg);
        const originalDomain = targetProps.originalDomain || ZoomHelpers.getOriginalDomain(scale);
        const startX = Selection.transformTarget(evt.clientX, matrix, "x");
        const lastDomain = domain || zoomDomain || originalDomain;
        return [{
          target: "parent",
          mutation: () => {
            return {svg, matrix, originalDomain, startX, lastDomain, isPanning: true};
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
      onMouseMove: (evt, targetProps) => {
        if (targetProps.isPanning) {
          const { scale, startX, onDomainChange } = targetProps;
          const svg = targetProps.svg || Selection.getParentSVG(evt.target);
          const matrix = targetProps.matrix = matrix || Selection.getTransformationMatrix(svg);
          const originalDomain = targetProps.originalDomain || ZoomHelpers.getOriginalDomain(scale);
          const lastDomain = targetProps.domain || targetProps.lastDomain;
          const clientX = evt.clientX;
          requestAnimationFrame(() => { // eslint-disable-line no-undef
            const delta = startX - Selection.transformTarget(clientX, matrix, "x");
            const calculatedDx = delta / ZoomHelpers.getDomainScale(targetProps.domain, scale);
            const nextXDomain = ZoomHelpers.pan(lastDomain.x, originalDomain.x, calculatedDx);
            const domain = { x: nextXDomain, y: lastDomain.y };
            if (isFunction(onDomainChange)) {
              onDomainChange(domain);
            }
            return [{
              target: "parent",
              mutation: () => {
                return {domain};
              }
            }];
          });
        }
      },
      onWheel: (evt, targetProps) => {
        evt.preventDefault();
        const deltaY = evt.deltaY;
        const { scale, onDomainChange } = targetProps;
        const originalDomain = targetProps.originalDomain || ZoomHelpers.getOriginalDomain(scale);
        const lastDomain = targetProps.domain || targetProps.lastDomain || originalDomain;
        requestAnimationFrame(() => { // eslint-disable-line no-undef
          const {x} = targetProps.domain;
          const xBounds = originalDomain.x;
          // TODO: Check scale factor
          const nextXDomain = ZoomHelpers.scale(x, xBounds, 1 + (deltaY / 300));
          const domain = { x: nextXDomain, y: lastDomain.y };
          if (isFunction(onDomainChange)) {
            onDomainChange(domain);
          }
          return [{
            target: "parent",
            mutation: () => {
              return {domain};
            }
          }];
        });
      }
    }
  }];


  clipDataComponents(children, props) { //eslint-disable-line max-statements
    const [rangex0, rangex1] = Helpers.getRange(props, "x");
    const childComponents = [];
    let group = [];
    let groupNumber = 0;

    const makeGroup = (arr, index) => {
      return React.cloneElement(props.clipContainerComponent, {
        key: `ZoomClipContainer-${index}`,
        clipWidth: rangex1 - rangex0,
        clipHeight: props.height,
        translateX: rangex0,
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

  renderChart(chartElement, props) {
    return React.cloneElement(chartElement, props);
  }

  render() {
    const chart = React.Children.only(this.props.children);
    const events = chart.props.events
      ? (this.events || []).concat(chart.props.events)
      : this.events;

    const nextProps = assign({}, chart.props, {
      events,
      domain: this.props.domain,
      modifyChildren: this.clipDataComponents
    });

    return this.renderChart(chart, nextProps);
  }
}
