/*eslint no-magic-numbers: ["error", { "ignore": [-0.5, 0.5, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import VictoryPortal from "../victory-portal/victory-portal";
import Rect from "../victory-primitives/rect";
import CustomPropTypes from "../victory-util/prop-types";
import Helpers from "../victory-util/helpers";
import LabelHelpers from "../victory-util/label-helpers";
import Style from "../victory-util/style";
import Log from "../victory-util/log";
import TextSize from "../victory-util/textsize";
import TSpan from "../victory-primitives/tspan";
import Text from "../victory-primitives/text";
import { assign, defaults, isEmpty } from "lodash";

const defaultStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  stroke: "transparent"
};

const getPosition = (props, dimension) => {
  if (!props.datum) {
    return 0;
  }
  const scaledPoint = Helpers.scalePoint(props, props.datum);
  return scaledPoint[dimension];
};

const getFontSize = (style) => {
  const baseSize = style && style.fontSize;
  if (typeof baseSize === "number") {
    return baseSize;
  } else if (baseSize === undefined || baseSize === null) {
    return defaultStyles.fontSize;
  } else if (typeof baseSize === "string") {
    const fontSize = +baseSize.replace("px", "");
    if (!isNaN(fontSize)) {
      return fontSize;
    } else {
      Log.warn("fontSize should be expressed as a number of pixels");
      return defaultStyles.fontSize;
    }
  }
  return defaultStyles.fontSize;
};

const getSingleValue = (prop, index = 0) => {
  return Array.isArray(prop) ? prop[index] || prop[0] : prop;
};

const useMultiLineBackgrounds = (props) => {
  const { backgroundStyle, backgroundPadding } = props;
  return (
    (Array.isArray(backgroundStyle) && !isEmpty(backgroundStyle)) ||
    (Array.isArray(backgroundPadding) && !isEmpty(backgroundPadding))
  );
};

const getStyles = (style, props) => {
  const getSingleStyle = (s) => {
    s = s ? defaults({}, s, defaultStyles) : defaultStyles;
    const baseStyles = Helpers.evaluateStyle(s, props);
    return assign({}, baseStyles, { fontSize: getFontSize(baseStyles) });
  };

  return Array.isArray(style) && !isEmpty(style)
    ? style.map((s) => getSingleStyle(s))
    : getSingleStyle(style);
};

const getBackgroundStyles = (style, props) => {
  if (!style) {
    return undefined;
  }
  return Array.isArray(style) && !isEmpty(style)
    ? style.map((s) => Helpers.evaluateStyle(s, props))
    : Helpers.evaluateStyle(style);
};

const getBackgroundPadding = (props) => {
  if (props.backgroundPadding && Array.isArray(props.backgroundPadding)) {
    return props.backgroundPadding.map((backgroundPadding) => {
      const padding = Helpers.evaluateProp(backgroundPadding, props);
      return Helpers.getPadding({ padding });
    });
  } else {
    const padding = Helpers.evaluateProp(props.backgroundPadding, props);
    return Helpers.getPadding({ padding });
  }
};

const getLineHeight = (props) => {
  const lineHeight = Helpers.evaluateProp(props.lineHeight, props);
  if (Array.isArray(lineHeight)) {
    return isEmpty(lineHeight) ? [1] : lineHeight;
  } else {
    return lineHeight;
  }
};

const getContent = (text, props) => {
  if (text === undefined || text === null) {
    return undefined;
  }
  if (Array.isArray(text)) {
    return text.map((line) => Helpers.evaluateProp(line, props));
  }
  const child = Helpers.evaluateProp(text, props);
  if (child === undefined || child === null) {
    return undefined;
  }
  return Array.isArray(child) ? child : `${child}`.split("\n");
};

const getDy = (props, lineHeight) => {
  const style = getSingleValue(props.style);
  const fontSize = style.fontSize;
  const dy = props.dy ? Helpers.evaluateProp(props.dy, props) : 0;
  const length = props.inline ? 1 : props.text.length;
  const capHeight = Helpers.evaluateProp(props.capHeight, props);
  const verticalAnchor = style.verticalAnchor || props.verticalAnchor;
  const anchor = verticalAnchor ? Helpers.evaluateProp(verticalAnchor, props) : "middle";
  switch (anchor) {
    case "end":
      return dy + (capHeight / 2 + (0.5 - length) * lineHeight) * fontSize;
    case "middle":
      return dy + (capHeight / 2 + (0.5 - length / 2) * lineHeight) * fontSize;
    default:
      return dy + (capHeight / 2 + lineHeight / 2) * fontSize;
  }
};

const getTransform = (props) => {
  const { x, y, polar } = props;
  const style = getSingleValue(props.style);
  const defaultAngle = polar ? LabelHelpers.getPolarAngle(props) : 0;
  const baseAngle = style.angle === undefined ? props.angle : style.angle;
  const angle = baseAngle === undefined ? defaultAngle : baseAngle;
  const transform = props.transform || style.transform;
  const transformPart = transform && Helpers.evaluateProp(transform, props);
  const rotatePart = angle && { rotate: [angle, x, y] };
  return transformPart || angle ? Style.toTransformString(transformPart, rotatePart) : undefined;
};

const getXCoordinate = (props, calculatedProps, labelSizeWidth) => {
  const { direction, textAnchor, x } = calculatedProps;
  const { dx } = props;
  if (direction === "rtl") {
    return x - labelSizeWidth;
  }

  switch (textAnchor) {
    case "middle":
      return Math.round(x - labelSizeWidth / 2);
    case "end":
      return Math.round(x - labelSizeWidth);
    default: // start
      return x + (dx || 0);
  }
};

const getYCoordinate = (calculatedProps, props, textHeight) => {
  const { verticalAnchor, y } = calculatedProps;
  const { dy } = props;
  const offset = y + (dy || 0);

  switch (verticalAnchor) {
    case "start":
      return Math.floor(offset);
    case "end":
      return Math.ceil(offset - textHeight);
    default: // middle
      return Math.floor(offset - textHeight / 2);
  }
};

const getFullBackground = (props, calculatedProps, tspanValues) => {
  const { backgroundComponent, backgroundStyle, inline, backgroundPadding } = props;
  const { dx, transform } = calculatedProps;
  const textSizes = tspanValues.map((tspan) => {
    return TextSize.approximateTextSize(tspan.text, tspan.style);
  });

  const height = inline
    ? Math.max(...textSizes.map((size) => size.height))
    : textSizes.reduce((memo, size, i) => memo + size.height * tspanValues[i].lineHeight, 0);

  const width = inline
    ? textSizes.reduce((memo, size) => memo + size.width, 0) + (dx || 0)
    : Math.max(...textSizes.map((size) => size.width)) + (dx || 0);

  const xCoordinate = getXCoordinate(props, calculatedProps, width);
  const yCoordinate = getYCoordinate(calculatedProps, props, height);

  const backgroundProps = {
    key: "background",
    height: height + backgroundPadding.top + backgroundPadding.bottom,
    style: backgroundStyle,
    transform,
    width: width + backgroundPadding.left + backgroundPadding.right,
    x: xCoordinate,
    y: yCoordinate
  };

  return React.cloneElement(
    backgroundComponent,
    defaults({}, backgroundComponent.props, backgroundProps)
  );
};

const getInlineXOffset = (calculatedProps, textElements, index) => {
  const { textAnchor } = calculatedProps;
  const widths = textElements.map(t => t.widthWithPadding);
  const totalWidth = widths.reduce((memo, width) => memo + width, 0);
  const centerOffset = -totalWidth / 2;
  switch (textAnchor) {
    case "start":
      return widths.reduce((memo, width, i) => {
        memo = i < index ? memo + width : memo;
        return memo;
      }, 0);
    case "end":
      return widths.reduce((memo, width, i) => {
        memo = i > index ? memo - width : memo;
        return memo;
      }, 0);
    default: // middle
      return widths.reduce((memo, width, i) => {
        const offsetWidth = i < index ? width : 0;
        memo = i === index ? memo + width / 2 : memo + offsetWidth;
        return memo;
      }, centerOffset);
  }
}

const getChildBackgrounds = (props, calculatedProps, tspanValues) => {
  const { backgroundStyle, backgroundPadding, backgroundComponent, inline, y } = props;
  const { dy, transform } = calculatedProps;

  const textElements = tspanValues.map((current, i) => {
    const previous = getSingleValue(tspanValues, i - 1);
    const labelSize = TextSize.approximateTextSize(current.text, current.style);
    const totalLineHeight = current.fontSize * current.lineHeight;
    const textHeight = Math.ceil(totalLineHeight);
    const padding = getSingleValue(backgroundPadding, i);
    const prevPadding = getSingleValue(backgroundPadding, i - 1);

    const childDy =
      i && !inline
        ? previous.fontSize * previous.lineHeight + prevPadding.top + prevPadding.bottom
        : dy - totalLineHeight * 0.5 - (current.fontSize - current.capHeight);

    return {
      textHeight,
      labelSize,
      heightWithPadding: textHeight + padding.top + padding.bottom,
      widthWithPadding: labelSize.width + padding.left + padding.right,
      y,
      fontSize: current.fontSize,
      dy: childDy
    };
  });

  return textElements.map((textElement, i) => {
    const xCoordinate = getXCoordinate(props, calculatedProps, textElement.widthWithPadding);
    const yCoordinate = textElements.slice(0, i + 1).reduce((prev, curr) => {
      return prev + curr.dy;
    }, y);
    const padding = getSingleValue(backgroundPadding, i);
    const height = textElement.heightWithPadding;
    const xCoord = inline
      ? getInlineXOffset(calculatedProps, textElements, i) + xCoordinate - padding.left
      : xCoordinate;
    const yCoord = inline
      ? getYCoordinate(calculatedProps, props, height) - padding.top
      : yCoordinate;
    const backgroundProps = {
      key: `tspan-background-${i}`,
      height,
      style: getSingleValue(backgroundStyle, i),
      width: textElement.widthWithPadding,
      transform,
      x: xCoord + padding.left,
      y: yCoord
    };

    return React.cloneElement(
      backgroundComponent,
      defaults({}, backgroundComponent.props, backgroundProps)
    );
  });
};

const getBackgroundElement = (props, calculatedProps, tspanValues) => {
  return useMultiLineBackgrounds(props)
    ? getChildBackgrounds(props, calculatedProps, tspanValues)
    : getFullBackground(props, calculatedProps, tspanValues);
};

const calculateSpanDy = (current, previous) => {
  return (
    -0.5 * previous.fontSize -
    0.5 * (previous.fontSize * previous.lineHeight) +
    previous.fontSize * previous.lineHeight +
    0.5 * current.fontSize +
    0.5 * current.fontSize * current.lineHeight -
    (current.fontSize - current.capHeight) * 0.5 +
    (previous.fontSize - previous.capHeight) * 0.5
  );
};

const getTSpanDy = (tspanValues, props, i) => {
  const { inline } = props;
  const current = getSingleValue(tspanValues, i);
  const previous = getSingleValue(tspanValues, i - 1);

  if (i && !inline) {
    return useMultiLineBackgrounds(props)
      ? calculateSpanDy(current, previous) +
          current.backgroundPadding.top +
          previous.backgroundPadding.bottom
      : calculateSpanDy(current, previous);
  } else if (inline) {
    return i === 0 ? current.backgroundPadding.top : undefined;
  } else {
    return current.backgroundPadding.top;
  }
};

const evaluateProps = (props) => {
  /* Potential evaluated props are
    1) text
    2) style
    3) everything else
  */
  const text = getContent(props.text, props);
  const style = getStyles(props.style, assign({}, props, { text }));
  const backgroundStyle = getBackgroundStyles(
    props.backgroundStyle,
    assign({}, props, { text, style })
  );
  const backgroundPadding = getBackgroundPadding(
    assign({}, props, { text, style, backgroundStyle })
  );
  const id = Helpers.evaluateProp(props.id, props);
  return assign({}, props, { backgroundStyle, backgroundPadding, style, text, id });
};

