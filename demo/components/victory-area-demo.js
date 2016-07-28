/*global window:false */
import React from "react";
import { merge, random, range } from "lodash";
import {VictoryArea, VictoryStack, VictoryGroup, VictoryChart} from "../../src/index";
import { VictoryContainer, VictoryTheme } from "victory-core";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData(),
      arrayData: this.getArrayData(),
      groupedData: this.getGroupedData(),
      multiTransitionData: this.getMultiTransitionData(),
      areaTransitionData: this.getAreaTransitionData()
    };
  }

  getMultiTransitionData() {
    const areas = random(8, 10);
    return range(8).map(() => {
      return range(areas).map((area) => {
        return {x: area, y: random(2, 10)};
      });
    });
  }

  getAreaTransitionData() {
    const areas = random(6, 10);
    return range(areas).map((area) => {
      return {x: area, y: random(2, 10)};
    });
  }

  getData() {
    return range(100).map((i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }

  getGroupedData() {
    return range(7).map(() => {
      return [
        {
          x: "rabbits",
          y: random(1, 5)
        },
        {
          x: "cats",
          y: random(1, 10)
        },
        {
          x: "dogs",
          y: random(2, 10)
        },
        {
          x: "birds",
          y: random(2, 10)
        },
        {
          x: "frogs",
          y: random(2, 15)
        }
      ];
    });
  }

  getArrayData() {
    return range(40).map((i) => [i, i + (Math.random() * 3)]);
  }

  getStyles() {
    const colors = ["red", "orange", "gold", "tomato", "magenta", "purple"];
    return {
      fill: colors[random(0, 5)]
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        data: this.getData(),
        groupedData: this.getGroupedData(),
        multiTransitionData: this.getMultiTransitionData(),
        areaTransitionData: this.getAreaTransitionData(),
        style: this.getStyles()
      });
    }, 2000);
  }

  render() {
    const style = {
      parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}
    };

    return (
      <div className="demo">
        <VictoryChart style={style} scale={{y: "log"}}>
          <VictoryArea
            style={{data: {fill: "cyan", stroke: "cyan"}}}
            data={[{x: 1, y: 0.2}, {x: 2, y: 3}, {x: 3, y: 50}, {x: 4, y: 400}, {x: 5, y: 70}]}
          />
        </VictoryChart>

        <VictoryChart style={style} scale={{x: "log"}}>
          <VictoryArea
            style={{data: {fill: "cyan", stroke: "cyan"}}}
            data={[{x: 1, y: 0.2}, {x: 2, y: 3}, {x: 3, y: 50}, {x: 4, y: 400}, {x: 5, y: 70}]}
          />
        </VictoryChart>

        <VictoryArea
          style={style} animate={{duration: 1000}}
          data={this.state.areaTransitionData}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryContainer
              title="Area Chart"
              desc="This is an animated area chart that displays data."
            />
          }
        />

        <VictoryStack
          style={style}
          animate={{duration: 1000}}
          colorScale={"warm"}
          containerComponent={
            <VictoryContainer
              desc="This is an animated area chart that displays data in a range of colors."
            />
          }
        >
          {this.state.multiTransitionData.map((data, index) => {
            return (
              <VictoryArea
                key={index}
                data={data}
                interpolation={"basis"}
              />
            );
          })}
        </VictoryStack>

        <VictoryArea style={style} />

        <VictoryArea
          style={{parent: style.parent, data: this.state.style}}
          data={this.state.data}
          label={"label\none"}
          animate={{duration: 2000}}
        />

      <VictoryStack style={{parent: style.parent}}>
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
            parent: style.parent,
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
          style={{parent: style.parent}}
          colorScale={"green"}
          animate={{duration: 2000}}
        >
          {this.state.groupedData.map((data, index) => <VictoryArea data={data} key={index}/>)}
        </VictoryStack>


        <VictoryArea
          style={{parent: style.parent, data: {fill: "red"}}}
          interpolation={"basis"}
          data={range(0, 100)}
          x={null}
          y={(d) => Math.sin(d)}
        />

        <VictoryArea
          style={{
            parent: style.parent,
            data: {fill: "gold"}
          }}
          events={[{
            target: "parent",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "data",
                    mutation: (props) => {
                      return {style: merge({}, props.style, {fill: "orange"})};
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
          data={this.state.arrayData}
          x={0}
          y={1}

        />

        <VictoryArea
          style={{parent: style.parent}}
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
          style={{parent: style.parent}}
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

        <svg
          width={450}
          height={300}
          style={style.parent}
        >
          <VictoryArea
            y={(data) => Math.sin(data.x)}
            standalone={false}
            style={{data: {opacity: 0.4}}}
          />
          <VictoryArea
            y={(data) => Math.cos(data.x)}
            standalone={false}
            style={{data: {opacity: 0.4}}}
          />
        </svg>

        <VictoryChart
          style={style}
          theme={VictoryTheme.material}
        >
          <VictoryArea
            style={style} animate={{duration: 1000}}
            data={this.state.areaTransitionData}
            containerComponent={
              <VictoryContainer
                title="Area Chart"
                desc="This is an animated area chart that displays data."
              />
            }
          />
        </VictoryChart>

        <VictoryStack
          style={style}
          animate={{duration: 1000}}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryContainer
              desc="This is an animated area chart that displays data in a range of colors."
            />
          }
        >
          {this.state.multiTransitionData.map((data, index) => {
            return (
              <VictoryArea
                key={index}
                data={data}
                interpolation={"basis"}
              />
            );
          })}
        </VictoryStack>

        <VictoryStack style={{parent: style.parent}} theme={VictoryTheme.material}>
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

        <VictoryChart
          style={style}
          theme={VictoryTheme.material}
        >
          <VictoryArea
            style={style}
            data={[]}
          />
        </VictoryChart>

      </div>
    );
  }
}
