import { partialRight } from "lodash";
import React, { PropTypes } from "react";
import BarHelpers from "./helper-methods";
import VictoryBase from "../victory-base/victory-base";
import cartesianProps from "../victory-base/cartesian-props";
import commonProps from "../victory-base/common-props";
import Data from "../../helpers/data";
import Domain from "../../helpers/domain";
import { VictoryLabel, VictoryContainer, VictoryTheme, Bar } from "victory-core";

const fallbackProps = {
  width: 450,
  height: 300,
  padding: 50
};

const defaultData = [
  {x: 1, y: 1},
  {x: 2, y: 2},
  {x: 3, y: 3},
  {x: 4, y: 4}
];

class VictoryBar extends React.Component {
  static displayName = "VictoryBar";

  static role = "bar";

  static defaultTransitions = {
    onLoad: {
      duration: 2000,
      before: () => ({ y: 0, y1: 0, y0: 0 }),
      after: (datum) => ({ y: datum.y, y1: datum.y1, y0: datum.y0 })
    },
    onExit: {
      duration: 500,
      before: () => ({ y: 0, yOffset: 0 })
    },
    onEnter: {
      duration: 500,
      before: () => ({ y: 0, y1: 0, y0: 0 }),
      after: (datum) => ({ y: datum.y, y1: datum.y1, y0: datum.y0 })
    }
  };

  static propTypes = {
    ...cartesianProps,
    ...commonProps,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    data: defaultData,
    dataComponent: <Bar/>,
    labelComponent: <VictoryLabel/>,
    scale: "linear",
    standalone: true,
    x: "x",
    y: "y",
    containerComponent: <VictoryContainer/>,
    groupComponent: <g/>,
    theme: VictoryTheme.grayscale
  };

  static getDomain = Domain.getDomainWithZero.bind(Domain);
  static getData = Data.getData.bind(Data);
  static getBaseProps = partialRight(BarHelpers.getBaseProps.bind(BarHelpers), fallbackProps);
  static expectedComponents = [
    "dataComponent", "labelComponent", "groupComponent", "containerComponent"
  ];
  static animationWhitelist = [
    "data", "domain", "height", "padding", "style", "width"
  ];
  static fallbackProps = fallbackProps;
}

export default VictoryBase(VictoryBar);

