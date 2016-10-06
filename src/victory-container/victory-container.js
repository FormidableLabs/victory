import React, { PropTypes } from "react";
import Portal from "../victory-portal/portal";

export default class VictoryContainer extends React.Component {
  static displayName = "VictoryContainer";

  static propTypes = {
    style: PropTypes.object,
    height: PropTypes.number,
    width: PropTypes.number,
    events: PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    title: PropTypes.string,
    desc: PropTypes.string,
    portalComponent: PropTypes.element
  }

  static defaultProps = {
    title: "Victory Chart",
    desc: "",
    portalComponent: <Portal/>
  }

  static childContextTypes = {
    portalUpdate: React.PropTypes.func,
    portalRegister: React.PropTypes.func,
    portalDeregister: React.PropTypes.func
  }

  componentWillMount() {
    this.savePortalRef = (portal) => this.portalRef = portal;
    this.portalUpdate = (key, el) => this.portalRef.portalUpdate(key, el);
    this.portalRegister = () => this.portalRef.portalRegister();
    this.portalDeregister = (key) => this.portalRef.portalDeregister(key);
  }

  getChildContext() {
    return {
      portalUpdate: this.portalUpdate,
      portalRegister: this.portalRegister,
      portalDeregister: this.portalDeregister
    };
  }

  render() {
    return (
      <svg
        style={this.props.style}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        role="img"
        aria-labelledby="title desc"
        {...this.props.events}
      >
        <title id="title">{this.props.title}</title>
        <desc id="desc">{this.props.desc}</desc>
        {this.props.children}
        {React.cloneElement(this.props.portalComponent, {
          ref: this.savePortalRef})}
      </svg>
      );
  }
}
