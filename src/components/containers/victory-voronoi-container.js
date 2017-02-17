import React from "react";
import { VictoryContainer } from "victory-core";
import VoronoiHelpers from "./voronoi-helpers";


export default class VictoryVoronoiContainer extends VictoryContainer {
  static displayName = "VictoryVoronoiContainer";
  static propTypes = {
    ...VictoryContainer.propTypes,
    onSelection: React.PropTypes.func,
    onSelectionCleared: React.PropTypes.func,
    standalone: React.PropTypes.bool,
    radius: React.PropTypes.number,
    voronoiPadding: React.PropTypes.number
  };
  static defaultProps = {
    ...VictoryContainer.defaultProps,
    standalone: true
  };

  static defaultEvents = [{
    target: "parent",
    eventHandlers: {
      onMouseLeave: (evt, targetProps) => {
        VoronoiHelpers.onMouseMove.cancel();
        return VoronoiHelpers.onMouseLeave(evt, targetProps);
      },
      onMouseMove: (evt, targetProps) => {
        evt.persist();
        return VoronoiHelpers.onMouseMove(evt, targetProps);
      }
    }
  }, {
    target: "data",
    eventHandlers: {
      onMouseOver: () => null,
      onMouseOut: () => null,
      onMouseMove: () => null
    }
  }];
}
