import React, { PropTypes } from "react";
import addEvents from "../victory-base/add-events";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel,
  VictoryContainer, VictoryTheme, DefaultTransitions, ErrorBar, VictoryGroupContainer
} from "victory-core";
import { assign, defaults, isFunction, partialRight } from "lodash";
import Data from "../../helpers/data";
import ErrorBarHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  {x: 1, y: 1, errorX: 0.1, errorY: 0.1},
  {x: 2, y: 2, errorX: 0.2, errorY: 0.2},
  {x: 3, y: 3, errorX: 0.3, errorY: 0.3},
  {x: 4, y: 4, errorX: 0.4, errorY: 0.4}
];

class VictoryErrorBar extends React.Component {
  static displayName = "VictoryErrorBar";
  static role = "errorBar";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    ...commonProps,
    ...cartesianProps,
    /**
     * The errorX prop specifies how to access the errorX value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'errorX', 'errorX.value.nested.1.thing', 'errorX[2].also.nested', null,
     * d => Math.sin(d)
     */
    errorX: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The errorY prop specifies how to access the errorY value of each data point.
     * If given as a function, it will be run on each data point, and returned value will be used.
     * If given as an integer, it will be used as an array index for array-type data points.
     * If given as a string, it will be used as a property key for object-type data points.
     * If given as an array of strings, or a string containing dots or brackets,
     * it will be used as a nested object property path (for details see Lodash docs for _.get).
     * If `null` or `undefined`, the data value will be used as is (identity function/pass-through).
     * @examples 0, 'errorY', 'errorY.value.nested.1.thing', 'errorY[2].also.nested', null,
     * d => Math.sin(d)
     */
    errorY: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    /**
     * The borderWidth prop sets the border width of the error bars. `borderWidth` will set
     * both x, y error bar width.
     * @type {number}
     */
    borderWidth: PropTypes.number
  };

  static defaultProps = {
    data: defaultData,
    scale: "linear",
    standalone: true,
    x: "x",
    y: "y",
    errorX: "errorX",
    errorY: "errorY",
    dataComponent: <ErrorBar/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <VictoryGroupContainer/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = ErrorBarHelpers.getDomain.bind(ErrorBarHelpers);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(
    ErrorBarHelpers.getBaseProps.bind(ErrorBarHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

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

  renderData(props) {
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

  render() {
    const props = Helpers.modifyProps(this.props, fallbackProps, "errorbar");
    const { animate, style, standalone, theme } = props;
    if (animate) {
      // Do less work by having `VictoryAnimation` tween only values that
      // make sense to tween. In the future, allow customization of animated
      // prop whitelist/blacklist?
      const whitelist = [
        "data", "domain", "height", "padding", "samples",
        "style", "width", "x", "y", "errorX", "errorY", "borderWidth"
      ];
      return (
        <VictoryTransition animate={animate} animationWhitelist={whitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }

    const styleObject = theme && theme.errorbar && theme.errorbar.style ?
      theme.errorbar.style : {};

    const baseStyle = Helpers.getStyles(style, styleObject, "auto", "100%");

    const group = this.renderGroup(this.renderData(props), baseStyle.parent);
    return standalone ? this.renderContainer(props, group) : group;
  }
}

export default addEvents(VictoryErrorBar);
