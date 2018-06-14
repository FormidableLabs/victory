import { assign, defaults } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import {
  Helpers, VictorySharedEvents, VictoryContainer, VictoryTheme, Scale, Data
} from "victory-core";
import Wrapper from "../../helpers/wrapper";
import { BaseProps, DataProps } from "../../helpers/common-props";

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
    ...BaseProps,
    ...DataProps,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    colorScale: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.oneOf([
        "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
      ])
    ]),
    horizontal: PropTypes.bool,
    offset: PropTypes.number
  };

  static defaultProps = {
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    samples: 50,
    scale: "linear",
    sortOrder: "ascending",
    standalone: true,
    theme: VictoryTheme.grayscale
  };

  static expectedComponents = [
    "groupComponent", "containerComponent", "labelComponent"
  ];

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

  // eslint-disable-next-line max-statements
  getCalculatedProps(props, childComponents) {
    const { role } = this.constructor;
    const style = this.getStyle(props.theme, props.style, role);
    const modifiedProps = Helpers.modifyProps(props, fallbackProps);
    const { offset, colorScale, color, polar } = modifiedProps;
    const horizontal = modifiedProps.horizontal || childComponents.every(
      (component) => component.props && component.props.horizontal
    );
    const categories = {
      x: Wrapper.getCategories(modifiedProps, "x"),
      y: Wrapper.getCategories(modifiedProps, "y")
    };
    const datasets = Wrapper.getDataFromChildren(modifiedProps);
    const domain = {
      x: Wrapper.getDomain(assign({}, modifiedProps, { categories }), "x", childComponents),
      y: Wrapper.getDomain(assign({}, modifiedProps, { categories }), "y", childComponents)
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

    const origin = polar ? props.origin : Helpers.getPolarOrigin(modifiedProps);
    const padding = Helpers.getPadding(props);
    return {
      datasets, categories, range, domain, horizontal,
      scale, style, colorScale, color, offset, origin, padding
    };
  }

  pixelsToValue(props, axis, calculatedProps) {
    if (!props.offset) {
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

  getX0(props, calculatedProps, index) {
    const center = (calculatedProps.datasets.length - 1) / 2;
    const totalWidth = this.pixelsToValue(props, "x", calculatedProps);
    return (index - center) * totalWidth;
  }

  getPolarX0(props, calculatedProps, index) {
    const center = (calculatedProps.datasets.length - 1) / 2;
    const width = this.getAngularWidth(props, calculatedProps);
    return (index - center) * width;
  }

  getAngularWidth(props, calculatedProps) {
    const { range } = calculatedProps;
    const angularRange = Math.abs(range.x[1] - range.x[0]);
    const r = Math.max(...range.y);
    return (props.offset / (2 * Math.PI * r)) * angularRange;
  }

  getLabels(props, datasets, index) {
    if (!props.labels) {
      return undefined;
    }
    return Math.floor(datasets.length / 2) === index ? props.labels : undefined;
  }

  getChildProps(props, calculatedProps) {
    const { categories, domain, range, scale, horizontal, origin, padding } = calculatedProps;
    const { width, height, theme, polar } = props;
    return {
      height, width, theme, polar, origin, categories, domain, range, scale, horizontal, padding,
      standalone: false
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
      const _x1 = datum._x instanceof Date
        ? new Date(datum._x.getTime() + xOffset)
        : datum._x + xOffset;

      return assign({}, datum, { _x1 });
    });
  }

  // the old ones were bad
  getNewChildren(props, childComponents, calculatedProps) {
    const { datasets } = calculatedProps;
    const { labelComponent, polar } = props;
    const childProps = this.getChildProps(props, calculatedProps);
    const getAnimationProps = Wrapper.getAnimationProps.bind(this);

    return childComponents.map((child, index) => {
      const role = child.type && child.type.role;
      const xOffset = polar ?
        this.getPolarX0(props, calculatedProps, index) : this.getX0(props, calculatedProps, index);
      const style = role === "voronoi" || role === "tooltip" || role === "label" ?
        child.props.style : Wrapper.getChildStyle(child, index, calculatedProps);
      const labels = props.labels ? this.getLabels(props, datasets, index) : child.props.labels;
      return React.cloneElement(child, assign({
        labels, style, key: index,
        data: this.getDataWithOffset(props, datasets[index], xOffset),
        animate: getAnimationProps(props, child, index),
        colorScale: this.getColorScale(props, child),
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
    const { width, height, standalone, theme, polar } = props;
    const { domain, scale, style, origin } = calculatedProps;
    return {
      domain, scale, width, height, standalone, theme, style: style.parent, polar, origin
    };
  }

  getStyle(theme, style, role) {
    const defaultStyle = theme && theme[role] && theme[role].style ? theme[role].style : {};
    return Helpers.getStyles(style, defaultStyle);
  }

  render() {
    const { role } = this.constructor;
    const props = this.state && this.state.nodesWillExit ?
      this.state.oldProps || this.props : this.props;
    const modifiedProps = Helpers.modifyProps(props, fallbackProps, role);
    const {
      eventKey, containerComponent, standalone, groupComponent, externalEventMutations
    } = modifiedProps;
    const childComponents = React.Children.toArray(modifiedProps.children);
    const calculatedProps = this.getCalculatedProps(modifiedProps, childComponents);
    const newChildren = this.getNewChildren(modifiedProps, childComponents, calculatedProps);
    const containerProps = standalone ? this.getContainerProps(modifiedProps, calculatedProps) : {};
    const container = standalone ?
      this.renderContainer(containerComponent, containerProps) : groupComponent;
    if (this.events) {
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
