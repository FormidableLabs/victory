import assign from "lodash/assign";
import Layout from "../../helpers/layout";

export default {
  getBaseline(dataset, calculatedProps) {
    const {domain} = calculatedProps;
    const minY = Math.min(...domain.y) > 0 ? Math.min(...domain.y) : 0;
    return dataset.map((datum) => {
      const y0 = datum.yOffset || minY;
      return assign({y0}, datum);
    });
  }
};