const getCalculatedProps = (props) => {
  const lineHeight = getLineHeight(props);
  const direction = props.direction ? Helpers.evaluateProp(props.direction, props) : "inherit";
  const textAnchor = props.textAnchor ? Helpers.evaluateProp(props.textAnchor, props) : "start";
  const verticalAnchor = props.verticalAnchor
    ? Helpers.evaluateProp(props.verticalAnchor, props)
    : "middle";
  const dx = props.dx ? Helpers.evaluateProp(props.dx, props) : 0;
  const dy = getDy(props, getSingleValue(lineHeight));
  const transform = getTransform(props);
  const x = props.x !== undefined ? props.x : getPosition(props, "x");
  const y = props.y !== undefined ? props.y : getPosition(props, "y");

  return {
    lineHeight,
    direction,
    textAnchor,
    verticalAnchor,
    dx,
    dy,
    transform,
    x,
    y
  };
};

const renderLabel = (props, calculatedProps, tspanValues) => {
  const { inline, className, title, events, direction, text } = props;
  const { textAnchor, dx, dy, transform, x, y } = calculatedProps;

  const textProps = {
    key: "text",
    ...events,
    direction,
    dx,
    x,
    y: y + dy,
    transform,
    className,
    title,
    desc: Helpers.evaluateProp(props.desc, props),
    tabIndex: Helpers.evaluateProp(props.tabIndex, props),
    id: props.id
  };

  const tspans = text.map((line, i) => {
    const currentStyle = tspanValues[i].style;
    const tspanProps = {
      key: `${props.id}-key-${i}`,
      x: !inline ? props.x : undefined,
      dx: inline ? dx + tspanValues[i].backgroundPadding.left : dx,
      dy: getTSpanDy(tspanValues, props, i),
      textAnchor: currentStyle.textAnchor || textAnchor,
      style: currentStyle,
      children: line
    };
    return React.cloneElement(props.tspanComponent, tspanProps);
  });

  return React.cloneElement(props.textComponent, textProps, tspans);
};

