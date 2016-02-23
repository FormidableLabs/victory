export const isNonEmptyArray = function (collection) {
  return Array.isArray(collection) && collection.length > 0;
};

export const containsStrings = function (collection) {
  return Array.isArray(collection) && collection.some((value) => typeof value === "string");
};

export const containsDates = function (collection) {
  return Array.isArray(collection) && collection.some((value) => value instanceof Date);
};

export const containsOnlyStrings = function (collection) {
  return isNonEmptyArray(collection) && collection.every((value) => typeof value === "string");
};

export const isArrayOfArrays = function (collection) {
  return isNonEmptyArray(collection) && collection.every(Array.isArray);
};

export const removeUndefined = function (arr) {
  return arr.filter((el) => el !== undefined);
};
