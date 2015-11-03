import React, { PropTypes } from "react";
import Radium from "radium";
import { calc, toTransformString } from "victory-util/lib/style";
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
      PropTypes.number
    ]),
    /**
     * The children of this component define the content of the label. This
     * makes using the component similar to normal HTML spans or labels.
     * Currently, only strings are supported.
     */
    children: PropTypes.string, // TODO: Expand child support in future release
    /**
     * The lineHeight prop defines how much space a single line of text should
     * take up. Note that SVG has no notion of line-height, so the positioning
     * may differ slightly from what you would expect with CSS. The value
     * should ideally use the same units as `capHeight` and `dy`, preferably
     * ems. If given a unitless number, it is assumed to be ems.
     */
    lineHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * The style prop applies CSS properties to the rendered `<text>` element.
     */
    style: PropTypes.object,
    /**
     * The textAnchor prop defines how the text is horizontally positioned
     * relative to the given `x` and `y` coordinates.
     */
    textAnchor: PropTypes.oneOf([
      "start",
      "middle",
      "end",
      "inherit"
    ]),
    /**
     * The verticalAnchor prop defines how the text is vertically positioned
     * relative to the given `x` and `y` coordinates.
     */
    verticalAnchor: PropTypes.oneOf([
      "start",
      "middle",
      "end"
    ]),
    /**
     * The transform prop applies a transform to the rendered `<text>` element.
     * In addition to being a string, it can be an object containing transform
     * definitions for easier authoring.
     */
    transform: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
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
     * The dy prop defines a vertical shift from the `y` coordinate. Since this
     * component accounts for SVG weirdness and accounts for `capHeight`,
     * `lineHeight`, and `verticalAnchor`, this will usually not be necessary.
     */
    dy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  };

  static defaultProps = {
    capHeight: "0.71em", // Magic number from d3.
    lineHeight: 1,
    verticalAnchor: "start",
    dy: 0
  };

  getStyles() {
    return this.props.style ?
      _.merge({}, styles, this.props.style) : styles;
  }

  render() {
    const style = this.getStyles();
    const transform = toTransformString(this.props.transform);
    const content = this.props.children || "";
    const lines = content.split("\n");

    let lineHeight = this.props.lineHeight;
    if (typeof lineHeight === "number") {
      lineHeight = `${lineHeight}em`;
    }

    let capHeight = this.props.capHeight;
    if (typeof capHeight === "number") {
      capHeight = `${capHeight}em`;
    }

    let dy = this.props.dy;
    switch (this.props.verticalAnchor) {
    case "end":
      dy = calc(`${dy} + ${capHeight} / 2 + (0.5 - ${lines.length}) * ${lineHeight}`);
      break;
    case "middle":
      dy = calc(`${dy} + ${capHeight} / 2 + (0.5 - ${lines.length} / 2) * ${lineHeight}`);
      break;
    default:
      dy = calc(`${dy} + ${capHeight} / 2 + ${lineHeight} / 2`);
    }


    return (
      <text x={this.props.x} y={this.props.y} dy={dy}
        textAnchor={this.props.textAnchor}
        transform={transform}
        style={style.text}
      >
        {lines.map((line, i) => {
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
