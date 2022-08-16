import * as React from "react";

/*
  USER_PROPS_SAFELIST is to contain any string deemed safe for user props.
  The startsWidth array will contain the start of any accepted user-prop that
  starts with these characters.
  The exactMatch will contain a list of exact prop names that are accepted.
*/
const USER_PROPS_SAFELIST = {
  startsWith: ["data-", "aria-"] as const,
  exactMatch: [] as string[],
};

// Normally we'd use Template Literal Types, but we're avoiding it to maximize TS compatibility with TS < 4.1
type SafeAttribute = string; // `data-${string}` | `aria-${string}`;

/**
 * doesPropStartWith: Function that takes a prop's key and runs it against all
 * options in the USER_PROPS_SAFELIST and checks to see if it starts with any
 * of those options.
 * @param {string} key: prop key to be tested against whitelist
 * @returns {Boolean}: returns true if the key starts with an option or false if
 * otherwise
 */
const doesPropStartWith = (key: string): key is SafeAttribute => {
  let startsWith = false;

  USER_PROPS_SAFELIST.startsWith.forEach((starterString) => {
    const regex = new RegExp(`\\b(${starterString})(\\w|-)+`, "g");
    if (regex.test(key)) startsWith = true;
  });

  return startsWith;
};

/**
 * isExactMatch: checks to see if the given key matches any of the 'exactMatch'
 * items in the whitelist
 * @param {String} key: prop key to be tested against the whitelist-exact match
 * array.
 * @returns {Boolean}: return true if whitelist contains that key, otherwise
 * returns false.
 */
const isExactMatch = (key: string): key is SafeAttribute =>
  USER_PROPS_SAFELIST.exactMatch.includes(key);

/**
 * testIfSafeProp: tests prop's key against both startsWith and exactMatch values
 * @param {String} key: prop key to be tested against the whitelist
 * @returns {Boolean}: returns true if found in whitelist, otherwise returns false
 */
const testIfSafeProp = (key: string): key is SafeAttribute => {
  if (doesPropStartWith(key) || isExactMatch(key)) return true;
  return false;
};

/**
 * Gets the value from props if a function value is provided
 * @param {any} value: maybe function value
 * @param {Object} props: props object
 * @returns {any} newValue
 */
const getValue = (value, props) => {
  if (typeof value === "function") {
    return value(props);
  }
  return value;
};

/**
 * getSafeUserProps - function that takes in a props object and removes any
 * key-value entries that do not match filter strings in the USER_PROPS_SAFELIST
 * object.
 *
 * @param {Object} props: props to be filtered against USER_PROPS_SAFELIST
 * @returns {Object}: object containing remaining acceptable props
 */
export const getSafeUserProps = <T>(
  props: T,
): Record<SafeAttribute, string> => {
  const propsToFilter = { ...props };
  return Object.fromEntries(
    Object.entries(propsToFilter)
      .filter(([key]) => testIfSafeProp(key))
      .map(([key, value]) => {
        return [key, getValue(value, props)];
      }),
  );
};

/**
 * Wraps a component and adds safe user props
 *
 * @param {ReactElement} component: parent component
 * @param {Object} props: props to be filtered
 * @returns {ReactElement} modified component
 */
export const withSafeUserProps = (component: React.ReactElement, props) => {
  return React.cloneElement(component, getSafeUserProps(props));
};
