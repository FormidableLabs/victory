import compact from "lodash/array/compact";
import flatten from "lodash/array/flatten";
import isEmpty from "lodash/lang/isEmpty";
import sum from "lodash/math/sum";
import uniq from "lodash/array/uniq";
import zipObject from "lodash/array/zipObject";

import { Collection, Data} from "victory-util";

import ComponentHelpers from "./component-helpers";

module.exports = {
  createStringMap(childComponents, categories, axis) {
    const axisComponent = ComponentHelpers.getAxisComponent(childComponents, axis);
    const tickStrings = Data.getStringsFromAxes(axisComponent.props, axis);

    const categoryStrings = compact(flatten(childComponents.map((component) => {
      return Data.getStringsFromCategories(component.props, axis);
    })));

    const dataStrings = this._getStringsFromData(childComponents, axis);

    const allStrings = uniq(compact([...tickStrings, ...categoryStrings, ...dataStrings]));

    return isEmpty(allStrings) ? null :
      zipObject(allStrings.map((string, index) => [string, index + 1]));
  },
  _getStringsFromData(childComponents, axis) {
    // Collect strings from dataComponents and groupedDataComponents props.data
    const xyStrings = childComponents.map((child) => Data.getStringsFromXY(child, axis));
    const dataStrings = childComponents.map((child) => Data.getStringsFromData(child, axis));
    const allStrings = compact(flatten([...xyStrings, ...dataStrings]));
    return uniq(allStrings);
  },

  getCategories(childComponents) {
    const groupedComponents = ComponentHelpers.getDataComponents(childComponents, "grouped");
    if (isEmpty(groupedComponents)) {
      return undefined;
    }
    // otherwise, create a set of tickValues base on groupedData categories
    const allCategories = groupedComponents.map((component) => {
      const categories = component.props.categories;
      return categories && Collection.isArrayOfArrays(categories) ?
        categories.map((arr) => (sum(arr) / arr.length)) : categories;
    });
    const uniqueCategories = compact(uniq(flatten(allCategories)));
    return isEmpty(uniqueCategories) ? undefined : uniqueCategories;
  }
};
