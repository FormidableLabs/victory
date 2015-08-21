import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";
import {VictoryLine} from "victory-line";
import {VictoryAxis} from "victory-axis";

@Radium
class VictoryChart extends React.Component {
  constructor(props) {
    super(props);
    const defaultData = (x) => x;
    // Initialize state
    this.state = {};
    // if no data is given as this.props.data or this.props.y, assign default data
    this.state.y = (!this.props.data && !this.props.y) ? defaultData : this.props.y;
    this.state.data = this.consolidateData();
  }

  getStyles() {
    return _.merge({
      color: "#000",
      fontSize: 12,
      margin: 50,
      width: 500,
      height: 300
    }, this.props.style);
  }

  consolidateData() {
    const datasets = [];
    // if y is given, construct data for all y, and add it to this.state.data
    if (this.state.y) {
      const xArray = this.returnOrGenerateX(); // returns an array
      const yArray = this.returnOrGenerateY(); // returns an array of arrays
      let n;
      // create dataArrays of n points from the x array and each y array
      const dataArrays = _.map(yArray, (y) => {
        n = _.min([xArray.length, y.length]);
        return _.zip(_.take(xArray, n), _.take(y, n));
      });

      // for each dataArray create an array of data points and add it to
      // the consolidated datasets
      _.each(dataArrays, (dataArray) => {
        datasets.push(_.map(dataArray, (datum) => {
          return {x: datum[0], y: datum[1]};
        }));
      });
    }
    // if data is given in this.props.data, add it to the cosolidated datasets
    if (this.props.data) {
      if (_.isArray(this.props.data[0])) {
        _.each(this.props.data, (data) => {
          datasets.push(data);
        });
      } else {
        datasets.push(this.props.data);
      }
    }

    // return an object containing each dataset with a unique name
    return _.map(datasets, (dataset, index) => {
      return {
        name: "data-" + index,
        data: dataset
      };
    });
  }

  returnOrGenerateX() {
    if (this.props.x) {
      return this.props.x;
    }
    // if x is not given in props, create an array of values evenly
    // spaced across the x domain

    // Determine how to calculate the domain:
    // domain based on this.props.domain if it is given
    const domainFromProps = (this.props.domain && this.props.domain.x) ?
      this.props.domain.x : this.props.domain;

    // domain based on this.props.data if it is given
    const domainFromData = this.props.data ?
      this._getDomainFromDataProps("x") : undefined;

    // domain based on this.props.scale
    // note: this.props.scale  will never be undefined thanks to default props
    const domainFromScale = this.props.scale.x ?
      this.props.scale.x().domain() : this.props.scale().domain();

    const domain = domainFromProps || domainFromData || domainFromScale;
    const samples = this._getNumSamples();
    const step = (_.max(domain) - _.min(domain)) / samples;
    return _.range(_.min(domain), _.max(domain), step);
  }

  // helper for returnOrGenerateX
  _getDomainFromDataProps(type) {
    const data = _.flatten(this.props.data);
    return [_.min(_.pluck(data, type)), _.max(_.pluck(data, type))];
  }

  // helper for returnOrGenerateX
  _getNumSamples() {
    if (_.isArray(this.state.y) && _.isNumber(this.state.y[0])) {
      return this.state.y.length;
    }
    return this.props.samples;
  }

  returnOrGenerateY() {
    // Always return an array of arrays.
    const y = this.state.y;
    const x = this.returnOrGenerateX();

    if (_.isFunction(y)) {
      return [_.map(x, (datum) => y(datum))];
    } else if (_.isArray(y)) {
      // y is an array of functions
      if (_.isFunction(y[0])) {
        return _.map(y, (yFn) => _.map(x, (datum) => yFn(datum)));
      } else {
        return [y];
      }
    } else {
      // asplode
      return null;
    }
  }

  getDomain(type) {
    if (this.props.domain) {
      return this._getDomainFromProps(type);
    }
    return this._getDomainFromDataState(type);
  }

