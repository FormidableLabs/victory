/* eslint no-unused-expressions: 0 */
/* global sinon */

import React from "react";
import { defaults, reduce } from "lodash";
import { mount } from "enzyme";
import { Data, addEvents } from "src/index";

describe("victory-util/add-events", () => {
  class MockDataComponent extends React.Component {
    static displayName = "MockDataComponent";
    static role = "dataComponent";

    render() {
      const { datum, events, style } = this.props;
      return (
        <p style={style} {...events}>
          `${datum.x}: ${datum.y}`
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
      dataComponent: MockDataComponent,
      labelComponent: React.createElement(MockLabel, { text: 'label' }),
      groupComponent: "div"
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

      return {
        parent: { data },
        ...childProps
      };
    };

    render() {
      const props = defaults({}, this.props, this.defaultProps);
      const { dataComponent, labelComponent, groupComponent } = props;
      const dataComponents = [];
      const labelComponents = [];
      for (let index = 0, len = this.dataKeys.length; index < len; index++) {
        const dataProps = this.getComponentProps(dataComponent, "data", index);
        dataComponents[index] = React.createElement(dataComponent, dataProps);

        const labelProps = this.getComponentProps(labelComponent, "labels", index);
        if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
          labelComponents[index] = React.cloneElement(labelComponent, labelProps);
        }
      }

      return React.createElement(groupComponent, {}, ...dataComponents, ...labelComponents);
    }
  }

  it.only("do stuff", () => {
    const EventedMockChart = addEvents(MockChart);
    const spy = sinon.spy();

    const wrapper = mount(
      <EventedMockChart
        data={[{ x: 1, y: 2 }, { x: 3, y: 4 }]}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  target: "data",
                  mutation: (props) => {
                    spy();
                  }
                }];
              }
            }
          }
        ]}
      />
    );

    const firstDataComponent = wrapper.find(MockDataComponent).filterWhere((node) => {
      return node.props().datum.x === 1;
    });

    expect(spy).not.to.have.been.called;
    firstDataComponent.simulate('click');
    expect(spy).to.have.been.called;
  });
});
