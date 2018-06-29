/*eslint-disable no-magic-numbers*/
import React from "react";
import { VictoryAnimation } from "../src/index";

export default class App extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      x: 0,
      w: 500,
      h: 500,
      br: 0,
      color: "#3498db",
      rotate: 0
    };
  }
  handleClick() {
    this.setState({
      x: this.state.x === 0 ? 150 : 0,
      w: this.state.w === 500 ? 200 : 500,
      h: this.state.h === 500 ? 200 : 500,
      br: this.state.br === 500 ? 0 : 500,
      color: this.state.color === "#3498db" ? "#2ecc71" : "#3498db",
      rotate: this.state.rotate === 0 ? 360 : 0
    });
  }
  render() {
    return (
      <div>
        <div style={{ float: "left", width: 520, height: 520 }}>
          <button type="button" onClick={this.handleClick}>Toggle X</button>
          <VictoryAnimation data={
            {
              x: this.state.x,
              w: this.state.w,
              h: this.state.h,
              color: this.state.color,
              br: this.state.br,
              rotate: this.state.rotate
            }}
          >
            {(data) => {
              return (
                <div style={
                  {
                    position: "relative",
                    left: data.x,
                    width: data.w,
                    height: data.h,
                    backgroundColor: data.color,
                    color: "white",
                    fontFamily: "Lucida Grande",
                    padding: 40,
                    borderRadius: data.br,
                    textAlign: "center",
                    alignItems: "center",
                    display: "flex",
                    fontSize: 40,
                    transform: `rotate(${data.rotate}deg)`
                  }}
                >
                  <div style={{ textAlign: "center", width: "100%" }}>Test</div>
                </div>
              );
            }}
          </VictoryAnimation>
        </div>
        <div style={{ float: "left" }}>
          <VictoryAnimation data={[
            { background: "red" },
            { background: "green" },
            { background: "blue" } ]}
            delay={500}
          >
            {(style) => (
              <div style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                ...style }}
              />
            )}
          </VictoryAnimation>
        </div>
      </div>
    );
  }
}
