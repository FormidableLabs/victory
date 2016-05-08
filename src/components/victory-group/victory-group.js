import uniq from "lodash/uniq";
import assign from "lodash/assign";
import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers, Log } from "victory-core";
import Scale from "../../helpers/scale";
import Data from "../../helpers/data";
import Wrapper from "../../helpers/wrapper";

const defaultStyles = {
  data: {
    width: 8,
    padding: 6
  }
};

export default class VictoryGroup extends React.Component {
  static role = "group-wrapper";

  static propTypes = {
    /**
     * The animate prop specifies props for VictoryAnimation to use. If this prop is
     * given, all children of VictoryGroup will pass the options specified in this prop to
     * VictoryTransition and VictoryAnimation. Child animation props will be added for any
     * values not provided via the animation prop for VictoryGroup. The animate prop should
     * also be used to specify enter and exit transition configurations with the `onExit`
     * and `onEnter` namespaces respectively. VictoryGroup will coodrinate transitions between all
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
     * VictoryGroup is a wrapper component that controls the layout and animation behaviors of its
     * children. VictoryGroup creates a grouped layout for  VictoryArea, or VictoryBar components.
     * VictoryGroup  can also group components wrapped in VictoryStack
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
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
        x: CustomPropTypes.nonNegative,
        y: CustomPropTypes.nonNegative
      }),
      CustomPropTypes.nonNegative
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
     * The labels prop defines labels that will appear above group of data.
     * This prop should be given as an array of values or as a function of data.
     * If given as an array, the number of elements in the array should be equal to
     * the length of the data array. Group labels will appear above the center
     * series of the group, and will override the labels prop of child components.
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
     * component which will be used to create labels for each group of data in the
     * chart. The new element created from the passed labelComponent will have
     * property data provided by the bar's datum; properties x, y, textAnchor,
     * and verticalAnchor preserved or default values provided by the data component; and
     * styles filled out with defaults provided by the component, and overrides from
     * the datum. If labelComponent is omitted, a new VictoryLabel will be
     * created with props and styles from the bar.
     */
    labelComponent: PropTypes.element,
    /**
     * The offset prop derermines the number of pixels each element in a group should
     * be offset from the others. In the case of groups of bars, this number should
     * be equal to the width of the bar plus the desired spacing between bars.
     */
    offset: PropTypes.number,
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
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    scale: "linear",
    offset: 0,
    height: 300,
    width: 450,
    padding: 50,
    standalone: true
  };

  static getDomain = Wrapper.getDomainFromChildren.bind(Wrapper);
  static getData = Wrapper.getData.bind(Wrapper);

  componentWillReceiveProps(nextProps) {
    const setAnimationState = Wrapper.setAnimationState.bind(this);
    setAnimationState(nextProps);
  }

  getCalculatedProps(props, childComponents, style) {
    const horizontal = props.horizontal || childComponents.every(
          (component) => component.props.horizontal
    );
    const datasets = childComponents.map((child) => {
      const getData = child.type.getData || Data.getData;
      return getData(child.props);
    });
    const domain = {
      x: Wrapper.getDomainFromChildren(props, "x", datasets),
      y: Wrapper.getDomainFromChildren(props, "y", datasets)
    };
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const baseScale = {
      x: Scale.getScaleFromProps(props, "x") || Scale.getDefaultScale(),
      y: Scale.getScaleFromProps(props, "y") || Scale.getDefaultScale()
    };
    const scale = {
      x: baseScale.x.domain(domain.x).range(range.x),
      y: baseScale.y.domain(domain.y).range(range.y)
    };
    const categories = {
      x: Wrapper.getCategories(props, "x"),
      y: Wrapper.getCategories(props, "y")
    };
    const colorScale = props.colorScale;
    return {datasets, categories, range, domain, horizontal, scale, style, colorScale};
  }

  pixelsToValue(pixels, axis, calculatedProps) {
    if (pixels === 0) {
      return 0;
    }
    const domain = calculatedProps.domain[axis];
    const range = calculatedProps.range[axis];
    const domainExtent = Math.max(...domain) - Math.min(...domain);
    const rangeExtent = Math.max(...range) - Math.min(...range);
    return domainExtent / rangeExtent * pixels;
  }

  getXO(props, calculatedProps, datasets, index) { // eslint-disable-line max-params
    const center = (datasets.length - 1) / 2;
    const totalWidth = this.pixelsToValue(props.offset, "x", calculatedProps);
    return (index - center) * totalWidth;
  }

  getLabels(props, datasets, index) {
    if (!props.labels) {
      return undefined;
    }
    return Math.floor(datasets.length / 2) === index ? props.labels : undefined;
  }

  getChildProps(props, calculatedProps) {
    const { categories, domain, scale, horizontal } = calculatedProps;
    return {
      height: props.height,
      width: props.width,
      padding: Helpers.getPadding(props),
      labelComponent: props.labelComponent,
      standalone: false,
      categories,
      domain,
      scale,
      horizontal
    };
  }

  getColorScale(props, child) {
    const role = child.type && child.type.role;
    if (role !== "group-wrapper" && role !== "stack-wrapper") {
      return undefined;
    }
    return child.props.colorScale || props.colorScale;
  }

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const { datasets } = calculatedProps;
    const childProps = this.getChildProps(props, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    return childComponents.map((child, index) => {
      const xOffset = this.getXO(props, calculatedProps, datasets, index);
      const data = datasets[index].map((datum) => assign({}, datum, {xOffset}));
      const style = Wrapper.getChildStyle(child, index, calculatedProps);
      return React.cloneElement(child, assign({
        animate: getAnimationProps(props, child, index),
        key: index,
        labels: this.getLabels(props, datasets, index) || child.props.labels,
        labelComponent: props.labelComponent || child.props.labelComponent,
        style,
        data,
        xOffset: child.type.role === "stack-wrapper" ? xOffset : undefined,
        colorScale: this.getColorScale(props, child)
      }, childProps));
    });
  }

  render() {
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps : this.props;
    const style = Helpers.getStyles(props.style, defaultStyles, "auto", "100%");
    const childComponents = React.Children.toArray(props.children);
    const types = uniq(childComponents.map((child) => child.type.role));
    if (types.length > 1) {
      Log.warn("Only components of the same type can be grouped");
    }
    const calculatedProps = this.getCalculatedProps(props, childComponents, style);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(props, childComponents, calculatedProps)}
      </g>
    );
    return this.props.standalone ?
      <svg style={style.parent} viewBox={`0 0 ${props.width} ${props.height}`}>
        {group}
      </svg> :
      group;
  }
}
