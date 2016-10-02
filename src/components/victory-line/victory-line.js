import { partialRight } from "lodash";
import React, { PropTypes } from "react";
import LineHelpers from "./helper-methods";
import Domain from "../../helpers/domain";
import Data from "../../helpers/data";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, Curve, VictoryGroupContainer
} from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  interpolation: "linear"
};

class VictoryLine extends React.Component {
  static displayName = "VictoryLine";
  static role = "line";
  static defaultTransitions = DefaultTransitions.continuousTransitions();

  static propTypes = {
    ...commonProps,
    ...cartesianProps,
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
     * The sortKey prop specifies the sort key for data points.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'x', 'x.value.nested.1.thing', 'x[2].also.nested', null, d => Math.sin(d)
     */
    sortKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ])
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    standalone: true,
    sortKey: "x",
    x: "x",
    y: "y",
    dataComponent: <Curve/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryGroupContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomain.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(LineHelpers.getBaseProps.bind(LineHelpers),
    fallbackProps);
  static getScale = partialRight(LineHelpers.getScale.bind(LineHelpers),
    fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  renderData(props) { // eslint-disable-line max-statements
    const { dataComponent, labelComponent, groupComponent } = props;
    const dataComponents = [];
    const labelComponents = [];
    for (let index = 0, len = this.dataKeys.length; index < len; index++) {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      dataComponents[index] = React.cloneElement(dataComponent, dataProps);

      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
        labelComponents[index] = React.cloneElement(labelComponent, labelProps);
      }
    }
    return labelComponents.length > 0 ?
      React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents) :
      dataComponents;
  }

  renderContainer(props, group) {
    const { containerComponent } = props;
    const parentProps = this.getComponentProps(containerComponent, "parent", "parent");
    return React.cloneElement(containerComponent, parentProps, group);
  }

  renderGroup(children, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      children
    );
  }

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "line");
    const { animate, style, standalone, theme } = props;

    if (animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      // TODO: extract into helper
      const whitelist = [
        "data", "domain", "height", "padding", "samples",
        "style", "width", "x", "y"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    const styleObject = theme && theme.line && theme.line.style ? theme.line.style : {};

    const baseStyles = Helpers.getStyles(style, styleObject, "auto", "100%");
    const group = this.renderGroup(
      this.renderData(props), props, baseStyles.parent
    );

    return standalone ? this.renderContainer(props, group) : group;
  }
}
export default addEvents(VictoryLine);
