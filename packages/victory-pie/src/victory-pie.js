/* eslint no-magic-numbers: ["error", { "ignore": [-1, 0, 1, 2] }]*/
import React from "react";
import PropTypes from "prop-types";
import {
  addEvents,
  Helpers,
  Data,
  LineSegment,
  PolylineSegment,
  PropTypes as CustomPropTypes,
  VictoryContainer,
  VictoryLabel,
  VictoryTheme,
  UserProps,
} from "victory-core";
import Slice from "./slice";
import { isNil } from "lodash";
import { getBaseProps } from "./helper-methods";

const fallbackProps = {
  endAngle: 360,
  height: 400,
  radius: 100,
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
    "#000000",
  ],
  labelPosition: "centroid",
  labelIndicatorType: "single",
  labelIndicatorInnerOffset: 25,
  labelIndicatorOuterOffset: 15,
  labelIndicatorMiddleOffset: 10
};

const datumHasXandY = (datum) => {
  return !isNil(datum._x) && !isNil(datum._y);
};

class VictoryPie extends React.Component {
  static animationWhitelist = [
    "data",
    "endAngle",
    "height",
    "innerRadius",
    "cornerRadius",
    "padAngle",
    "padding",
    "colorScale",
    "startAngle",
    "style",
    "width",
  ];

  static displayName = "VictoryPie";

  static role = "pie";

  static defaultTransitions = {
    onExit: {
      duration: 500,
      before: () => ({ _y: 0, label: " " }),
    },
    onEnter: {
      duration: 500,
      before: () => ({ _y: 0, label: " " }),
      after: (datum) => ({
        y_: datum._y,
        label: datum.label,
      }),
    },
  };

  static propTypes = {
    animate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
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
    cornerRadius: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func,
    ]),
    data: PropTypes.array,
    dataComponent: PropTypes.element,
    disableInlineStyes: PropTypes.bool,
    endAngle: PropTypes.number,
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
          PropTypes.func,
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
    height: CustomPropTypes.nonNegative,
    innerRadius: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func,
    ]),
    labelComponent: PropTypes.element,
    labelIndicator: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.bool
    ]),
    labelIndicatorInnerOffset :PropTypes.number,
    labelIndicatorMiddleOffset :PropTypes.number,
    labelIndicatorOuterOffset :PropTypes.number, 
    labelIndicatorType: PropTypes.oneOf(["single", "multiple"]),
    labelPlacement: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.oneOf(["parallel", "perpendicular", "vertical"]),
    ]),
    labelPosition: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.oneOf(["startAngle", "centroid", "endAngle"]),
    ]),
    labelRadius: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func,
    ]),
    labels: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    name: PropTypes.string,
    origin: PropTypes.shape({
      x: CustomPropTypes.nonNegative,
      y: CustomPropTypes.nonNegative,
    }),
    padAngle: PropTypes.oneOfType([
      CustomPropTypes.nonNegative,
      PropTypes.func,
    ]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
      }),
    ]),
    radius: PropTypes.oneOfType([CustomPropTypes.nonNegative, PropTypes.func]),
    sharedEvents: PropTypes.shape({
      events: PropTypes.array,
      getEventState: PropTypes.func,
    }),
    sortKey: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    sortOrder: PropTypes.oneOf(["ascending", "descending"]),
    standalone: PropTypes.bool,
    startAngle: PropTypes.number,
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object,
    }),
    theme: PropTypes.object,
    width: CustomPropTypes.nonNegative,
    x: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    y: PropTypes.oneOfType([
      PropTypes.func,
      CustomPropTypes.allOfType([
        CustomPropTypes.integer,
        CustomPropTypes.nonNegative,
      ]),
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  };

  static defaultProps = {
    data: [
      { x: "A", y: 1 },
      { x: "B", y: 2 },
      { x: "C", y: 3 },
      { x: "D", y: 1 },
      { x: "E", y: 2 },
    ],
    standalone: true,
    dataComponent: <Slice />,
    labelComponent: <VictoryLabel />,
    containerComponent: <VictoryContainer />,
    groupComponent: <g />,
    sortOrder: "ascending",
    theme: VictoryTheme.grayscale,
  };

  static getBaseProps = (props) => getBaseProps(props, fallbackProps);
  static getData = Data.getData;
  static expectedComponents = [
    "dataComponent",
    "labelComponent",
    "groupComponent",
    "containerComponent",
    "labelIndicatorComponent"
  ];

  // Overridden in victory-native
  shouldAnimate() {
    return Boolean(this.props.animate);
  }

  renderComponents(props, shouldRenderDatum = datumHasXandY){
      const { 
        dataComponent, 
        labelComponent,
        groupComponent,
        labelIndicator,
        labelIndicatorType,
        labelPosition
      } = props;    
      const showIndicator = 
          labelIndicator && 
          labelPosition === "centroid" ;

      let labelIndicatorComponents=null;

      const dataComponents = this.dataKeys.reduce(
        (validDataComponents, _dataKey, index) => {
          const dataProps = this.getComponentProps(
            dataComponent,
            "data",
            index,
          );
          if (shouldRenderDatum(dataProps.datum)) {
            validDataComponents.push(
              React.cloneElement(dataComponent, dataProps),
            );
          }
          return validDataComponents;
        },
        [],
      );

      const labelComponents = this.dataKeys
        .map((_dataKey, index) => {
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

        if(showIndicator){
          let labelIndicatorComponent= <LineSegment />;
          if(labelIndicatorType === "multiple" && labelIndicator === true){
            labelIndicatorComponent= <PolylineSegment/> 
          }
          if( typeof labelIndicator === "object"){
            // pass user provided react component
            labelIndicatorComponent = labelIndicator;
          }

           labelIndicatorComponents =  this.dataKeys
              .map((_dataKey, index) => {
                  const labelIndicatorProps = this.getComponentProps(labelIndicatorComponent, 
                    "labelIndicators",
                    index);
                  return React.cloneElement(labelIndicatorComponent, labelIndicatorProps);
              })
        }
        const children = showIndicator ? [
          ...dataComponents,
          ...labelComponents,
          ...labelIndicatorComponents,
        ]:[
          ...dataComponents,
          ...labelComponents]
        return this.renderContainer(groupComponent, children);
        
  }
  

  render() {
    const { animationWhitelist, role } = VictoryPie;
    const props = Helpers.modifyProps(this.props, fallbackProps, role);

    if (this.shouldAnimate()) {
      return this.animateComponent(props, animationWhitelist);
    }

    const children = this.renderComponents(props);

    const component = props.standalone
      ? this.renderContainer(props.containerComponent, children)
      : children;

    return UserProps.withSafeUserProps(component, props);
  }
}

export default addEvents(VictoryPie);