const VictoryLabel = (props) => {
  props = evaluateProps(props);

  if (props.text === null || props.text === undefined) {
    return null;
  }
  const calculatedProps = getCalculatedProps(props);
  const { text, style, capHeight, backgroundPadding } = props;
  const { lineHeight } = calculatedProps;

  const tspanValues = text.map((line, i) => {
    const currentStyle = getSingleValue(style, i);
    const capHeightPx = TextSize.convertLengthToPixels(`${capHeight}em`, currentStyle.fontSize);
    const currentLineHeight = getSingleValue(lineHeight, i);
    return {
      style: currentStyle,
      fontSize: currentStyle.fontSize || defaultStyles.fontSize,
      capHeight: capHeightPx,
      text: line,
      lineHeight: currentLineHeight,
      backgroundPadding: getSingleValue(backgroundPadding, i)
    };
  });

  const label = renderLabel(props, calculatedProps, tspanValues);

  if (props.backgroundStyle) {
    const backgroundElement = getBackgroundElement(props, calculatedProps, tspanValues);
    const children = [backgroundElement, label];
    const backgroundWithLabel = React.cloneElement(props.groupComponent, {}, children);

    return props.renderInPortal ? (
      <VictoryPortal>{backgroundWithLabel}</VictoryPortal>
    ) : (
      backgroundWithLabel
    );
  }

  return props.renderInPortal ? <VictoryPortal>{label}</VictoryPortal> : label;
};

