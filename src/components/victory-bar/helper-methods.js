import { assign, defaults, omit } from "lodash";
import { Helpers, LabelHelpers, Data, Domain, Scale } from "victory-core";

export default {

  getBarPosition(props, datum) {
    const getDefaultMin = (axis) => {
      const defaultMin = Scale.getType(props.scale[axis]) === "log" ?
        1 / Number.MAX_SAFE_INTEGER : 0;
      return datum[`_${axis}`] instanceof Date ? new Date(defaultMin) : defaultMin;
    };
    const _y0 = datum._y0 !== undefined ? datum._y0 : getDefaultMin("y");
    const _x0 = datum._x0 !== undefined ? datum._x0 : getDefaultMin("x");
    return Helpers.scalePoint(props, assign({}, datum, { _y0, _x0 }));
  },

  getBarStyle(datum, baseStyle) {
    const styleData = omit(datum, [
      "xName", "yName", "x", "y", "label", "errorX", "errorY", "eventKey"
    ]);
    return defaults({}, styleData, baseStyle);
  },

  getCalculatedValues(props) {
    const { theme, horizontal, polar } = props;
    const defaultStyles = theme && theme.bar && theme.bar.style ? theme.bar.style : {};
    const style = Helpers.getStyles(props.style, defaultStyles);
    const data = Data.getData(props);
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getDomainWithZero(props, "x"),
      y: Domain.getDomainWithZero(props, "y")
    };
    const xScale = Scale.getBaseScale(props, "x").domain(domain.x).range(range.x);
    const yScale = Scale.getBaseScale(props, "y").domain(domain.y).range(range.y);
    const scale = {
      x: horizontal ? yScale : xScale,
      y: horizontal ? xScale : yScale
    };
    const origin = polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
    return { style, data, scale, domain, origin };
  },

  getBaseProps(props, fallbackProps) {
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, "bar");
    props = assign({}, modifiedProps, this.getCalculatedValues(modifiedProps));
    const {
      data, domain, events, height, horizontal, origin, padding, polar,
      scale, sharedEvents, standalone, style, theme, width
    } = props;
    const initialChildProps = { parent: {
      domain, scale, width, height, data, standalone,
      theme, polar, origin, padding, style: style.parent
    } };

    return data.reduce((childProps, datum, index) => {
      const eventKey = datum.eventKey || index;
      const { x, y, y0, x0 } = this.getBarPosition(props, datum);
      const barStyle = this.getBarStyle(datum, style.data);
      const dataProps = {
        data, datum, horizontal, index, padding, polar, origin,
        scale, style: barStyle, width, height, x, y, y0, x0
      };

      childProps[eventKey] = {
        data: dataProps
      };

      const text = LabelHelpers.getText(props, datum, index);
      if (text !== undefined && text !== null || events || sharedEvents) {
        childProps[eventKey].labels = LabelHelpers.getProps(props, index);
      }
      return childProps;
    }, initialChildProps);
  }
};
