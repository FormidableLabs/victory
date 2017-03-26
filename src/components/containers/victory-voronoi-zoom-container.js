import { combineContainerMixins } from "./combine-container-mixins";
import { voronoiContainerMixin } from "./victory-voronoi-container";
import { zoomContainerMixin } from "./victory-zoom-container";

export default combineContainerMixins(
  voronoiContainerMixin,
  zoomContainerMixin
);
