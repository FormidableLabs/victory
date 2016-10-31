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
    this.saveSvgRef = (svg) => this.svgRef = svg;
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

  // Overridden in victory-core-native
  renderContainer(props, svgProps, style) {
    const { title, desc, children, portalComponent } = props;
    return (
      <svg {...svgProps} style={style}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        {children}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </svg>
    );
  }

  render() {
    const { width, height, responsive, events } = this.props;
    const style = responsive ? this.props.style : omit(this.props.style, ["height", "width"]);
    const svgProps = assign(
      {
        "aria-labelledby": "title desc", role: "img", width, height,
        viewBox: responsive ? `0 0 ${width} ${height}` : undefined,
        ref: this.saveSvgRef
      },
      events
    );
    return this.renderContainer(this.props, svgProps, style);
  }
}
