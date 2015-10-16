/*global document:false*/
import React from "react";
import ReactDOM from "react-dom";
import {VictoryAnimation} from "../src/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      x: 0,
      w: 500,
      h: 500,
      br: 0,
      color: "#3498db",
      rotate: 0
    };
  }
  clickHandler() {
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
        <button type="button" onClick={this.clickHandler}>Toggle X</button>
        <VictoryAnimation data={
          {
            x: this.state.x,
            w: this.state.w,
            h: this.state.h,
            color: this.state.color,
            br: this.state.br,
            rotate: this.state.rotate
          }}>
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
                  transform: "rotate(" + data.rotate + "deg)"
                }}>
                <div style={{textAlign: "center", width: "100%"}}>Test</div>
              </div>
            );
          }}
        </VictoryAnimation>
      </div>
    );
  }
}

const content = document.getElementById("content");

ReactDOM.render(<App/>, content);
