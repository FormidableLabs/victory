import React, { PropTypes } from "react";
import { assign, omit } from "lodash";
import Portal from "../victory-portal/portal";
import { Timer } from "../victory-util/index";

export default class VictoryContainer extends React.Component {
  static displayName = "VictoryContainer";

  static propTypes = {
    className: PropTypes.string,
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
    responsive: PropTypes.bool,
    standalone: PropTypes.bool
  }

  static defaultProps = {
    title: "Victory Chart",
    desc: "",
    portalComponent: <Portal/>,
    responsive: true
  }

  static contextTypes = {
    getTimer: React.PropTypes.func
  }

  static childContextTypes = {
    portalUpdate: React.PropTypes.func,
    portalRegister: React.PropTypes.func,
    portalDeregister: React.PropTypes.func,
    getTimer: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.getTimer = this.getTimer.bind(this);
  }

  componentWillMount() {
    this.savePortalRef = (portal) => this.portalRef = portal;
    this.portalUpdate = (key, el) => this.portalRef.portalUpdate(key, el);
    this.portalRegister = () => this.portalRef.portalRegister();
    this.portalDeregister = (key) => this.portalRef.portalDeregister(key);
  }

  componentWillUnmount() {
    if (!this.context.getTimer) {
      this.getTimer().stop();
    }
  }

  getChildContext() {
    return {
      portalUpdate: this.portalUpdate,
      portalRegister: this.portalRegister,
      portalDeregister: this.portalDeregister,
      getTimer: this.getTimer
    };
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
    const { title, desc, portalComponent, className, standalone } = props;
    return standalone || standalone === undefined ?
      (
        <svg {...svgProps} style={style} className={className}>
          <title id="title">{title}</title>
          <desc id="desc">{desc}</desc>
          {this.getChildren(props)}
          {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
        </svg>
      ) :
      (
        <g {...svgProps} style={style} className={className}>
          <title id="title">{title}</title>
          <desc id="desc">{desc}</desc>
          {this.getChildren(props)}
          {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
        </g>
      );
  }

  render() {
    const { width, height, responsive, events, standalone } = this.props;
    const style = responsive ? this.props.style : omit(this.props.style, ["height", "width"]);
    const useViewBox = responsive ? standalone || standalone === undefined : false;
    const svgProps = assign(
      {
        "aria-labelledby": "title desc", role: "img", width, height,
        viewBox: useViewBox ? `0 0 ${width} ${height}` : undefined
      },
      events
    );
    return this.renderContainer(this.props, svgProps, style);
  }
}
