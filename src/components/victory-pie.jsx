/*global console:false*/
import d3 from "d3";
import _ from "lodash";
import React from "react";
import Radium from "radium";
import {VictoryAnimation} from "victory-animation";

@Radium
class VictoryPie extends React.Component {
  constructor(props) {
    super(props);
    const radius = Math.min(this.props.width, this.props.height) / 2;
    const sortOrder = this.getSortOrder();

    this.colors = d3.scale.ordinal().range(this.props.sliceColors);

    this.slice = d3.svg.arc()
      .outerRadius(radius - this.props.padding)
      .innerRadius(this.props.innerRadius);

    this.label = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(this.props.labelPadding || this.props.innerRadius);

    this.pie = d3.layout.pie()
      .sort(sortOrder)
      .startAngle(this.convertToRadians(this.props.startAngle))
      .endAngle(this.convertToRadians(this.props.endAngle))
      .padAngle(this.convertToRadians(this.props.padAngle))
      .value((d) => { return d.y; });
  }

  convertToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  getSortOrder() {
    let comparator = this.props.sort;

    if (!_.isNull(comparator) && _.isString(comparator)) {
      if (comparator === "ascending" || comparator === "descending") {
        comparator = (a, b) => { return d3[this.props.sort](a.y, b.y); };
      } else {
        if (process.env.NODE_ENV !== "production") {
          /* eslint-disable no-console */
          if (typeof console !== "undefined" && console.warn) {
            console.error("Victory Pie: Invalid sort string. Try 'ascending' or 'descending'.");
          }
          /* eslint-enable no-console */
        }
        comparator = null;
      }
    }

    return comparator;
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
        stroke: this.props.borderColor,
        strokeWidth: this.props.borderWidth
      }
    };
  }

  drawArcs(slices) {
    const sliceData = this.pie(this.props.data);

    const sliceComponents = _.map(slices, (slice, index) => {
      const fill = this.colors(slice.x);
      const styles = this.getStyles(fill);

      return (
        <VictoryAnimation data={sliceData[index]} key={index}>
          {(data) => {
            return (
              <g>
                <path
                  d={this.slice(data)}
                  style={styles.path}/>
                <text
                  dy=".35em"
                  style={styles.text}
                  transform={"translate(" + this.label.centroid(data) + ")"}>
                  {slice.x}
                </text>
              </g>
            );
          }}
        </VictoryAnimation>
      );
    });

    return (<g>{sliceComponents}</g>);
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

VictoryPie.propTypes = {
  borderColor: React.PropTypes.string,
  borderWidth: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    x: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    y: React.PropTypes.number
  })),
  endAngle: React.PropTypes.number,
  fontColor: React.PropTypes.string,
  fontFamily: React.PropTypes.string,
  fontSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  fontWeight: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  height: React.PropTypes.number,
  innerRadius: React.PropTypes.number,
  labelPadding: React.PropTypes.number,
  padAngle: React.PropTypes.number,
  padding: React.PropTypes.number,
  sliceColors: React.PropTypes.arrayOf(React.PropTypes.string),
  sort: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(["ascending", "descending"]),
    React.PropTypes.func
  ]),
  startAngle: React.PropTypes.number,
  width: React.PropTypes.number
};

VictoryPie.defaultProps = {
  borderColor: "white",
  borderWidth: 1,
  data: [
    { x: "A", y: 1 },
    { x: "B", y: 2 },
    { x: "C", y: 3 },
    { x: "D", y: 1 },
    { x: "E", y: 2 }
  ],
  endAngle: 360,
  fontColor: "black",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: 10,
  fontWeight: 400,
  height: 400,
  innerRadius: 0,
  labelPadding: 0,
  padAngle: 0,
  padding: 0,
  sliceColors: [
    "#75C776",
    "#39B6C5",
    "#78CCC4",
    "#62C3A4",
    "#64A8D1",
    "#8C95C8",
    "#3BAF74"
  ],
  sort: null,
  startAngle: 0,
  width: 400
};

export default VictoryPie;
