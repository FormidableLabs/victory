import defaults from "lodash/defaults";
import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers } from "victory-core";
import VictoryAxis from "../victory-axis/victory-axis";
import ChartHelpers from "./helper-methods";
import Axis from "../../helpers/axis";
import Scale from "../../helpers/scale";
import Wrapper from "../../helpers/wrapper";

const defaultAxes = {
  independent: <VictoryAxis/>,
  dependent: <VictoryAxis dependentAxis/>
};

export default class VictoryChart extends React.Component {
  static propTypes = {
    /**
     * The animate prop specifies props for VictoryAnimation to use. If this prop is
     * given, all children defined in chart will pass the options specified in this prop to
     * VictoryTransition and VictoryAnimation. Child animation props will be added for any
     * values not provided via the animation prop for VictoryChart. The animate prop should
     * also be used to specify enter and exit transition configurations with the `onExit`
     * and `onEnter` namespaces respectively. VictoryChart will coodrinate transitions between all
     * of its child components so that animation stays in sync
     * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
     */
    animate: PropTypes.object,
    /**
     * VictoryChart is a wrapper component that controls the layout and animation behaviors of its
     * children. VictoryChart works with VictoryArea, VictoryAxis, VictoryBar, VictoryLine, and
     * VictoryScatter. Wrapper components like VictoryGroup and VictoryStack may also be
     * wrapped with VictoryChart. If not children are provided, VictoryChart will render a
     * set of empty axes.
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
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
     * The events prop attaches arbitrary event handlers to the top level chart svg.
     * To attach events to individual pieces of data, use the events prop in child componenets.
     * Event handlers on VictoryCharts are called with their corresponding events.
     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
     */
    events: PropTypes.object,
    /**
     * The height props specifies the height the svg viewBox of the chart container.
     * This value should be given as a number of pixels
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
     * given as a string or a function, or as an object that specifies separate scales for x and y.
     * Supported string scales are "linear", "time", "log" and "sqrt"
     * @examples d3.time.scale(), {x: "linear", y: "log" }
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
     * compose VictoryChart with other components within an enclosing <svg> tag. Victory
     * Component are responsive by default. If you need to create a fixed-size chart, set
     * standalone to false, and wrap VictoryChart in a custom <svg>
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your chart. Any valid inline style properties
     * will be applied. Height, width, and padding should be specified via the height,
     * width, and padding props, as they are used to calculate the alignment of
     * components within chart.
     * @examples {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}
     */
    style: PropTypes.object,
    /**
     * The width props specifies the width of the svg viewBox of the chart container
     * This value should be given as a number of pixels
     */
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    events: {},
    height: 300,
    width: 450,
    padding: 50,
    standalone: true
  };

  componentWillReceiveProps(nextProps) {
    const setAnimationState = Wrapper.setAnimationState.bind(this);
    setAnimationState(nextProps);
  }

  getStyles(props) {
    const styleProps = props.style && props.style.parent;
    return {
      parent: defaults({
        height: "auto",
        width: "100%"
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

  getChildProps(child, props, calculatedProps) {
    const type = child.type && child.type.role;
    if (type === "axis") {
      return this.getAxisProps(child, props, calculatedProps);
    }
    return {
      domain: calculatedProps.domain,
      scale: calculatedProps.scale,
      categories: calculatedProps.categories
    };
  }

  getCalculatedProps(props, childComponents) {
    const horizontal = childComponents.some((component) => component.props.horizontal);
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
        axisComponents.x && axisComponents.x.type.getScale(axisComponents.x.props) ||
        Scale.getDefaultScale(),
      y: Scale.getScaleFromProps(props, "y") ||
        axisComponents.y && axisComponents.y.type.getScale(axisComponents.y.props) ||
        Scale.getDefaultScale()
    };
    const scale = {
      x: baseScale.x.domain(domain.x).range(range.x),
      y: baseScale.y.domain(domain.y).range(range.y)
    };
    // TODO: check
    const categories = {
      x: Wrapper.getCategories(childComponents, props, "x"),
      y: Wrapper.getCategories(childComponents, props, "y")
    };
    const stringMap = {
      x: ChartHelpers.createStringMap(childComponents, "x"),
      y: ChartHelpers.createStringMap(childComponents, "y")
    };
    return {axisComponents, categories, domain, horizontal, scale, stringMap};
  }

  getNewChildren(props, childComponents, baseStyle) {
    const calculatedProps = this.getCalculatedProps(props, childComponents);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    return childComponents.map((child, index) => {
      const style = defaults({}, child.props.style, {parent: baseStyle.parent});
      const childProps = this.getChildProps(child, props, calculatedProps);
      const newProps = defaults({
        animate: getAnimationProps(props, child, index),
        height: props.height,
        width: props.width,
        padding: Helpers.getPadding(props),
        ref: index,
        key: index,
        standalone: false,
        style
      }, childProps);
      return React.cloneElement(child, newProps);
    });
  }

  render() {
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps : this.props;
    const style = this.getStyles(props);
    const childComponents = ChartHelpers.getChildComponents(props, defaultAxes);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(props, childComponents, style)}
      </g>
    );
    return this.props.standalone ?
      <svg
        style={style.parent}
        viewBox={`0 0 ${props.width} ${props.height}`}
        {...props.events}
      >
        {group}
      </svg> :
      group;
  }
}
