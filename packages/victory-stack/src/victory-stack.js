import { assign, defaults, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { Helpers, VictoryContainer, VictoryTheme, CommonProps, Wrapper } from "victory-core";
import { VictorySharedEvents } from "victory-shared-events";
import { getChildren, getCalculatedProps } from "./helper-methods";
import isEqual from "react-fast-compare";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

export default class VictoryStack extends React.Component {
  static displayName = "VictoryStack";

  static role = "stack";

  static propTypes = {
    ...CommonProps.baseProps,
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string),
        y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
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
        "blue"
      ])
    ]),
    fillInMissingData: PropTypes.bool,
    horizontal: PropTypes.bool,
    labelComponent: PropTypes.element,
    labels: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    style: PropTypes.shape({
      parent: PropTypes.object,
      data: PropTypes.object,
      labels: PropTypes.object
    }),
    xOffset: PropTypes.number
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    groupComponent: <g />,
    standalone: true,
    theme: VictoryTheme.grayscale,
    fillInMissingData: true
  };

  static expectedComponents = ["groupComponent", "containerComponent", "labelComponent"];

  static getChildren = getChildren;

  constructor(props) {
    super(props);
    if (props.animate) {
      this.state = {
        nodesShouldLoad: false,
        nodesDoneLoad: false,
        animating: true
      };
      this.setAnimationState = Wrapper.setAnimationState.bind(this);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.animate) {
      if (!isEqual(this.props, nextProps)) {
        this.setAnimationState(this.props, nextProps);
        return false;
      }
    }
    return true;
  }

  getNewChildren(props, childComponents, calculatedProps) {
    const children = getChildren(props, childComponents, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    const newChildren = children.map((child, index) => {
      const childProps = assign({ animate: getAnimationProps(props, child, index) }, child.props);
      return React.cloneElement(child, childProps);
    });
    /*
      reverse render order for children of `VictoryStack` so that higher children in the stack
      are rendered behind lower children. This looks nicer for stacked bars with cornerRadius, and
      areas with strokes
    */
    return newChildren.reverse();
  }

  renderContainer(containerComponent, props) {
    const containerProps = defaults({}, containerComponent.props, props);
    return React.cloneElement(containerComponent, containerProps);
  }

  getContainerProps(props, calculatedProps) {
    const { width, height, standalone, theme, polar, horizontal, name } = props;
    const { domain, scale, style, origin } = calculatedProps;
    return {
      domain,
      scale,
      width,
      height,
      standalone,
      theme,
      style: style.parent,
      horizontal,
      polar,
      origin,
      name
    };
  }

  render() {
    const { role } = this.constructor;
    const props =
      this.state && this.state.nodesWillExit ? this.state.oldProps || this.props : this.props;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, role);
    const {
      eventKey,
      containerComponent,
      standalone,
      groupComponent,
      externalEventMutations
    } = modifiedProps;
    const childComponents = React.Children.toArray(modifiedProps.children);
    const calculatedProps = getCalculatedProps(modifiedProps, childComponents);
    const newChildren = this.getNewChildren(modifiedProps, childComponents, calculatedProps);
    const containerProps = standalone ? this.getContainerProps(modifiedProps, calculatedProps) : {};
    const container = standalone
      ? this.renderContainer(containerComponent, containerProps)
      : groupComponent;
    const events = Wrapper.getAllEvents(props);
    if (!isEmpty(events)) {
      return (
        <VictorySharedEvents
          container={container}
          eventKey={eventKey}
          events={events}
          externalEventMutations={externalEventMutations}
        >
          {newChildren}
        </VictorySharedEvents>
      );
    }

    return React.cloneElement(container, container.props, newChildren);
  }
}
