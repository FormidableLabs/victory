import compact from "lodash/array/compact";
import flatten from "lodash/array/flatten";
import isEmpty from "lodash/lang/isEmpty";
import sum from "lodash/math/sum";
import uniq from "lodash/array/uniq";
import zipObject from "lodash/array/zipObject";

import { Collection, Data} from "victory-util";

import ComponentHelpers from "./component-helpers";

module.exports = {
  createStringMap(childComponents, axis) {
    const axisComponent = ComponentHelpers.getAxisComponent(childComponents, axis);
    const tickStrings = Data.getStringsFromAxes(axisComponent.props, axis);

    const categoryStrings = compact(flatten(childComponents.map((component) => {
      return Data.getStringsFromCategories(component.props, axis);
    })));
    const dataStrings = compact(flatten(childComponents.map((child) => {
      return Data.getStringsFromData(child.props, axis);
    })));
    const allStrings = uniq(compact([...tickStrings, ...categoryStrings, ...dataStrings]));

    return isEmpty(allStrings) ? null :
      zipObject(allStrings.map((string, index) => [string, index + 1]));
  },

  getCategories(childComponents) {
    const groupedComponents = ComponentHelpers.getDataComponents(childComponents, "grouped");
    if (isEmpty(groupedComponents)) {
      return undefined;
    }
    // otherwise, create a set of groupedComponent categories
    const allCategories = groupedComponents.map((component) => {
      const categories = component.props.categories;
      return categories && Collection.isArrayOfArrays(categories) ?
        categories.map((arr) => (sum(arr) / arr.length)) : categories;
    });
    const uniqueCategories = compact(uniq(flatten(allCategories)));
    return isEmpty(uniqueCategories) ? undefined : uniqueCategories;
  }
};
