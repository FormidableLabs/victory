import d3 from "d3";
import React from "react";
import Radium from "radium";

@Radium
class VictoryDonut extends React.Component {

  drawSlices(slices) {
    var radius = Math.min(this.props.width, this.props.height) / 2;

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.population; });

    var arcData = pie(slices);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var sliceComponents = slices.map((slice, index) => {
      return this.props.slice(slice, arc, radius, arcData[index], index);
    });

    return (
      <g>
        {sliceComponents}
      </g>
    );
  }

  render() {
    return (
      <g transform={"translate(" + this.props.width / 2 + "," + this.props.height / 2 + ")"}>
        {this.drawSlices(this.props.data)}
      </g>
    );
  }
}

VictoryDonut.propTypes = {
  color: React.PropTypes.string
};

export default VictoryDonut;
