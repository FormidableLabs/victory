import React from "react";
import PropTypes from "prop-types";
import { getBaseProps, getDimensions } from "./helper-methods";
import {
  PropTypes as CustomPropTypes,
  addEvents,
  Helpers,
  VictoryLabel,
  VictoryContainer,
  VictoryTheme,
  Point,
  Border,
} from "victory-core";

const fallbackProps = {
  orientation: "vertical",
  titleOrientation: "top",
  width: 450,
  height: 300,
  x: 0,
  y: 0,
};

const defaultLegendData = [{ name: "Series 1" }, { name: "Series 2" }];

class VictoryLegend extends React.Component {
  static displayName = "VictoryLegend";

  static role = "legend";

  static propTypes = {
    borderComponent: PropTypes.element,
    borderPadding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
      }),
    ]),
    centerTitle: PropTypes.bool,
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "grayscale",
        "qualitative",
        "heatmap",
        "warm",
        "cool",
        "red",
        "green",
        "blue",
      ]),
    ]),
    containerComponent: PropTypes.element,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.object,
        symbol: PropTypes.object,
      }),
    ),
    dataComponent: PropTypes.element,
    eventKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
    ]),
    events: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.oneOf(["data", "labels", "parent"]),
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          CustomPropTypes.allOfType([
            CustomPropTypes.integer,
            CustomPropTypes.nonNegative,
          ]),
          PropTypes.string,
        ]),
        eventHandlers: PropTypes.object,
      }),
    ),
    externalEventMutations: PropTypes.arrayOf(
      PropTypes.shape({
        callback: PropTypes.func,
        childName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        eventKey: PropTypes.oneOfType([
          PropTypes.array,
          CustomPropTypes.allOfType([
            CustomPropTypes.integer,
            CustomPropTypes.nonNegative,
          ]),
          PropTypes.string,
        ]),
        mutation: PropTypes.func,
        target: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      }),
    ),
    groupComponent: PropTypes.element,
    gutter: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
      }),
    ]),
    height: CustomPropTypes.nonNegative,
    itemsPerRow: CustomPropTypes.nonNegative,
    labelComponent: PropTypes.element,
    name: PropTypes.string,
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
      }),
    ]),
    rowGutter: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
      }),
    ]),
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func,
    }),
    standalone: PropTypes.bool,
    style: PropTypes.shape({
      border: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object,
      parent: PropTypes.object,
      title: PropTypes.object,
    }),
    symbolSpacer: PropTypes.number,
    theme: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    titleComponent: PropTypes.element,
    titleOrientation: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    width: CustomPropTypes.nonNegative,
    x: CustomPropTypes.nonNegative,
    y: CustomPropTypes.nonNegative,
  };

  static defaultProps = {
    borderComponent: <Border />,
    data: defaultLegendData,
    containerComponent: <VictoryContainer />,
    dataComponent: <Point />,
    groupComponent: <g />,
    labelComponent: <VictoryLabel />,
    standalone: true,
    theme: VictoryTheme.grayscale,
    titleComponent: <VictoryLabel />,
  };

  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static getDimensions = (props) => getDimensions(props, fallbackProps);
  static expectedComponents = [
    "borderComponent",
    "containerComponent",
    "dataComponent",
    "groupComponent",
    "labelComponent",
    "titleComponent",
  ];

  renderChildren(props) {
    const { dataComponent, labelComponent, title } = props;
    const dataComponents = this.dataKeys
      .map((_dataKey, index) => {
        if (_dataKey === "all") {
          return undefined;
        }
        const dataProps = this.getComponentProps(dataComponent, "data", index);
        return React.cloneElement(dataComponent, dataProps);
      })
      .filter(Boolean);

    const labelComponents = this.dataKeys
      .map((_dataKey, index) => {
        if (_dataKey === "all") {
          return undefined;
        }
        const labelProps = this.getComponentProps(
          labelComponent,
          "labels",
          index,
        );
        if (labelProps.text !== undefined && labelProps.text !== null) {
          return React.cloneElement(labelComponent, labelProps);
        }
        return undefined;
      })
      .filter(Boolean);
    const borderProps = this.getComponentProps(
      props.borderComponent,
      "border",
      "all",
    );
    const borderComponent = React.cloneElement(
      props.borderComponent,
      borderProps,
    );
    if (title) {
      const titleProps = this.getComponentProps(props.title, "title", "all");
      const titleComponent = React.cloneElement(
        props.titleComponent,
        titleProps,
      );
      return [
        borderComponent,
        ...dataComponents,
        titleComponent,
        ...labelComponents,
      ];
    }
    return [borderComponent, ...dataComponents, ...labelComponents];
  }

  render() {
    const { role } = this.constructor;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);
    const children = [this.renderChildren(props)];
    return props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : React.cloneElement(props.groupComponent, {}, children);
  }
}

export default addEvents(VictoryLegend);
