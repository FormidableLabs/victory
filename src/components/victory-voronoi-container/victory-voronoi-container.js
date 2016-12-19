import React from "react";
import { VictoryContainer } from "victory-core";

export default class VictoryVoronoiContainer extends VictoryContainer {
  static displayName = "VictoryVoronoiContainer";
  static defaultEvents = [{
    target: "data",
    eventHandlers: {
      onMouseOut: () => {
        console.log("WHOA BUDDY")
      }
    }
  }];

  renderContainer(props, svgProps, style) {
    const { title, desc, children, portalComponent, className } = props;
    return (
      <svg {...svgProps} style={style} className={className}>
        <title id="title">{title}</title>
        <desc id="desc">{desc}</desc>
        <circle cx={50} cy={50} r={20}/>
        {children}
        {React.cloneElement(portalComponent, {ref: this.savePortalRef})}
      </svg>
    );
  }
}
