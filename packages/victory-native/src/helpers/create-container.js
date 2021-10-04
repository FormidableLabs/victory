
import { makeCreateContainerFunction } from "victory-create-container";
import VictoryContainer from "../components/victory-container";
import { zoomContainerMixin } from "../components/victory-zoom-container";
import { voronoiContainerMixin } from "../components/victory-voronoi-container";
import { selectionContainerMixin } from "../components/victory-selection-container";
import { brushContainerMixin } from "../components/victory-brush-container";
import { cursorContainerMixin } from "../components/victory-cursor-container";

export const createContainer = makeCreateContainerFunction({
  zoom: [zoomContainerMixin],
  voronoi: [voronoiContainerMixin],
  selection: [selectionContainerMixin],
  brush: [brushContainerMixin],
  cursor: [cursorContainerMixin]
}, VictoryContainer);

export default createContainer;
