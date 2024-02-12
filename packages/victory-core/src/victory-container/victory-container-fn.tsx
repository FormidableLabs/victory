import React, { useRef } from "react";
import { uniqueId } from "lodash";
import { Portal } from "../victory-portal/portal";
import { PortalContext } from "../victory-portal/portal-context";
import * as UserProps from "../victory-util/user-props";
import { OriginType } from "../victory-label/victory-label";
import { D3Scale } from "../types/prop-types";
import { VictoryThemeDefinition } from "../victory-theme/types";
import { mergeRefs } from "../victory-util";

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
  // Props defined by the Open UI Automation (OUIA) 1.0-RC spec
  // See https://ouia.readthedocs.io/en/latest/README.html#ouia-component
  ouiaId?: number | string;
  ouiaSafe?: boolean;
  ouiaType?: string;
}

const defaultProps = {
  className: "VictoryContainer",
  portalComponent: <Portal />,
  portalZIndex: 99,
  responsive: true,
  role: "img",
};

export const VictoryContainerFn = (initialProps: VictoryContainerProps) => {
  const propsWithDefaults = { ...defaultProps, ...initialProps };
  const {
    role,
    title,
    desc,
    children,
    className,
    portalZIndex,
    portalComponent,
    width,
    height,
    style,
    tabIndex,
    responsive,
    events,
    ouiaId,
    ouiaSafe,
    ouiaType,
  } = propsWithDefaults;

  const containerRef = useRef<HTMLDivElement>(null);

  const portalRef = useRef<Portal>(null);

  // Generated ID stored in ref because it needs to persist across renders
  const generatedId = useRef(uniqueId("victory-container-"));
  const containerId = propsWithDefaults.containerId ?? generatedId;

  const getIdForElement = (elName: string) => `${containerId}-${elName}`;

  const userProps = UserProps.getSafeUserProps(propsWithDefaults);

  const dimensions = responsive
    ? { width: "100%", height: "100%" }
    : { width, height };

  const viewBox = responsive ? `0 0 ${width} ${height}` : undefined;

  const preserveAspectRatio = responsive
    ? propsWithDefaults.preserveAspectRatio
    : undefined;

  const ariaLabelledBy =
    [title && getIdForElement("title"), propsWithDefaults["aria-labelledby"]]
      .filter(Boolean)
      .join(" ") || undefined;

  const ariaDescribedBy =
    [desc && getIdForElement("desc"), propsWithDefaults["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined;

  const handleWheel = (e: WheelEvent) => e.preventDefault();

  React.useEffect(() => {
    // TODO check that this works
    if (!propsWithDefaults.events?.onWheel) return;

    const container = containerRef?.current;
    container?.addEventListener("wheel", handleWheel);

    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <PortalContext.Provider
      value={{
        portalUpdate: portalRef.current?.portalUpdate as any,
        portalRegister: portalRef.current?.portalRegister as any,
        portalDeregister: portalRef.current?.portalDeregister as any,
      }}
    >
      <div
        className={className}
        style={{
          ...style,
          width: responsive ? style?.width : dimensions.width,
          height: responsive ? style?.height : dimensions.height,
          pointerEvents: "none",
          touchAction: "none",
          position: "relative",
        }}
        data-ouia-component-id={ouiaId}
        data-ouia-component-type={ouiaType}
        data-ouia-safe={ouiaSafe}
        ref={mergeRefs([containerRef, propsWithDefaults.containerRef])}
      >
        <svg
          width={width}
          height={height}
          tabIndex={tabIndex}
          role={role}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          style={{ ...dimensions, pointerEvents: "all" }}
          {...userProps}
          {...events}
        >
          {title ? <title id={getIdForElement("title")}>{title}</title> : null}
          {desc ? <desc id={getIdForElement("desc")}>{desc}</desc> : null}
          {children}
        </svg>
        <div
          style={{
            ...dimensions,
            zIndex: portalZIndex,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {React.cloneElement(portalComponent, {
            width,
            height,
            viewBox,
            preserveAspectRatio,
            style: { ...dimensions, overflow: "visible" },
            ref: portalRef,
          })}
        </div>
      </div>
    </PortalContext.Provider>
  );
};

VictoryContainerFn.role = "container";
