import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";

@Radium
class VictoryChart extends React.Component {
  constructor(props) {
    super(props);
    /*
       Our use-cases are:
       1. The user passes in data as an array of {x: 1, y: 2}
       2. The user provides no x; make it from xMin and xMax
       3. The user provides x as an array of points; leave it be
       4. The user provides y as an array of points; leave it be
       5. The user provides y as a function; use x to generate y
     */
    if (this.props.data) {
      this.state = {
        data: this.props.data,
        x: this.props.data.map(row => row.x),
        y: this.props.data.map(row => row.y)
      };
    } else {
      this.state = {};
      this.state.x = this.returnOrGenerateX();
      this.state.y = this.returnOrGenerateY();

      const inter = _.zip(this.state.x, this.state.y);
      const objs = _.map(inter, (obj) => { return {x: obj[0], y: obj[1]}; });

      this.state.data = objs;
    }
  }

  returnOrGenerateX() {
    const step = Math.round(this.props.xMax / this.props.sample, 4);
    return this.props.x
         ? this.props.x
         : _.range(this.props.xMin, this.props.xMax, step);
  }

  returnOrGenerateY() {
    const y = this.props.y;
    if (typeof y === "object" && y.isArray()) {
      return y;
    } else if (typeof y === "function") {
      return _.map(this.state.x, (x) => y(x));
    } else {
      // asplode
      return null;
    }
  }

  getStyles() {
    return _.merge({
      base: {
        color: "#000",
        fontSize: 12,
        textDecoration: "underline"
      },
      red: {
        color: "#d71920",
        fontSize: 30
      }
    }, this.props.style);
  }

  render() {
    const styles = this.getStyles();
    return (
      <g>
        <VictoryChart style={[style.text]}
      </g>
    );
  }
}

VictoryChart.propTypes = {
  color: React.PropTypes.string
};

VictoryChart.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    })
  ),
  interpolation: React.PropTypes.oneOf([
    "linear",
    "linear-closed",
    "step",
    "step-before",
    "step-after",
    "basis",
    "basis-open",
    "basis-closed",
    "bundle",
    "cardinal",
    "cardinal-open",
    "cardinal-closed",
    "monotone"
  ]),
  sample: React.PropTypes.number,
  scale: React.PropTypes.func,
  style: React.PropTypes.node,
  x: React.PropTypes.array,
  xMax: React.PropTypes.number,
  xMin: React.PropTypes.number,
  yMax: React.PropTypes.number,
  yMin: React.PropTypes.number,
  y: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func
  ])
};

VictoryChart.defaultProps = {
  data: null,
  interpolation: "basis",
  sample: 100,
  scale: (min, max) => d3.scale.linear().range([min, max]),
  x: null,
  xMax: 100,
  xMin: 0,
  y: () => Math.random(),
  yMax: 100,
  yMin: 0
};

export default VictoryChart;
