/*global document:false*/
import React from "react";
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
      color: 'red'
    }
  }
  clickHandler() {
    this.setState({
      x: this.state.x === 0 ? 500 : 0,
      w: this.state.w === 500 ? 200 : 500,
      h: this.state.h === 500 ? 200 : 500,
      br: this.state.br === 500 ? 0 : 500,
      color: this.state.color === 'red' ? 'blue' : 'red'
    });
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.clickHandler}>Toggle X</button>
        <VictoryAnimation data={{x: this.state.x, w: this.state.w, h: this.state.h, color: this.state.color, br: this.state.br}} transition={['x']}>
          {(data) => {
            return <div style={{position: 'relative', left: data.x, width: data.w, height: data.h, backgroundColor: data.color, color: 'white', fontFamily: 'Lucida Grande', padding: 40, borderRadius: data.br}}></div>
          }}
        </VictoryAnimation>
      </div>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
