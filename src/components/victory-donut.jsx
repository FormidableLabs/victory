import d3 from "d3";
import _ from "lodash";
import React from "react";
import Radium from "radium";
import {VictoryAnimation} from "victory-animation";

@Radium
class VictoryDonut extends React.Component {
  constructor(props) {
    super(props);
    const radius = Math.min(this.props.width, this.props.height) / 2;
    this.arc = d3.svg.arc().outerRadius(radius).innerRadius(radius - this.props.arcWidth);
    this.colors = d3.scale.ordinal().range(this.props.arcColors);
    this.pie = d3.layout.pie().sort(null).value((d) => { return d.y; });
  }

  getStyles(fill) {
    return {
      text: {
        fill: this.props.fontColor,
        fontFamily: this.props.fontFamily,
        fontSize: this.props.fontSize,
        fontWeight: this.props.fontWeight,
        textAnchor: "middle"
      },
      path: {
        fill,
        stroke: this.props.edgeColor,
        strokeWidth: this.props.edgeWidth
      }
    };
  }

  drawArcs(arcs) {
    const arcData = this.pie(this.props.data);

    const arcComponents = _.map(arcs, (arc, index) => {
      const fill = this.colors(arc.x);
      const styles = this.getStyles(fill);

      return (
        <VictoryAnimation data={arcData[index]} key={index}>
          {(data) => {
            return (
              <g>
                <path
                  d={this.arc(data)}
                  style={styles.path}/>
                <text
                  dy=".35em"
                  style={styles.text}
                  transform={"translate(" + this.arc.centroid(data) + ")"}>
                  {arc.x}
                </text>
              </g>
            );
          }}
        </VictoryAnimation>
      );
    });

    return (<g>{arcComponents}</g>);
  }

  render() {
    return (
      <svg
        height={this.props.height}
        width={this.props.width}>
        <g transform={"translate(" + this.props.width / 2 + "," + this.props.height / 2 + ")"}>
          {this.drawArcs(this.props.data)}
        </g>
      </svg>
    );
  }
}

VictoryDonut.propTypes = {
  arcColors: React.PropTypes.array,
  arcWidth: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  data: React.PropTypes.array,
  edgeColor: React.PropTypes.string,
  edgeWidth: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  fontColor: React.PropTypes.string,
  fontFamily: React.PropTypes.string,
  fontSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  fontWeight: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  height: React.PropTypes.number,
  width: React.PropTypes.number
};

VictoryDonut.defaultProps = {
  arcColors: [
    "#75C776",
    "#39B6C5",
    "#78CCC4",
    "#62C3A4",
    "#64A8D1",
    "#8C95C8",
    "#3BAF74"
  ],
  arcWidth: 60,
  data: [
    { x: "A", y: 1 },
    { x: "B", y: 2 },
    { x: "C", y: 3 },
    { x: "D", y: 1 },
    { x: "E", y: 2 }
  ],
  edgeColor: "white",
  edgeWidth: 1,
  fontColor: "black",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 10,
  fontWeight: 400,
  height: 400,
  width: 400
};

export default VictoryDonut;
