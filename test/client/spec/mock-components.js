import React from "react";
import { Data } from "src/index";
import { defaults, get, reduce, map } from "lodash";

class MockDataComponent extends React.Component {
  static displayName = "MockDataComponent";
  static role = "dataComponent";

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

  render() {
    const { text } = this.props;

    return (
      <p>`${text}`</p>
    );
  }
}

class MockChart extends React.Component {
  static displayName = "MockChart";
  static role = "chart";

  static defaultProps = {
    dataComponent: <MockDataComponent/>,
    labelComponent: <MockLabel text='label'/>,
    groupComponent: <div/>
  };

  static getBaseProps = (props) => {
    const data = Data.getData(props.data);
    const childProps = reduce(data, (accum, datum, index) => {
      return defaults({}, accum, {
        [index]: {
          data: {
            index,
            datum,
            data
          }
        }
      });
    }, {});

    return childProps;
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
      return get(labelProps, 'text') ? React.cloneElement(labelComponent, labelProps) : undefined;
    });

    return React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents);
  }
}

export { MockChart, MockLabel, MockDataComponent };
