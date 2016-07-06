import React, { PropTypes } from "react";
import { isArray } from "lodash";
import Borders from "./helpers/borders";
import Cross from "./helpers/cross";

export default class ErrorBar extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    index: React.PropTypes.number,
    datum: PropTypes.object,
    events: PropTypes.object,
    scale: PropTypes.object,
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    errorX: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    errorY: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    borderWidth: PropTypes.number
  };

  render() {
    const {
      x,
      y,
      errorX,
      errorY,
      scale
    } = this.props;

    const rangeX = scale.x.range();
    const rangeY = scale.y.range();
    const positiveErrorX = x + (isArray(errorX) ? errorX[0] : errorX);
    const negativeErrorX = x - (isArray(errorX) ? errorX[1] : errorX);
    const positiveErrorY = y + (isArray(errorY) ? errorY[1] : errorY);
    const negativeErrorY = y - (isArray(errorY) ? errorY[0] : errorY);
    const errorTop = positiveErrorY >= rangeY[0] ? rangeY[0] : positiveErrorY;
    const errorBottom = negativeErrorY <= rangeY[1] ? rangeY[1] : negativeErrorY;
    const errorRight = positiveErrorX >= rangeX[1] ? rangeX[1] : positiveErrorX;
    const errorLeft = negativeErrorX <= rangeX[0] ? rangeX[0] : negativeErrorX;

    return (
      <g>
        <Borders {...this.props}
          rangeX={rangeX}
          rangeY={rangeY}
          errorTop={errorTop}
          errorBottom={errorBottom}
          errorRight={errorRight}
          errorLeft={errorLeft}
        />
        <Cross {...this.props}
          rangeX={rangeX}
          rangeY={rangeY}
          errorTop={errorTop}
          errorBottom={errorBottom}
          errorRight={errorRight}
          errorLeft={errorLeft}
        />
      </g>
    );
  }
}
