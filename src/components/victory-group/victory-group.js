import { assign, defaults } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { PropTypes as CustomPropTypes, Helpers, VictorySharedEvents,
  VictoryContainer, VictoryTheme, Scale, Data
} from "victory-core";
import Wrapper from "../../helpers/wrapper";

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
    animate: PropTypes.object,
    categories: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.shape({
        x: PropTypes.arrayOf(PropTypes.string), y: PropTypes.arrayOf(PropTypes.string)
      })
    ]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node), PropTypes.node
    ]),
    color: PropTypes.string,
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    containerComponent: PropTypes.element,
    data: PropTypes.array,
    domainPadding: PropTypes.oneOfType([
      PropTypes.shape({
        x: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ]),
        y: PropTypes.oneOfType([ PropTypes.number, CustomPropTypes.domain ])
      }),
      PropTypes.number
    ]),
    dataComponent: PropTypes.element,
    domain: PropTypes.oneOfType([
      CustomPropTypes.domain,
      PropTypes.shape({ x: CustomPropTypes.domain, y: CustomPropTypes.domain })
    ]),
    events: PropTypes.arrayOf(PropTypes.shape({
      childName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
      ]),
      target: PropTypes.oneOf(["data", "labels", "parent"]),
      eventKey: PropTypes.oneOfType([
        PropTypes.array,
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
    horizontal: PropTypes.bool,
    labels: PropTypes.oneOfType([ PropTypes.func, PropTypes.array ]),
    labelComponent: PropTypes.element,
    name: PropTypes.string,
    offset: PropTypes.number,
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
      PropTypes.arrayOf(PropTypes.string)
    ]),
    modifyChildren: PropTypes.func
  };

  static defaultProps = {
    samples: 50,
    scale: "linear",
    standalone: true,
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Wrapper.getDomain.bind(Wrapper);
  static getData = Wrapper.getData.bind(Wrapper);

  constructor(props) {
    super(props);
    if (props.animate) {
      this.state = {
        nodesShouldLoad: false,
        nodesDoneLoad: false,
        animating: true
      };
      this.setAnimationState = Wrapper.setAnimationState.bind(this);
      this.events = Wrapper.getAllEvents(props);
    }
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

  getCalculatedProps(props, childComponents) {
    const { role } = this.constructor;
    const style = this.getStyle(props.theme, props.style, role);
    const modifiedProps = Helpers.modifyProps(props, fallbackProps);
    const horizontal = modifiedProps.horizontal || childComponents.every(
      (component) => component.props && component.props.horizontal
    );
    const datasets = Wrapper.getDataFromChildren(modifiedProps);
    const domain = {
      x: Wrapper.getDomain(modifiedProps, "x", childComponents),
      y: Wrapper.getDomain(modifiedProps, "y", childComponents)
    };
    const range = {
      x: Helpers.getRange(modifiedProps, "x"),
      y: Helpers.getRange(modifiedProps, "y")
    };
    const baseScale = {
      x: Scale.getScaleFromProps(modifiedProps, "x") || Scale.getDefaultScale(),
      y: Scale.getScaleFromProps(modifiedProps, "y") || Scale.getDefaultScale()
    };
    const xScale = baseScale.x.domain(domain.x).range(range.x);
    const yScale = baseScale.y.domain(domain.y).range(range.y);
    const scale = {
      x: horizontal ? yScale : xScale,
      y: horizontal ? xScale : yScale
    };
    const categories = {
      x: Wrapper.getCategories(modifiedProps, "x"),
      y: Wrapper.getCategories(modifiedProps, "y")
    };
    const colorScale = modifiedProps.colorScale;
    const color = modifiedProps.color;
    return {datasets, categories, range, domain, horizontal, scale, style, colorScale, color};
  }

  pixelsToValue(props, axis, calculatedProps) {
    if (props.offset === 0) {
      return 0;
    }
    const childComponents = React.Children.toArray(props.children);
    const horizontalChildren = childComponents.some((child) => child.props.horizontal);
    const horizontal = props && props.horizontal || horizontalChildren.length > 0;
    const currentAxis = Helpers.getCurrentAxis(axis, horizontal);
    const domain = calculatedProps.domain[currentAxis];
    const range = calculatedProps.range[currentAxis];
    const domainExtent = Math.max(...domain) - Math.min(...domain);
    const rangeExtent = Math.max(...range) - Math.min(...range);
    return domainExtent / rangeExtent * props.offset;
  }

  getXO(props, calculatedProps, index) {
    const center = (calculatedProps.datasets.length - 1) / 2;
    const totalWidth = this.pixelsToValue(props, "x", calculatedProps);
    return (index - center) * totalWidth;
  }

  getLabels(props, datasets, index) {
    if (!props.labels) {
      return undefined;
    }
    return Math.floor(datasets.length / 2) === index ? props.labels : undefined;
  }

  getChildProps(props, calculatedProps) {
    const { categories, domain, scale, horizontal } = calculatedProps;
    return {
      height: props.height,
      width: props.width,
      padding: Helpers.getPadding(props),
      standalone: false,
      theme: props.theme,
      categories,
      domain,
      scale,
      horizontal
    };
  }

  getColorScale(props, child) {
    const role = child.type && child.type.role;
    const colorScaleOptions = child.props.colorScale || props.colorScale;
    if (role !== "group" && role !== "stack") {
      return undefined;
    }
    return props.theme && props.theme.group ? colorScaleOptions || props.theme.group.colorScale
    : colorScaleOptions;
  }

  getDataWithOffset(props, defaultDataset, offset) {
    const dataset = props.data || props.y ? Data.getData(props) : defaultDataset;
    const xOffset = offset || 0;
    return dataset.map((datum) => {
      const _x1 = datum._x instanceof Date ? new Date(datum._x + xOffset) : datum._x + xOffset;
      return assign({}, datum, {_x1});
    });
  }

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const { datasets, horizontal, domain } = calculatedProps;
    const { theme, labelComponent } = props;
    const childProps = this.getChildProps(props, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);

    return childComponents.map((child, index) => {
      const role = child.type && child.type.role;
      const xOffset = this.getXO(props, calculatedProps, index);
      const style = role === "voronoi" || role === "tooltip" ?
        child.props.style : Wrapper.getChildStyle(child, index, calculatedProps);
      const labels = props.labels ? this.getLabels(props, datasets, index) : child.props.labels;
      return React.cloneElement(child, assign({
        domain, labels, style, theme, horizontal,
        data: this.getDataWithOffset(props, datasets[index], xOffset),
        animate: getAnimationProps(props, child, index),
        colorScale: this.getColorScale(props, child),
        key: index,
        labelComponent: labelComponent || child.props.labelComponent,
        xOffset: role === "stack" ? xOffset : undefined
      }, childProps));
    });
  }

  renderContainer(containerComponent, props) {
    const containerProps = defaults({}, containerComponent.props, props);
    return React.cloneElement(containerComponent, containerProps);
  }

  getContainerProps(props, calculatedProps) {
    const { width, height, standalone, theme} = props;
    const { domain, scale, style } = calculatedProps;
    return {
      domain, scale, width, height, standalone, theme, style: style.parent
    };
  }

  getStyle(theme, style, role) {
    const defaultStyle = theme && theme[role] && theme[role].style ? theme[role].style : {};
    return Helpers.getStyles(style, defaultStyle, "auto", "100%");
  }

  render() {
    const {role} = this.constructor;
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps || this.props : this.props;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, role);
    const { eventKey, containerComponent } = modifiedProps;
    const childComponents = React.Children.toArray(modifiedProps.children);
    const calculatedProps = this.getCalculatedProps(modifiedProps, childComponents);
    let newChildren = this.getNewChildren(modifiedProps, childComponents, calculatedProps);
    if (this.props.modifyChildren) {
      newChildren = this.props.modifyChildren(newChildren, modifiedProps);
    }
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
