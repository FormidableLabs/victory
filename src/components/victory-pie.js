import React, { PropTypes } from "react";
import { partialRight, assign } from "lodash";
import {
  addEvents,
  Helpers,
  Data,
  PropTypes as CustomPropTypes,
  Slice,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  VictoryTransition
} from "victory-core";
import PieHelpers from "./helper-methods";

const fallbackProps = {
  endAngle: 360,
  height: 400,
  innerRadius: 0,
  cornerRadius: 0,
  padAngle: 0,
  padding: 30,
  width: 400,
  startAngle: 0,
  colorScale: [
    "#ffffff",
    "#f0f0f0",
    "#d9d9d9",
    "#bdbdbd",
    "#969696",
    "#737373",
    "#525252",
    "#252525",
    "#000000"
  ]
};

const animationWhitelist = [
  "data", "endAngle", "height", "innerRadius", "cornerRadius", "padAngle", "padding",
  "colorScale", "startAngle", "style", "width"
];

class VictoryPie extends React.Component {
  static displayName = "VictoryPie";

  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: () => ({ _y: 0, label: " " })
    },
    onEnter: {
      duration: 500,
      before: () => ({ _y: 0, label: " " }),
      after: (datum) => ({ y_: datum._y, label: datum.label })
    }
  };

  static propTypes = {
    animate: PropTypes.object,
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    containerComponent: PropTypes.element,
    cornerRadius: CustomPropTypes.nonNegative,
    data: PropTypes.array,
    dataComponent: PropTypes.element,
    endAngle: PropTypes.number,
    events: PropTypes.arrayOf(PropTypes.shape({
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.func,
        CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
        PropTypes.string
      ]),
      eventHandlers: PropTypes.object
    })),

    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([CustomPropTypes.integer, CustomPropTypes.nonNegative]),
      PropTypes.string
    ]),
    groupComponent: PropTypes.element,
    height: CustomPropTypes.nonNegative,
    innerRadius: CustomPropTypes.nonNegative,
    labelComponent: PropTypes.element,
    labelRadius: PropTypes.oneOfType([ CustomPropTypes.nonNegative, PropTypes.func ]),
    labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    name: PropTypes.string,
    padAngle: CustomPropTypes.nonNegative,
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number, bottom: PropTypes.number,
        left: PropTypes.number, right: PropTypes.number
      })
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
    startAngle: PropTypes.number,
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
      PropTypes.arrayOf(PropTypes.string)
    ])
  };

  static defaultProps = {
    data: [
      { x: "A", y: 1 },
      { x: "B", y: 2 },
      { x: "C", y: 3 },
      { x: "D", y: 1 },
      { x: "E", y: 2 }
    ],
    standalone: true,
    x: "x",
    y: "y",
    dataComponent: <Slice/>,
    labelComponent: <VictoryLabel/>,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    theme: VictoryTheme.grayscale
  };

  static getBaseProps = partialRight(PieHelpers.getBaseProps.bind(PieHelpers), fallbackProps);
  static getData = Data.getData.bind(Data);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];

  renderData(props) {
    const { dataComponent, labelComponent } = props;
    const dataComponents = [];
    const labelComponents = [];
    for (let index = 0, len = this.dataKeys.length; index < len; index++) {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      dataComponents[index] = React.cloneElement(dataComponent, dataProps);

      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
        labelComponents[index] = React.cloneElement(
          labelComponent, assign({}, labelProps, {renderInPortal: false})
          );
      }
    }
    const children = [...dataComponents, ...labelComponents];
    return this.renderGroup(props, children);
  }

  // Overridden in victory-native
  renderGroup(props, children) {
    const offset = this.getOffset(props);
    const transform = `translate(${offset.x}, ${offset.y})`;
    const groupComponent = React.cloneElement(props.groupComponent, {transform});
    return this.renderContainer(groupComponent, children);
  }

  getOffset(props) {
    const { width, height } = props;
    const calculatedProps = PieHelpers.getCalculatedValues(props);
    const { padding, radius } = calculatedProps;
    const offsetWidth = width / 2 + padding.left - padding.right;
    const offsetHeight = height / 2 + padding.top - padding.bottom;
    return {
      x: offsetWidth + radius > width ? radius + padding.left - padding.right : offsetWidth,
      y: offsetHeight + radius > height ? radius + padding.top - padding.bottom : offsetHeight
    };
  }

  renderContainer(component, children) {
    const isContainer = component.type && component.type.role === "container";
    const parentProps = isContainer ? this.getComponentProps(component, "parent", "parent") : {};
    return React.cloneElement(component, parentProps, children);
  }

  shouldAnimate() {
    return Boolean(this.props.animate);
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    if (this.shouldAnimate()) {
      return (
        <VictoryTransition animate={props.animate} animationWhitelist={animationWhitelist}>
          { React.createElement(this.constructor, props) }
        </VictoryTransition>
      );
    }

    const children = this.renderData(props);
    return this.renderContainer(props.containerComponent, children);
  }
}

export default addEvents(VictoryPie);
