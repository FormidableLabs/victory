/*eslint-disable react/no-multi-comp*/
import React from "react";
import PropTypes from "prop-types";
import { Data } from "packages/victory-core/src/index";
import defaults from "lodash/defaults";
import get from "lodash/get";
import reduce from "lodash/reduce";
import map from "lodash/map";

class MockDataComponent extends React.Component {
  static displayName = "MockDataComponent";
  static role = "dataComponent";

  static propTypes = {
    datum: PropTypes.object,
    events: PropTypes.object,
    style: PropTypes.object
  };

  render() {
    const { datum: { x, y }, events, style } = this.props;
    return (
      <p style={style} {...events}>
        `${x}: ${y}`
      </p>
    );
  }
}

class MockLabel extends React.Component {
  static displayName = "MockLabel";
  static role = "label";

  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const { text } = this.props;

    return (
      <p>`${text}`</p>
    );
  }
}

class MockVictoryComponent extends React.Component {
  static displayName = "MockVictoryComponent";
  static role = "chart";

  static defaultProps = {
    dataComponent: <MockDataComponent/>,
    labelComponent: <MockLabel/>,
    groupComponent: <div/>
  };

  static getBaseProps = (props) => {
    const data = Data.getData(props);
    const childProps = reduce(data, (accum, datum, index) => {
      return defaults({}, accum, {
        [index]: {
          data: {
            index,
            datum,
            data,
            style: {}
          }
        }
      });
    }, {});

    return {
      parent: {
        data
      },
      ...childProps
    };
  };

  render() {
    const props = defaults({}, this.props, this.defaultProps);
    const { dataComponent, labelComponent, groupComponent } = props;

    const dataComponents = map(this.dataKeys, (_key, index) => {
      const dataProps = this.getComponentProps(dataComponent, "data", index);
      return React.cloneElement(dataComponent, dataProps);
    });

    const labelComponents = map(this.dataKeys, (_key, index) => {
      const labelProps = this.getComponentProps(labelComponent, "labels", index);
      return get(labelProps, "text") ? React.cloneElement(labelComponent, labelProps) : undefined;
    });

    return React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents);
  }
}

export { MockVictoryComponent, MockLabel, MockDataComponent };
