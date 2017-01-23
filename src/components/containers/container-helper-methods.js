import { Selection } from "victory-core";
import { assign } from "lodash";

export default {
  getOriginalDomain(scale) {
    return {
      x: scale.x.domain(),
      y: scale.y.domain()
    };
  },

  withinBounds(point, bounds, padding)  {
    const {x1, x2, y1, y2} = bounds;
    const {x, y} = point;
    padding = padding ? padding / 2 : 0;
    return x + padding >= Math.min(x1, x2) &&
      x - padding <= Math.max(x1, x2) &&
      y + padding >= Math.min(y1, y2) &&
      y - padding <= Math.max(y1, y2);
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
    const {x1, x2, y1, y2} = domainBox;
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const handleWidth = props.handleWidth / 2;
    return {
      left: {x1: minX - handleWidth, x2: minX + handleWidth, y1, y2},
      right: {x1: maxX - handleWidth, x2: maxX + handleWidth, y1, y2},
      top: {x1, x2, y1: minY + handleWidth, y2: minY - handleWidth},
      bottom: {x1, x2, y1: maxY + handleWidth, y2: maxY - handleWidth}
    };
  },

  pickHandles(point, handles) {
    const options = ["top", "bottom", "left", "right"];
    const activeHandles = options.reduce((memo, opt) => {
      memo = this.withinBounds(point, handles[opt]) ? memo.concat(opt) : memo;
      return memo;
    }, []);
    return activeHandles.length && activeHandles;
  },

  getHandleMutation(box, handles) {
    const {x1, y1, x2, y2} = box;
    const mutations = {
      left: {x1: Math.max(x1, x2), x2: Math.min(x1, x2), y1, y2},
      right: {x1: Math.min(x1, x2), x2: Math.max(x1, x2), y1, y2},
      top: {y1: Math.max(y1, y2), y2: Math.min(y1, y2), x1, x2},
      bottom: {y1: Math.min(y1, y2), y2: Math.max(y1, y2), x1, x2}
    };
    return handles.reduce((memo, current) => {
      return assign(memo, mutations[current]);
    }, {});
  },

  getMinimumDomain() {
    return {x: [0, 1 / Number.MAX_SAFE_INTEGER], y: [0, 1 / Number.MAX_SAFE_INTEGER]};
  },

  getStandardMutation(point, box, dimension) {
    const {x, y} = point;
    const {x1, x2, y1, y2} = box;
    return {
      x1: dimension !== "y" ? x : x1,
      y1: dimension !== "x" ? y : y1,
      x2: dimension !== "y" ? x : x2,
      y2: dimension !== "x" ? y : y2
    };
  }
};
