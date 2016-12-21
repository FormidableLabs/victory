export default {
  getMousePosition(evt) {
    const getOuterSvg = (node) => {
      if (node.nodeName === "svg") {
        return node;
      } else {
        return getOuterSvg(node.parentNode);
      }
    };
    const svg = getOuterSvg(evt.target);
    const matrix = svg.getScreenCTM().inverse();
    const {a, d, e, f} = matrix;
    return {
      x: a * evt.clientX + e,
      y: d * evt.clientY + f
    };
  }
}