/*eslint-disable no-magic-numbers */
/*global window:false*/

import React from "react";
import {
  VictoryChart, VictoryBar
} from "../../src/index";
import { range } from "lodash";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: this.getData()
    };
  }

  componentWillMount() {
    window.setInterval(() => {
      this.setState({
        data: this.getData()
      });
    }, 3000);
  }

  getData() {
    return range(10).map((i) => {
      return {
        x: i,
        y: Math.random()
      };
    });
  }

  removeMutation() {
    this.setState({
      externalMutation: undefined
    });
  }

  handleClick() {
    const callback = this.removeMutation.bind(this);
    this.setState({
      externalMutation: [{
        childName: "bar",
        target: ["data", "labels"],
        eventKey: "all",
        mutation: (props) => {
          const fill = props.style && props.style.fill;
          return fill === "blue" ?
            { style: Object.assign({}, props.style, { fill: "red" }) } :
            { style: Object.assign({}, props.style, { fill: "blue" }) };
        },
        callback
      }]
    });
  }

  clearMutation() {
    const callback = this.removeMutation.bind(this);
    this.setState({
      externalMutation: [
        {
          childName: "bar",
          target: "all",
          eventKey: "all",
          mutation: () => ({ style: undefined }),
          callback
        }
      ]
    });
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };
    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };
    return (
      <div className="demo">
        <h1>Debug</h1>
        <div style={containerStyle}>
        <ul>
        <li><button onClick={this.handleClick.bind(this)}>External Mutation</button></li>
        <li><button onClick={this.clearMutation.bind(this)}>Clear Mutation</button></li>
        </ul>
        <VictoryChart style={chartStyle} domainPadding={{ x: 40 }}
          animate
          externalEventMutations={this.state.externalMutation}
          events={[
            {
              childName: "bar",
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: () => {
                        return { style: { fill: "orange" } };
                      }
                    }, {
                      target: "labels",
                      mutation: (props) => {
                        return props.text === "clicked" ? { text: "unclicked" } : { text: "clicked" };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        >
          <VictoryBar
            name="bar"
            data={this.state.data}
            style={{ data: { fill: "cyan" } }}
          />
        </VictoryChart>

        <VictoryBar style={chartStyle}
          animate
          data={this.state.data}
          externalEventMutations={this.state.externalMutation}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      mutation: () => {
                        return { style: { fill: "orange" } };
                      }
                    }, {
                      target: "labels",
                      mutation: (props) => {
                        return props.text === "clicked" ?
                          { text: "unclicked" } : { text: "clicked" };
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />
        </div>
      </div>
    );
  }
}

export default App;
