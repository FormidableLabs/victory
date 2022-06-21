import React from "react";
import PropTypes from "prop-types";
import * as CustomPropTypes from "../victory-util/prop-types";
import { assign, defaults, uniqueId, isObject, isFunction } from "lodash";
import { Portal } from "../victory-portal/portal";
import { PortalContext } from "../victory-portal/portal-context";
import TimerContext from "../victory-util/timer-context";
import * as Helpers from "../victory-util/helpers";
import * as UserProps from "../victory-util/user-props";
import { OriginType } from "../victory-label/victory-label";
import { D3Scale } from "../types/prop-types";
import { VictoryThemeDefinition } from "../victory-theme/types";

export interface VictoryContainerProps {
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  containerId?: number | string;
  containerRef?: React.Ref<HTMLElement>;
  desc?: string;
  events?: React.DOMAttributes<any>;
  height?: number;
  name?: string;
  origin?: OriginType;
  ouiaId?: number | string;
  ouiaSafe?: boolean;
  ouiaType?: string;
  polar?: boolean;
  portalComponent?: React.ReactElement;
  portalZIndex?: number;
  preserveAspectRatio?: string;
  responsive?: boolean;
  role?: string;
  scale?: {
    x?: D3Scale;
    y?: D3Scale;
  };
  style?: React.CSSProperties;
  tabIndex?: number;
  theme?: VictoryThemeDefinition;
  title?: string;
  width?: number;
}

export class VictoryContainer extends React.Component<VictoryContainerProps> {
  static displayName = "VictoryContainer";
  static role = "container";
  static propTypes = {
    "aria-describedby": PropTypes.string,
    "aria-labelledby": PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    containerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    containerRef: PropTypes.func,
    desc: PropTypes.string,
    events: PropTypes.object,
    height: CustomPropTypes.nonNegative,
    name: PropTypes.string,
    origin: PropTypes.shape({
      x: CustomPropTypes.nonNegative,
      y: CustomPropTypes.nonNegative,
    }),
    ouiaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ouiaSafe: PropTypes.bool,
    ouiaType: PropTypes.string,
    polar: PropTypes.bool,
    portalComponent: PropTypes.element,
    portalZIndex: CustomPropTypes.integer,
    preserveAspectRatio: PropTypes.string,
    responsive: PropTypes.bool,
    role: PropTypes.string,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    theme: PropTypes.object,
    title: PropTypes.string,
    width: CustomPropTypes.nonNegative,
  };

  static defaultProps = {
    className: "VictoryContainer",
    portalComponent: <Portal />,
    portalZIndex: 99,
    responsive: true,
    role: "img",
  };

  static contextType = TimerContext;
  private containerId: VictoryContainerProps["containerId"];
  // @ts-expect-error Ref will be initialized on mount
  private portalRef: Portal;
  // @ts-expect-error Ref will be initialized on mount
  private containerRef: HTMLElement;
  private shouldHandleWheel: boolean;

  constructor(props: VictoryContainerProps) {
    super(props);
    this.containerId =
      !isObject(props) || props.containerId === undefined
        ? uniqueId("victory-container-")
        : props.containerId;

    this.shouldHandleWheel = !!(props && props.events && props.events.onWheel);
  }
  savePortalRef = (portal) => {
    this.portalRef = portal;
    return portal;
  };
  portalUpdate = (key, el) => this.portalRef.portalUpdate(key, el);
  portalRegister = () => this.portalRef.portalRegister();
  portalDeregister = (key) => this.portalRef.portalDeregister(key);

  saveContainerRef = (container: HTMLElement) => {
    if (isFunction(this.props.containerRef)) {
      this.props.containerRef(container);
    }
    this.containerRef = container;
    return container;
  };

  handleWheel = (e) => e.preventDefault();

  componentDidMount() {
    if (this.shouldHandleWheel && this.containerRef) {
      this.containerRef.addEventListener("wheel", this.handleWheel);
    }
  }

  componentWillUnmount() {
    if (this.shouldHandleWheel && this.containerRef) {
      this.containerRef.removeEventListener("wheel", this.handleWheel);
    }
  }

  getIdForElement(elementName) {
    return `${this.containerId}-${elementName}`;
  }

  // overridden in custom containers
  getChildren(props) {
    return props.children;
  }

  // Get props defined by the Open UI Automation (OUIA) 1.0-RC spec
  // See https://ouia.readthedocs.io/en/latest/README.html#ouia-component
  getOUIAProps(props) {
    const { ouiaId, ouiaSafe, ouiaType } = props;
    return {
      ...(ouiaId && { "data-ouia-component-id": ouiaId }),
      ...(ouiaType && { "data-ouia-component-type": ouiaType }),
      ...(ouiaSafe !== undefined && { "data-ouia-safe": ouiaSafe }),
    };
  }

  renderContainer(props, svgProps, style) {
    const {
      title,
      desc,
      portalComponent,
      className,
      width,
      height,
      portalZIndex,
      responsive,
    } = props;
    const children = this.getChildren(props);
    const dimensions = responsive
      ? { width: "100%", height: "100%" }
      : { width, height };
    const divStyle = assign(
      {
        pointerEvents: "none",
        touchAction: "none",
        position: "relative",
      } as const,
      dimensions,
    );
    const portalDivStyle = assign(
      { zIndex: portalZIndex, position: "absolute", top: 0, left: 0 } as const,
      dimensions,
    );
    const svgStyle = assign({ pointerEvents: "all" }, dimensions);
    const portalSvgStyle = assign({ overflow: "visible" }, dimensions);
    const portalProps = {
      width,
      height,
      viewBox: svgProps.viewBox,
      preserveAspectRatio: svgProps.preserveAspectRatio,
      style: portalSvgStyle,
    };
    return (
      <PortalContext.Provider
        value={{
          portalUpdate: this.portalUpdate,
          portalRegister: this.portalRegister,
          portalDeregister: this.portalDeregister,
        }}
      >
        <div
          style={defaults({}, style, divStyle)}
          className={className}
          ref={this.saveContainerRef}
          {...this.getOUIAProps(props)}
        >
          <svg {...svgProps} style={svgStyle}>
            {title ? (
              <title id={this.getIdForElement("title")}>{title}</title>
            ) : null}
            {desc ? (
              <desc id={this.getIdForElement("desc")}>{desc}</desc>
            ) : null}
            {children}
          </svg>
          <div style={portalDivStyle}>
            {React.cloneElement(portalComponent, {
              ...portalProps,
              ref: this.savePortalRef,
            })}
          </div>
        </div>
      </PortalContext.Provider>
    );
  }

  render() {
    const {
      width,
      height,
      responsive,
      events,
      title,
      desc,
      tabIndex,
      preserveAspectRatio,
      role,
    } = this.props;

    const style = responsive
      ? this.props.style
      : Helpers.omit(this.props.style!, ["height", "width"]);

    const userProps = UserProps.getSafeUserProps(this.props);

    const svgProps = assign(
      {
        width,
        height,
        tabIndex,
        role,
        "aria-labelledby":
          [
            title && this.getIdForElement("title"),
            this.props["aria-labelledby"],
          ]
            .filter(Boolean)
            .join(" ") || undefined,
        "aria-describedby":
          [desc && this.getIdForElement("desc"), this.props["aria-describedby"]]
            .filter(Boolean)
            .join(" ") || undefined,
        viewBox: responsive ? `0 0 ${width} ${height}` : undefined,
        preserveAspectRatio: responsive ? preserveAspectRatio : undefined,
        ...userProps,
      },
      events,
    );
    return this.renderContainer(this.props, svgProps, style);
  }
}
