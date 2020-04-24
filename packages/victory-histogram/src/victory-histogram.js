import React from "react";
import PropTypes from "prop-types";
import { VictoryBar } from "../../victory-bar/src";
import { VictoryAxis } from "../../victory-axis/src";
import { VictoryChart } from "../../victory-chart/src";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

// const defaultData = Array.from({ length: 40 }, () => ({
//   x: Math.floor(Math.random() * 100)
// }));

const defaultData = [
  {
    x: 3
  },
  { x: 0 },
  {
    x: 9
  },
  {
    x: 63
  },
  {
    x: 9
  },
  {
    x: 92
  },
  {
    x: 67
  },
  {
    x: 40
  },
  {
    x: 56
  },
  {
    x: 4
  },
  {
    x: 15
  },
  {
    x: 47
  },
  {
    x: 74
  },
  {
    x: 86
  },
  {
    x: 91
  },
  {
    x: 87
  },
  {
    x: 15
  },
  {
    x: 96
  },
  {
    x: 34
  },
  {
    x: 84
  },
  {
    x: 92
  },
  {
    x: 70
  },
  {
    x: 89
  },
  {
    x: 80
  },
  {
    x: 37
  },
  {
    x: 35
  },
  {
    x: 19
  },
  {
    x: 20
  },
  {
    x: 55
  },
  {
    x: 57
  },
  {
    x: 28
  },
  {
    x: 34
  },
  {
    x: 23
  },
  {
    x: 55
  },
  {
    x: 48
  },
  {
    x: 20
  },
  {
    x: 89
  },
  {
    x: 72
  },
  {
    x: 10
  },
  {
    x: 63
  },
  {
    x: 46
  }
  // { x: 100 }
];

export class VictoryHistogram extends React.Component {
  static propTypes = {
    barSpacing: PropTypes.number,
    barWidth: PropTypes.number,
    bins: PropTypes.number,
    data: PropTypes.any,
    style: PropTypes.any
  };

  static defaultProps = {
    data: defaultData
  };

  get accessor() {
    return (d) => d.x;
  }

  get scale() {
    const scale = d3Scale
      .scaleLinear()
      .domain(d3Array.extent(this.props.data, this.accessor))
      .nice();

    return scale;
  }

  get data() {
    const { bins } = this.props;
    const bin1 = d3Array.bin().value(this.accessor);
    bin1.domain(this.scale.domain());

    if (bins) {
      bin1.thresholds(bins);
    }

    const binnedData = bin1(this.props.data);

    const formattedData = binnedData.map((bin) => ({
      x: bin.x0,
      end: bin.x1,
      y: bin.length
    }));

    return formattedData;
  }

  getDistance = ({ scale, datum }) => {
    const current = scale.x(datum.x);
    const next = scale.x(datum.end);

    return Math.abs(next - current);
  };

  render() {
    const { barWidth, barSpacing, horizontal } = this.props;

    return (
      <VictoryChart>
        <VictoryBar
          {...this.props}
          domain={{ x: this.scale.domain() }}
          data={this.data}
          barWidth={(props) => {
            if (barWidth) {
              return barWidth;
            } else if (barSpacing) {
              return this.getDistance(props) - barSpacing;
            }

            return this.getDistance(props);
          }}
          barRatio={undefined}
          alignment="start"
          style={{
            ...this.props.style,
            data: {
              strokeWidth: 2,
              stroke: "black",
              fill: "gold",
              ...(this.props.style && this.props.style.data)
            }
          }}
          barOffset={(props) => {
            if (barWidth) {
              const distance = this.getDistance(props) / 2 - barWidth / 2;
              return [distance, 0];
            } else if (barSpacing) {
              const distance = barSpacing / 2;
              return [distance, 0];
            }

            return [0, 0];
          }}
        />

        <VictoryAxis />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
  }
}

export default VictoryHistogram;
