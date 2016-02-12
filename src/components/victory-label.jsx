import React, { PropTypes } from "react";
import Radium from "radium";
import { PropTypes as CustomPropTypes, Helpers, Style } from "victory-util";
import merge from "lodash/object/merge";

const defaultStyles = {
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
      CustomPropTypes.nonNegative,
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
      CustomPropTypes.nonNegative,
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

  getStyles(props) {
    const style = props.style ? merge({}, defaultStyles, props.style) : defaultStyles;
    return Helpers.evaluateStyle(style);
  }

  getHeight(props, type) {
    const height = Helpers.evaluateProp(props[type]);
    return typeof height === "number" ? `${height}em` : height;
  }

  getContent(props) {
    if (props.children) {
      const child = Helpers.evaluateProp(props.children);
      return `${child}`.split("\n");
    }
    return [""];
  }

  getDy(props, content, lineHeight) {
    const dy = props.dy ? Helpers.evaluateProp(props.dy) : 0;
    const length = content.length;
    const capHeight = this.getHeight(props, "capHeight");
    const verticalAnchor = props.verticalAnchor ?
      Helpers.evaluateProp(props.verticalAnchor) : "middle";
    switch (verticalAnchor) {
    case "end":
      return Style.calc(
        `${dy} +  ${capHeight} / 2 + (0.5 - ${length}) * ${lineHeight}`
      );
    case "middle":
      return Style.calc(
        `${dy} + ${capHeight} / 2 + (0.5 - ${length} / 2) * ${lineHeight}`
      );
    default:
      return Style.calc(`${dy} + ${capHeight} / 2 + ${lineHeight} / 2`);
    }
  }

  render() {
    const lineHeight = this.getHeight(this.props, "lineHeight");
    const transform =
      this.props.transform && Style.toTransformString(Helpers.evaluateProp(this.props.transform));
    const textAnchor = this.props.textAnchor ?
      Helpers.evaluateProp(this.props.textAnchor) : "start";
    const content = this.getContent(this.props);
    const style = this.getStyles(this.props);
    const dx = this.props.dx ? Helpers.evaluateProp(this.props.dx) : 0;
    const dy = this.getDy(this.props, content, lineHeight);
    return (
      <text
        x={this.props.x}
        y={this.props.y}
        dy={dy}
        dx={dx}
        textAnchor={textAnchor}
        transform={transform}
        style={style}
      >
        {content.map((line, i) => {
          return (
            <tspan key={i} x={this.props.x} dy={i ? lineHeight : undefined}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }
}
