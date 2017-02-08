import React from "react";
import { VictoryContainer } from "victory-core";
import VoronoiHelpers from "./voronoi-helpers";
import { without } from "lodash";


export default class VictoryVoronoiContainer extends VictoryContainer {
  static displayName = "VictoryVoronoiContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    onSelection: React.PropTypes.func,
    onSelectionCleared: React.PropTypes.func,
    standalone: React.PropTypes.bool,
    radius: React.PropTypes.number
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    standalone: true
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseDown: (evt, targetProps) => {
        VoronoiHelpers.onMouseMove.cancel();
        return VoronoiHelpers.onMouseLeave(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        evt.persist();
        return VoronoiHelpers.onMouseMove(evt, targetProps);
      }
    }
  }];

  getVoronoiPath(points) {
    return Array.isArray(points) && points.length ?
      `M ${points.join("L")} Z` : "";
  }

  getPolygons(props) {
    if (!props.polygons) {
      return [];
    }
    return props.polygons.map((polygon) => {
      const points = without(polygon, "data");
      const path = this.getVoronoiPath(points);
      return <path d={path} style={{stroke: "black", fill: "none"}}/>
    });
  }

  // Overrides method in VictoryContainer
  getChildren(props) {
    const children = React.Children.toArray(props.children);
    const components = [...children, ...this.getPolygons(props)];
    return components.map((component, i) => {
      return component ? React.cloneElement(component, {key: i}) : null;
    });
  }
}
