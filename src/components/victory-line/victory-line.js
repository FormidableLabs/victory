import { assign, defaults, partialRight, isFunction, min, max, filter } from "lodash";
import React, { PropTypes } from "react";
import LineSegment from "./line-segment";
import LineHelpers from "./helper-methods";
import ClipPath from "../helpers/clip-path";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import {
  PropTypes as CustomPropTypes, Helpers, Events, VictoryTransition, VictoryLabel,
  VictoryContainer
} from "victory-core";

const fallbackProps = {
  props: {
    height: 300,
    width: 450,
    clipHeight: 300,
    clipWidth: 450
  },
  style: {
    data: {
      fill: "none",
      opacity: 1,
      strokeWidth: 2,
      stroke: "#252525"
    },
    labels: {
      fill: "#252525",
      fontFamily: "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif",
      fontSize: 14,
      letterSpacing: "0.04em",
      padding: 10,
      strokeWidth: 0,
      stroke: "transparent",
      textAnchor: "start"
    }
  }
};

export default class VictoryLine extends React.Component {
  static displayName = "VictoryLine";

  static role = "line";

  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: (datum) => ({ y: datum.y }),
      beforeClipPathWidth: (data, child, exitingNodes) => {
        const filterExit = filter(data, (datum) => { return !exitingNodes[datum.x]; });
        const xVals = filterExit.map((datum) => {
          return child.type.getScale(child.props).x(datum.x);
        });
        const clipPath = min(xVals) + max(xVals);
        return clipPath;
      }
    },
    onEnter: {
      duration: 500,
      before: () => ({ y: null }),
      after: (datum) => ({ y: datum.y }),
      beforeClipPathWidth: (data, child, enteringNodes) => {
        const filterEnter = filter(data, (datum) => { return !enteringNodes[datum.x]; });
        const xVals = filterEnter.map((datum) => {
          return child.type.getScale(child.props).x(datum.x);
        });
        const clipPath = min(xVals) + max(xVals);
        return clipPath;
      },
      afterClipPathWidth: (data, child) => {
        const xVals = data.map((datum) => {
          return child.type.getScale(child.props).x(datum.x);
        });
        const clipPath = min(xVals) + max(xVals);
        return clipPath;
      }
    }
  };

  static propTypes = {
    /**
     * The animate prop specifies props for VictoryAnimation to use. The animate prop should
     * also be used to specify enter and exit transition configurations with the `onExit`
     * and `onEnter` namespaces respectively.
     * @examples {duration: 500, onEnd: () => {}, onEnter: {duration: 500, before: () => ({y: 0})})}
     */
    animate: PropTypes.object,
    /**
     * The categories prop specifies how categorical data for a chart should be ordered.
     * This prop should be given as an array of string values, or an object with
     * these arrays of values specified for x and y. If this prop is not set,
     * categorical data will be plotted in the order it was given in the data array
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
     * The data prop specifies the data to be plotted.
     * Data should be in the form of an array of data points.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */

    data: PropTypes.array,
    /**
     * The dataComponent prop takes an entire component which will be used to create line segments
     * for each continuous set of data. (i.e. null data will result in multiple line segments)
     * The new element created from the passed dataComponent will be provided with the following
     * properties calculated by VictoryLine: data, index, scale, interpolation, and events.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If a dataComponent is not
     * provided, VictoryLine will use its default LineSegment component.
     */
    dataComponent: PropTypes.element,
    /**
     * The domain prop describes the range of values your chart will include. This prop can be
     * given as a array of the minimum and maximum expected values for your chart,
     * or as an object that specifies separate arrays for x and y.
     * If this prop is not provided, a domain will be calculated from data, or other
     * available information.
     * @examples [-1, 1], {x: [0, 100], y: [0, 1]}
     */
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({
        x: CustomPropTypes.domain,
        y: CustomPropTypes.domain
      })
    ]),
    /**
     * The event prop take an array of event objects. Event objects are composed of
     * a target, an eventKey, and eventHandlers. Targets may be any valid style namespace
     * for a given component, so "data" and "labels" are all valid targets for VictoryLine events.
     * Since VictoryLine only renders a single element, the eventKey property is not used.
     * The eventHandlers object should be given as an object whose keys are standard
     * event names (i.e. onClick) and whose values are event callbacks. The return value
     * of an event handler is used to modify elemnts. The return value should be given
     * as an object or an array of objects with optional target and eventKey keys,
     * and a mutation key whose value is a function. The target and eventKey keys
     * will default to those corresponding to the element the event handler was attached to.
     * The mutation function will be called with the calculated props for the individual selected
     * element (i.e. a line), and the object returned from the mutation function
     * will override the props of the selected element via object assignment.
     * @examples
     * events={[
     *   {
     *     target: "data",
     *     eventHandlers: {
     *       onClick: () => {
     *         return [
     *            {
     *              mutation: (props) => {
     *                return {style: merge({}, props.style, {stroke: "orange"})};
     *              }
     *            }, {
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
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    /**
     * The name prop is used to reference a component instance when defining shared events.
     */
    name: PropTypes.string,
    /**
     * This prop is used to coordinate events between VictoryArea and other Victory
     * Components via VictorySharedEvents. This prop should not be set manually.
     */
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func
    }),
    /**
     * The height props specifies the height the svg viewBox of the chart container.
     * This value should be given as a number of pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The interpolation prop determines how data points should be connected
     * when plotting a line
     */
    interpolation: PropTypes.oneOf([
      "basis",
      "basisClosed",
      "basisOpen",
      "bundle",
      "cardinal",
      "cardinalClosed",
      "cardinalOpen",
      "catmullRom",
      "catmullRomClosed",
      "catmullRomOpen",
      "linear",
      "linearClosed",
      "monotoneX",
      "monotoneY",
      "natural",
      "radial",
      "step",
      "stepAfter",
      "stepBefore"
    ]),
    /**
     * The label prop defines the label that will appear at the end of the line.
     * This prop should be given a string or as a function of data. If individual
     * labels are required for each data point, they should be created by composing
     * VictoryLine with VictoryScatter
     * @examples: "Series 1", (data) => `${data.length} points`
     */
    label: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    /**
     * The labelComponent prop takes in an entire label component which will be used
     * to create a label for the line. The new element created from the passed labelComponent
     * will be supplied with the following properties: x, y, index, data, verticalAnchor,
     * textAnchor, angle, style, text, and events. any of these props may be overridden
     * by passing in props to the supplied component, or modified or ignored within
     * the custom component itself. If labelComponent is omitted, a new VictoryLabel
     * will be created with props described above. This labelComponent prop should be used to
     * provide a series label for VictoryLine. If individual labels are required for each
     * data point, they should be created by composing VictoryLine with VictoryScatter
     */
    labelComponent: PropTypes.any,
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
     * The samples prop specifies how many individual points to plot when plotting
     * y as a function of x. Samples is ignored if x props are provided instead.
     */
    samples: CustomPropTypes.nonNegative,
    /**
     * The scale prop determines which scales your chart should use. This prop can be
     * given as a string specifying a supported scale ("linear", "time", "log", "sqrt"),
     * as a d3 scale function, or as an object with scales specified for x and y
     * @exampes d3Scale.time(), {x: "linear", y: "log"}
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
     * compose VictoryLine with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your VictoryLine. Any valid inline style properties
     * will be applied. Height, width, and padding should be specified via the height,
     * width, and padding props, as they are used to calculate the alignment of
     * components within chart. in addition to normal style properties, angle and verticalAnchor
     * may also be specified via the labels object, and they will be passed as props to
     * VictoryLabel, or any custom labelComponent.
     * @examples {data: {stroke: "red"}, labels: {fontSize: 12}}
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
     * The x prop specifies how to access the X value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'x', 'x.value.nested.1.thing', 'x[2].also.nested', null, d => Math.sin(d)
     */
    x: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The y prop specifies how to access the Y value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'y', 'y.value.nested.1.thing', 'y[2].also.nested', null, d => Math.sin(d)
     */
    y: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The containerComponent prop takes an entire component which will be used to
     * create a container element for standalone charts.
     * The new element created from the passed containerComponent wil be provided with
     * these props from VictoryLine: height, width, children
     * (the chart itself) and style. Props that are not provided by the
     * child chart component include title and desc, both of which
     * are intended to add accessibility to Victory components. The more descriptive these props
     * are, the more accessible your data will be for people using screen readers.
     * Any of these props may be overridden by passing in props to the supplied component,
     * or modified or ignored within the custom component itself. If a dataComponent is
     * not provided, VictoryLine will use the default VictoryContainer component.
     * @examples <VictoryContainer title="Chart of Dog Breeds" desc="This chart shows how
     * popular each dog breed is by percentage in Seattle." />
     */
    containerComponent: PropTypes.element,
    /**
    * The theme prop takes a style object with nested data, labels, and parent objects.
    * You can create this object yourself, or you can use a theme provided by Victory.
    * When using VictoryLine as a solo component, implement the theme directly on
    * VictoryLine. If you are wrapping VictoryLine in VictoryChart, VictoryStack, or
    * VictoryGroup, please call the theme on the outermost wrapper component instead.
    * @examples theme={VictoryTheme.material}
    */
    theme: PropTypes.object,
    /**
     * The groupComponent prop takes an entire component which will be used to
     * create group elements for use within container elements. This prop defaults
     * to a <g> tag on web, and a react-native-svg <G> tag on mobile
     */
    groupComponent: PropTypes.element,
    /**
     * The clipPathComponent prop takes an entire component which will be used to
     * create clipPath elements for use within container elements.
     */
    clipPathComponent: PropTypes.element
  };

  static defaultProps = {
    interpolation: "linear",
    padding: 50,
    samples: 50,
    scale: "linear",
    standalone: true,
    x: "x",
    y: "y",
    dataComponent: <LineSegment/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    clipPathComponent: <ClipPath/>
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(LineHelpers.getBaseProps.bind(LineHelpers),
    fallbackProps);
  static getScale = partialRight(LineHelpers.getScale.bind(LineHelpers),
    fallbackProps);

  constructor() {
    super();
    this.state = {};
    const getScopedEvents = Events.getScopedEvents.bind(this);
    this.getEvents = partialRight(Events.getEvents.bind(this), getScopedEvents);
    this.getEventState = Events.getEventState.bind(this);
  }

  componentWillMount() {
    this.setupEvents(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setupEvents(newProps);
  }

  setupEvents(props) {
    const { sharedEvents } = props;
    this.baseProps = LineHelpers.getBaseProps(props, fallbackProps);
    this.getSharedEventState = sharedEvents && isFunction(sharedEvents.getEventState) ?
      sharedEvents.getEventState : () => undefined;
  }

  renderData(props) {
    const { dataComponent, labelComponent, groupComponent, clipId } = props;
    const dataSegments = LineHelpers.getDataSegments(Data.getData(props));
    const lineComponents = [];
    const lineLabelComponents = [];
    for (let index = 0, len = dataSegments.length; index < len; index++) {
    // return dataSegments.map((data, key) => {
      const data = dataSegments[index];
      const role = `${VictoryLine.role}-${index}`;
      const dataEvents = this.getEvents(props, "data", "all");
      const dataProps = defaults(
        {index, key: role, role, clipId},
        this.getEventState("all", "data"),
        this.getSharedEventState("all", "data"),
        { data },
        dataComponent.props,
        this.baseProps.all.data
      );
      lineComponents[index] = React.cloneElement(dataComponent, assign(
        {}, dataProps, {events: Events.getPartialEvents(dataEvents, "all", dataProps)}
      ));

      const labelProps = defaults(
          {index, key: `${role}-label-${index}`},
          this.getEventState("all", "labels"),
          this.getSharedEventState("all", "labels"),
          { data },
          labelComponent.props,
          this.baseProps.all.labels
        );
      if (labelProps && labelProps.text) {
        const labelEvents = this.getEvents(props, "labels", "all");
        lineLabelComponents[index] = React.cloneElement(labelComponent, assign({
          events: Events.getPartialEvents(labelEvents, "all", labelProps)
        }, labelProps));
      }
    }
    return lineLabelComponents.length > 0 ?
      React.cloneElement(groupComponent, {}, ...lineComponents, ...lineLabelComponents) :
      lineComponents;
  }

  renderContainer(props, group) {
    const parentEvents = this.getEvents(props, "parent", "parent");
    const parentProps = defaults(
      {},
      this.getEventState("parent", "parent"),
      this.getSharedEventState("parent", "parent"),
      props.containerComponent.props,
      this.baseProps.parent
    );
    return React.cloneElement(
      props.containerComponent,
      assign(
        {}, parentProps, {events: Events.getPartialEvents(parentEvents, "parent", parentProps)}
      ),
      group
    );
  }

  renderGroup(children, modifiedProps, style) {
    const { clipPathComponent } = modifiedProps;

    const clipComponent = React.cloneElement(clipPathComponent, assign(
      {},
      {
        padding: modifiedProps.padding,
        clipId: modifiedProps.clipId,
        clipWidth: modifiedProps.clipWidth || modifiedProps.width,
        clipHeight: modifiedProps.clipHeight || modifiedProps.height
      }
    ));

    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      children,
      clipComponent
    );
  }

  render() {
    const clipId = Math.round(Math.random() * 10000);
    const modifiedProps = Helpers.modifyProps(assign({}, this.props, {clipId}), fallbackProps);
    const { animate, style, standalone } = modifiedProps;

    if (animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      // TODO: extract into helper
      const whitelist = [
        "data", "domain", "height", "padding", "samples",
        "style", "width", "x", "y", "clipWidth", "clipHeight"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, modifiedProps)}
        </VictoryTransition>
      );
    }

    const styleObject = modifiedProps.theme && modifiedProps.theme.line ? modifiedProps.theme.line
    : fallbackProps.style;

    const baseStyles = Helpers.getStyles(style, styleObject, "auto", "100%");
    const group = this.renderGroup(
      this.renderData(modifiedProps), modifiedProps, baseStyles.parent
    );

    return standalone ? this.renderContainer(modifiedProps, group) : group;
  }
}
