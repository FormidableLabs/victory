import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import { isFunction, assign, omit } from "lodash";


export default class VictorySelectionContainer extends VictoryContainer {
  static displayName = "VictorySelectionContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    selectionStyle: React.PropTypes.object,
    onSelection: React.PropTypes.func,
    onSelectionCleared: React.PropTypes.func,
    dimension: React.PropTypes.oneOf(["x", "y"]),
    standalone: React.PropTypes.bool,
    selectionComponent: React.PropTypes.element
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    selectionStyle: {
      stroke: "transparent",
      fill: "black",
      fillOpacity: 0.1
    },
    standalone: true,
    selectionComponent: <rect/>
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        evt.preventDefault();
        const { dimension, scale } = targetProps;
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        const x1 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[0];
        const y1 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[0];
        const x2 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[1];
        const y2 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[1];
        if (isFunction(targetProps.onSelectionCleared)) {
          targetProps.onSelectionCleared();
        }
        return [
          {
            target: "parent",
            mutation: () => {
              return {x1, y1, select: true, x2, y2};
            }
          }, {
            target: "data",
            childName: targetProps.children ? "all" : undefined,
            eventKey: "all",
            mutation: () => null
          }
        ];
      },
      onMouseMove: (evt, targetProps) => {
        const {dimension, scale, select} = targetProps;
        if (!select) {
          return {};
        } else {
          const {x, y} = Selection.getSVGEventCoordinates(evt);
          const x2 = dimension !== "y" ? x : Selection.getDomainCoordinates(scale).x[1];
          const y2 = dimension !== "x" ? y : Selection.getDomainCoordinates(scale).y[1];
          return {
            target: "parent",
            mutation: () => {
              return { x2, y2 };
            }
          };
        }
      },
      onMouseUp: (evt, targetProps) => {
        const {x2, y2} = targetProps;
        const parentMutation = [{
          target: "parent",
          mutation: () => {
            return { select: false, x1: null, x2: null, y1: null, y2: null };
          }
        }];
        if (!x2 || !y2) {
          return parentMutation;
        }
        const bounds = Selection.getBounds(targetProps);
        const datasets = Selection.getDatasets(targetProps);
        const selectedData = Selection.filterDatasets(datasets, bounds);
        const callbackMutation = selectedData && isFunction(targetProps.onSelection) ?
          targetProps.onSelection(selectedData, bounds) : {};
        const dataMutation = selectedData ?
          selectedData.map((d) => {
            return {
              childName: d.childName, eventKey: d.eventKey, target: "data",
              mutation: () => {
                return assign({active: true}, callbackMutation);
              }
            };
          }) : [];
        return parentMutation.concat(dataMutation);
      }
    }
  }];

  getRect(props) {
    const {x1, x2, y1, y2, selectionStyle, selectionComponent} = props;
    const width = Math.abs(x2 - x1) || 1;
    const height = Math.abs(y2 - y1) || 1;
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    return y2 && x2 && x1 && y1 ?
      React.cloneElement(selectionComponent, {x, y, width, height, style: selectionStyle}) : null;
  }

  renderContainer(props, svgProps, style) {
    const { title, desc, children, portalComponent, className, standalone } = props;
    const containerProps = standalone ? svgProps : omit(svgProps, ["width", "height", "viewBox"]);
    return standalone ?
      (
        <svg {...containerProps} style={style} className={className}>
          <title id="title">{title}</title>
          <desc id="desc">{desc}</desc>
          {this.getRect(props)}
          {children}
          {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
        </svg>
      ) : (
        <g {...containerProps} style={style} className={className}>
          {this.getRect(props)}
          {children}
        </g>
      );
  }
}
