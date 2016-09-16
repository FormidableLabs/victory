import React, { PropTypes } from "react";

export default class VictoryPortal extends React.Component {
  static displayName = "VictoryPortal";

  static propTypes = {
    /**
     * The groupComponent prop takes an entire component which will be used to
     * create group elements for use within container elements. This prop defaults
     * to a <g> tag on web, and a react-native-svg <G> tag on mobile
     */
    groupComponent: PropTypes.element
  }

  static defaultProps = {
    groupComponent: <g/>
  };

  componentWillMount() {
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

  render() {
    return React.cloneElement(
      this.props.groupComponent,
      {},
      Object.keys(this.map).map((key) => {
        const el = this.map[key];
        return el ? React.cloneElement(el, {key}) : el;
      })
    );
  }
}
