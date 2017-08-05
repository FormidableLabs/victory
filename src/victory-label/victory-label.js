import React from "react";
import PropTypes from "prop-types";
import VictoryPortal from "../victory-portal/victory-portal";
import CustomPropTypes from "../victory-util/prop-types";
import Collection from "../victory-util/collection";
import Helpers from "../victory-util/helpers";
import LabelHelpers from "../victory-util/label-helpers";
import Style from "../victory-util/style";
import Log from "../victory-util/log";
import { assign, merge } from "lodash";

const defaultStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  stroke: "transparent"
};

export default class VictoryLabel extends React.Component {
  static displayName = "VictoryLabel";
  static role = "label";
  static propTypes = {
    active: PropTypes.bool,
    angle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    capHeight: PropTypes.oneOfType([
      PropTypes.string,
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    className: PropTypes.string,
    data: PropTypes.array,
    datum: PropTypes.any,
    desc: PropTypes.string,
    dx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.func
    ]),
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.func
    ]),
    events: PropTypes.object,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelPlacement: PropTypes.oneOf(["parallel", "perpendicular", "vertical"]),
    lineHeight: PropTypes.oneOfType([
      PropTypes.string,
      CustomPropTypes.nonNegative,
      PropTypes.func
    ]),
    origin: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    polar: PropTypes.bool,
    renderInPortal: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func,
      PropTypes.array
    ]),
    textAnchor: PropTypes.oneOfType([
      PropTypes.oneOf([
        "start",
        "middle",
        "end",
        "inherit"
      ]),
      PropTypes.func
    ]),
    title: PropTypes.string,
    transform: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
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
    x: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    y: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  };

  static defaultProps = {
    capHeight: 0.71, // Magic number from d3.
    lineHeight: 1
  };

  componentWillMount() {
    this.cacheAttributes(this.calculateAttributes(this.props));
  }

  shouldComponentUpdate(nextProps) {
    const attrs = this.calculateAttributes(nextProps);
    const { style, dx, dy, content, lineHeight, textAnchor, transform } = attrs;
    const { angle, className, datum, x, y, active } = this.props;
    if (!Collection.allSetsEqual([
      [active, nextProps.active],
      [angle, nextProps.angle],
      [className, nextProps.className],
      [x, nextProps.x],
      [y, nextProps.y],
      [dx, this.dx],
      [dy, this.dy],
      [lineHeight, this.lineHeight],
      [textAnchor, this.textAnchor],
      [transform, this.transform],
      [content, this.content],
      [style, this.style],
      [datum, nextProps.datum]
    ])) {
      this.cacheAttributes(attrs);
      return true;
    }
    return false;
  }

  cacheAttributes(attrs) {
    const { style, dx, dy, content, textAnchor, transform, lineHeight } = attrs;
    this.style = style;
    this.dx = dx;
    this.dy = dy;
    this.content = content;
    this.textAnchor = textAnchor;
    this.lineHeight = lineHeight;
    this.transform = transform;
  }

  calculateAttributes(props) {
    const style = this.getStyles(props);
    const lineHeight = this.getHeight(props, "lineHeight");
    const textAnchor = props.textAnchor ?
      Helpers.evaluateProp(props.textAnchor, props.datum) : "start";
    const content = this.getContent(props);
    const dx = props.dx ? Helpers.evaluateProp(this.props.dx, props.datum) : 0;
    const dy = this.getDy(props, style, content, lineHeight);
    const transform = this.getTransform(props, style);
    return {
      style, dx, dy, content, lineHeight, textAnchor, transform
    };
  }

  getStyle(props, style) {
    style = style ? merge({}, defaultStyles, style) : defaultStyles;
    const datum = props.datum || props.data;
    const baseStyles = Helpers.evaluateStyle(style, datum, props.active);
    return assign({}, baseStyles, { fontSize: this.getFontSize(baseStyles) });
  }

  getStyles(props) {
    return Array.isArray(props.style) ?
      props.style.map((style) => this.getStyle(props, style)) : [this.getStyle(props, props.style)];
  }

  getHeight(props, type) {
    const datum = props.datum || props.data;
    return Helpers.evaluateProp(props[type], datum, props.active);
  }

  getContent(props) {
    if (props.text === undefined || props.text === null) {
      return [" "];
    }
    const datum = props.datum || props.data;
    if (Array.isArray(props.text)) {
      return props.text.map((line) => Helpers.evaluateProp(line, datum, props.active));
    }
    const child = Helpers.evaluateProp(props.text, datum, props.active);
    return `${child}`.split("\n");
  }

  getDy(props, style, content, lineHeight) { //eslint-disable-line max-params
    const fontSize = style[0].fontSize;
    const datum = props.datum || props.data;
    const dy = props.dy ? Helpers.evaluateProp(props.dy, datum) : 0;
    const length = content.length;
    const capHeight = this.getHeight(props, "capHeight");
    const verticalAnchor = style.verticalAnchor || props.verticalAnchor;
    const anchor = verticalAnchor ?
      Helpers.evaluateProp(verticalAnchor, datum) : "middle";
    switch (anchor) {
    case "end":
      return dy + (capHeight / 2 + (0.5 - length) * lineHeight) * fontSize;
    case "middle":
      return dy + (capHeight / 2 + (0.5 - length / 2) * lineHeight) * fontSize;
    default:
      return dy + (capHeight / 2 + lineHeight / 2) * fontSize;
    }
  }

  getTransform(props, style) {
    const { datum, x, y, polar } = props;
    const defaultAngle = polar ? LabelHelpers.getPolarAngle(props) : 0;
    const angle = style.angle || props.angle || defaultAngle;
    const transform = props.transform || style.transform;
    const transformPart = transform && Helpers.evaluateProp(transform, datum);
    const rotatePart = angle && { rotate: [angle, x, y] };
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
      dx: this.dx, dy: this.dy, x: props.x, y: props.y,
      transform: this.transform, className: props.className
    };
    return (
      <text {...textProps}
        {...props.events}
      >
        {this.props.title && <title>{this.props.title}</title>}
        {this.props.desc && <desc>{this.props.desc}</desc>}
        {this.content.map((line, i) => {
          const style = this.style[i] || this.style[0];
          const lastStyle = this.style[i - 1] || this.style[0];
          const fontSize = (style.fontSize + lastStyle.fontSize) / 2;
          const textAnchor = style.textAnchor || this.textAnchor;
          const dy = i ? (this.lineHeight * fontSize) : undefined;
          return (
            <tspan key={i} x={props.x} dy={dy} dx={this.dx} style={style} textAnchor={textAnchor}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }

  render() {
    const label = this.renderElements(this.props);
    return this.props.renderInPortal ? <VictoryPortal>{label}</VictoryPortal> : label;
  }
}
