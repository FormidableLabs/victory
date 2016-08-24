import { assign, defaults } from "lodash";
import React, { PropTypes } from "react";
import {
  PropTypes as CustomPropTypes, Helpers, VictorySharedEvents, VictoryContainer, VictoryTheme
} from "victory-core";
import Scale from "../../helpers/scale";
import Wrapper from "../../helpers/wrapper";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

export default class VictoryStack extends React.Component {
  static displayName = "VictoryStack";

  static role = "stack-wrapper";

  static propTypes = {
    /**
     * The animate prop specifies props for VictoryAnimation to use. If this prop is
     * given, all children of VictoryStack will pass the options specified in this prop to
     * VictoryTransition and VictoryAnimation. Child animation props will be added for any
     * values not provided via the animation prop for VictoryStack. The animate prop should
     * also be used to specify enter and exit transition configurations with the `onExit`
     * and `onEnter` namespaces respectively. VictoryStack will coodrinate transitions between all
     * of its child components so that animation stays in sync
     * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
     */
    animate: PropTypes.object,
    /**
     * The categories prop specifies how categorical data for a chart should be ordered.
     * This prop should be given as an array of string values, or an object with
     * these values for x and y. When categories are not given as an object
     * When this prop is set on a wrapper component, it will dictate the categories of
     * its the children. If this prop is not set, any categories on child component
     * or catigorical data, will be merged to create a shared set of categories.
     * @examples ["dogs", "cats", "mice"]
     */
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string),
        y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    /**
     * VictoryStack is a wrapper component that controls the layout and animation behaviors of its
     * children. VictoryStack creates a stacked layout for  VictoryArea, or VictoryBar components.
     */
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    /**
     * The colorScale prop is an optional prop that defines the color scale the chart's bars
     * will be created on. This prop should be given as an array of CSS colors, or as a string
     * corresponding to one of the built in color scales. VictoryBar will automatically assign
     * values from this color scale to the bars unless colors are explicitly provided in the
     * `dataAttributes` prop.
     */

    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
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
        x: PropTypes.oneOfType([
          PropTypes.number,
          CustomPropTypes.domain
        ]),
        y: PropTypes.oneOfType([
          PropTypes.number,
          CustomPropTypes.domain
        ])
      }),
      PropTypes.number
    ]),
    /**
     * The event prop take an array of event objects. Event objects are composed of
     * a childName, target, eventKey, and eventHandlers. Targets may be any valid style namespace
     * for a given component, (i.e. "data" and "labels"). The childName will refer to an
     * individual child of VictoryStack, either by its name prop, or by index. The eventKey
     * may optionally be used to select a single element by index or eventKey rather than
     * an entire set. The eventHandlers object should be given as an object whose keys are standard
     * event names (i.e. onClick) and whose values are event callbacks. The return value
     * of an event handler is used to modify elemnts. The return value should be given
     * as an object or an array of objects with optional target and eventKey and childName keys,
     * and a mutation key whose value is a function. The target and eventKey and childName keys
     * will default to those corresponding to the element the event handler was attached to.
     * The mutation function will be called with the calculated props for the individual selected
     * element (i.e. a single bar), and the object returned from the mutation function
     * will override the props of the selected element via object assignment.
     * @examples
     * events={[
     *   {
     *     target: "data",
     *     childName: "firstBar",
     *     eventHandlers: {
     *       onClick: () => {
     *         return [
     *            {
     *              childName: "secondBar",
     *              mutation: (props) => {
     *                return {style: merge({}, props.style, {fill: "orange"})};
     *              }
     *            }, {
     *              childName: "secondBar",
     *              target: "labels",
     *              mutation: () => {
     *                return {text: "hey"};
     *              }
     *            }
     *          ];
     *       }
     *     }
     *   }
     * ]}
     *}}
     */
    events: PropTypes.arrayOf(PropTypes.shape({
      childName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    /**
     * Similar to data accessor props `x` and `y`, this prop may be used to functionally
     * assign eventKeys to data
     */
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    /**
     * The height props specifies the height the svg viewBox of the chart container.
     * This value should be given as a number of pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The horizontal prop determines whether the bars will be laid vertically or
     * horizontally. The bars will be vertical if this prop is false or unspecified,
     * or horizontal if the prop is set to true.
     */
    horizontal: PropTypes.bool,
    /**
     * The labels prop defines labels that will appear above stack of data.
     * This prop should be given as an array of values or as a function of data.
     * If given as an array, the number of elements in the array should be equal to
     * the length of the data array. Stack labels will appear above the last
     * series of the stack, and will override the labels prop of child components.
     * To use group labels with individual data labels, individual labels should be
     * added directly to data.
     * @examples: ["spring", "summer", "fall", "winter"], (datum) => datum.title
     */
    labels: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array
    ]),
    /**
     * The labelComponent prop takes in an entire, HTML-complete label
     * component which will be used to create labels for each stack of data in the
     * chart. The new element created from the passed labelComponent will have
     * property data provided by the bar's datum; properties x, y, textAnchor,
     * and verticalAnchor preserved or default values provided by the data component; and
     * styles filled out with defaults provided by the component, and overrides from
     * the datum. If labelComponent is omitted, a new VictoryLabel will be
     * created with props and styles from the bar.
     */
    labelComponent: PropTypes.element,
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
     * The style prop specifies styles for your grouped chart. These styles will be
     * applied to all grouped children
     */
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    /**
     * The width props specifies the width of the svg viewBox of the chart container
     * This value should be given as a number of pixels
     */
    width: CustomPropTypes.nonNegative,
    /**
     * The xOffset prop is used for grouping stacks of bars. This prop will be set
     * by the VictoryGroup component wrapper, or can be set manually.
     */
    xOffset: PropTypes.number,
    /**
     * The containerComponent prop takes an entire component which will be used to
     * create a container element for standalone charts.
     * The new element created from the passed containerComponent wil be provided with
     * these props from VictoryStack: height, width, children
     * (the chart itself) and style. Props that are not provided by the
     * child chart component include title and desc, both of which
     * are intended to add accessibility to Victory components. The more descriptive these props
     * are, the more accessible your data will be for people using screen readers.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If a dataComponent is
     * not provided, VictoryStack will use the default VictoryContainer component.
     * @examples <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
     * popular each dog breed is by percentage in Seattle." />
     */
    containerComponent: PropTypes.element,
    /**
    * The theme prop takes a style object with nested data, labels, and parent objects.
    * You can create this object yourself, or you can use a theme provided by Victory.
    * When using VictoryStack to wrap a chart component, implement the theme directly on
    * VictoryStack. If you are wrapping VictoryStack in VictoryChart,
    * please call the theme on the wrapper component instead.
    * @examples theme={VictoryTheme.material}
    */
    theme: PropTypes.object,
    /**
     * The groupComponent prop takes an entire component which will be used to
     * create group elements for use within container elements. This prop defaults
     * to a <g> tag on web, and a react-native-svg <G> tag on mobile
     */
    groupComponent: PropTypes.element
  };

  static defaultProps = {
    scale: "linear",
    standalone: true,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    theme: VictoryTheme. grayscale
  };

  static getDomain = Wrapper.getStackedDomain.bind(Wrapper);
  static getData = Wrapper.getData.bind(Wrapper);

  componentWillReceiveProps(nextProps) {
    const setAnimationState = Wrapper.setAnimationState.bind(this);
    setAnimationState(nextProps);
  }

  getCalculatedProps(props, childComponents, style) {
    const horizontal = props.horizontal || childComponents.every(
      (component) => component.props.horizontal
    );
    const datasets = Wrapper.getDataFromChildren(props);
    const domain = {
      x: Wrapper.getStackedDomain(props, "x", datasets),
      y: Wrapper.getStackedDomain(props, "y", datasets)
    };
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const baseScale = {
      x: Scale.getScaleFromProps(props, "x") || Scale.getDefaultScale(),
      y: Scale.getScaleFromProps(props, "y") || Scale.getDefaultScale()
    };
    const xScale = baseScale.x.domain(domain.x).range(range.x);
    const yScale = baseScale.y.domain(domain.y).range(range.y);
    const scale = {
      x: horizontal ? yScale : xScale,
      y: horizontal ? xScale : yScale
    };
    const categories = {
      x: Wrapper.getCategories(props, "x"),
      y: Wrapper.getCategories(props, "y")
    };
    const colorScale = props.colorScale;
    return {datasets, categories, range, domain, horizontal, scale, style, colorScale};
  }

  addLayoutData(props, calculatedProps, datasets, index) { // eslint-disable-line max-params
    const xOffset = props.xOffset || 0;
    return datasets[index].map((datum) => {
      const yOffset = Wrapper.getY0(datum, index, calculatedProps) || 0;
      return assign({}, datum, {
        y0: yOffset,
        y1: datum.y + yOffset,
        x1: datum.x + xOffset
      });
    });
  }

  getLabels(props, datasets, index) {
    if (!props.labels) {
      return undefined;
    }
    return datasets.length === index + 1 ? props.labels : undefined;
  }

  getChildProps(props, calculatedProps) {
    const { categories, domain, scale, horizontal } = calculatedProps;
    return {
      height: props.height,
      width: props.width,
      padding: Helpers.getPadding(props),
      standalone: false,
      theme: props.theme,
      categories,
      domain,
      scale,
      horizontal
    };
  }

  getColorScale(props, child) {
    const role = child.type && child.type.role;
    const colorScaleOptions = child.props.colorScale || props.colorScale;
    if (role !== "group-wrapper" && role !== "stack-wrapper") {
      return undefined;
    }
    return props.theme ? colorScaleOptions || props.theme.props.colorScale
    : colorScaleOptions;
  }

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const { datasets } = calculatedProps;
    const childProps = this.getChildProps(props, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    const newChildren = [];
    for (let index = 0, len = childComponents.length; index < len; index++) {
      const child = childComponents[index];
      const data = this.addLayoutData(props, calculatedProps, datasets, index);
      const style = Wrapper.getChildStyle(child, index, calculatedProps);
      const labels = props.labels ? this.getLabels(props, datasets, index) : child.props.labels;
      newChildren[index] = React.cloneElement(child, assign({
        animate: getAnimationProps(props, child, index),
        key: index,
        labels,
        domainPadding: child.props.domainPadding || props.domainPadding,
        theme: props.theme,
        labelComponent: props.labelComponent || child.props.labelComponent,
        style,
        colorScale: this.getColorScale(props, child),
        data
      }, childProps));
    }
    return newChildren;
  }

  getContainer(props, calculatedProps) {
    const { width, height, containerComponent } = props;
    const { scale, style } = calculatedProps;
    const parentProps = defaults(
      {},
      containerComponent.props,
      {style: style.parent, scale, width, height}
    );
    return React.cloneElement(containerComponent, parentProps);
  }

  renderGroup(children, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      children
    );
  }

  render() {
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps : this.props;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, "stack");
    const { theme, standalone, events, eventKey} = modifiedProps;
    const fallbackStyle = theme && theme.stack && theme.stack.style ?
      theme.stack.style : {};
    const style = Helpers.getStyles(modifiedProps.style, fallbackStyle, "auto", "100%");
    const childComponents = React.Children.toArray(modifiedProps.children);

    const calculatedProps = this.getCalculatedProps(modifiedProps, childComponents, style);

    const container = standalone && this.getContainer(modifiedProps, calculatedProps);
    const newChildren = this.getNewChildren(modifiedProps, childComponents, calculatedProps);
    if (events) {
      return (
        <VictorySharedEvents
          events={events}
          eventKey={eventKey}
          container={container}
        >
          {newChildren}
        </VictorySharedEvents>
      );
    }
    const group = this.renderGroup(newChildren, style.parent);

    return modifiedProps.standalone ? React.cloneElement(container, container.props, group) : group;
  }
}
