import React, { PropTypes } from "react";
import { assign, omit } from "lodash";
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
    portalComponent: PropTypes.element,
    responsive: PropTypes.bool
  }

  static defaultProps = {
    title: "Victory Chart",
    desc: "",
    portalComponent: <Portal/>,
    responsive: true
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
    const {
      style, title, desc, width, height, children, responsive, portalComponent, events
    } = this.props;
    const svgProps = assign(
      {
        "aria-labelledby": "title desc", role: "img",
        style: responsive ? style : omit(style, ["height", "width"]),
        viewBox: responsive ? `0 0 ${width} ${height}` : undefined,
        width: responsive ? undefined : width,
        height: responsive ? undefined : height
      },
      events
    );
    return (
      <svg {...svgProps}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        {children}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </svg>
      );
  }
}
