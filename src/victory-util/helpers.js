import { defaults, isFunction, merge, partial, property, omit } from "lodash";

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
    const defaultParent = defaultStyles && defaultStyles.parent || {};
    const defaultLabels = defaultStyles && defaultStyles.labels || {};
    const defaultData = defaultStyles && defaultStyles.data || {};
    return {
      parent: defaults({ height, width }, parent, defaultParent),
      labels: defaults({}, labels, defaultLabels),
      data: defaults({}, data, defaultData)
    };
  },

  evaluateProp(prop, data, index) {
    return isFunction(prop) ? prop(data, index) : prop;
  },

  evaluateStyle(style, data, index) {
    if (!style || !Object.keys(style).some((value) => isFunction(style[value]))) {
      return style;
    }
    return Object.keys(style).reduce((prev, curr) => {
      prev[curr] = this.evaluateProp(style[curr], data, index);
      return prev;
    }, {});
  },

  getRange(props, axis) {
    // determine how to lay the axis and what direction positive and negative are
    const isVertical = axis !== "x";
    const padding = this.getPadding(props);
    if (isVertical) {
      return [props.height - padding.bottom, padding.top];
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

  modifyProps(props, fallbackProps, role) {
    const theme = props.theme && props.theme[role] ? props.theme[role] : {};
    const themeProps = omit(theme, ["style"]);
    const baseProps = defaults({}, props, themeProps, fallbackProps);
    return defaults({}, baseProps, {clipWidth: baseProps.width, clipHeight: baseProps.height});
  },

  getEvents(events, namespace) {
    const onEvent = (evt, childProps, index, eventName) => {
      if (this.props.events[namespace] && this.props.events[namespace][eventName]) {
        this.setState({
          [index]: merge(
            {},
            this.state[index],
            this.props.events[namespace][eventName](evt, childProps, index)
          )
        });
      }
    };

    return events ?
      Object.keys(this.props.events[namespace]).reduce((memo, event) => {
        memo[event] = onEvent;
        return memo;
      }, {}) : {};
  },

  getEventState(index, namespace) {
    return this.state[index] && this.state[index][namespace];
  }
};
