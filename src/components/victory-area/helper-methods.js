import assign from "lodash/object/assign";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import { Collection } from "victory-core";

module.exports = {
  getData(props) {
    if (props.data) {
      const hasMultipleDatasets = Collection.isArrayOfArrays(props.data) &&
        props.y === "y" && props.x === "x";
      return Data.formatDatasets(props, hasMultipleDatasets);
    } else if (Array.isArray(props.y) && typeof props.y[0] === "function") {
      return props.y.map((y, index) => {
        const newProps = assign({}, props, {y});
        return {
          attrs: Data.getAttributes(props, index),
          data: Data.getData(newProps)
        };
      });
    } else {
      return [{
        attrs: Data.getAttributes(props, 0),
        data: Data.getData(props)
      }];
    }
  },

  getDomain(props, axis) {
    const propsDomain = Domain.getDomainFromProps(props, axis);
    if (propsDomain) {
      return Domain.padDomain(propsDomain, props, axis);
    }
    const ensureZero = (domain) => {
      return axis === "y" ? [Math.min(...domain, 0), Math.max(... domain, 0)] : domain;
    };
    const dataDomain = ensureZero(Domain.getDomainFromGroupedData(props, axis));
    return Domain.padDomain(dataDomain, props, axis);
  }
};
