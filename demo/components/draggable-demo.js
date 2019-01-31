/*eslint-disable no-magic-numbers */

import React from "react";
import { VictoryChart } from "../../packages/victory-chart/src/index";
import { VictoryAxis } from "../../packages/victory-axis/src/index";
import { VictoryBar } from "../../packages/victory-bar/src/index";
import { VictoryBrushLine } from "../../packages/victory-brush-line/src/index";
import { VictoryScatter } from "../../packages/victory-scatter/src/index";
import { VictoryClipContainer, Point, Selection } from "../../packages/victory-core/src/index";
import { VictoryZoomContainer } from "../../packages/victory-zoom-container/src/index";
import { VictoryBrushContainer } from "../../packages/victory-brush-container/src/index";

const bars = [
  { name: "SEA", range: [new Date(2013, 1, 1), new Date(2019, 1, 1)] },
  { name: "HKG", range: [new Date(2015, 1, 1), new Date(2015, 5, 1)] },
  { name: "LHR", range: [new Date(2016, 5, 1), new Date(2019, 1, 1)] },
  { name: "DEN", range: [new Date(2018, 8, 1), new Date(2019, 1, 1)] }
];

const points = [
  { name: "SEA", date: new Date(2012, 9, 1) },
  { name: "HKG", date: new Date(2014, 3, 1) },
  { name: "LHR", date: new Date(2015, 6, 1) },
  { name: "DEN", date: new Date(2018, 3, 1) }
];

class DraggablePoint extends React.Component {
  static defaultEvents = [
    {
      target: "data",
      eventHandlers: {
        onMouseOver: (evt, targetProps) => {
          return [{
            mutation: (props) => {
              const style = Object.assign({}, props.style, { strokeWidth: 40 });
              return Object.assign(
                {},
                targetProps,
                { active: true, style }
              );
            }
          }]
        },
        onMouseDown: (evt, targetProps) => {
          return [{
            mutation: () => Object.assign({}, targetProps, { dragging: true })
          }]
        },
        onMouseMove: (evt, targetProps) => {
          const { scale, onPointChange, datum } = targetProps;
          if (targetProps.dragging) {
            const { x } = Selection.getSVGEventCoordinates(evt);
            const point = scale.x.invert(x);
            const name = datum.name;
            onPointChange({ name, date: point })
            return [{
              mutation: () => Object.assign({}, targetProps, { x })
            }]
          }
          return null;
        },
        onMouseUp: (evt, targetProps) => {
          return [{
            mutation: () => Object.assign({}, targetProps, { dragging: false })
          }]
        },
        onMouseLeave: (evt, targetProps) => {
          return [{
            mutation: (props) => {
              const style = Object.assign({}, props.style, { strokeWidth: 0 });
              return Object.assign(
                {},
                targetProps,
                { dragging: false, active: false, style }
              );
            }
          }]
        }
      }
    }
  ];

  render() {
    return (
      <Point {...this.props}/>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { bars, points };
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  onDomainChange(domain, props) {
    const { name } = props;
    const newBars = this.state.bars.map((bar) => bar.name === name ? { name, range: domain } : bar);
    this.setState({ bars: newBars });
  }

  onPointChange(point) {
    const newPoints = this.state.points.map((p) => (
      p.name === point.name ? point : p
    ));
    this.setState({ points: newPoints });
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const sharedProps = {
      width: 800,
      domain: { x: [new Date(2012, 1, 1), new Date(2019, 1, 1)], y: [0.5, 4.5] },
      scale: { x: "time" }
    };

    return (
      <div style={containerStyle}>
        <VictoryChart
          {...sharedProps}
          height={400}
          padding={{ top: 50, left: 50, right: 0, bottom: 10 }}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              allowPan={false}
              zoomDomain={this.state.zoomDomain}
              zoomDimension="x"
              onZoomDomainChange={this.handleZoom.bind(this)}
              clipContainerComponent={
                <VictoryClipContainer clipPadding={{ top: 15, bottom: 15 }} />
              }
            />
          }
        >
          <VictoryAxis orientation="left"
            style={{
              axis: { stroke: "none" }
            }}
            tickValues={bars.map((b) => b.name)}
          />

          {bars.map((bar, index) => (
            <VictoryAxis
              dependentAxis
              orientation="bottom"
              key={index}
              axisComponent={
                <VictoryBrushLine
                  name={bar.name}
                  width={20}
                  allowDraw={false}
                  brushDomain={bar.range}
                  onBrushDomainChange={this.onDomainChange.bind(this)}
                  brushStyle={{
                    fill: "skyBlue",
                    opacity: (d, a) => (a ? 1 : 0.5),
                  }}
                />
              }
              style={{
                axis: { stroke: "none" }
              }}
              axisValue={bar.name}
              tickFormat={() => ""}
            />
          ))}
          <VictoryScatter
            data={points}
            dataComponent={
              <DraggablePoint
                onPointChange={this.onPointChange.bind(this)}
              />
            }
            style={{
              data: {
                fill: "skyBlue",
                opacity: (d, a) => (a ? 1 : 0.5),
                cursor: "move"
              }
            }}
            x="date"
            y="name"
            size={10}
          />
        </VictoryChart>
        <VictoryChart
          horizontal
          {...sharedProps}
          padding={{ top: 0, left: 50, right: 0, bottom: 30 }}
          scale={{ x: "time" }}
          height={120}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDomain={this.state.zoomDomain}
              brushDimension="x"
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis orientation="left"
            tickValues={this.state.bars.map((b) => b.name)}
          />
          <VictoryAxis dependentAxis orientation="bottom"
            tickValues={[
              new Date(2012, 6, 1),
              new Date(2014, 6, 1),
              new Date(2016, 6, 1),
              new Date(2018, 6, 1)
            ]}
            tickFormat={(t) => t.getFullYear()}
          />
          <VictoryScatter
            data={this.state.points}
            size={5}
            style={{
              data: { fill: "skyBlue" }
            }}
            x="name"
            y="date"
          />
          <VictoryBar
            style={{
                data: { fill: "skyBlue" }
              }}
            data={this.state.bars}
            x="name"
            y={(d) => d.range[0]}
            y0={(d) => d.range[1]}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default App;
