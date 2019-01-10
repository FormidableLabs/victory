import { assign, defaults, isEmpty } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { Helpers, VictoryContainer, VictoryTheme, CommonProps, Wrapper } from "victory-core";
import { VictorySharedEvents } from "victory-shared-events";
import { getChildren, getCalculatedProps } from "./helper-methods";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50,
  offset: 0
};

export default class VictoryGroup extends React.Component {
  static displayName = "VictoryGroup";

  static role = "group";

  static propTypes = {
    ...CommonProps.baseProps,
    ...CommonProps.dataProps,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
    horizontal: PropTypes.bool,
    offset: PropTypes.number
  };

  static defaultProps = {
    containerComponent: <VictoryContainer />,
    groupComponent: <g />,
    samples: 50,
    scale: "linear",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
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
