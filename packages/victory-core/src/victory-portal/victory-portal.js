import React from "react";
import PropTypes from "prop-types";
import { defaults } from "lodash";
import Log from "../victory-util/log";
import Helpers from "../victory-util/helpers";
import PortalContext from "./portal-context";

export default class VictoryPortal extends React.Component {
  static displayName = "VictoryPortal";

  static role = "portal";

  static propTypes = {
    children: PropTypes.node,
    groupComponent: PropTypes.element
  };

  static defaultProps = {
    groupComponent: <g />
  };

  static contextType = PortalContext;

  componentDidMount() {
    if (!this.checkedContext) {
      if (typeof this.context.portalUpdate !== "function") {
        const msg =
          "`renderInPortal` is not supported outside of `VictoryContainer`. " +
          "Component will be rendered in place";
        Log.warn(msg);
        this.renderInPlace = true;
      }
      this.checkedContext = true;
    }
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (!this.renderInPlace) {
      this.portalKey = this.portalKey || this.context.portalRegister();
      this.context.portalUpdate(this.portalKey, this.element);
    }
  }

  componentWillUnmount() {
    if (this.context && this.context.portalDeregister) {
      this.context.portalDeregister(this.portalKey);
    }
  }

  // Overridden in victory-core-native
  renderPortal(child) {
    if (this.renderInPlace) {
      return child;
    }
    this.element = child;
    return null;
  }

  render() {
    const children = Array.isArray(this.props.children)
      ? this.props.children[0]
      : this.props.children;
    const { groupComponent } = this.props;
    const childProps = (children && children.props) || {};
    const standardProps = childProps.groupComponent ? { groupComponent, standalone: false } : {};
    const newProps = defaults(
      standardProps,
      childProps,
      Helpers.omit(this.props, ["children", "groupComponent"])
    );
    const child = children && React.cloneElement(children, newProps);
    return this.renderPortal(child);
  }
}
