

export default {
  getParentSVG(target) {
    if (target.nodeName === "svg") {
      return target;
    } else {
      return this.getParentSVG(target.parentNode);
    }
  },

  getSVGEventCoordinates(evt) {
    const svg = this.getParentSVG(evt.target);
    const matrix = svg.getScreenCTM().inverse();
    const {a, d, e, f} = matrix;
    return {
      x: a * evt.clientX + e,
      y: d * evt.clientY + f
    };
  }
};
