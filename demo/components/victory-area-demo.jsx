/*global window:false */
import React from "react";
import _ from "lodash";
import {VictoryArea} from "../../src/index";
import {VictoryLabel} from "victory-core";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(),
      arrayData: this.getArrayData(),
      groupedData: this.getGroupedData()
    };
  }

  getData() {
    return _.map(_.range(100), (i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }

  getGroupedData() {
    return _.map(_.range(7), () => {
      return [
        {
          x: "rabbits",
          y: _.random(1, 5)
        },
        {
          x: "cats",
          y: _.random(1, 10)
        },
        {
          x: "dogs",
          y: _.random(2, 10)
        },
        {
          x: "birds",
          y: _.random(2, 10)
        },
        {
          x: "frogs",
          y: _.random(2, 15)
        }
      ];
    });
  }

  getArrayData() {
    return _.range(40).map((i) => [i, i + (Math.random() * 3)]);
  }

  getStyles() {
    const colors = ["red", "orange", "gold", "tomato", "magenta", "purple"];
    return {
      fill: colors[_.random(0, 5)],
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        data: this.getData(),
        groupedData: this.getGroupedData(),
        style: this.getStyles()
      });
    }, 2000);
  }

  render() {
    return (
      <div className="demo">
        <VictoryArea
          style={{parent: {border: "1px solid black", margin: "5px"}, data: this.state.style}}
          data={this.state.data}
          label={"label\none"}
          animate={{velocity: 0.03}}
        />

        <VictoryArea
          stacked
          style={{parent: {border: "1px solid black", margin: "5px"}}}
          data={[
            [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 5, y: 7}],
            [{x: 1, y: 1}, {x: 2, y: 4}, {x: 3, y: 5}, {x: 4, y: 7}, {x: 5, y: 5}],
            [{x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 5, y: 6}],
            [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 7}]
          ]}
        />
        <VictoryArea
          colorScale={["cyan", "magenta"]}
          style={{parent: {border: "1px solid black", margin: "5px"}, data: {opacity: 0.4}}}
          data={[
            [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 5, y: 7}],
            [{x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 5, y: 6}]
          ]}
        />

        <VictoryArea
          stacked
          colorScale={"green"}
          style={{parent: {border: "1px solid black", margin: "5px"}}}
          data={this.state.groupedData}
          animate={{velocity: 0.03}}
        />

      <VictoryArea
          style={{parent: {border: "1px solid black", margin: "5px"}, data: {fill: "red"}}}
          data={_.range(0, 100)}
          x={null}
          y={(d) => Math.sin(d)}
        />

      <VictoryArea
          style={{parent: {border: "1px solid black", margin: "5px"}}}
          data={this.state.arrayData}
          x={0}
          y={1}
        />

      <VictoryArea
          style={{parent: {border: "1px solid black", margin: "5px"}}}
          data={[
            {x: new Date(1982, 1, 1), y: 125},
            {x: new Date(1987, 1, 1), y: 257},
            {x: new Date(1993, 1, 1), y: 345},
            {x: new Date(1997, 1, 1), y: 515},
            {x: new Date(2001, 1, 1), y: 132},
            {x: new Date(2005, 1, 1), y: 305},
            {x: new Date(2011, 1, 1), y: 270},
            {x: new Date(2015, 1, 1), y: 470}
          ]}
        />

        <VictoryArea
          style={{parent: {border: "1px solid black", margin: "5px"}}}
          data={[
            {x: 1, y: 1},
            {x: 2, y: 3},
            {x: 3, y: 5},
            {x: 4, y: 2},
            {x: 5, y: null},
            {x: 6, y: null},
            {x: 7, y: 6},
            {x: 8, y: 7},
            {x: 9, y: 8},
            {x: 10, y: 12}
          ]}
        />
      </div>
    );
  }
}
