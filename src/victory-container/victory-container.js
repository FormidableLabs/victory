import React, { PropTypes } from "react";
import VictoryPortal from "../victory-portal/victory-portal";

export default class VictoryContainer extends React.Component {
  static displayName = "VictoryContainer";

  static propTypes = {
    /**
     * The style prop specifies styles for your VictoryContainer. Any valid inline style properties
     * will be applied. Height and width should be specified via the height
     * and width props, as they are used to calculate the alignment of
     * components within the container. Styles from the child component will
     * also be passed, if any exist.
     * @examples {border: 1px solid red}
     */
    style: PropTypes.object,
    /**
     * The height props specifies the height the svg viewBox of the container.
     * This value should be given as a number of pixels. If no height prop
     * is given, the height prop from the child component passed will be used.
     */
    height: PropTypes.number,
    /**
     * The width props specifies the width of the svg viewBox of the container
     * This value should be given as a number of pixels. If no width prop
     * is given, the width prop from the child component passed will be used.
     */
    width: PropTypes.number,
    /**
     * The events prop attaches arbitrary event handlers to the container component.
     * Event handlers passed from other Victory components are called with their
     * corresponding events as well as scale, style, width, height, and data when
     * applicable. Use the invert method to convert event coordinate information to
     * data. `scale.x.invert(evt.offsetX)`.
     * @examples {(evt) => alert(`x: ${evt.clientX}, y: ${evt.clientY}`)}
     */
    events: PropTypes.object,
    /**
     * VictoryContainer is a wrapper component that controls some props and behaviors of its
     * children. VictoryContainer works with all Victory components.
     * If no children are provided, VictoryContainer will render an empty SVG.
     * Props from children are used to determine default style, height, and width.
     */
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    /**
     * The title prop specifies the title to be applied to the SVG to assist
     * accessibility for screen readers. The more descriptive this title is, the more
     * useful it will be. If no title prop is passed, it will default to Victory Chart.
     * @examples "Popularity of Dog Breeds by Percentage"
     */
    title: PropTypes.string,
    /**
     * The desc prop specifies the description of the chart/SVG to assist with
     * accessibility for screen readers. The more info about the chart provided in
     * the description, the more usable it will be for people using screen readers.
     * This prop defaults to an empty string.
     * @examples "Golden retreivers make up 30%, Labs make up 25%, and other dog breeds are
     * not represented above 5% each."
     */
    desc: PropTypes.string,
    /**
     * The portalComponent prop takes an entire component which will be used as
     * a container for children that render inside a portal, eg. VictoryTooltip.
     * This prop defaults to VictoryPortal.
     */
    portalComponent: PropTypes.element
  }

  static defaultProps = {
    title: "Victory Chart",
    desc: "",
    portalComponent: <VictoryPortal/>
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
