/* eslint no-magic-numbers: ["error", { "ignore": [-0.5, 0.5, 0, 1, 2] }]*/
import { defaults, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  VictoryPortal,
  Log,
  TextSize,
  UserProps,
  Helpers,
  VictoryLabelProps,
  VictoryLabel,
} from "victory-core";

import { TextPath } from "../../victory-core/lib";

interface CurvedLabelProps
  extends Omit<
    VictoryLabelProps,
    | "angle"
    | "backgroundComponent"
    | "backgroundStyle"
    | "backgroundPadding"
    | "direction"
    | "origin"
    | "labelPlacement"
    | "polar"
    | "textAnchor"
    | "verticalAnchor"
    | "transform"
    | "verticalAnchor"
    | "x"
    | "y"
    | "dx"
    | "dy"
  > {
  href?: string;
  startOffset?: number;
  textPathComponent?: React.ReactElement;
}

const defaultStyles = VictoryLabel.defaultStyles;

const getFontSize = (style) => {
  const baseSize = style && style.fontSize;
  if (typeof baseSize === "number") {
    return baseSize;
  } else if (baseSize === undefined || baseSize === null) {
    return defaultStyles.fontSize;
  } else if (typeof baseSize === "string") {
    const fontSize = Number(baseSize.replace("px", ""));
    if (!isNaN(fontSize)) {
      return fontSize;
    }
    Log.warn("fontSize should be expressed as a number of pixels");
    return defaultStyles.fontSize;
  }
  return defaultStyles.fontSize;
};

const getSingleValue = <T,>(prop: T | T[], index = 0): T => {
  return Array.isArray(prop) ? prop[index] || prop[0] : prop;
};

const getStyles = (style, props) => {
  if (props.disableInlineStyles) {
    const baseStyles = Helpers.evaluateStyle(style, props);
    return {
      // Font size is necessary to calculate the y position of the label
      fontSize: getFontSize(baseStyles),
    };
  }
  const getSingleStyle = (s) => {
    const baseStyles = Helpers.evaluateStyle(
      s ? defaults({}, s, defaultStyles) : defaultStyles,
      props,
    );
    return Object.assign({}, baseStyles, { fontSize: getFontSize(baseStyles) });
  };

  return Array.isArray(style) && !isEmpty(style)
    ? style.map((s) => getSingleStyle(s))
    : getSingleStyle(style);
};

const getLineHeight = (props) => {
  const lineHeight = Helpers.evaluateProp(props.lineHeight, props);
  if (Array.isArray(lineHeight)) {
    return isEmpty(lineHeight) ? [1] : lineHeight;
  }
  return lineHeight;
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

const evaluateProps = (props) => {
  /* Potential evaluated props are
    1) text
    2) style
    3) everything else
  */
  const text = getContent(props.text, props);
  const style = getStyles(props.style, Object.assign({}, props, { text }));
  const id = Helpers.evaluateProp(props.id, props);
  return Object.assign({}, props, {
    style,
    text,
    id,
  });
};

const getCalculatedProps = <T extends CurvedLabelProps>(props: T) => {
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const lineHeight = getLineHeight(props);
  return Object.assign({}, props, {
    ariaLabel,
    lineHeight,
  });
};

const renderLabel = (calculatedProps, tspanValues) => {
  const {
    ariaLabel,
    className,
    title,
    events,
    text,
    desc,
    id,
    tabIndex,
    tspanComponent,
    textComponent,
    textPathComponent,
    href,
    startOffset,
    dy
  } = calculatedProps;
  const userProps = UserProps.getSafeUserProps(calculatedProps);

  const textProps = {
    "aria-label": ariaLabel,
    key: "text",
    ...events,
    className,
    title,
    desc: Helpers.evaluateProp(desc, calculatedProps),
    tabIndex: Helpers.evaluateProp(tabIndex, calculatedProps),
    id,
    dy,
    ...userProps,
  };

  const tspans = text.map((line, i) => {
    const currentStyle = tspanValues[i].style;
    const tspanProps = {
      key: `${id}-key-${i}`,
      style: currentStyle,
      children: line,
    };
    return React.cloneElement(tspanComponent, tspanProps);
  });

  const textPathProps = {
    href,
    startOffset,
  };

  if (href && href.length) {
    const textPathElement = React.cloneElement(
      textPathComponent,
      textPathProps,
      tspans,
    );
    return React.cloneElement(textComponent, textProps, textPathElement);
  }
  return React.cloneElement(textComponent, textProps, tspans);
};

const defaultProps = {
  ...VictoryLabel.defaultProps,
  textPathComponent: <TextPath />,
};

export const CurvedLabel: {
  role: string;
  defaultStyles: typeof defaultStyles;
} & React.FC<CurvedLabelProps> = (initialProps) => {
  const props = evaluateProps({ ...defaultProps, ...initialProps });

  if (props.text === null || props.text === undefined) {
    return null;
  }
  const calculatedProps = getCalculatedProps(props);

  const { text, style, capHeight, lineHeight } = calculatedProps;

  const tspanValues = (text as string[]).map((line, i) => {
    const currentStyle = getSingleValue(style, i);
    const capHeightPx = TextSize.convertLengthToPixels(
      `${capHeight}em`,
      currentStyle.fontSize as number,
    );
    const currentLineHeight = getSingleValue(lineHeight, i);
    return {
      style: currentStyle,
      fontSize: currentStyle.fontSize || defaultStyles.fontSize,
      capHeight: capHeightPx,
      text: line,
      // TODO: This looks like a bug:
      textSize: TextSize.approximateTextSize(line, currentStyle),
      lineHeight: currentLineHeight,
    };
  });

  const label = renderLabel(calculatedProps, tspanValues);
  return props.renderInPortal ? <VictoryPortal>{label}</VictoryPortal> : label;
};

CurvedLabel.displayName = "CurvedLabel";
CurvedLabel.role = "curvedLabel";
CurvedLabel.defaultStyles = VictoryLabel.defaultStyles;
CurvedLabel.propTypes = {
  ...VictoryLabel.propTypes,
  href: PropTypes.string,
  startOffset: PropTypes.number,
  textPathComponent: PropTypes.element,
};
