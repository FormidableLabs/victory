import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers, Style, Log } from "../victory-util/index";
import { assign, merge, isEqual } from "lodash";

const defaultStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  stroke: "transparent"
};

export default class VictoryLabel extends React.Component {
  static displayName = "VictoryLabel";

  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    angle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    capHeight: PropTypes.oneOfType([
      PropTypes.string,
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    datum: PropTypes.any,
    data: PropTypes.array,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    events: PropTypes.object,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func
    ]),
    lineHeight: PropTypes.oneOfType([
      PropTypes.string,
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    style: PropTypes.object,
    textAnchor: PropTypes.oneOfType([
      PropTypes.oneOf([
        "start",
        "middle",
        "end",
        "inherit"
      ]),
      PropTypes.func
    ]),
    verticalAnchor: PropTypes.oneOfType([
      PropTypes.oneOf([
        "start",
        "middle",
        "end"
      ]),
      PropTypes.func
    ]),
    transform: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func
    ]),
    x: PropTypes.number,
    y: PropTypes.number,
    dx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.func
    ]),
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.func
    ])
  };

  static defaultProps = {
    capHeight: 0.71, // Magic number from d3.
    lineHeight: 1
  };

  componentWillMount() {
    this.cacheAttributes(this.calculateAttributes(this.props));
  }

  cacheAttributes(attrs) {
    const { style, dx, dy, content, textAnchor, transform, lineHeight, fontSize } = attrs;
    this.style = style;
    this.dx = dx;
    this.dy = dy;
    this.content = content;
    this.textAnchor = textAnchor;
    this.lineHeight = lineHeight;
    this.transform = transform;
    this.fontSize = fontSize;
  }

  shouldComponentUpdate(nextProps) {
    const attrs = this.calculateAttributes(nextProps);
    const { style, dx, dy, content, lineHeight, textAnchor, transform, fontSize } = attrs;
    const {x, y} = this.props;
    if (
      x !== nextProps.x ||
      y !== nextProps.y ||
      dx !== this.dx ||
      dy !== this.dy ||
      lineHeight !== this.lineHeight ||
      transform !== this.transform ||
      textAnchor !== this.textAnchor ||
      fontSize !== this.fontSize ||
      !isEqual(content, this.content) ||
      !isEqual(style, this.style)
    ) {
      this.cacheAttributes(attrs);
      return true;
    }
    return false;
  }

  calculateAttributes(props) {
    const style = this.getStyles(props);
    const fontSize = this.getFontSize(style);
    const lineHeight = this.getHeight(props, "lineHeight");
    const textAnchor = props.textAnchor ?
      Helpers.evaluateProp(props.textAnchor, props.datum) : "start";
    const content = this.getContent(props);
    const dx = props.dx ? Helpers.evaluateProp(this.props.dx, props.datum) : 0;
    const dy = this.getDy(props, content, lineHeight) * fontSize;
    const transform = this.getTransform(props, style);
    return {
      style, dx, dy, content, lineHeight, textAnchor, transform, fontSize
    };
  }

  getStyles(props) {
    const style = props.style ? merge({}, defaultStyles, props.style) : defaultStyles;
    const datum = props.datum || props.data;
    const baseStyles = Helpers.evaluateStyle(style, datum, props.active);
    return assign({}, baseStyles, {fontSize: this.getFontSize(baseStyles)});
  }

  getHeight(props, type) {
    const datum = props.datum || props.data;
    return Helpers.evaluateProp(props[type], datum, props.active);
  }

  getContent(props) {
    if (props.text !== undefined) {
      const datum = props.datum || props.data;
      const child = Helpers.evaluateProp(props.text, datum, props.active);
      return `${child}`.split("\n");
    }
    return [" "];
  }

  getDy(props, content, lineHeight) {
    const datum = props.datum || props.data;
    const dy = props.dy ? Helpers.evaluateProp(props.dy, datum) : 0;
    const length = content.length;
    const capHeight = this.getHeight(props, "capHeight");
    const verticalAnchor = props.verticalAnchor ?
      Helpers.evaluateProp(props.verticalAnchor, datum) : "middle";
    switch (verticalAnchor) {
    case "end":
      return dy + capHeight / 2 + (0.5 - length) * lineHeight;
    case "middle":
      return dy + capHeight / 2 + (0.5 - length / 2) * lineHeight;
    default:
      return dy + capHeight / 2 + lineHeight / 2;
    }
  }

  getTransform(props, style) {
    const {datum, x, y} = props;
    const angle = props.angle || style.angle;
    const transform = props.transform || style.transform;
    const transformPart = transform && Helpers.evaluateProp(transform, datum);
    const rotatePart = angle && {rotate: [angle, x, y]};
    return transformPart || angle ?
      Style.toTransformString(transformPart, rotatePart) : undefined;
  }

  getFontSize(style) {
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
  }

  // Overridden in victory-core-native
  renderElements(props) {
    const textProps = {
      dx: this.dx, dy: this.dy, x: props.x, y: props.y, style: this.style,
      textAnchor: this.textAnchor, transform: this.transform, className: props.className
    };
    return (
      <text {...textProps}
        {...props.events}
      >
        {this.content.map((line, i) => {
          const dy = i ? this.lineHeight * this.fontSize : undefined;
          return (
            <tspan key={i} x={props.x} dy={dy} dx={this.dx}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }

  render() {
    return this.renderElements(this.props);
  }
}
