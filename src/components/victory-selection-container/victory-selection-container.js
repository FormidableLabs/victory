import React from "react";
import { VictoryContainer, Selection } from "victory-core";
import Helpers from "./helper-methods";


export default class VictorySelectionContainer extends VictoryContainer {
  static displayName = "VictorySelectionContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    selectionStyle: React.PropTypes.object,
    onSelection: React.PropTypes.func
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    selectionStyle: {
      stroke: "black",
      fill: "black",
      fillOpacity: 0.2
    }
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        const {x, y} = Selection.getSVGEventCoordinates(evt);
        return [
          {
            target: "parent",
            mutation: () => {
              return {x1: x, y1: y, select: true, x2: null, y2: null};
            }
          }, {
            target: "data",
            childName: targetProps.children ? "all" : undefined,
            eventKey: "all",
            mutation: () => null
          }
        ];
      },
      onMouseMove: (evt, containerProps) => {
        if (!containerProps.select) {
          return {};
        } else {
          const {x, y} = Selection.getSVGEventCoordinates(evt);
          return {
            target: "parent",
            mutation: () => {
              return { x2: x, y2: y };
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
        const bounds = Helpers.getBounds(targetProps);
        const datasets = Helpers.getDatasets(targetProps);
        const selectedData = Helpers.filterDatasets(datasets, bounds);
        const dataMutation = selectedData ?
          selectedData.map((d) => {
            return {
              childName: d.childName, eventKey: d.eventKey, target: "data",
              mutation: () => {
                return {active: true, symbol: "square", size: 6}
              }
            };
          }) : [];
        return parentMutation.concat(dataMutation);
      }
    }
  }];

  getRect(props) {
    const {x1, x2, y1, y2, selectionStyle} = props;
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    return y2 && x2 && x1 && y1 ?
      <rect x={x} y={y} width={width} height={height} style={selectionStyle}/> : null;
  }
  renderContainer(props, svgProps, style) {
    const { title, desc, children, portalComponent, className } = props;
    return (
      <svg {...svgProps} style={style} className={className}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        {this.getRect(props)}
        {children}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </svg>
    );
  }
}