VictoryLabel.displayName = "VictoryLabel";
VictoryLabel.role = "label";
VictoryLabel.defaultStyles = defaultStyles;
VictoryLabel.propTypes = {
  active: PropTypes.bool,
  angle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundComponent: PropTypes.element,
  backgroundPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  backgroundStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  capHeight: PropTypes.oneOfType([PropTypes.string, CustomPropTypes.nonNegative, PropTypes.func]),
  className: PropTypes.string,
  data: PropTypes.array,
  datum: PropTypes.any,
  desc: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  direction: PropTypes.oneOf(["rtl", "ltr", "inherit"]),
  dx: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  dy: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  events: PropTypes.object,
  groupComponent: PropTypes.element,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inline: PropTypes.bool,
  labelPlacement: PropTypes.oneOf(["parallel", "perpendicular", "vertical"]),
  lineHeight: PropTypes.oneOfType([
    PropTypes.string,
    CustomPropTypes.nonNegative,
    PropTypes.func,
    PropTypes.array
  ]),
  origin: PropTypes.shape({
    x: CustomPropTypes.nonNegative,
    y: CustomPropTypes.nonNegative
  }),
  polar: PropTypes.bool,
  renderInPortal: PropTypes.bool,
  scale: PropTypes.shape({
    x: CustomPropTypes.scale,
    y: CustomPropTypes.scale
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func, PropTypes.array]),
  textAnchor: PropTypes.oneOfType([
    PropTypes.oneOf(["start", "middle", "end", "inherit"]),
    PropTypes.func
  ]),
  textComponent: PropTypes.element,
  title: PropTypes.string,
  transform: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
  tspanComponent: PropTypes.element,
  verticalAnchor: PropTypes.oneOfType([
    PropTypes.oneOf(["start", "middle", "end"]),
    PropTypes.func
  ]),
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

VictoryLabel.defaultProps = {
  backgroundComponent: <Rect />,
  groupComponent: <g />,
  direction: "inherit",
  textComponent: <Text />,
  tspanComponent: <TSpan />,
  capHeight: 0.71, // Magic number from d3.
  lineHeight: 1
};

export default VictoryLabel;
