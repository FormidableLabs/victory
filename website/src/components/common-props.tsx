/* eslint-disable react/no-multi-comp */
import React from "react";

import { Badge, OverriddenBadge } from "./badges";

type Prop = {
  name: string;
  url?: string;
  default?: string;
};

type PropsMeta = {
  name: string;
  url: string;
  props: Prop[];
};

function extend(meta: PropsMeta, props: PropsMeta): PropsMeta {
  return {
    ...props,
    props: [
      ...meta.props.map((x) => ({ ...x, url: `${meta.url}#${x.name}` })),
      ...props.props,
    ].sort((a, b) => a.name.localeCompare(b.name)),
  };
}

const VictoryAxisCommonProps: PropsMeta = {
  name: "VictoryAxisCommonProps",
  url: "/open-source/victory/docs/api/victory-axis-common-props",
  props: [
    { name: "axisComponent" },
    { name: "axisLabelComponent" },
    { name: "axisValue" },
    { name: "dependentAxis" },
    { name: "disableInlineStyles" },
    { name: "gridComponent" },
    { name: "invertAxis" },
    { name: "style" },
    { name: "tickComponent" },
    { name: "tickCount" },
    { name: "tickFormat" },
    { name: "tickLabelComponent" },
    { name: "tickValues" },
  ],
};

const VictoryContainerProps: PropsMeta = {
  name: "VictoryContainerProps",
  url: "/open-source/victory/docs/api/victory-container-props",
  props: [
    { name: "aria-describedby" },
    { name: "aria-labelledby" },
    { name: "children" },
    { name: "className" },
    { name: "containerId" },
    { name: "containerRef" },
    { name: "desc" },
    { name: "events" },
    { name: "height" },
    { name: "name" },
    { name: "origin" },
    { name: "ouiaId" },
    { name: "ouiaSafe" },
    { name: "ouiaType" },
    { name: "polar" },
    { name: "portalComponent" },
    { name: "portalZIndex" },
    { name: "preserveAspectRatio" },
    { name: "responsive" },
    { name: "role" },
    { name: "scale" },
    { name: "style" },
    { name: "tabIndex" },
    { name: "theme" },
    { name: "title" },
    { name: "width" },
  ],
};

const VictoryLabelableProps: PropsMeta = {
  name: "VictoryLabelableProps",
  url: "/open-source/victory/docs/api/victory-labelable-props",
  props: [{ name: "labelComponent" }],
};

const VictoryMultiLabelableProps: PropsMeta = extend(VictoryLabelableProps, {
  name: "VictoryMultiLabelableProps",
  url: "/open-source/victory/docs/api/victory-multi-labelable-props",
  props: [{ name: "labels" }],
});

const VictorySingleLabelableProps: PropsMeta = extend(VictoryLabelableProps, {
  name: "VictorySingleLabelableProps",
  url: "/open-source/victory/docs/api/victory-single-labelable-props",
  props: [{ name: "label" }],
});

const VictoryEventProps: PropsMeta = {
  name: "VictoryEventProps",
  url: "/open-source/victory/docs/api/victory-event-props",
  props: [{ name: "eventKey" }, { name: "events" }],
};

const VictoryCommonThemeProps: PropsMeta = {
  name: "VictoryCommonThemeProps",
  url: "/open-source/victory/docs/api/victory-common-theme-props",
  props: [
    { name: "animate" },
    { name: "colorScale" },
    { name: "containerComponent", default: "<VictoryContainer>" },
    { name: "disableInlineStyles" },
    { name: "domainPadding" },
    { name: "externalEventMutations" },
    { name: "groupComponent" },
    { name: "height" },
    { name: "horizontal" },
    { name: "maxDomain" },
    { name: "minDomain" },
    { name: "name" },
    { name: "origin" },
    { name: "padding" },
    { name: "polar" },
    { name: "range" },
    { name: "scale" },
    { name: "sharedEvents" },
    { name: "singleQuadrantDomainPadding" },
    { name: "standalone" },
    { name: "width" },
  ],
};

const VictoryCommonProps: PropsMeta = extend(VictoryCommonThemeProps, {
  name: "VictoryCommonProps",
  url: "/open-source/victory/docs/api/victory-common-props",
  props: [{ name: "theme" }],
});

const VictoryDatableProps: PropsMeta = {
  name: "VictoryDatableProps",
  url: "/open-source/victory/docs/api/victory-datatable-props",
  props: [
    { name: "categories" },
    { name: "data" },
    { name: "dataComponent" },
    { name: "domain" },
    { name: "domainPadding" },
    { name: "samples" },
    { name: "sortKey" },
    { name: "sortOrder" },
    { name: "x" },
    { name: "y" },
    { name: "y0" },
  ],
};

const VictoryCommons = [
  VictoryAxisCommonProps,
  VictoryContainerProps,
  VictoryDatableProps,
  VictoryLabelableProps,
  VictorySingleLabelableProps,
  VictoryMultiLabelableProps,
  VictoryCommonThemeProps,
  VictoryCommonProps,
  VictoryEventProps,
];

function PropertyListItem({ x, prop, overridden, notImplemented }) {
  if (notImplemented) {
    return (
      <>
        {prop.name}
        <Badge className="bg-gray-50 text-gray-600 ring-gray-500/10">
          not-implemented
        </Badge>
      </>
    );
  }
  if (overridden) {
    return (
      <>
        <a href={`#${prop.name}`}>{prop.name}</a>
        <OverriddenBadge />
      </>
    );
  }
  return (
    <a href={prop.url ? prop.url : `${x.url}#${prop.name}`}>{prop.name}</a>
  );
}

export function CommonProps({ interfaces, overrides, notImplemented }) {
  const result = VictoryCommons.filter((x) =>
    (interfaces || []).includes(x.name),
  );

  return (
    <div>
      {result.map((x) => (
        <div key={x.name}>
          <h3 id={`#${x.name}`}>{x.name}</h3>
          <ul>
            {x.props.map((prop) => (
              <li key={prop.name}>
                <div className="flex flex-row items-center gap-2">
                  <PropertyListItem
                    x={x}
                    prop={prop}
                    overridden={overrides && overrides.includes(prop.name)}
                    notImplemented={
                      notImplemented && notImplemented.includes(prop.name)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
