import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import * as CustomPropTypes from "../../../victory-util/prop-types";
import { assign, defaults, uniqueId, isObject, isFunction } from "lodash";
import { Portal } from "../../../victory-portal/portal";
import {
  PortalContext,
  PortalContextValue,
} from "../../../victory-portal/portal-context";
import TimerContext from "../../../victory-util/timer-context";
import * as Helpers from "../../../victory-util/helpers";
import * as UserProps from "../../../victory-util/user-props";
import { OriginType } from "../../../victory-label/victory-label";
import { D3Scale } from "../../../types/prop-types";
import { VictoryThemeDefinition } from "../../../victory-theme/types";
import { createTurboComponent } from "../core/create-turbo-component";
import { TurboContainerProps } from "../core/with-turbo-container";
import { TurboCommonProps } from "../utils/props";

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

export const VicContainer = createTurboComponent<VictoryContainerProps>()(
  {
    displayName: "VicContainer",
    // role: "container",
    propTypes: {
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
    },
    defaultProps: {
      className: "VictoryContainer",
      portalComponent: <Portal />,
      portalZIndex: 99,
      responsive: true,
      role: "img",
    },
  },
  (props) => {
    const containerId: VictoryContainerProps["containerId"] =
      !isObject(props) || props.containerId === undefined
        ? uniqueId("victory-container-")
        : props.containerId;

    const containerRef = React.useRef<HTMLElement>();
    const shouldHandleWheel = !!(props && props.events && props.events.onWheel);
    const handleWheel = useCallback((e) => e.preventDefault(), []);
    useEffect(() => {
      if (shouldHandleWheel && containerRef.current) {
        containerRef.current.addEventListener("wheel", handleWheel);
      }
      return () =>
        containerRef.current.removeEventListener("wheel", handleWheel);
    }, [shouldHandleWheel]);

    const portalRef = React.useRef<Portal>();
    const portalContext: PortalContextValue = {
      portalUpdate: (key, el) => portalRef.current!.portalUpdate(key, el),
      portalRegister: () => portalRef.current!.portalRegister(),
      portalDeregister: (key) => portalRef.current!.portalDeregister(key),
    };
    const getIdForElement = (elementName) => `${containerId}-${elementName}`;

    // todo: overridden in custom containers
    function getChildren(props) {
      return props.children;
    }

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
    } = props;

    const style = responsive
      ? props.style
      : Helpers.omit(props.style!, ["height", "width"]);

    const userProps = UserProps.getSafeUserProps(props);

    const svgProps = assign(
      {
        width,
        height,
        tabIndex,
        role,
        "aria-labelledby":
          [title && getIdForElement("title"), props["aria-labelledby"]]
            .filter(Boolean)
            .join(" ") || undefined,
        "aria-describedby":
          [desc && getIdForElement("desc"), props["aria-describedby"]]
            .filter(Boolean)
            .join(" ") || undefined,
        viewBox: responsive ? `0 0 ${width} ${height}` : undefined,
        preserveAspectRatio: responsive ? preserveAspectRatio : undefined,
        ...userProps,
      },
      events,
    );

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
    const children = getChildren(props);
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
      <PortalContext.Provider value={portalContext}>
        <div
          style={defaults({}, style, divStyle)}
          className={className}
          ref={containerRef}
          {...getOUIAProps(props)}
        >
          <svg {...svgProps} style={svgStyle}>
            {title ? (
              <title id={getIdForElement("title")}>{title}</title>
            ) : null}
            {desc ? <desc id={getIdForElement("desc")}>{desc}</desc> : null}
            {children}
          </svg>
          <div style={portalDivStyle}>
            {React.cloneElement(portalComponent, {
              ...portalProps,
              ref: portalRef,
            })}
          </div>
        </div>
      </PortalContext.Provider>
    );
  },
);

// Get props defined by the Open UI Automation (OUIA) 1.0-RC spec
// See https://ouia.readthedocs.io/en/latest/README.html#ouia-component
function getOUIAProps(props) {
  const { ouiaId, ouiaSafe, ouiaType } = props;
  return {
    ...(ouiaId && { "data-ouia-component-id": ouiaId }),
    ...(ouiaType && { "data-ouia-component-type": ouiaType }),
    ...(ouiaSafe !== undefined && { "data-ouia-safe": ouiaSafe }),
  };
}
