
/*global window:false*/
/*eslint-disable no-magic-numbers*/
/*eslint-disable react/no-multi-comp*/
import React from "react";
import { VictoryChart } from "../src/index";

const getChartDecorator = (props) => {
  return (story) => {
    return (
      <VictoryChart {...props}>
        {story()}
      </VictoryChart>
    );
  };
};

const ignoredDecorator = (story) => {
  return (
    <div className="chromatic-ignore">
      {story()}
    </div>
  );
};

const getAnimatingComponent = (child, updateState) => {
  class AnimatingContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = updateState();
    }

    componentDidMount() {
      window.setInterval(() => {
        this.setState(updateState());
      }, 3000);
    }

    componentWillUnmount() {
      window.clearInterval(this.setStateInterval);
    }

    render() {
      return (
        <div className="chromatic-ignore" style={{ height: 250 }}>
          {React.cloneElement(child, this.state)}
        </div>
      );
    }
  }
  return <AnimatingContainer/>;
};

export { getChartDecorator, getAnimatingComponent, ignoredDecorator };
