/* eslint no-magic-numbers: ["error", { "ignore": [-0.5, 0.5, 0, 1, 2] }]*/
import { defaults, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  VictoryPortal,
  Rect,
  Text,
  TSpan,
  Log,
  PropTypes as CustomPropTypes,
  TextSize,
  UserProps,
  Helpers,
  Path,
  NumberOrCallback,
  StringOrCallback,
  PaddingProps,
  VictoryLabelStyleObject,
  StringOrNumberOrCallback,
  //TextPath,
} from "victory-core";

import { TextPath } from "../../victory-core/lib";


export type TextOffsetType = "start" | "middle" | "end";

export interface CurvedLabelProps {
  ariaLabel?: StringOrCallback;
  backgroundComponent?: React.ReactElement;
  backgroundStyle?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  backgroundPadding?: PaddingProps | PaddingProps[];
  capHeight?: StringOrNumberOrCallback;
  children?: StringOrNumberOrCallback;
  className?: string;
  datum?: Record<string, any>;
  data?: any[];
  desc?: string;
  direction?: string;
  disableInlineStyles?: boolean;
  events?: React.DOMAttributes<any>;
  groupComponent?: React.ReactElement;
  id?: StringOrNumberOrCallback;
  inline?: boolean;
  href?: string;
  lineHeight?: StringOrNumberOrCallback | (string | number)[];
  polar?: boolean;
  renderInPortal?: boolean;
  style?: VictoryLabelStyleObject | VictoryLabelStyleObject[];
  tabIndex?: NumberOrCallback;
  text?: string[] | StringOrNumberOrCallback;
  textComponent?: React.ReactElement;
  textPathComponent?: React.ReactElement;
  title?: string;
  tspanComponent?: React.ReactElement;
}

const defaultStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily:
    "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  stroke: "transparent",
};

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
  }
  const padding = Helpers.evaluateProp(props.backgroundPadding, props);
  return Helpers.getPadding({ padding });
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
  const backgroundStyle = getBackgroundStyles(
    props.backgroundStyle,
    Object.assign({}, props, { text, style }),
  );
  const backgroundPadding = getBackgroundPadding(
    Object.assign({}, props, { text, style, backgroundStyle }),
  );
  const id = Helpers.evaluateProp(props.id, props);
  return Object.assign({}, props, {
    backgroundStyle,
    backgroundPadding,
    style,
    text,
    id,
  });
};

const getCalculatedProps = <T extends CurvedLabelProps>(props: T) => {
  const ariaLabel = Helpers.evaluateProp(props.ariaLabel, props);
  const lineHeight = getLineHeight(props);
  const direction = props.direction
    ? Helpers.evaluateProp(props.direction, props)
    : "inherit";

  return Object.assign({}, props, {
    ariaLabel,
    lineHeight,
    direction,
  });
};

const renderLabel = (calculatedProps, tspanValues) => {
  const {
    ariaLabel,
    inline,
    className,
    title,
    events,
    text,
    transform,
    desc,
    id,
    tabIndex,
    tspanComponent,
    textComponent,
    textPathComponent,
    href,
  } = calculatedProps;
  const userProps = UserProps.getSafeUserProps(calculatedProps);

  const textProps = {
    "aria-label": ariaLabel,
    key: "text",
    ...events,
    transform,
    className,
    title,
    desc: Helpers.evaluateProp(desc, calculatedProps),
    tabIndex: Helpers.evaluateProp(tabIndex, calculatedProps),
    id,
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

  if(href && href.length){
    const textPathElement = React.cloneElement(textPathComponent,{href},tspans);
    return React.cloneElement(textComponent, textProps, textPathElement);
  } 
  return React.cloneElement(textComponent, textProps, tspans);
};

const defaultProps = {
  backgroundComponent: <Rect />,
  groupComponent: <g />,
  direction: "inherit",
  textComponent: <Text />,
  textPathComponent: <TextPath />,
  tspanComponent: <TSpan />,
  capHeight: 0.71, // Magic number from d3.
  lineHeight: 1,
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

  const { text, style, capHeight, backgroundPadding, lineHeight } =
    calculatedProps;

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
      backgroundPadding: getSingleValue(backgroundPadding, i),
    };
  });

  const label = renderLabel(calculatedProps, tspanValues);

  return props.renderInPortal ? <VictoryPortal>{label}</VictoryPortal> : label;
};

CurvedLabel.displayName = "CurvedLabel";
CurvedLabel.role = "label";
CurvedLabel.defaultStyles = defaultStyles;
CurvedLabel.propTypes = {
  active: PropTypes.bool,
  angle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  ariaLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  backgroundComponent: PropTypes.element,
  backgroundPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  backgroundStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  capHeight: PropTypes.oneOfType([
    PropTypes.string,
    CustomPropTypes.nonNegative,
    PropTypes.func,
  ]),
  className: PropTypes.string,
  data: PropTypes.array,
  datum: PropTypes.any,
  // @ts-expect-error "Function is not assignable to string"
  desc: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  direction: PropTypes.oneOf(["rtl", "ltr", "inherit"]),
  events: PropTypes.object,
  groupComponent: PropTypes.element,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]),
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  inline: PropTypes.bool,
  href:PropTypes.string,
  lineHeight: PropTypes.oneOfType([
    PropTypes.string,
    CustomPropTypes.nonNegative,
    PropTypes.func,
    PropTypes.array,
  ]),
  polar: PropTypes.bool,
  renderInPortal: PropTypes.bool,
  scale: PropTypes.shape({
    x: CustomPropTypes.scale,
    y: CustomPropTypes.scale,
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.array,
  ]),
  textComponent: PropTypes.element,
  textPathComponent: PropTypes.element,
  title: PropTypes.string,
  transform: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  tspanComponent: PropTypes.element,

};
