import React from "react";
import { Log } from "../victory-util/index";
import { defaults } from "lodash";

export default class RenderInPortal extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    portalUpdate: React.PropTypes.func,
    portalRegister: React.PropTypes.func,
    portalDeregister: React.PropTypes.func
  }

  componentDidMount() {
    this.forceUpdate();
    if (!this.checkedContext) {
      if (typeof this.context.portalUpdate !== "function") {
        const msg = "`renderInPortal` is not supported outside of `VictoryContainer`. " +
          "Component will be rendered in place";
        Log.warn(msg);
        this.renderInPlace = true;
      }
      this.checkedContext = true;
    }
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

  render() {
    const { children } = this.props;
    const childProps = children && children.props || {};
    const child = children && React.cloneElement(
      children, defaults({}, childProps, this.props)
    );
    if (this.renderInPlace) {
      return child;
    }
    this.element = child;
    return null;
  }
}

