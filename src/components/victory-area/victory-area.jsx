import pick from "lodash/object/pick";
import last from "lodash/array/last";
import defaults from "lodash/object/defaults";
import omit from "lodash/object/omit";

import React, { PropTypes } from "react";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import Scale from "../../helpers/scale";
import { PropTypes as CustomPropTypes, Helpers, VictoryAnimation } from "victory-core";
import Area from "./area";
import AreaLabel from "./area-label";
import AreaHelpers from "./helper-methods";
import memoizerific from "memoizerific";

const defaultStyles = {
  data: {
    fill: "#756f6a",
    opacity: 1
  },
  labels: {
    fontSize: 12,
    padding: 4,
    fill: "black"
  }
};

export default class VictoryArea extends React.Component {
  static role = "area";
  static propTypes = {
    /**
     * The animate prop specifies props for victory-animation to use. It this prop is
     * not given, the bar chart will not tween between changing data / style props.
     * Large datasets might animate slowly due to the inherent limits of svg rendering.
     * @examples {velocity: 0.02, onEnd: () => alert("done!")}
     */
    animate: PropTypes.object,
    /**
     * The colorScale prop is an optional prop that defines the color scale the chart's areas
     * will be created on. This prop should be given as an array of CSS colors, or as a string
     * corresponding to one of the built in color scales. VictoryBar will automatically assign
     * values from this color scale to the areas unless colors are explicitly provided in the
     * `dataAttributes` prop.
     */
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "greyscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    /**
     * The data prop specifies the data to be plotted. Data should be in the form of an array
     * of data points, or an array of arrays of data points for multiple datasets.
     * Each data point may be any format you wish (depending on the `x` and `y` accessor props),
     * but by default, an object with x and y properties is expected.
     * @examples [{x: 1, y: 2}, {x: 2, y: 3}], [[1, 2], [2, 3]],
     * [[{x: "a", y: 1}, {x: "b", y: 2}], [{x: "a", y: 2}, {x: "b", y: 3}]]
     */
    data: PropTypes.array,
    /**
     * The dataAttributes prop describes how a data set should be styled.
     * This prop can be given as an object, or an array of objects. If this prop is
     * given as an array of objects, the properties of each object in the array will
     * be applied to the data points in the corresponding array of the data prop.
     * @examples {fill: "blue", opacity: 0.6}, [{fill: "red"}, {fill: "orange"}]
     */
    dataAttributes: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    /**
     * The domain prop describes the range of values your bar chart will cover. This prop can be
     * given as a array of the minimum and maximum expected values for your bar chart,
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
     * The height props specifies the height of the chart container element in pixels
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
      "monotone",
      "natural",
      "radial",
      "step",
      "stepAfter",
      "stepBefore"
    ]),
    /**
     * The labels prop defines labels that will appear above each area. This prop
     * should be given as an array of values.
     * @examples: ["spring", "summer", "fall", "winter"]
     */
    labels: PropTypes.array,
    /**
    * The labelComponent prop takes in an entire, HTML-complete label
    * component which will be used to create labels for each area in the
    * chart. The new element created from the passed labelComponent will have
    * children preserved, or provided via the labels array, textAnchor, and verticalAnchor
    * preserved or default values provided by defaults; and styles filled out with defaults
    * provided by the style prop, and dataAttributes prop. If labelComponent is omitted,
    * but a labels array is specified, a new VictoryLabel will be created.
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
     * The stacked prop determines whether the chart should consist of stacked areas.
     * When this prop is set to true, the data prop *must* be an array of multiple data series
     * ie. not an array of data points, but an array of arrays of data points
     */
    stacked: PropTypes.bool,
    /**
     * The standalone prop determines whether the component will render a standalone svg
     * or a <g> tag that will be included in an external svg. Set standalone to false to
     * compose VictoryBar with other components within an enclosing <svg> tag.
     */
    standalone: PropTypes.bool,
    /**
     * The style prop specifies styles for your chart. VictoryBar relies on Radium,
     * so valid Radium style objects should work for this prop, however height, width, and margin
     * are used to calculate range, and need to be expressed as a number of pixels
     * @examples {data: {fill: "red", width: 8}, labels: {fontSize: 12}}
     */
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    /**
     * The width prop specifies the width of the chart container element in pixels
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
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.func)
    ])
  };

  static defaultProps = {
    colorScale: "greyscale",
    height: 300,
    padding: 50,
    scale: "linear",
    samples: 50,
    stacked: false,
    standalone: true,
    interpolation: "linear",
    width: 450,
    x: "x",
    y: "y"
  };

  static getDomain = Domain.getMultiSeriesDomain.bind(Domain);

  componentWillMount() {
    this.memoized = {
      // Provide performant, multiple-argument memoization with LRU cache-size of 1.
      getStyles: memoizerific(1)(Helpers.getStyles)
    };
  }

  renderAreas(calculatedProps) {
    const {datasets, scale} = calculatedProps;
    return datasets.map((dataset, index) => {
      const baseStyle = calculatedProps.style;
      const style = defaults({}, omit(dataset.attrs, "name"), baseStyle.data);
      const dataWithBaseline = AreaHelpers.getBaseline(datasets, calculatedProps, index);
      const areaComponent = (
        <Area key={`area-${index}`}
          scale={scale}
          style={style}
          interpolation={dataset.attrs.interpolation || this.props.interpolation}
          data={dataWithBaseline}
        />
      );
      const label = this.props.labels && this.props.labels[index];
      if (label) {
        const position = {
          x: scale.x.call(this, last(dataset.data).x),
          y: scale.y.call(this, last(dataset.data).y)
        };
        return (
          <g key={`area-group-${index}`}>
            {areaComponent}
            <AreaLabel key={`area-label-${index}`}
              style={baseStyle.labels}
              data={dataset.data}
              position={position}
              labelText={label}
              labelComponent={this.props.labelComponent}
            />
          </g>
        );
      }
      return areaComponent;
    });
  }

  renderData(props, style) {
    const datasets = Data.getMultiSeriesData(props);
    const padding = Helpers.getPadding(props);
    const range = {
      x: Helpers.getRange(props, "x"),
      y: Helpers.getRange(props, "y")
    };
    const domain = {
      x: Domain.getMultiSeriesDomain(props, "x", datasets),
      y: Domain.getMultiSeriesDomain(props, "y", datasets)
    };
    const scale = {
      x: Scale.getBaseScale(props, "x").domain(domain.x).range(range.x),
      y: Scale.getBaseScale(props, "y").domain(domain.y).range(range.y)
    };
    const calculatedProps = {
      datasets, domain, padding, range, scale, style, stacked: props.stacked
    };
    return this.renderAreas(calculatedProps);
  }

  render() {
    // If animating, return a `VictoryAnimation` element that will create
    // a new `VictoryBar` with nearly identical props, except (1) tweened
    // and (2) `animate` set to null so we don't recurse forever.
    if (this.props.animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const animateData = pick(this.props, [
        "data", "dataAttributes", "colorScale", "domain", "height",
        "padding", "style", "width"
      ]);
      return (
        <VictoryAnimation {...this.props.animate} data={animateData}>
          {(props) => <VictoryArea {...this.props} {...props} animate={null}/>}
        </VictoryAnimation>
      );
    }
    const style = this.memoized.getStyles(
      this.props.style, defaultStyles, this.props.height, this.props.width);
    const group = <g style={style.parent}>{this.renderData(this.props, style)}</g>;
    return this.props.standalone ? <svg style={style.parent}>{group}</svg> : group;
  }
}
