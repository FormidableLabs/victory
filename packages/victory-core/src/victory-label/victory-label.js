/*eslint no-magic-numbers: ["error", { "ignore": [-0.5, 0.5, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import VictoryPortal from "../victory-portal/victory-portal";
import Rect from "../victory-primitives/rect";
import * as CustomPropTypes from "../victory-util/prop-types";
import * as Helpers from "../victory-util/helpers";
import * as LabelHelpers from "../victory-util/label-helpers";
import * as Style from "../victory-util/style";
import * as Log from "../victory-util/log";
import * as TextSize from "../victory-util/textsize";
import TSpan from "../victory-primitives/tspan";
import Text from "../victory-primitives/text";
import { assign, defaults, isEmpty } from "lodash";

const defaultStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily:
    "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
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

const shouldUseMultilineBackgrounds = (props) => {
  const { backgroundStyle, backgroundPadding } = props;
  return (
    (Array.isArray(backgroundStyle) && !isEmpty(backgroundStyle)) ||
    (Array.isArray(backgroundPadding) && !isEmpty(backgroundPadding))
  );
};

const getStyles = (style, props) => {
  if (props.disableInlineStyles) {
    const baseStyles = Helpers.evaluateStyle(style, props);
    return {
      // Font size is necessary to calculate the y position of the label
      fontSize: getFontSize(baseStyles)
    };
  }
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
    : Helpers.evaluateStyle(style, props);
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

const getDy = (props, verticalAnchor, lineHeight) => {
  const dy = props.dy ? Helpers.evaluateProp(props.dy, props) : 0;
  const length = props.inline ? 1 : props.text.length;
  const capHeight = Helpers.evaluateProp(props.capHeight, props);
  const anchor = verticalAnchor
    ? Helpers.evaluateProp(verticalAnchor, props)
    : "middle";
  const fontSizes = [...Array(length).keys()].map(
    (i) => getSingleValue(props.style, i).fontSize
  );
  const lineHeights = [...Array(length).keys()].map((i) =>
    getSingleValue(lineHeight, i)
  );

  if (anchor === "start") {
    return dy + (capHeight / 2 + lineHeights[0] / 2) * fontSizes[0];
  } else if (props.inline) {
    return anchor === "end"
      ? dy + (capHeight / 2 - lineHeights[0] / 2) * fontSizes[0]
      : dy + (capHeight / 2) * fontSizes[0];
  } else if (length === 1) {
    return anchor === "end"
      ? dy + (capHeight / 2 + (0.5 - length) * lineHeights[0]) * fontSizes[0]
      : dy +
          (capHeight / 2 + (0.5 - length / 2) * lineHeights[0]) * fontSizes[0];
  } else {
    const allHeights = [...Array(length).keys()].reduce((memo, i) => {
      return (
        memo +
        ((capHeight / 2 + (0.5 - length) * lineHeights[i]) * fontSizes[i]) /
          length
      );
    }, 0);
    return anchor === "end"
      ? dy + allHeights
      : dy +
          allHeights / 2 +
          (capHeight / 2) * lineHeights[length - 1] * fontSizes[length - 1];
  }
};

const getTransform = (props, x, y) => {
  const { polar } = props;
  const style = getSingleValue(props.style);
  const defaultAngle = polar ? LabelHelpers.getPolarAngle(props) : 0;
  const baseAngle =
    style.angle === undefined
      ? Helpers.evaluateProp(props.angle, props)
      : style.angle;
  const angle = baseAngle === undefined ? defaultAngle : baseAngle;
  const transform = props.transform || style.transform;
  const transformPart = transform && Helpers.evaluateProp(transform, props);
  const rotatePart = angle && { rotate: [angle, x, y] };
  return transformPart || angle
    ? Style.toTransformString(transformPart, rotatePart)
    : undefined;
};

const getXCoordinate = (calculatedProps, labelSizeWidth) => {
  const { direction, textAnchor, x, dx } = calculatedProps;
  if (direction === "rtl") {
    return x - labelSizeWidth;
  }

  switch (textAnchor) {
    case "middle":
      return Math.round(x - labelSizeWidth / 2);
    case "end":
      return Math.round(x - labelSizeWidth);
    default:
      // start
      return x + (dx || 0);
  }
};

const getYCoordinate = (calculatedProps, textHeight) => {
  const { verticalAnchor, y, originalDy = 0 } = calculatedProps;
  const offset = y + originalDy;

  switch (verticalAnchor) {
    case "start":
      return Math.floor(offset);
    case "end":
      return Math.ceil(offset - textHeight);
    default:
      // middle
      return Math.floor(offset - textHeight / 2);
  }
};

const getFullBackground = (calculatedProps, tspanValues) => {
  const {
    dx = 0,
    transform,
    backgroundComponent,
    backgroundStyle,
    inline,
    backgroundPadding,
    capHeight
  } = calculatedProps;
  const textSizes = tspanValues.map((tspan) => {
    return tspan.textSize;
  });

  const height = inline
    ? Math.max(...textSizes.map((size) => size.height))
    : textSizes.reduce((memo, size, i) => {
        const capHeightAdjustment = i ? 0 : capHeight / 2;
        return (
          memo + size.height * (tspanValues[i].lineHeight - capHeightAdjustment)
        );
      }, 0);

  const width = inline
    ? textSizes.reduce((memo, size, index) => {
        const offset = index ? dx : 0;
        return memo + size.width + offset;
      }, 0)
    : Math.max(...textSizes.map((size) => size.width));

  const xCoordinate = getXCoordinate(calculatedProps, width);
  const yCoordinate = getYCoordinate(calculatedProps, height);

  const backgroundProps = {
    key: "background",
    height: height + backgroundPadding.top + backgroundPadding.bottom,
    style: backgroundStyle,
    transform,
    width: width + backgroundPadding.left + backgroundPadding.right,
    x: inline
      ? xCoordinate - backgroundPadding.left
      : xCoordinate + dx - backgroundPadding.left,
    y: yCoordinate
  };

  return React.cloneElement(
    backgroundComponent,
    defaults({}, backgroundComponent.props, backgroundProps)
  );
};

const getInlineXOffset = (calculatedProps, textElements, index) => {
  const { textAnchor } = calculatedProps;
  const widths = textElements.map((t) => t.widthWithPadding);
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
    default:
      // middle
      return widths.reduce((memo, width, i) => {
        const offsetWidth = i < index ? width : 0;
        memo = i === index ? memo + width / 2 : memo + offsetWidth;
        return memo;
      }, centerOffset);
  }
};

const getChildBackgrounds = (calculatedProps, tspanValues) => {
  const {
    dy,
    dx,
    transform,
    backgroundStyle,
    backgroundPadding,
    backgroundComponent,
    inline,
    y
  } = calculatedProps;

  const textElements = tspanValues.map((current, i) => {
    const previous = getSingleValue(tspanValues, i - 1);
    const labelSize = current.textSize;
    const totalLineHeight = current.fontSize * current.lineHeight;
    const textHeight = Math.ceil(totalLineHeight);
    const padding = getSingleValue(backgroundPadding, i);
    const prevPadding = getSingleValue(backgroundPadding, i - 1);
    const xOffset = inline ? dx || 0 : 0;

    const childDy =
      i && !inline
        ? previous.fontSize * previous.lineHeight +
          prevPadding.top +
          prevPadding.bottom
        : dy - totalLineHeight * 0.5 - (current.fontSize - current.capHeight);

    return {
      textHeight,
      labelSize,
      heightWithPadding: textHeight + padding.top + padding.bottom,
      widthWithPadding:
        labelSize.width + padding.left + padding.right + xOffset,
      y,
      fontSize: current.fontSize,
      dy: childDy
    };
  });

  return textElements.map((textElement, i) => {
    const xCoordinate = getXCoordinate(
      calculatedProps,
      textElement.labelSize.width
    );
    const yCoordinate = textElements.slice(0, i + 1).reduce((prev, curr) => {
      return prev + curr.dy;
    }, y);
    const padding = getSingleValue(backgroundPadding, i);
    const height = textElement.heightWithPadding;
    const xCoord = inline
      ? getInlineXOffset(calculatedProps, textElements, i) +
        xCoordinate -
        padding.left
      : xCoordinate;
    const yCoord = inline
      ? getYCoordinate(calculatedProps, height) - padding.top
      : yCoordinate;
    const backgroundProps = {
      key: `tspan-background-${i}`,
      height,
      style: getSingleValue(backgroundStyle, i),
      width: textElement.widthWithPadding,
      transform,
      x: xCoord - padding.left,
      y: yCoord
    };

    return React.cloneElement(
      backgroundComponent,
      defaults({}, backgroundComponent.props, backgroundProps)
    );
  });
};

const getBackgroundElement = (calculatedProps, tspanValues) => {
  return shouldUseMultilineBackgrounds(calculatedProps)
    ? getChildBackgrounds(calculatedProps, tspanValues)
    : getFullBackground(calculatedProps, tspanValues);
};

const calculateSpanDy = (tspanValues, i, calculatedProps) => {
  const current = getSingleValue(tspanValues, i);
  const previous = getSingleValue(tspanValues, i - 1);
  const previousHeight = previous.fontSize * previous.lineHeight;
  const currentHeight = current.fontSize * current.lineHeight;
  const previousCaps = previous.fontSize - previous.capHeight;
  const currentCaps = current.fontSize - current.capHeight;

  const textHeight =
    previousHeight -
    previous.fontSize / 2 +
    current.fontSize / 2 -
    previousHeight / 2 +
    currentHeight / 2 -
    currentCaps / 2 +
    previousCaps / 2;

  return shouldUseMultilineBackgrounds(calculatedProps)
    ? textHeight +
        current.backgroundPadding.top +
        previous.backgroundPadding.bottom
    : textHeight;
};

const getTSpanDy = (tspanValues, calculatedProps, i) => {
  const { inline } = calculatedProps;
  const current = getSingleValue(tspanValues, i);

  if (i && !inline) {
    return calculateSpanDy(tspanValues, i, calculatedProps);
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
  return assign({}, props, {
    backgroundStyle,
    backgroundPadding,
    style,
    text,
    id
  });
};

const getCalculatedProps = (props) => {
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const style = getSingleValue(props.style);
  const lineHeight = getLineHeight(props);
  const direction = props.direction
    ? Helpers.evaluateProp(props.direction, props)
    : "inherit";
  const textAnchor = props.textAnchor
    ? Helpers.evaluateProp(props.textAnchor, props)
    : style.textAnchor || "start";
  const verticalAnchor = props.verticalAnchor
    ? Helpers.evaluateProp(props.verticalAnchor, props)
    : style.verticalAnchor || "middle";
  const dx = props.dx ? Helpers.evaluateProp(props.dx, props) : 0;
  const dy = getDy(props, verticalAnchor, lineHeight);
  const x = props.x !== undefined ? props.x : getPosition(props, "x");
  const y = props.y !== undefined ? props.y : getPosition(props, "y");
  const transform = getTransform(props, x, y);

  return assign({}, props, {
    ariaLabel,
    lineHeight,
    direction,
    textAnchor,
    verticalAnchor,
    dx,
    dy,
    originalDy: props.dy,
    transform,
    x,
    y
  });
};

const renderLabel = (calculatedProps, tspanValues) => {
  const {
    ariaLabel,
    inline,
    className,
    title,
    events,
    direction,
    text,
    textAnchor,
    dx,
    dy,
    transform,
    x,
    y,
    desc,
    id,
    tabIndex,
    tspanComponent,
    textComponent
  } = calculatedProps;

  const textProps = {
    "aria-label": ariaLabel,
    key: "text",
    ...events,
    direction,
    dx,
    x,
    y: y + dy,
    transform,
    className,
    title,
    desc: Helpers.evaluateProp(desc, calculatedProps),
    tabIndex: Helpers.evaluateProp(tabIndex, calculatedProps),
    id
  };

  const tspans = text.map((line, i) => {
    const currentStyle = tspanValues[i].style;
    const tspanProps = {
      key: `${id}-key-${i}`,
      x: !inline ? x : undefined,
      dx: inline ? dx + tspanValues[i].backgroundPadding.left : dx,
      dy: getTSpanDy(tspanValues, calculatedProps, i),
      textAnchor: currentStyle.textAnchor || textAnchor,
      style: currentStyle,
      children: line
    };
    return React.cloneElement(tspanComponent, tspanProps);
  });

  return React.cloneElement(textComponent, textProps, tspans);
};

const VictoryLabel = (props) => {
  props = evaluateProps(props);

  if (props.text === null || props.text === undefined) {
    return null;
  }
  const calculatedProps = getCalculatedProps(props);
  const { text, style, capHeight, backgroundPadding, lineHeight } =
    calculatedProps;

  const tspanValues = text.map((line, i) => {
    const currentStyle = getSingleValue(style, i);
    const capHeightPx = TextSize.convertLengthToPixels(
      `${capHeight}em`,
      currentStyle.fontSize
    );
    const currentLineHeight = getSingleValue(lineHeight, i);
    return {
      style: currentStyle,
      fontSize: currentStyle.fontSize || defaultStyles.fontSize,
      capHeight: capHeightPx,
      text: line,
      textSize: TextSize.approximateTextSize(line, currentStyle),
      lineHeight: currentLineHeight,
      backgroundPadding: getSingleValue(backgroundPadding, i)
    };
  });

  const label = renderLabel(calculatedProps, tspanValues);

  if (props.backgroundStyle) {
    const backgroundElement = getBackgroundElement(
      calculatedProps,
      tspanValues
    );
    const children = [backgroundElement, label];
    const backgroundWithLabel = React.cloneElement(
      props.groupComponent,
      {},
      children
    );

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
  angle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func
  ]),
  ariaLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  backgroundComponent: PropTypes.element,
  backgroundPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  backgroundStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  capHeight: PropTypes.oneOfType([
    PropTypes.string,
    CustomPropTypes.nonNegative,
    PropTypes.func
  ]),
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
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.array
  ]),
  textAnchor: PropTypes.oneOfType([
    PropTypes.oneOf(["start", "middle", "end", "inherit"]),
    PropTypes.func
  ]),
  textComponent: PropTypes.element,
  title: PropTypes.string,
  transform: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func
  ]),
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
