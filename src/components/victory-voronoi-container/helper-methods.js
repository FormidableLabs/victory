import { assign, defaults, flatten, groupBy } from "lodash";
import React, { PropTypes } from "react";
import { PropTypes as CustomPropTypes, Helpers, VictorySharedEvents,
  VictoryContainer, VictoryTheme, Scale
} from "victory-core";
import { voronoi as d3Voronoi } from "d3-voronoi";

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
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node), React.PropTypes.node
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
    }
  }

  componentWillMount() {
    this.getContainerRef = (component) => this.containerRef = component;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.animate) {
      this.setAnimationState(this.props, nextProps);
    }
  }

  getCalculatedProps(props, childComponents, style) {
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
    const mergedData = this.mergeData(flatten(datasets));
    const voronoi = this.getVoronoiFunction(range, scale);
    const polygons = voronoi.polygons(mergedData);
    return {datasets, categories, range, domain, horizontal, scale, style, polygons};
  }

  getVoronoiFunction(range, scale) {
    const minRange = [Math.min(...range.x), Math.min(...range.y)];
    const maxRange = [Math.max(...range.x), Math.max(...range.y)];
    return d3Voronoi()
      .x((d) => scale.x(d.x1 || d.x))
      .y((d) => scale.y(d.y1 || d.y))
      .extent([minRange, maxRange]);
  }

  mergeData(datasets) {
    const groups = groupBy(datasets, (d) => `${d.x}, ${d.y}`);
    const keys = Object.keys(groups);
    const mergedData = [];
    for (let index = 0, len = keys.length; index < len; index++) {
      const group = groups[keys[index]];
      if (group.length === 1) {
        mergedData[index] = group[0];
      } else {
        const childNames = group.map((d) => d.childNames);
        mergedData[index] = assign({childName: childNames}, group[0]);
      }
    }
    return mergedData;

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

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const { datasets, horizontal } = calculatedProps;
    const { theme, labelComponent } = props;
    const childProps = this.getChildProps(props, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);
    const newChildren = [];
    for (let index = 0, len = childComponents.length; index < len; index++) {
      const child = childComponents[index];
      const role = child.type && child.type.role;
      const style = role === "voronoi" || role === "tooltip" ?
        child.props.style : Wrapper.getChildStyle(child, index, calculatedProps);
      const labels = props.labels ? this.getLabels(props, datasets, index) : child.props.labels;
      const domainPadding = child.props.domainPadding || props.domainPadding;
      newChildren[index] = React.cloneElement(child, assign({
        domainPadding, labels, style, theme, horizontal,
        data: datasets[index],
        animate: getAnimationProps(props, child, index),
        key: index,
        labelComponent: labelComponent || child.props.labelComponent
      }, childProps));
    }
    return newChildren;
  }

  getContainer(props, calculatedProps) {
    const { width, height, containerComponent } = props;
    const { scale, style } = calculatedProps;
    const parentProps = defaults(
      {},
      containerComponent.props,
      {style: style.parent, scale, width, height, ref: this.getContainerRef}
    );
    return React.cloneElement(containerComponent, parentProps);
  }

  getSvgBounds() {
    return this.containerRef.svgRef.getBoundingClientRect();
  }

  renderGroup(children, style) {
    return React.cloneElement(
      this.props.groupComponent,
      { role: "presentation", style},
      children
    );
  }

  render() {
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps || this.props : this.props;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, "group");
    const { theme, standalone, events, eventKey } = modifiedProps;
    const defaultStyle = theme && theme.group && theme.group.style ? theme.group.style : {};
    const style = Helpers.getStyles(modifiedProps.style, defaultStyle, "auto", "100%");
    const childComponents = React.Children.toArray(modifiedProps.children);
    const calculatedProps = this.getCalculatedProps(modifiedProps, childComponents, style,
      fallbackProps.props);
    let newChildren = this.getNewChildren(modifiedProps, childComponents, calculatedProps);
    if (this.props.modifyChildren) {
      newChildren = this.props.modifyChildren(newChildren, modifiedProps);
    }
    const group = this.renderGroup(newChildren, style.parent);
    const container = standalone ?
      this.getContainer(modifiedProps, calculatedProps) : group;
    if (events) {
      return (
        <VictorySharedEvents events={events} eventKey={eventKey} container={container}>
          {newChildren}
        </VictorySharedEvents>
      );
    }
    return standalone ? React.cloneElement(container, container.props, group) : group;
  }
}
