import React from "react";
import { assign } from "lodash";

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
    if (!this.portalKey) {
      this.portalKey = this.context.portalRegister();
    }
    this.context.portalUpdate(this.portalKey, this.element);
  }

  componentWillUnmount() {
    this.context.portalDeregister(this.portalKey);
  }

  render() {
    const childProps = this.props.children && this.props.children.props || {};
    const newProps = assign({}, childProps, {renderInPortal: false});
    const child = React.cloneElement(this.props.children, newProps);
    this.element = child;
    return null;
  }
}

