import React from "react";
import { Log } from "../victory-util/index";

export default class RenderInPortal extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    portalUpdate: React.PropTypes.func,
    portalRegister: React.PropTypes.func,
    portalDeregister: React.PropTypes.func
  }

  componentDidUpdate() {
    if (!this.checkedContext) {
      if (typeof this.context.portalUpdate !== "function") {
        const msg = "`renderInPortal` is not supported outside of `VictoryContainer`. " +
          "Component will be rendered in place";
        Log.warn(msg);
        this.renderInPlace = true;
      }
      this.checkedContext = true;
    }
    if (!this.renderInPlace) {
      this.portalKey = this.portalKey || this.context.portalRegister();
      this.context.portalUpdate(this.portalKey, this.element);
    }
  }

  componentWillUnmount() {
    this.context.portalDeregister(this.portalKey);
  }

  render() {
    const child = React.cloneElement(this.props.children, {renderInPortal: false});
    if (this.renderInPlace) {
      return child;
    }
    this.element = child;
    return null;
  }
}

