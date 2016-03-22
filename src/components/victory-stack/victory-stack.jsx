import defaults from "lodash/defaults";
import assign from "lodash/assign";
import uniq from "lodash/uniq";

import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers, Style } from "victory-core";
import Scale from "../../helpers/scale";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";

const defaultStyles = {
  data: {
    width: 8,
    padding: 6
  }
};

export default class VictoryStack extends React.Component {
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
     * The categories prop specifies how categorical data for a chart should be ordered.
     * This prop should be given as an array of string values, or two element arrays.
     * or an object with these values for x and y. When categories are not given as an object
     * they are assumed to refer to the independent variable (x). When categories are given
     * as an array of arrays, the minimum and maximum values of the arrays define range bands,
     * allowing numeric data to be grouped into segments. When this prop is set on
     * the VictoryGroup wrapper, it will dictate the categories of the children. If this
     * prop is not set, any categories on child component will be merged to create a
     * shared set of categories.
     * @examples ["dogs", "cats", "mice"], [[0, 5], [5, 10], [10, 15]]
     */
    categories: CustomPropTypes.homogeneousArray,
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
     * The height props specifies the height of the chart container element in pixels
     */
    height: CustomPropTypes.nonNegative,
    /**
     * The horizontal prop determines whether the bars will be laid vertically or
     * horizontally. The bars will be vertical if this prop is false or unspecified,
     * or horizontal if the prop is set to true.
     */
    horizontal: PropTypes.bool,
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
     * The width props specifies the width of the chart container element in pixels
     */
    width: CustomPropTypes.nonNegative
  };

  static defaultProps = {
    scale: "linear",
    height: 300,
    width: 450,
    padding: 50,
    standalone: true
  };

  static getDomain = Domain.getMultiSeriesDomain.bind(Domain)


  getChildProps(child, calculatedProps) {
    const {domain, flipped, scale, stringMap} = calculatedProps;
    const categoryAxis = flipped ? "y" : "x";
    const categories = stringMap[categoryAxis] && Object.keys(stringMap[categoryAxis]);
    return {domain, scale, categories};
  }

  getColor(props, index) {
    // check for styles first
    if (props.style && props.style.data && props.style.data.fill) {
      return props.style.data.fill;
    }
    const colorScale = Array.isArray(props.colorScale) ?
      props.colorScale : Style.getColorScale(props.colorScale);
    return colorScale[index % colorScale.length];
  }

  createStringMap(props, axis) {
    const categoryStrings = props.children.reduce((prev, component) => {
      const categoryData = Data.getStringsFromCategories(component.props, axis);
      return categoryData ? prev.concat(categoryData) : prev;
    }, []);
    const dataStrings = props.children.reduce((prev, component) => {
      const stringData = Data.getStringsFromData(component.props, axis);
      return stringData ? prev.concat(stringData) : prev;
    }, []);
    const allStrings = uniq([...categoryStrings, ...dataStrings]);

    return allStrings.length === 0 ? null :
      allStrings.reduce((memo, string, index) => {
        memo[string] = index + 1;
        return memo;
      }, {});
  }

  getCategories(props, axis) {
    if (props.categories) {
      return props.categories;
    }
    const allCategories = props.children.reduce((prev, component) => {
      const cats = component.props.categories;
      const categories = cats && Collection.isArrayOfArrays(cats) ?
        cats.map((arr) => (sum(arr) / arr.length)) : cats;
      return categories && prev.indexOf(categories) === -1 ? prev.concat(categories) : prev;
    }, []);
    return allCategories.length === 0 ? undefined : allCategories;
  }

  getDomain(props, axis) {
    const childComponents = props.children;
    let domain;
    if (props.domain && (Array.isArray(props.domain) || props.domain[axis])) {
      domain = Array.isArray(props.domain) ? props.domain : props.domain[axis];
    } else {
      const childDomains = childComponents.reduce((prev, component) => {
        const childDomain = component.type.getDomain(component.props, axis);
        return childDomain ? prev.concat(childDomain) : prev;
      }, []);
      domain = childDomains.length === 0 ?
        [0, 1] : [Math.min(...childDomains), Math.max(...childDomains)];
    }
    return Domain.padDomain(domain, props, axis);
  }

  getCalculatedProps(props, childComponents, style) {
    const flipped = props.horizontal || props.children.every(
      (component) => component.props.horizontal
    );
    const datasets = childComponents.map((child) => {
      return child.type.getData(child.props) || Data.getData(child.props);
    });
    const domain = {
      x: Domain.getMultiSeriesDomain(props, "x", datasets),
      y: Domain.getMultiSeriesDomain(props, "y", datasets)
    };
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const baseScale = {
      x: Scale.getScaleFromProps(props, "x") || "linear",
      y: Scale.getScaleFromProps(props, "y") || "linear"
    };
    const scale = {
      x: baseScale.x.domain(domain.x).range(range.x),
      y: baseScale.y.domain(domain.y).range(range.y)
    };
    // TODO: check
    const categories = {
      x: this.getCategories(props, "x"),
      y: this.getCategories(props, "y")
    };
    const stringMap = {
      x: this.createStringMap(props, "x"),
      y: this.createStringMap(props, "y")
    };
    return {datasets, categories, range, domain, flipped, scale, stringMap, style};
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

  getY0(datum, index, calculatedProps) {
    const { datasets } = calculatedProps;
    const y = datum.y;
    const previousDataSets = datasets.slice(0, index);
    const previousPoints = previousDataSets.reduce((prev, dataset) => {
      return prev.concat(dataset
        .filter((previousDatum) => datum.x instanceof Date
          ? previousDatum.x.getTime() === datum.x.getTime()
          : previousDatum.x === datum.x)
        .map((previousDatum) => previousDatum.y || 0)
      );
    }, []);
    return previousPoints.reduce((memo, value) => {
      const sameSign = (y < 0 && value < 0) || (y >= 0 && value >= 0);
      return sameSign ? memo + value : memo;
    }, 0);
  }

  addLayoutData(datasets, index, calculatedProps) {
    return datasets[index].map((datum) => {
      return assign(datum, {
        yOffset: this.getY0(datum, index, calculatedProps),
      })
    });
  }

  getChildStyle(child, index, calculatedProps) {
    const { style } = calculatedProps;
    const fillOverride = this.getColor(this.props, index);
    const childStyle = child.props.style || {};
    const dataStyle = defaults({fill: fillOverride}, childStyle.data, style.data);
    const labelsStyle = defaults({}, childStyle.labels, style.labels);
    return {
      parent: style.parent,
      data: dataStyle,
      labels: labelsStyle
    };
  }

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const { datasets, flipped } = calculatedProps;
    return childComponents.map((child, index) => {
      const childProps = this.getChildProps(child, calculatedProps);
      const data = this.addLayoutData(datasets, index, calculatedProps);
      const style = this.getChildStyle(child, index, calculatedProps);
      return React.cloneElement(child, defaults({
        horizontal: flipped,
        animate: child.props.animate || props.animate,
        height: props.height,
        width: props.width,
        padding: Helpers.getPadding(props),
        ref: index,
        key: index,
        standalone: false,
        style,
        data
      }, childProps));
    });
  }

  render() {
    const style = Helpers.getStyles(
      this.props.style, defaultStyles, this.props.height, this.props.width);
    const childComponents = this.props.children;
    const calculatedProps = this.getCalculatedProps(this.props, childComponents, style);
    const group = (
      <g style={style.parent}>
        {this.getNewChildren(this.props, childComponents, calculatedProps)}
      </g>
    );
    return this.props.standalone ? <svg style={style.parent}>{group}</svg> : group;
  }
}
