import { Selection } from "victory-core";
export default {

  getOriginalDomain(scale) {
    return {
      x: scale.x.domain(),
      y: scale.y.domain()
    };
  },

  withinBounds(point, bounds)  {
    const {x1, x2, y1, y2} = bounds;
    const {x, y} = point;
    return x >= Math.min(x1, x2) &&
      x <= Math.max(x1, x2) &&
      y >= Math.min(y1, y2) &&
      y <= Math.max(y1, y2);
  },

  getDomainBox(props, fullDomain, selectedDomain) {
    const { dimension, scale } = props;
    fullDomain = fullDomain || this.getOriginalDomain(props);
    selectedDomain = selectedDomain || props.selectedDomain || fullDomain;
    const fullCoordinates = Selection.getDomainCoordinates(scale, fullDomain);
    const selectedCoordinates = Selection.getDomainCoordinates(scale, selectedDomain);

    return {
      x1: dimension !== "y" ? Math.min(...selectedCoordinates.x) : Math.min(...fullCoordinates.x),
      x2: dimension !== "y" ? Math.max(...selectedCoordinates.x) : Math.max(...fullCoordinates.x),
      y1: dimension !== "x" ? Math.min(...selectedCoordinates.y) : Math.min(...fullCoordinates.y),
      y2: dimension !== "x" ? Math.max(...selectedCoordinates.y) : Math.max(...fullCoordinates.y)
    };
  },

  getHandles(props, domainBox) {
    const {handleWidth} = props;
    const {x1, x2, y1, y2} = domainBox;
    return {
      left: {x1: x1 - handleWidth, x2: x1 + handleWidth, y1, y2},
      right: {x1: x2 - handleWidth, x2: x2 + handleWidth, y1, y2},
      top: {x1, x2, y1: y1 + handleWidth, y2: y1 - handleWidth},
      bottom: {x1, x2, y1: y1 + handleWidth, y2: y1 - handleWidth}
    };
  }
};
