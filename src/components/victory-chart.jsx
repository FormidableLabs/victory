import keys from "lodash/object/keys";
import merge from "lodash/object/merge";
import some from "lodash/collection/some";

import React, { PropTypes } from "react";
import Radium from "radium";
import { PropTypes as CustomPropTypes, Chart, Data } from "victory-util";
import { VictoryAxis } from "victory-axis";
import { VictoryLine } from "victory-line";
import * as Helpers from "../helper-methods";

const defaultAxes = {
  independent: <VictoryAxis animate={{velocity: 0.02}}/>,
  dependent: <VictoryAxis dependentAxis animate={{velocity: 0.02}}/>
};

const defaultData = <VictoryLine domain={{x: [0, 1], y: [0, 1]}}/>;

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
    const axisOffset = Helpers.getAxisOffset(props, calculatedProps);
    const tickValues = Helpers.getTicks(child, axis, calculatedProps);
    const tickFormat =
      child.props.tickFormat || Helpers.getTickFormat(child, axis, calculatedProps);
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

  getDataProps(child, calculatedProps) {
    const {domain, scale} = calculatedProps;
    const data = Data.getData(merge({}, child.props, {domain, scale}));
    return {
      data,
      domain,
      scale
    };
  }

  getNewProps(child, props, calculatedProps) {
    const type = child.type && child.type.role;
    if (type === "axis") {
      return this.getAxisProps(child, props, calculatedProps);
    } else if (type === "bar") {
      return this.getGroupedDataProps(child, calculatedProps);
    }
    return this.getDataProps(child, calculatedProps);
  }

  getCalculatedProps(props, childComponents) {
    const flipped = some(childComponents, (component) => component.props.horizontal);
    const axisComponents = {
      x: Helpers.getAxisComponent(childComponents, "x"),
      y: Helpers.getAxisComponent(childComponents, "y")
    };
    const axisOrientations = {
      x: Helpers.getAxisOrientation(axisComponents.x, "x"),
      y: Helpers.getAxisOrientation(axisComponents.y, "y")
    };
    const domain = {
      x: Helpers.getDomain(props, childComponents, axisOrientations, "x"),
      y: Helpers.getDomain(props, childComponents, axisOrientations, "y")
    };
    const range = {
      x: Chart.getRange(props, "x"),
      y: Chart.getRange(props, "y")
    };
    const scale = {
      x: Helpers.getScale(props, axisComponents.x, "x").domain(domain.x).range(range.x),
      y: Helpers.getScale(props, axisComponents.y, "y").domain(domain.y).range(range.y)
    };
    // TODO: check
    const categories = {
      x: Helpers.getCategories(childComponents, "x"),
      y: Helpers.getCategories(childComponents, "y")
    };
    const stringMap = {
      x: Helpers.createStringMap(childComponents, categories, "x"),
      y: Helpers.createStringMap(childComponents, categories, "y")
    };
    return {axisComponents, axisOrientations, categories, domain, flipped, scale, stringMap};
  }

  // the old ones were bad
  getNewChildren(props, childComponents, baseStyle) {
    const calculatedProps = this.getCalculatedProps(props, childComponents);
    return childComponents.map((child, index) => {
      const style = merge({}, {parent: baseStyle.parent}, child.props.style);
      const newProps = this.getNewProps(child, props, calculatedProps);
      return React.cloneElement(child, merge({}, newProps, {
        animate: child.props.animate || props.animate,
        height: props.height,
        width: props.width,
        padding: Chart.getPadding(props),
        ref: index,
        key: index,
        standalone: false,
        style
      }));
    });
  }

  render() {
    const style = this.getStyles(this.props);
    const childComponents = Helpers.getChildComponents(this.props, defaultData, defaultAxes);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(this.props, childComponents, style)}
      </g>
    );
    return this.props.standalone ? <svg style={style.parent}>{group}</svg> : group;
  }
}
