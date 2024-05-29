import { makeCreateContainerFunction } from "victory-create-container";
import { VictoryContainer } from "../components/victory-container";
import { VictoryZoomContainer } from "../components/victory-zoom-container";
import { VictoryVoronoiContainer } from "../components/victory-voronoi-container";
import { VictorySelectionContainer } from "../components/victory-selection-container";
import { VictoryBrushContainer } from "../components/victory-brush-container";
import { VictoryCursorContainer } from "../components/victory-cursor-container";

export const createContainer = makeCreateContainerFunction(
  {
    zoom: VictoryZoomContainer,
    voronoi: VictoryVoronoiContainer,
    selection: VictorySelectionContainer,
    brush: VictoryBrushContainer,
    cursor: VictoryCursorContainer,
  },
  VictoryContainer,
);

export default createContainer;