  // helper method for getDomain
  _getDomainFromProps(type) {
    if (this.props.domain[type]) {
      // if the domain for this type is given, return it
      return this.props.domain[type];
    }
    // if the domain is given without the type specified, return the domain (reversed for y)
    return type === "x" ? this.props.domain : this.props.domain.concat().reverse();
  }

  // helper method for getDomain
  _getDomainFromDataState(type) {
    const data = _.map(this.state.data, (dataset) => {
      return dataset.data;
    });
    const min = [];
    const max = [];
    _.each(data, (datum) => {
      min.push(_.min(_.pluck(datum, type)));
      max.push(_.max(_.pluck(datum, type)));
    });
    return type === "x" ? [_.min(min), _.max(max)] : [_.max(max), _.min(min)];
  }

  getRange(type) {
    if (this.props.range) {
      return this.props.range[type] ? this.props.range[type] : this.props.range;
    }
    // if the range is not given in props, calculate it from width, height and margin
    const style = this.getStyles();
    const dimension = type === "x" ? "width" : "height";
    return [style.margin, style[dimension] - style.margin];
  }


  render() {
    const styles = this.getStyles();
    const lines = _.map(this.state.data, (data, index) => {
      return (
        <VictoryLine
          {...this.props}
          data={data.data} // TODO: ugh
          style={styles}
          domain={{x: this.getDomain("x"), y: this.getDomain("y")}} // maybe unnecessary
          range={{x: this.getRange("x"), y: this.getRange("y")}} // maybe unnecessary
          ref={data.name}
          key={index}/>
      );
    });
    return (
      <svg style={{width: styles.width, height: styles.height}}>
        {lines}
        <VictoryAxis
          {...this.props}
          domain={this.getDomain("x")} // maybe unnecessary
          range={this.getRange("x")} // maybe unnecessary
          orientation="bottom"
          style={styles}/>
        <VictoryAxis
          {...this.props}
          domain={this.getDomain("y")} // maybe unnecessary
          range={this.getRange("y")} // maybe unnecessary
          orientation="left"
          style={styles}/>
      </svg>
    );
  }
}

VictoryChart.propTypes = {
  style: React.PropTypes.node,
  data: React.PropTypes.oneOfType([ // maybe this should just be "node"
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        x: React.PropTypes.number,
        y: React.PropTypes.number
      })
    ),
    React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.shape({
          x: React.PropTypes.number,
          y: React.PropTypes.number
        })
      )
    )
  ]),
  x: React.PropTypes.array,
  y: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.func
  ]),
  domain: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.objectOf(
      React.PropTypes.shape({
        x: React.PropTypes.arrayOf(React.PropTypes.number),
        y: React.PropTypes.arrayOf(React.PropTypes.number)
      })
    )
  ]),
  range: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.objectOf(
      React.PropTypes.shape({
        x: React.PropTypes.arrayOf(React.PropTypes.number),
        y: React.PropTypes.arrayOf(React.PropTypes.number)
      })
    )
  ]),
  scale: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.objectOf(
      React.PropTypes.shape({
        x: React.PropTypes.func,
        y: React.PropTypes.func
      })
    )
  ]),
  samples: React.PropTypes.number,
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
  axisOrientation: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.string,
      y: React.PropTypes.string
    })
  ),
  axisLabels: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.string,
      y: React.PropTypes.string
    })
  ),
  labelPadding: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    })
  ),
  gridLines: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.bool,
      y: React.PropTypes.bool
    })
  ),
  tickValues: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.arrayOf(React.PropTypes.number),
      y: React.PropTypes.arrayOf(React.PropTypes.number)
    })
  ),
  tickFormat: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.func,
      y: React.PropTypes.func
    })
  ),
  tickCount: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    })
  ),
  tickSize: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    })
  ),
  tickPadding: React.PropTypes.objectOf(
    React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    })
  )
};

VictoryChart.defaultProps = {
  interpolation: "basis",
  samples: 100,
  scale: () => d3.scale.linear(),
  axisOrientation: {
    x: "bottom",
    y: "left"
  }
};

export default VictoryChart;
