import { assign, isNil } from "lodash";
import { Helpers, LabelHelpers, Scale, Domain, Data, Collection } from "victory-core";

const getErrors = (props, datum, axis) => {
  /**
   * check if it is asymmetric error or symmetric error, asymmetric error should be an array
   * and the first value is the positive error, the second is the negative error
   * @param  {Boolean} isArray(errorX)
   * @return {String or Array}
   */

  const errorNames = { x: "_errorX", y: "_errorY" };
  const errors = datum[errorNames[axis]];
  if (errors === 0) {
    return false;
  }

  const otherAxis = axis === "x" ? "y" : "x";
  const currentAxis = props.horizontal ? otherAxis : axis;
  const scale = props.scale[currentAxis];
  return Array.isArray(errors)
    ? [
        errors[0] === 0 ? false : scale(errors[0] + datum[`_${axis}`]),
        errors[1] === 0 ? false : scale(datum[`_${axis}`] - errors[1])
      ]
    : [scale(errors + datum[`_${axis}`]), scale(datum[`_${axis}`] - errors)];
};

const getData = (props) => {
  const accessorTypes = ["x", "y", "errorX", "errorY"];
  if (props.data) {
    return Data.formatData(props.data, props, accessorTypes);
  } else {
    const generatedData = props.errorX || props.errorY ? Data.generateData(props) : [];
    return Data.formatData(generatedData, props, accessorTypes);
  }
};

const getDomainFromData = (props, axis) => {
  const minDomain = Domain.getMinFromProps(props, axis);
  const maxDomain = Domain.getMaxFromProps(props, axis);
  const dataset = getData(props);
  if (dataset.length < 1) {
    const scaleDomain = Scale.getBaseScale(props, axis).domain();
    const min = minDomain !== undefined ? minDomain : Collection.getMinValue(scaleDomain);
    const max = maxDomain !== undefined ? maxDomain : Collection.getMaxValue(scaleDomain);
    return Domain.getDomainFromMinMax(min, max);
  }
  const currentAxis = Helpers.getCurrentAxis(axis, props.horizontal);
  const error = currentAxis === "x" ? "_errorX" : "_errorY";
  const reduceErrorData = (type) => {
    const baseCondition = type === "min" ? Infinity : -Infinity;
    const errorIndex = type === "min" ? 1 : 0;
    const sign = type === "min" ? -1 : 1;
    return dataset.reduce((memo, datum) => {
      const currentError = Array.isArray(datum[error]) ? datum[error][errorIndex] : datum[error];
      const current = datum[`_${currentAxis}`] + sign * (currentError || 0);
      return (memo < current && type === "min") || (memo > current && type === "max")
        ? memo
        : current;
    }, baseCondition);
  };

  const min = minDomain !== undefined ? minDomain : reduceErrorData("min");
  const max = maxDomain !== undefined ? maxDomain : reduceErrorData("max");
  return Domain.getDomainFromMinMax(min, max);
};

const getDomain = (props, axis) => {
  return Domain.createDomainFunction(getDomainFromData)(props, axis);
};

const getCalculatedValues = (props) => {
  const defaultStyles =
    props.theme && props.theme.errorbar && props.theme.errorbar.style
      ? props.theme.errorbar.style
      : {};
  const style = Helpers.getStyles(props.style, defaultStyles) || {};
  const data = getData(props);
  const range = {
    x: Helpers.getRange(props, "x"),
    y: Helpers.getRange(props, "y")
  };
  const domain = {
    x: getDomain(props, "x"),
    y: getDomain(props, "y")
  };
  const scale = {
    x: Scale.getBaseScale(props, "x")
      .domain(domain.x)
      .range(range.x),
    y: Scale.getBaseScale(props, "y")
      .domain(domain.y)
      .range(range.y)
  };
  const origin = props.polar ? props.origin || Helpers.getPolarOrigin(props) : undefined;
  return { domain, data, scale, style, origin };
};

const getLabelProps = (dataProps, text, style) => {
  const { x, index, scale, errorY } = dataProps;
  const error = errorY && Array.isArray(errorY) ? errorY[0] : errorY;
  const y = error || dataProps.y;
  const labelStyle = style.labels || {};
  return {
    style: labelStyle,
    y: y - (labelStyle.padding || 0),
    x,
    text,
    index,
    scale,
    datum: dataProps.datum,
    data: dataProps.data,
    textAnchor: labelStyle.textAnchor,
    verticalAnchor: labelStyle.verticalAnchor || "end",
    angle: labelStyle.angle
  };
};

const getBaseProps = (props, fallbackProps) => {
  const modifiedProps = Helpers.modifyProps(props, fallbackProps, "errorbar");
  props = assign({}, modifiedProps, getCalculatedValues(modifiedProps));
  const {
    borderWidth,
    data,
    domain,
    events,
    groupComponent,
    height,
    horizontal,
    labels,
    name,
    origin,
    padding,
    polar,
    scale,
    sharedEvents,
    standalone,
    style,
    theme,
    width
  } = props;
  const initialChildProps = {
    parent: {
      data,
      domain,
      height,
      horizontal,
      name,
      origin,
      padding,
      polar,
      scale,
      standalone,
      style: style.parent,
      theme,
      width
    }
  };

  return data.reduce((childProps, datum, index) => {
    const eventKey = !isNil(datum.eventKey) ? datum.eventKey : index;
    const { x, y } = Helpers.scalePoint(assign({}, props, { scale }), datum);
    const errorX = getErrors(props, datum, "x");
    const errorY = getErrors(props, datum, "y");
    const dataProps = {
      borderWidth,
      data,
      datum,
      errorX: horizontal ? errorY : errorX,
      errorY: horizontal ? errorX : errorY,
      groupComponent,
      horizontal,
      index,
      scale,
      style: style.data,
      x,
      y
    };

    childProps[eventKey] = {
      data: dataProps
    };
    const text = LabelHelpers.getText(props, datum, index);
    if ((text !== undefined && text !== null) || (labels && (events || sharedEvents))) {
      childProps[eventKey].labels = getLabelProps(dataProps, text, style);
    }

    return childProps;
  }, initialChildProps);
};

export { getBaseProps, getDomain, getData };
