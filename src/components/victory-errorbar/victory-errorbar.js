import PropTypes from "prop-types";
import React from "react";
import {
  PropTypes as CustomPropTypes, Helpers, VictoryTransition, VictoryLabel, addEvents,
  VictoryContainer, VictoryTheme, DefaultTransitions, ErrorBar, Data
} from "victory-core";
import { partialRight } from "lodash";
import ErrorBarHelpers from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  { x: 1, y: 1, errorX: 0.1, errorY: 0.1 },
  { x: 2, y: 2, errorX: 0.2, errorY: 0.2 },
  { x: 3, y: 3, errorX: 0.3, errorY: 0.3 },
  { x: 4, y: 4, errorX: 0.4, errorY: 0.4 }
];

const animationWhitelist = [
  "data", "domain", "height", "padding", "samples",
  "style", "width", "errorX", "errorY", "borderWidth"
];

class VictoryErrorBar extends React.Component {
  static displayName = "VictoryErrorBar";
  static role = "errorBar";
  static defaultTransitions = DefaultTransitions.discreteTransitions();

  static propTypes = {
    animate: PropTypes.object,
    borderWidth: PropTypes.number,
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string), y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    containerComponent: PropTypes.element,
    data: PropTypes.array,
    dataComponent: PropTypes.element,
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
    ]),
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ]),
        y: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ])
      }),
      PropTypes.number
    ]),
    errorX: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    errorY: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),
    groupComponent: PropTypes.element,
    height: CustomPropTypes.nonNegative,
    horizontal: PropTypes.bool,
    labelComponent: PropTypes.element,
    labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    name: PropTypes.string,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number, bottom: PropTypes.number,
        left: PropTypes.number, right: PropTypes.number
      })
    ]),
    samples: CustomPropTypes.nonNegative,
    scale: PropTypes.oneOfType([
      CustomPropTypes.scale,
      PropTypes.shape({ x: CustomPropTypes.scale, y: CustomPropTypes.scale })
    ]),
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func
    }),
    sortKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      parent: PropTypes.object, data: PropTypes.object, labels: PropTypes.object
    }),
    theme: PropTypes.object,
    width: CustomPropTypes.nonNegative,
    x: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    y: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.func)
    ])
  };

  static defaultProps = {
    data: defaultData,
    scale: "linear",
    standalone: true,
    dataComponent: <ErrorBar/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g role="presentation"/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = ErrorBarHelpers.getDomain.bind(ErrorBarHelpers);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(
    ErrorBarHelpers.getBaseProps.bind(ErrorBarHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  renderData(props) {
    const { dataComponent, labelComponent, groupComponent } = props;

    const dataComponents = this.dataKeys.map((_dataKey, index) => {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      return React.cloneElement(dataComponent, dataProps);
    });

    const labelComponents = this.dataKeys.map((_dataKey, index) => {
      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      if (labelProps.text !== undefined && labelProps.text !== null) {
        return React.cloneElement(labelComponent, labelProps);
      }
      return undefined;
    }).filter(Boolean);

    const children = [...dataComponents, ...labelComponents];
    return this.renderContainer(groupComponent, children);
  }

  shouldAnimate() {
    return !!this.props.animate;
  }

  renderContainer(component, children) {
    const isContainer = component.type && component.type.role === "container";
    const parentProps = isContainer ? this.getComponentProps(component, "parent", "parent") : {};
    return React.cloneElement(component, parentProps, children);
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    if (this.shouldAnimate()) {
      return (
        <VictoryTransition animate={props.animate} animationWhitelist={animationWhitelist}>
          {React.createElement(this.constructor, props)}
        </VictoryTransition>
      );
    }
    const children = this.renderData(props);
    return this.renderContainer(props.containerComponent, children);
  }
}

export default addEvents(VictoryErrorBar);
