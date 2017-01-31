/* eslint no-unused-expressions: 0 */
/* global sinon */

import React from "react";
import { defaults } from "lodash";
import { mount } from "enzyme";
import { addEvents } from "src/index";

describe("victory-util/add-events", () => {
  class MockDataComponent extends React.Component {
    // static displayName = "MockDataComponent";

    render() {
      const datum = this.props.datum;
      return (
        <p> `${datum.x}: ${datum.y}` </p>
      );
    }
  }

  class MockLabel extends React.Component {
    // static displayName = "MockLabel";

    render() {
      return (
        <p>`${this.props.text}`</p>
      );
    }
  }

  class MockChart extends React.Component {
    static displayName = "MockChart";

    static role = "bar";

    static defaultProps = {
      dataComponent: MockDataComponent,
      labelComponent: MockLabel,
      groupComponent: "div"
    };

    render() {
      const props = defaults({}, this.props, this.defaultProps);
      const { dataComponent, labelComponent, groupComponent } = props;
      const dataComponents = [];
      const labelComponents = [];
      console.log(this.dataKeys);
      for (let index = 0, len = this.dataKeys.length; index < len; index++) {
        const dataProps = this.getComponentProps(dataComponent, "data", index);
        dataComponents[index] = React.cloneElement(dataComponent, dataProps);

        const labelProps = this.getComponentProps(labelComponent, "labels", index);
        if (labelProps && labelProps.text !== undefined && labelProps.text !== null) {
          labelComponents[index] = React.cloneElement(labelComponent, labelProps);
        }
      }

      return labelComponents.length > 0 ?
        React.cloneElement(groupComponent, {}, ...dataComponents, ...labelComponents) :
        dataComponents;
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
                  mutation: spy
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
