import { defaults, assign, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  Helpers,
  VictoryContainer,
  VictoryTheme,
  CommonProps,
  PropTypes as CustomPropTypes,
  Wrapper
} from "victory-core";
import { VictorySharedEvents } from "victory-shared-events";
import { VictoryAxis } from "victory-axis";
import { VictoryPolarAxis } from "victory-polar-axis";
import { getChildComponents, getCalculatedProps, getChildren } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

export default class VictoryChart extends React.Component {
  static displayName = "VictoryChart";

  static propTypes = {
    ...CommonProps.baseProps,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    defaultAxes: PropTypes.shape({
      independent: PropTypes.element,
      dependent: PropTypes.element
    }),
    defaultPolarAxes: PropTypes.shape({
      independent: PropTypes.element,
      dependent: PropTypes.element
    }),
    endAngle: PropTypes.number,
    innerRadius: CustomPropTypes.nonNegative,
    startAngle: PropTypes.number
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    defaultAxes: {
      independent: <VictoryAxis />,
      dependent: <VictoryAxis dependentAxis />
    },
    defaultPolarAxes: {
      independent: <VictoryPolarAxis />,
      dependent: <VictoryPolarAxis dependentAxis />
    },
    groupComponent: <g />,
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static expectedComponents = ["groupComponent", "containerComponent"];

  constructor(props) {
    super(props);
    this.state = {};
    if (props.animate) {
      this.state = {
        nodesShouldLoad: false,
        nodesDoneLoad: false,
        animating: true
      };
    }
    this.setAnimationState = Wrapper.setAnimationState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animate) {
      this.setAnimationState(this.props, nextProps);
    }
    this.events = Wrapper.getAllEvents(nextProps);
  }

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const children = getChildren(props, childComponents, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    return children.map((child, index) => {
      const childProps = assign({ animate: getAnimationProps(props, child, index) }, child.props);
      return React.cloneElement(child, childProps);
    });
  }

  renderContainer(containerComponent, props) {
    const containerProps = defaults({}, containerComponent.props, props);
    return React.cloneElement(containerComponent, containerProps);
  }

  getContainerProps(props, calculatedProps) {
    const { width, height, standalone, theme, polar, name } = props;
    const { domain, scale, style, origin, radius, horizontal } = calculatedProps;
    return {
      domain,
      scale,
      width,
      height,
      standalone,
      theme,
      style: style.parent,
      horizontal,
      name,
      polar,
      radius,
      origin: polar ? origin : undefined
    };
  }

  render() {
    const props =
      this.state && this.state.nodesWillExit ? this.state.oldProps || this.props : this.props;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, "chart");
    const {
      eventKey,
      containerComponent,
      groupComponent,
      standalone,
      externalEventMutations
    } = modifiedProps;
    const axes = props.polar ? modifiedProps.defaultPolarAxes : modifiedProps.defaultAxes;
    const childComponents = getChildComponents(modifiedProps, axes);
    const calculatedProps = getCalculatedProps(modifiedProps, childComponents);
    const newChildren = this.getNewChildren(modifiedProps, childComponents, calculatedProps);
    const containerProps = standalone ? this.getContainerProps(modifiedProps, calculatedProps) : {};
    const container = standalone
      ? this.renderContainer(containerComponent, containerProps)
      : groupComponent;
    this.events = this.events || Wrapper.getAllEvents(props);
    if (!isEmpty(this.events)) {
      return (
        <VictorySharedEvents
          container={container}
          eventKey={eventKey}
          events={this.events}
          externalEventMutations={externalEventMutations}
        >
          {newChildren}
        </VictorySharedEvents>
      );
    }
    return React.cloneElement(container, container.props, newChildren);
  }
}
