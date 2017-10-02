import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "../victory-util/prop-types";
import { assign, omit, defaults, uniqueId, isObject } from "lodash";
import Portal from "../victory-portal/portal";
import Timer from "../victory-util/timer";

export default class VictoryContainer extends React.Component {
  static displayName = "VictoryContainer";
  static role = "container";
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    className: PropTypes.string,
    containerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    desc: PropTypes.string,
    events: PropTypes.object,
    height: CustomPropTypes.nonNegative,
    origin: PropTypes.shape({ x: CustomPropTypes.nonNegative, y: CustomPropTypes.nonNegative }),
    polar: PropTypes.bool,
    portalComponent: PropTypes.element,
    portalZIndex: CustomPropTypes.integer,
    responsive: PropTypes.bool,
    style: PropTypes.object,
    theme: PropTypes.object,
    title: PropTypes.string,
    width: CustomPropTypes.nonNegative
  }

  static defaultProps = {
    portalComponent: <Portal/>,
    portalZIndex: 99,
    responsive: true
  }

  static contextTypes = {
    getTimer: PropTypes.func
  }

  static childContextTypes = {
    portalUpdate: PropTypes.func,
    portalRegister: PropTypes.func,
    portalDeregister: PropTypes.func,
    getTimer: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.getTimer = this.getTimer.bind(this);
    this.containerId = !isObject(props) || typeof props.containerId === "undefined" ?
      uniqueId("victory-container-") : props.containerId;
  }

  getChildContext() {
    return {
      portalUpdate: this.portalUpdate,
      portalRegister: this.portalRegister,
      portalDeregister: this.portalDeregister,
      getTimer: this.getTimer
    };
  }

  componentWillMount() {
    this.savePortalRef = (portal) => {
      this.portalRef = portal;
      return portal;
    };
    this.portalUpdate = (key, el) => this.portalRef.portalUpdate(key, el);
    this.portalRegister = () => this.portalRef.portalRegister();
    this.portalDeregister = (key) => this.portalRef.portalDeregister(key);
  }

  componentWillUnmount() {
    if (!this.context.getTimer) {
      this.getTimer().stop();
    }
  }

  getTimer() {
    if (this.context.getTimer) {
      return this.context.getTimer();
    }
    if (!this.timer) {
      this.timer = new Timer();
    }
    return this.timer;
  }

  getIdForElement(elementName) {
    return `${this.containerId}-${elementName}`;
  }

  // overridden in custom containers
  getChildren(props) {
    return props.children;
  }

  renderContainer(props, svgProps, style) {
    const { title, desc, portalComponent, className, width, height, portalZIndex } = props;
    const children = this.getChildren(props);
    const divStyle = { pointerEvents: "none", touchAction: "none", position: "relative" };
    const svgStyle = { width: "100%", height: "100%", top: 0, left: 0 };
    const portalProps = {
      width, height, viewBox: svgProps.viewBox, style: assign({}, svgStyle, { overflow: "visible" })
    };
    return (
      <div style={defaults({}, style, divStyle)} className={className}>
        <svg {...svgProps} style={{ ...svgStyle, pointerEvents: "all" }}>
          {title ? <title id={this.getIdForElement("title")}>{title}</title> : null}
          {desc ? <desc id={this.getIdForElement("desc")}>{desc}</desc> : null}
          {children}
        </svg>
          <div style={{ ...svgStyle, zIndex: portalZIndex, position: "absolute" }}>
            {React.cloneElement(portalComponent, { ...portalProps, ref: this.savePortalRef })}
          </div>
        </div>
    );
  }

  render() {
    const { width, height, responsive, events } = this.props;
    const style = responsive ? this.props.style : omit(this.props.style, ["height", "width"]);
    const svgProps = assign(
      {
        width, height, role: "img",
        "aria-labelledby": `${this.getIdForElement("title")} ${this.getIdForElement("desc")}`,
        viewBox: responsive ? `0 0 ${width} ${height}` : undefined
      },
      events
    );
    return this.renderContainer(this.props, svgProps, style);
  }
}
