import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers, Style, Log } from "../victory-util/index";
import { assign, merge, pick } from "lodash";

const defaultStyles = {
  fill: "#252525",
  fontSize: 14,
  fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
  stroke: "transparent"
};

export default class VictoryLabel extends React.Component {
  static displayName = "VictoryLabel";

  static propTypes = {
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

  getStyles(props) {
    const style = props.style ? merge({}, defaultStyles, props.style) : defaultStyles;
    const datum = props.datum || props.data;
    const baseStyles = Helpers.evaluateStyle(style, datum);
    return assign({}, baseStyles, {fontSize: this.getFontSize(baseStyles)});
  }

  getHeight(props, type) {
    const datum = props.datum || props.data;
    return Helpers.evaluateProp(props[type], datum);
  }

  getContent(props) {
    if (props.text !== undefined) {
      const datum = props.datum || props.data;
      const child = Helpers.evaluateProp(props.text, datum);
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

  getTransform(props) {
    const style = this.getStyles(props);
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
  renderElements(props, content) {
    const transform = this.getTransform(props);
    const textProps = pick(props, ["dx", "dy", "x", "y", "style", "textAnchor", "className"]);
    const fontSize = this.getFontSize(props.style);
    return (
      <text {...textProps}
        transform={transform}
        {...props.events}
      >
        {content.map((line, i) => {
          const dy = i ? props.lineHeight * fontSize : undefined;
          return (
            <tspan key={i} x={props.x} dy={dy} dx={props.dx}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }

  render() {
    const { datum, events } = this.props;
    const style = this.getStyles(this.props);
    const lineHeight = this.getHeight(this.props, "lineHeight");
    const textAnchor = this.props.textAnchor ?
      Helpers.evaluateProp(this.props.textAnchor, datum) : "start";
    const content = this.getContent(this.props);
    const dx = this.props.dx ? Helpers.evaluateProp(this.props.dx, datum) : 0;
    const dy = this.getDy(this.props, content, lineHeight) * style.fontSize;
    const labelProps = assign(
      {}, this.props, { dy, dx, datum, lineHeight, textAnchor, style }, events
    );
    return this.renderElements(labelProps, content);
  }
}
