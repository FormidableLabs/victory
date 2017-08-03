import { defaults } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  Helpers, VictorySharedEvents, VictoryContainer, VictoryTheme, Scale, PropTypes as CustomPropTypes
} from "victory-core";
import VictoryAxis from "../victory-axis/victory-axis";
import VictoryPolarAxis from "../victory-polar-axis/victory-polar-axis";
import ChartHelpers from "./helper-methods";
import Axis from "../../helpers/axis";
import Wrapper from "../../helpers/wrapper";
import { BaseProps } from "../../helpers/common-props";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

export default class VictoryChart extends React.Component {
  static displayName = "VictoryChart";

  static propTypes = {
    ...BaseProps,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
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
    containerComponent: <VictoryContainer/>,
    defaultAxes: {
      independent: <VictoryAxis/>,
      dependent: <VictoryAxis dependentAxis/>
    },
    defaultPolarAxes: {
      independent: <VictoryPolarAxis/>,
      dependent: <VictoryPolarAxis dependentAxis/>
    },
    groupComponent: <g/>,
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static expectedComponents = [
    "groupComponent", "containerComponent"
  ];

  constructor(props) {
    super(props);
    this.state = {};
    if (props.animate) {
      this.state = {
        nodesShouldLoad: false,
        nodesDoneLoad: false,
        animating: true
      };
      this.setAnimationState = Wrapper.setAnimationState.bind(this);
    }
    this.events = Wrapper.getAllEvents(props);
  }

  componentWillMount() {
    this.events = Wrapper.getAllEvents(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animate) {
      this.setAnimationState(this.props, nextProps);
    }
    this.events = Wrapper.getAllEvents(nextProps);
  }

  getStyles(props) {
    const styleProps = props.style && props.style.parent;
    return {
      parent: defaults(
        {},
        styleProps,
        {
          height: "100%",
          width: "100%",
          userSelect: "none"
        }
    ) };
  }

  getAxisProps(child, props, calculatedProps) {
    const { domain, scale, originSign, stringMap } = calculatedProps;
    const axis = child.type.getAxis(child.props);
    const axisOffset = ChartHelpers.getAxisOffset(props, calculatedProps);
    const tickValues = ChartHelpers.getTicks(calculatedProps, axis, child);
    const tickFormat = child.props.tickFormat ?
      Axis.getTickFormat(child.props, scale, stringMap) :
      ChartHelpers.getTickFormat(child, axis, calculatedProps);
    const offsetY = axis === "y" ? undefined : axisOffset.y;
    const offsetX = axis === "x" ? undefined : axisOffset.x;
    const crossAxis = child.props.crossAxis === false ? false : true;
    const orientation = Axis.getOrientation(child, axis, originSign[axis]);
    return {
      startAngle: props.startAngle,
      endAngle: props.endAngle,
      innerRadius: props.innerRadius,
      domain,
      scale,
      tickValues,
      tickFormat,
      offsetY: child.props.offsetY !== undefined ? child.props.offsetY : offsetY,
      offsetX: child.props.offsetX !== undefined ? child.props.offsetX : offsetX,
      crossAxis,
      orientation
    };
  }

  getChildProps(child, props, calculatedProps) {
    const axisChild = Axis.findAxisComponents([child]);
    if (axisChild.length > 0) {
      return this.getAxisProps(axisChild[0], props, calculatedProps);
    }
    const { categories, domain, range, scale } = calculatedProps;
    return { categories, domain, range, scale };
  }

  getCalculatedProps(props, childComponents) {
    const style = this.getStyles(props);
    const horizontal = childComponents.some((component) => {
      return component.props && component.props.horizontal;
    });
    const axisComponents = {
      x: Axis.getAxisComponent(childComponents, "x"),
      y: Axis.getAxisComponent(childComponents, "y")
    };
    const domain = {
      x: ChartHelpers.getDomain(props, "x", childComponents),
      y: ChartHelpers.getDomain(props, "y", childComponents)
    };
    const range = {
      x: props.polar ? Helpers.getPolarRange(props, "x") : Helpers.getRange(props, "x"),
      y: props.polar ? Helpers.getPolarRange(props, "y") : Helpers.getRange(props, "y")
    };
    const baseScale = {
      x: Scale.getScaleFromProps(props, "x") ||
        axisComponents.x && axisComponents.x.type.getScale(axisComponents.x.props) ||
        Scale.getDefaultScale(),
      y: Scale.getScaleFromProps(props, "y") ||
        axisComponents.y && axisComponents.y.type.getScale(axisComponents.y.props) ||
        Scale.getDefaultScale()
    };
    const scale = {
      x: baseScale.x.domain(domain.x).range(range.x),
      y: baseScale.y.domain(domain.y).range(range.y)
    };

    const origin = props.polar ? Helpers.getPolarOrigin(props) : Axis.getOrigin(domain);

    const originSign = {
      x: Axis.getOriginSign(origin.x, domain.x),
      y: Axis.getOriginSign(origin.y, domain.y)
    };

    // TODO: check
    const categories = {
      x: Wrapper.getCategories(props, "x", childComponents),
      y: Wrapper.getCategories(props, "y", childComponents)
    };

    const stringMap = {
      x: ChartHelpers.createStringMap(props, "x", childComponents),
      y: ChartHelpers.createStringMap(props, "y", childComponents)
    };

    const defaultDomainPadding = ChartHelpers.getDefaultDomainPadding(childComponents, horizontal);

    return {
      axisComponents, categories, domain, range, horizontal, scale, stringMap,
      style, origin, originSign, defaultDomainPadding
    };
  }

  getNewChildren(props, childComponents, calculatedProps) {
    const baseStyle = calculatedProps.style.parent;
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    const { height, polar, theme, width } = props;
    const { origin } = calculatedProps;
    return childComponents.map((child, index) => {
      const style = Array.isArray(child.props.style) ?
        child.props.style :
        defaults({}, child.props.style, { parent: baseStyle });
      const childProps = this.getChildProps(child, props, calculatedProps);
      const newProps = defaults({
        height, polar, theme, width, style,
        origin: polar ? origin : undefined,
        animate: getAnimationProps(props, child, index),
        padding: Helpers.getPadding(props),
        key: index,
        standalone: false
      }, childProps);

      return React.cloneElement(child, newProps);
    });
  }

  renderContainer(containerComponent, props) {
    const containerProps = defaults({}, containerComponent.props, props);
    return React.cloneElement(containerComponent, containerProps);
  }

  getContainerProps(props, calculatedProps) {
    const { width, height, standalone, theme, polar } = props;
    const { domain, scale, style, origin, radius } = calculatedProps;
    return {
      domain, scale, width, height, standalone, theme, style: style.parent, polar, radius,
      origin: polar ? origin : undefined
    };
  }

  render() {
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps || this.props : this.props;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, "chart");
    const { eventKey, containerComponent } = modifiedProps;
    const axes = props.polar ? modifiedProps.defaultPolarAxes : modifiedProps.defaultAxes;
    const childComponents = ChartHelpers.getChildComponents(modifiedProps, axes);
    const calculatedProps = this.getCalculatedProps(modifiedProps, childComponents);
    const newChildren = this.getNewChildren(modifiedProps, childComponents, calculatedProps);
    const containerProps = this.getContainerProps(modifiedProps, calculatedProps);
    const container = this.renderContainer(containerComponent, containerProps);
    if (this.events) {
      return (
        <VictorySharedEvents events={this.events} eventKey={eventKey} container={container}>
          {newChildren}
        </VictorySharedEvents>
      );
    }
    return React.cloneElement(container, container.props, newChildren);
  }
}
