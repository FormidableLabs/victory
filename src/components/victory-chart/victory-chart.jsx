import keys from "lodash/object/keys";
import merge from "lodash/object/merge";
import some from "lodash/collection/some";

import React, { PropTypes } from "react";
import Radium from "radium";
import { PropTypes as CustomPropTypes, Helpers } from "victory-util";
import VictoryAxis from "../victory-axis/victory-axis";
import ChartHelpers from "./helper-methods";
import Axis from "../../helpers/axis";
import Scale from "../../helpers/scale";

const defaultAxes = {
  independent: <VictoryAxis animate={{velocity: 0.02}}/>,
  dependent: <VictoryAxis dependentAxis animate={{velocity: 0.02}}/>
};

@Radium
export default class VictoryChart extends React.Component {
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. If this prop is
     * given, all children defined in chart will pass the options specified in this prop to
     * victory-animation, unless they have animation props of their own specified.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {velocity: 0.02, onEnd: () => alert("woo!")}
     */
    animate: PropTypes.object,
    /**
     * The domain prop describes the range of values your chart will include. This prop can be
     * given as a array of the minimum and maximum expected values for your chart,
     * or as an object that specifies separate arrays for x and y.
     * If this prop is not provided, a domain will be calculated from data, or other
     * available information.
     * @examples: [-1, 1], {x: [0, 100], y: [0, 1]}
     */
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({
        x: CustomPropTypes.domain,
        y: CustomPropTypes.domain
      })
    ]),
    /**
     * The domainPadding prop specifies a number of pixels of padding to add to the
     * beginning and end of a domain. This prop is useful for explicitly spacing ticks farther
     * from the origin to prevent crowding. This prop should be given as an object with
     * numbers specified for x and y.
     */
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: CustomPropTypes.nonNegative,
        y: CustomPropTypes.nonNegative
      }),
      CustomPropTypes.nonNegative
    ]),
    /**
     * The height props specifies the height of the chart container element in pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The padding props specifies the amount of padding in number of pixels between
     * the edge of the chart and any rendered child components. This prop can be given
     * as a number or as an object with padding specified for top, bottom, left
     * and right.
     */
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
      })
    ]),
    /**
     * The scale prop determines which scales your chart should use. This prop can be
     * given as a function, or as an object that specifies separate functions for x and y.
     * @examples d3.time.scale(), {x: d3.scale.linear(), y: d3.scale.log()}
     */
    scale: PropTypes.oneOfType([
      CustomPropTypes.scale,
      PropTypes.shape({
        x: CustomPropTypes.scale,
        y: CustomPropTypes.scale
      })
    ]),
    /**
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryChart with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your chart. Victory Chart relies on Radium,
     * so valid Radium style objects should work for this prop. Height, width, and
     * padding should be specified via the height, width, and padding props, as they
     * are used to calculate the alignment of components within chart.
     * @examples {background: transparent, margin: 50}
     */
    style: PropTypes.object,
    /**
     * The width props specifies the width of the chart container element in pixels
     */
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    height: 300,
    width: 450,
    padding: 50,
    standalone: true
  };

  getStyles(props) {
    const styleProps = props.style && props.style.parent;
    return {
      parent: merge({
        height: props.height,
        width: props.width
      },
      styleProps
    )};
  }

  getAxisProps(child, props, calculatedProps) {
    const {domain, scale} = calculatedProps;
    const axis = child.type.getAxis(child.props);
    const axisOffset = ChartHelpers.getAxisOffset(props, calculatedProps);
    const tickValues = ChartHelpers.getTicks(calculatedProps, axis, child);
    const tickFormat =
      child.props.tickFormat || ChartHelpers.getTickFormat(child, axis, calculatedProps);
    const offsetY = axis === "y" ? undefined : axisOffset.y;
    const offsetX = axis === "x" ? undefined : axisOffset.x;
    return {
      domain: domain[axis],
      scale: scale[axis],
      tickValues,
      tickFormat,
      offsetY,
      offsetX,
      crossAxis: true
    };
  }

  getGroupedDataProps(child, calculatedProps) {
    const {domain, flipped, scale, stringMap} = calculatedProps;
    const categoryAxis = flipped ? "y" : "x";
    const categories = stringMap[categoryAxis] && keys(stringMap[categoryAxis]);
    return {
      domain,
      scale,
      categories: child.props.categories || categories
    };
  }

  getChildProps(child, props, calculatedProps) {
    const type = child.type && child.type.role;
    if (type === "axis") {
      return this.getAxisProps(child, props, calculatedProps);
    } else if (type === "bar") {
      return this.getGroupedDataProps(child, calculatedProps);
    }
    return {
      domain: calculatedProps.domain,
      scale: calculatedProps.scale
    };
  }

  getCalculatedProps(props, childComponents) {
    const flipped = some(childComponents, (component) => component.props.horizontal);
    const axisComponents = {
      x: Axis.getAxisComponent(childComponents, "x"),
      y: Axis.getAxisComponent(childComponents, "y")
    };
    const domain = {
      x: ChartHelpers.getDomain(props, childComponents, "x"),
      y: ChartHelpers.getDomain(props, childComponents, "y")
    };
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const baseScale = {
      x: Scale.getScaleFromProps(props, "x") ||
        axisComponents.x.type.getScale(axisComponents.x.props),
      y: Scale.getScaleFromProps(props, "y") ||
        axisComponents.y.type.getScale(axisComponents.y.props)
    };
    const scale = {
      x: baseScale.x.domain(domain.x).range(range.x),
      y: baseScale.y.domain(domain.y).range(range.y)
    };
    // TODO: check
    const categories = {
      x: ChartHelpers.getCategories(childComponents, "x"),
      y: ChartHelpers.getCategories(childComponents, "y")
    };
    const stringMap = {
      x: ChartHelpers.createStringMap(childComponents, "x"),
      y: ChartHelpers.createStringMap(childComponents, "y")
    };
    return {axisComponents, categories, domain, flipped, scale, stringMap};
  }

  // the old ones were bad
  getNewChildren(props, childComponents, baseStyle) {
    const calculatedProps = this.getCalculatedProps(props, childComponents);
    return childComponents.map((child, index) => {
      const style = merge({}, {parent: baseStyle.parent}, child.props.style);
      const childProps = this.getChildProps(child, props, calculatedProps);
      return React.cloneElement(child, merge({}, childProps, {
        animate: child.props.animate || props.animate,
        height: props.height,
        width: props.width,
        padding: Helpers.getPadding(props),
        ref: index,
        key: index,
        standalone: false,
        style
      }));
    });
  }

  render() {
    const style = this.getStyles(this.props);
    const childComponents = ChartHelpers.getChildComponents(this.props, defaultAxes);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(this.props, childComponents, style)}
      </g>
    );
    return this.props.standalone ? <svg style={style.parent}>{group}</svg> : group;
  }
}
