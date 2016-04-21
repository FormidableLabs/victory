import assign from "lodash/assign";
import uniq from "lodash/uniq";
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

export default class VictoryStack extends React.Component {
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
    xOffset: PropTypes.number
  };

  static defaultProps = {
    scale: "linear",
    height: 300,
    width: 450,
    padding: 50,
    standalone: true
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
    const datasets = childComponents.map((child) => {
      return child.type.getData(child.props) || Data.getData(child.props);
    });
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

  addLayoutData(props, calculatedProps, datasets, index) { // eslint-disable-line max-params
    return datasets[index].map((datum) => {
      return assign(datum, {
        yOffset: Wrapper.getY0(datum, index, calculatedProps),
        xOffset: props.xOffset
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
      categories,
      domain,
      scale,
      horizontal
    };
  }

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const { datasets } = calculatedProps;
    const childProps = this.getChildProps(props, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    return childComponents.map((child, index) => {
      const data = this.addLayoutData(props, calculatedProps, datasets, index);
      const style = Wrapper.getChildStyle(child, index, calculatedProps);
      return React.cloneElement(child, assign({
        animate: getAnimationProps(props, child, index),
        key: index,
        labels: this.getLabels(props, datasets, index) || child.props.labels,
        labelComponent: props.labelComponent || child.props.labelComponent,
        style,
        data
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
      Log.warn("Only components of the same type can be stacked");
    }
    if (types.some((type) => type === "group-wrapper")) {
      Log.warn("It is not possible to stack groups.");
    }
    const calculatedProps = this.getCalculatedProps(props, childComponents, style);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(props, childComponents, calculatedProps)}
      </g>
    );
    return props.standalone ?
      <svg style={style.parent} viewBox={`0 0 ${props.width} ${props.height}`}>
        {group}
      </svg> :
      group;
  }
}
