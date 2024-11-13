import React, { useRef } from "react";
import uniqueId from "lodash/uniqueId";
import { Portal } from "../victory-portal/portal";
import * as UserProps from "../victory-util/user-props";
import { OriginType } from "../victory-label/victory-label";
import { D3Scale } from "../types/prop-types";
import { VictoryThemeDefinition } from "../victory-theme/types";
import { mergeRefs } from "../victory-util";
import { PortalOutlet } from "../victory-portal/portal-outlet";
import { PortalProvider } from "../victory-portal/portal-context";

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

export function useVictoryContainer<TProps extends VictoryContainerProps>(
  initialProps: TProps,
) {
  const props = { ...defaultProps, ...initialProps };
  const { title, desc, width, height, responsive } = props;

  const localContainerRef = useRef<HTMLDivElement>(null);

  // Generated ID stored in ref because it needs to persist across renders
  const generatedId = useRef(uniqueId("victory-container-"));
  const containerId = props.containerId ?? generatedId.current;

  const getIdForElement = (elName: string) => `${containerId}-${elName}`;

  const userProps = UserProps.getSafeUserProps(props);

  const dimensions = responsive
    ? { width: "100%", height: "100%" }
    : { width, height };

  const viewBox = responsive ? `0 0 ${width} ${height}` : undefined;

  const preserveAspectRatio = responsive
    ? props.preserveAspectRatio
    : undefined;

  const ariaLabelledBy =
    [title && getIdForElement("title"), props["aria-labelledby"]]
      .filter(Boolean)
      .join(" ") || undefined;

  const ariaDescribedBy =
    [desc && getIdForElement("desc"), props["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined;

  const titleId = getIdForElement("title");
  const descId = getIdForElement("desc");

  return {
    ...props,
    titleId,
    descId,
    dimensions,
    viewBox,
    preserveAspectRatio,
    ariaLabelledBy,
    ariaDescribedBy,
    userProps,
    localContainerRef,
  };
}

export const VictoryContainer = (initialProps: VictoryContainerProps) => {
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
    dimensions,
    ariaDescribedBy,
    ariaLabelledBy,
    viewBox,
    preserveAspectRatio,
    userProps,
    titleId,
    descId,
    containerRef,
    localContainerRef,
  } = useVictoryContainer(initialProps);

  React.useEffect(() => {
    if (!events?.onWheel) return;

    const handleWheel = (e: WheelEvent) => e.preventDefault();

    const container = localContainerRef?.current;
    container?.addEventListener("wheel", handleWheel);

    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={className}
      style={{
        ...style,
        width: responsive ? style?.width : dimensions.width,
        height: responsive ? style?.height : dimensions.height,
        pointerEvents: style?.pointerEvents ?? "none",
        touchAction: style?.touchAction ?? "none",
        position: style?.position ?? "relative",
      }}
      data-ouia-component-id={ouiaId}
      data-ouia-component-type={ouiaType}
      data-ouia-safe={ouiaSafe}
      ref={mergeRefs([localContainerRef, containerRef])}
    >
      <PortalProvider>
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
          {title ? <title id={titleId}>{title}</title> : null}
          {desc ? <desc id={descId}>{desc}</desc> : null}
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
          <PortalOutlet
            as={portalComponent}
            width={width}
            height={height}
            viewBox={viewBox}
            preserveAspectRatio={preserveAspectRatio}
            style={{
              ...dimensions,
              overflow: "visible",
            }}
          />
        </div>
      </PortalProvider>
    </div>
  );
};

VictoryContainer.role = "container";
