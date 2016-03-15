import defaults from "lodash/defaults";
import isFunction from "lodash/isFunction";
import property from "lodash/property";
import partial from "lodash/partial";
import set from "lodash/set";
import merge from "lodash/merge";


export default {
  getPadding(props) {
    const padding = typeof props.padding === "number" ? props.padding : 0;
    const paddingObj = typeof props.padding === "object" ? props.padding : {};
    return {
      top: paddingObj.top || padding,
      bottom: paddingObj.bottom || padding,
      left: paddingObj.left || padding,
      right: paddingObj.right || padding
    };
  },

  getStyles(style, defaultStyles, height, width) {  // eslint-disable-line max-params
    if (!style) {
      return defaults({ parent: { height, width } }, defaultStyles);
    }

    const {data, labels, parent} = style;
    return {
      parent: defaults({ height, width }, parent, defaultStyles.parent),
      labels: defaults({}, labels, defaultStyles.labels),
      data: defaults({}, data, defaultStyles.data)
    };
  },

  evaluateProp(prop, data) {
    return isFunction(prop) ? prop(data) : prop;
  },

  evaluateStyle(style, data) {
    if (!Object.keys(style).some((value) => isFunction(style[value]))) {
      return style;
    }
    return Object.keys(style).reduce((prev, curr) => {
      prev[curr] = this.evaluateProp(style[curr], data);
      return prev;
    }, {});
  },

  getRange(props, axis) {
    // determine how to lay the axis and what direction positive and negative are
    const {horizontal} = props;
    const isVertical = (horizontal && axis === "x") || (!horizontal && axis !== "x");
    const isDependent = (horizontal && !isVertical) || (!horizontal && isVertical);
    const padding = this.getPadding(props);
    if (isVertical) {
      const bottomToTop = [props.height - padding.bottom, padding.top];
      return isDependent ? bottomToTop : bottomToTop.reverse();
    }
    return [padding.left, props.width - padding.right];
  },

  // for components that take single datasets
  getData(props) {
    if (props.data) {
      return this.formatData(props.data, props);
    }
  },

  formatData(dataset, props, stringMap) {
    if (!dataset) {
      return [];
    }
    stringMap = stringMap || {
      x: this.createStringMap(props, "x"),
      y: this.createStringMap(props, "y")
    };
    const accessor = {
      x: this.createAccessor(props.x),
      y: this.createAccessor(props.y)
    };

    return dataset.map((datum) => {
      const x = accessor.x(datum);
      const y = accessor.y(datum);
      const xName = typeof x === "string" ? {xName: x} : undefined;
      const yName = typeof y === "string" ? {yName: y} : undefined;
      return defaults({
        // map string data to numeric values, and add names
        x: typeof x === "string" ? stringMap.x[x] : x,
        y: typeof y === "string" ? stringMap.y[y] : y
      }, xName, yName, datum);
    });
  },

  createStringMap(props, axis) {
    const stringsFromData = this.getStringsFromData(props, axis);
    if (stringsFromData.length) {
      return stringsFromData.reduce((acc, string, index) => {
        acc[string] = index + 1;
        return acc;
      }, {});
    }
    return null;
  },

  getStringsFromData(props, axis) {
    if (!props.data) {
      return [];
    }
    const key = typeof props[axis] === "undefined" ? axis : props[axis];
    const accessor = this.createAccessor(key);
    const dataStrings = (props.data)
        .map((datum) => accessor(datum))
        .filter((datum) => typeof datum === "string");
    // return a unique set of strings
    return dataStrings.reduce((prev, curr) => {
      if (typeof curr !== "undefined" && curr !== null && prev.indexOf(curr) === -1) {
        prev.push(curr);
      }
      return prev;
    }, []);
  },

  createAccessor(key) {
    // creates a data accessor function
    // given a property key, path, array index, or null for identity.
    if (isFunction(key)) {
      return key;
    } else if (key === null || typeof key === "undefined") {
      // null/undefined means "return the data item itself"
      return (x) => x;
    }
    // otherwise, assume it is an array index, property key or path (_.property handles all three)
    return property(key);
  },

  getPartialEvents(events, index, childProps) {
    return events ?
      Object.keys(events).reduce((memo, eventName) => {
        /* eslint max-params: 0 */
        memo[eventName] = partial(
          events[eventName],
          partial.placeholder, // evt will still be the first argument for event handlers
          childProps, // event handlers will have access to data component props, including data
          index, // used in setting a unique state property
          eventName // used in setting a unique state property
        );
        return memo;
      }, {}) :
      {};
  },

  getEvents(events, namespace) {
    const stateName = `${namespace}State`;
    const onEvent = (evt, childProps, index, eventName) => {
      if (this.props.events[namespace] && this.props.events[namespace][eventName]) {
        this.setState({
          [stateName]: merge(
            {},
            this.state[stateName],
            set({}, index, this.props.events[namespace][eventName](evt, childProps, index))
          )
        });
      }
    };

    return events ?
      Object.keys(this.props.events[namespace]).reduce((memo, event) => {
        memo[event] = onEvent;
        return memo;
      }, {}) : {};
  }
};
