/*global window:false */
import React from "react";
import { random, range } from "lodash";
import {VictoryCandlestick} from "../../src/index";
// import {VictoryLabel} from "victory-core";

const getData = () => {
  const colors =
    ["violet", "cornflowerblue", "gold", "orange", "turquoise", "tomato", "greenyellow"];
  const symbols = ["circle", "star", "square", "triangleUp", "triangleDown", "diamond", "plus"];
  return range(100).map((index) => {
    const scaledIndex = Math.floor(index % 7);
    return {
      x: random(600),
      y: random(600),
      size: random(15) + 3,
      symbol: symbols[scaledIndex],
      fill: colors[random(0, 6)],
      opacity: random(0.3, 1)
    };
  });
};

const style = {
  parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "40%"}
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        data: getData()
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  render() {
    return (
      <div className="demo">
        <h1>Victory Candlestick</h1>

        <VictoryCandlestick
          style={{parent: style.parent}}
          candleColors={{positive: "purple", negative: "blue"}}
          data={[
            {x: 50, open: 9, close: 30, high: 56, low: 7},
            {x: 100, open: 80, close: 40, high: 100, low: 10},
            {x: 150, open: 50, close: 80, high: 90, low: 20},
            {x: 200, open: 70, close: 22, high: 70, low: 5},
            {x: 250, open: 20, close: 35, high: 50, low: 10},
            {x: 300, open: 35, close: 30, high: 40, low: 3},
            {x: 350, open: 30, close: 90, high: 95, low: 30},
            {x: 400, open: 80, close: 81, high: 83, low: 75}
          ]}
          size={8}
        />
      </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object)
};

App.defaultProps = {
  data: getData()
};
