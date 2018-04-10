
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

const getAnimationDecorator = (updateState) => {
  return (story) => {
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
        const boundStory = story.bind(this);
        return (
          <div className="chromatic-ignore" style={{ height: 250 }}>
            {boundStory(this)}
          </div>
        );
      }
    }
    return <AnimatingContainer/>;
  }
}

export { getChartDecorator, getAnimationDecorator };
