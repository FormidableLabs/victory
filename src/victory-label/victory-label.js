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
    /**
     * Specifies the angle to rotate the text by.
     */
    angle: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
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
     * Victory components can pass a datum prop to their label component. This can
     * be used to calculate functional styles, and determine child text
     */
    datum: PropTypes.object,
    /**
     * Labels that apply to an entire data series will recieve the entire series
     * as `data` instead of an individual datum prop.
     */
    data: PropTypes.array,
    /**
     * The events prop attaches arbitrary event handlers to the label component.
     * Event handlers are currently only called with their corresponding events.
     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
     */
    events: PropTypes.object,
    /**
     * all Victory components will pass a text prop to their label component.
     * This defines the content of the label when child nodes are absent. It
     * will be ignored if children are provided.
     */
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.func
    ]),
    /**
     * The children of this component define the content of the label. This
     * makes using the component similar to normal HTML spans or labels.
     * strings, numbers, and functions of data / value are supported.
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
    const text = props.text !== undefined ? props.text : props.children;
    if (text !== undefined) {
      const datum = props.datum || props.data;
      const child = Helpers.evaluateProp(text, datum);
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

  renderElements(props, content) {
    const transform = this.getTransform(props);
    const textProps = pick(props, ["dx", "dy", "x", "y", "style", "textAnchor"]);
    const fontSize = this.getFontSize(props.style);
    return (
      <text {...textProps}
        transform={transform}
        {...props.events}
      >
        {content.map((line, i) => {
          const dy = i ? props.lineHeight * fontSize : undefined;
          return (
            <tspan key={i} x={props.x} dy={dy}>
              {line}
            </tspan>
          );
        })}
      </text>
    );
  }

  render() {
    const datum = this.props.datum || this.props.data;
    const style = this.getStyles(this.props);
    const lineHeight = this.getHeight(this.props, "lineHeight");
    const textAnchor = this.props.textAnchor ?
      Helpers.evaluateProp(this.props.textAnchor, datum) : "start";
    const content = this.getContent(this.props);
    const dx = this.props.dx ? Helpers.evaluateProp(this.props.dx, datum) : 0;
    const dy = this.getDy(this.props, content, lineHeight) * style.fontSize;
    const labelProps = assign(
      {}, this.props, { dy, dx, datum, lineHeight, textAnchor, style }, this.props.events
    );
    return this.renderElements(labelProps, content);
  }
}
