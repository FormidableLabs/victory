/*global window:false*/
import { merge, random, range } from "lodash";
import React from "react";
import { VictoryPie } from "../src/index";
import Slice from "../src/components/slice";
import {
  VictoryContainer
} from "victory-core";

class BorderLabelSlice extends React.Component {
  static propTypes = {
    ...Slice.propTypes,
    index: React.PropTypes.number
  };

  render() {
    const {index} = this.props;

    return (
      <g key={`slice-and-label-${index}`}>
        {this.renderSlice(this.props)}
        {this.renderLabel(this.props)}
      </g>
    );
  }

  renderSlice(props) {
    return <Slice {...props} />;
  }

  renderLabel(props) {
    const {pathFunction, datum, slice, index} = props;

    const path = pathFunction({...slice, endAngle: slice.startAngle});

    const pathId = `textPath-path-${index}`;

    return (
      <g>
        <path id={pathId} d={path} />
        <text>
          <textPath xlinkHref={`#${pathId}`}>
            {datum.label || datum.xName || datum.x}
          </textPath>
        </text>
      </g>
    );
  }

}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.getData(),
      transitionData: this.getTransitionData(),
      colorScale: [
        "#D85F49",
        "#F66D3B",
        "#D92E1D",
        "#D73C4C",
        "#FFAF59",
        "#E28300",
        "#F6A57F"
      ],
      sliceWidth: 60,
      style: {
        parent: {
          border: "1px solid #ccc",
          margin: "2%",
          maxWidth: "40%"
        },
        data: {
          strokeWidth: 2
        },
        labels: {
          fill: "white",
          padding: 10
        }
      }
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: this.getData(),
        transitionData: this.getTransitionData()
      });
    }, 2000);
  }

  getTransitionData() {
    const data = random(6, 10);
    return range(data).map((datum) => {
      return {
        x: datum,
        y: random(2, 10),
        label: `#${datum}`
      };
    });
  }

  getData() {
    const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);
    return [
      { x: "<5", y: rand(), label: "A", fill: "grey" },
      { x: "5-13", y: rand() },
      { x: "14-17", y: rand() },
      { x: "18-24", y: rand() },
      { x: "25-44", y: rand() },
      { x: "45-64", y: rand() },
      { x: "≥65", y: rand() }
    ];
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };
    return (
      <div>
        <h1>VictoryPie Demo</h1>

        <div style={containerStyle}>
          <VictoryPie animate={{duration: 1000}}
            style={{
              parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"},
              labels: {fontSize: 10, padding: 100, fill: "white"}
            }}
            data={this.state.transitionData}
            containerComponent={
              <VictoryContainer
                title="Animated Pie Chart"
                desc="This pie chart shows some data, which is described here."
              />}
          />

          <VictoryPie
            style={this.state.style}
            labels={() => "click me!"}
            events={[{
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: (props) => {
                        return {
                          style: merge({}, props.style, {fill: "orange"})
                        };
                      }
                    }, {
                      target: "labels",
                      mutation: () => {
                        return {text: "hey"};
                      }
                    }
                  ];
                }
              }
            }]}
          />

          <VictoryPie
            style={{
              parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"},
              labels: {fontSize: 20, padding: 100, fill: "white"}
            }}
            colorScale="greyscale"
          />

          <VictoryPie style={this.state.style} innerRadius={140} />

          <VictoryPie
            style={{
              parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"},
              data: {stroke: "transparent", opacity: 0.4}
            }}
          />

          <VictoryPie style={this.state.style} startAngle={-90} endAngle={90} />

          <VictoryPie
            style={{...this.state.style, labels: {fontSize: 0}}}
            data={this.state.data}
            innerRadius={100}
            animate={{duration: 2000}}
            colorScale={this.state.colorScale}
            dataComponent={<BorderLabelSlice />}
          />

          <VictoryPie
            style={this.state.style}
            data={this.state.data}
            innerRadius={100}
            animate={{duration: 2000}}
            colorScale={this.state.colorScale}
          />

          <VictoryPie
            style={this.state.style}
            endAngle={90}
            innerRadius={140}
            padAngle={5}
            startAngle={-90}
          />

          <VictoryPie
            data={range(0, 6).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            animate={{duration: 2000}}
            style={this.state.style}
            colorScale="warm"
          />

          <VictoryPie
            data={range(0, 6).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            style={this.state.style}
            animate={{duration: 2000}}
            colorScale="qualitative"
          />

          <VictoryPie style={this.state.style}
            data={range(0, 2).map((i) => [i, Math.random()])}
            x={0}
            y={1}
            colorScale={["#FF2800", "#FFF"]}
            labels={[""]}
            cornerRadius={20}
            startAngle={-6}
            animate={{duration: 2000}}
            innerRadius={140}
          />
        </div>
      </div>
    );
  }
}
