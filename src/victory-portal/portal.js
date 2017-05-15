import React from "react";
import PropTypes from "prop-types";

export default class Portal extends React.Component {
  static displayName = "Portal";

  static propTypes = {
    groupComponent: PropTypes.element
  }

  static defaultProps = {
    groupComponent: <g/>
  };

  constructor(props) {
    super(props);
    this.map = {};
    this.index = 1;
    this.portalUpdate = this.portalUpdate.bind(this);
    this.portalRegister = this.portalRegister.bind(this);
    this.portalDeregister = this.portalDeregister.bind(this);
  }

  portalRegister() {
    return ++this.index;
  }

  portalUpdate(key, element) {
    this.map[key] = element;
    this.forceUpdate();
  }

  portalDeregister(key) {
    delete this.map[key];
  }

  // Overridden in victory-core-native
  render() {
    return React.cloneElement(
      this.props.groupComponent,
      {},
      Object.keys(this.map).map((key) => {
        const el = this.map[key];
        return el ? React.cloneElement(el, { key }) : el;
      })
    );
  }
}
