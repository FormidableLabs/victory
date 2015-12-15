import React, { PropTypes } from "react";
import Radium from "radium";
import Util from "victory-util";
import _ from "lodash";

const styles = {
  stroke: "transparent",
  fill: "#756f6a",
  fontSize: 16,
  fontFamily: "Helvetica",
  backgroundColor: "#ccc"
};

@Radium
export default class VictoryLabel extends React.Component {
  static propTypes = {
    /**
     * The capHeight prop defines a text metric for the font being used: the
     * expected height of capital letters. This is necessary because of SVG,
     * which (a) positions the *bottom* of the text at `y`, and (b) has no
     * notion of line height. The value should ideally use the same units as
     * `lineHeight` and `dy`, preferably ems. If given a unitless number, it
     * is assumed to be ems.
     */
    capHeight: PropTypes.oneOfType([
      PropTypes.string,
      Util.PropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * all Victory components will pass a data prop to their label component. This can
     * be used to calculate functional styles, and determine child text
     */
    data: PropTypes.object,
    /**
     * The children of this component define the content of the label. This
     * makes using the component similar to normal HTML spans or labels.
     * Currently, only strings are supported.
     */
    children: PropTypes.oneOfType([ // TODO: Expand child support in future release
      PropTypes.string,
      PropTypes.number,
      PropTypes.func
    ]),
    /**
     * The lineHeight prop defines how much space a single line of text should
     * take up. Note that SVG has no notion of line-height, so the positioning
     * may differ slightly from what you would expect with CSS, but the result
     * is similar: a roughly equal amount of extra space is distributed above
     * and below the line of text. The value should ideally use the same units
     * as `capHeight` and `dy`, preferably ems. If given a unitless number, it
     * is assumed to be ems.
     */
    lineHeight: PropTypes.oneOfType([
      PropTypes.string,
      Util.PropTypes.nonNegative,
      PropTypes.func
    ]),
    /**
     * The style prop applies CSS properties to the rendered `<text>` element.
     */
    style: PropTypes.object,
    /**
     * The textAnchor prop defines how the text is horizontally positioned
     * relative to the given `x` and `y` coordinates.
     */
    textAnchor: PropTypes.oneOfType([
      PropTypes.oneOf([
        "start",
        "middle",
        "end",
        "inherit"
      ]),
      PropTypes.func
    ]),
    /**
     * The verticalAnchor prop defines how the text is vertically positioned
     * relative to the given `x` and `y` coordinates.
     */
    verticalAnchor: PropTypes.oneOfType([
      PropTypes.oneOf([
        "start",
        "middle",
        "end"
      ]),
      PropTypes.func
    ]),
    /**
     * The transform prop applies a transform to the rendered `<text>` element.
     * In addition to being a string, it can be an object containing transform
     * definitions for easier authoring.
     */
    transform: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func
    ]),
    /**
     * The x prop defines the x coordinate to use as a basis for horizontal
     * positioning.
     */
    x: PropTypes.number,
    /**
     * The y prop defines the y coordinate to use as a basis for vertical
     * positioning.
     */
    y: PropTypes.number,
    /**
     * The dx prop defines a horizontal shift from the `x` coordinate.
     */
    dx: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.func
    ]),
    /**
     * The dy prop defines a vertical shift from the `y` coordinate. Since this
     * component already accounts for `capHeight`, `lineHeight`, and
     * `verticalAnchor`, this will usually not be necessary.
     */
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.func
    ])
  };

  static defaultProps = {
    capHeight: "0.71em", // Magic number from d3.
    lineHeight: 1
  };

  getCalculatedValues(props) {
    this.style = this.getStyles(props);
    this.transform = Util.Style.toTransformString(this.evaluateProp(props.transform));
    this.verticalAnchor = props.verticalAnchor ?
      this.evaluateProp(props.verticalAnchor) : "middle";
    this.textAnchor = props.textAnchor ? this.evaluateProp(props.textAnchor) : "start";
    this.capHeight = this.getHeight(props, "capHeight");
    this.lineHeight = this.getHeight(props, "lineHeight");
    this.content = this.getContent(props);
    this.dy = this.getDy(props);
    this.dx = this.getDx(props);
  }

  getStyles(props) {
    const style = props.style ? _.merge({}, styles, props.style) : styles;
    return this.evaluateStyle(style);
  }

  evaluateStyle(style) {
    return _.transform(style, (result, value, key) => {
      result[key] = this.evaluateProp(value);
    });
  }

  evaluateProp(prop) {
    return _.isFunction(prop) ? prop.call(this, this.props.data) : prop;
  }

  getHeight(props, type) {
    const height = this.evaluateProp(props[type]);
    return _.isNumber(height) ? `${height}em` : height;
  }

  getContent(props) {
    if (props.children) {
      const child = this.evaluateProp(props.children);
      return `${child}`.split("\n");
    }
    return [""];
  }

  getDx(props) {
    return props.dx ? this.evaluateProp(props.dx) : 0;
  }

  getDy(props) {
    const dy = props.dy ? this.evaluateProp(props.dy) : 0;
    const length = this.content.length;
    switch (this.verticalAnchor) {
    case "end":
      return Util.Style.calc(
        `${dy} +  ${this.capHeight} / 2 + (0.5 - ${length}) * ${this.lineHeight}`
      );
    case "middle":
      return Util.Style.calc(
        `${dy} + ${this.capHeight} / 2 + (0.5 - ${length} / 2) * ${this.lineHeight}`
      );
    default:
      return Util.Style.calc(`${dy} + ${this.capHeight} / 2 + ${this.lineHeight} / 2`);
    }
  }

  render() {
    this.getCalculatedValues(this.props);
    return (
      <text x={this.props.x} y={this.props.y} dy={this.dy} dx={this.dx}
        textAnchor={this.textAnchor}
        transform={this.transform}
        style={this.style}
      >
        {this.content.map((line, i) => {
          return (
            <tspan key={i} x={this.props.x} dy={i ? this.lineHeight : undefined}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }
}
