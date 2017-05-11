import React from "react";
import PropTypes from "prop-types";
import { assign, omit, defaults } from "lodash";
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
    desc: PropTypes.string,
    events: PropTypes.object,
    height: PropTypes.number,
    portalComponent: PropTypes.element,
    responsive: PropTypes.bool,
    style: PropTypes.object,
    theme: PropTypes.object,
    title: PropTypes.string,
    width: PropTypes.number
  }

  static defaultProps = {
    portalComponent: <Portal/>,
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

  // overridden in custom containers
  getChildren(props) {
    return props.children;
  }

  // Overridden in victory-core-native
  renderContainer(props, svgProps, style) {
    const { title, desc, portalComponent, className } = props;
    const children = this.getChildren(props);
    const parentProps = defaults({ style, className }, svgProps);
    return (
      <svg {...parentProps} overflow="visible">
        <svg {...parentProps}>
          {children}
        </svg>
          {title ? <title id="title">{title}</title> : null}
          {desc ? <desc id="desc">{desc}</desc> : null}
        {React.cloneElement(portalComponent, { ref: this.savePortalRef })}
      </svg>
    );
  }

  render() {
    const { width, height, responsive, events } = this.props;
    const style = responsive ? this.props.style : omit(this.props.style, ["height", "width"]);
    const svgProps = assign(
      {
        width, height, "aria-labelledby": "title desc", role: "img",
        viewBox: responsive ? `0 0 ${width} ${height}` : undefined
      },
      events
    );
    return this.renderContainer(this.props, svgProps, style);
  }
}
