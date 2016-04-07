/*global window:false */
import React from "react";
import _ from "lodash";
import {VictoryArea, VictoryStack, VictoryGroup} from "../../src/index";

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
      fill: colors[_.random(0, 5)]
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
        <VictoryArea/>

        <VictoryArea
          style={{parent: {border: "1px solid black", margin: "5px"}, data: this.state.style}}
          data={this.state.data}
          label={"label\none"}
          animate={{duration: 2000}}
        />

        <VictoryStack style={{parent: {border: "1px solid black", margin: "5px"}}}>
          <VictoryArea label={"one"}
            data={[{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 5, y: 7}]}
          />
          <VictoryArea label={"two"}
            data={[{x: 1, y: 1}, {x: 2, y: 4}, {x: 3, y: 5}, {x: 4, y: 7}, {x: 5, y: 5}]}
          />
          <VictoryArea label={"three"}
            data={[{x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 5, y: 6}]}
          />
          <VictoryArea label={"four"}
            data={[{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 7}]}
          />
        </VictoryStack>

        <VictoryGroup
          style={{
            parent: {border: "1px solid black", margin: "5px"},
            data: {strokeWidth: 2, fillOpacity: 0.4}
          }}
        >
          <VictoryArea
            style={{data: {fill: "cyan", stroke: "cyan"}}}
            data={[{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 5, y: 7}]}
          />
          <VictoryArea
            style={{data: {fill: "magenta", stroke: "magenta"}}}
            data={[{x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 5, y: 6}]}
          />
        </VictoryGroup>

        <VictoryStack
          style={{parent: {border: "1px solid black", margin: "5px"}}}
          colorScale={"green"}
          animate={{duration: 2000}}
        >
          {this.state.groupedData.map((data, index) => <VictoryArea data={data} key={index}/>)}
        </VictoryStack>


        <VictoryArea
          style={{parent: {border: "1px solid black", margin: "5px"}, data: {fill: "red"}}}
          interpolation={"basis"}
          data={_.range(0, 100)}
          x={null}
          y={(d) => Math.sin(d)}
        />

        <VictoryArea
          style={{
            parent: {border: "1px solid black", margin: "5px"},
            data: {fill: "gold"}
          }}
          data={this.state.arrayData}
          x={0}
          y={1}
          events={{data: {
            onMouseOver: () => {
              return {
                style: {
                  fill: "gold",
                  stroke: "orange",
                  strokeWidth: 3
                }
              };
            },
            onMouseOut: () => {
              return null;
            }
          }}}
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

      <svg width={450} height={300} style={{border: "1px solid black", margin: "5px"}}>
        <VictoryArea y={(data) => Math.sin(data.x)} style={{data: {opacity: 0.4}}}/>
        <VictoryArea y={(data) => Math.cos(data.x)} style={{data: {opacity: 0.4}}}/>
      </svg>
      </div>
    );
  }
}
