import { Selection } from "victory-core";
export default {

  getOriginalDomain(scale) {
    if (!scale) {
      return {};
    }
    return {
      x: scale.x.domain(),
      y: scale.y.domain()
    };
  },

  withinBounds(point, bounds)  {
    const {x, y} = bounds;
    return point.x >= Math.min(...x) &&
      point.x <= Math.max(...x) &&
      point.y >= Math.min(...y) &&
      point.y <= Math.max(...y);
  },

  getDomainBox(props, fullDomain, selectedDomain) {
    const { dimension, scale } = props;
    fullDomain = fullDomain || this.getOriginalDomain(props);
    selectedDomain = selectedDomain || props.selectedDomain || fullDomain;
    const fullCoords = Selection.getDomainCoordinates(scale, fullDomain);
    const selectedCoords = Selection.getDomainCoordinates(scale, selectedDomain);
    const x1 = dimension !== "y" ? Math.min(...selectedCoords.x) : Math.min(...fullCoords.x);
    const x2 = dimension !== "y" ? Math.max(...selectedCoords.x) : Math.max(...fullCoords.x);
    const y1 = dimension !== "x" ? Math.min(...selectedCoords.y) : Math.min(...fullCoords.y);
    const y2 = dimension !== "x" ? Math.max(...selectedCoords.y) : Math.max(...fullCoords.y);
    return {
      x: [Math.min(x1, x2), Math.max(x1, x2)], y: [Math.min(y1, y2), Math.max(y1, y2)]
    };
  },

  getHandles(props, domainBox) {
    if (!domainBox) {
      return {};
    }
    const {handleWidth} = props;
    const {x, y} = domainBox;
    return {
      left: {x: [ Math.min(...x) - handleWidth, Math.min(...x) + handleWidth ], y},
      right: {x: [ Math.max(...x) - handleWidth, Math.max(...x) + handleWidth ], y},
      top: {x, y: [ Math.min(...y) - handleWidth, Math.min(...y) + handleWidth ]},
      bottom: {x, y: [ Math.max(...y) - handleWidth, Math.max(...y) + handleWidth ]}
    };
  }

};
