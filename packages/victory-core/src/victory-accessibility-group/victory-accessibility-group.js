import React from "react";
import PropTypes from "prop-types";
// import CustomPropTypes from "../victory-util/prop-types";
// import Helpers from "../victory-util/helpers";
import { assign /*defaults, isObject, uniqueId */ } from "lodash";

class VictoryAccessibilityGroup extends React.Component {
  static displayName = "VictoryAccessibilityGroup";
  static role = "container";
  static propTypes = {
    "aria-describedby": PropTypes.string,
    "aria-label": PropTypes.string,
    desc: PropTypes.string,
    descId: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    className: PropTypes.string,
    tabIndex: PropTypes.number
  };

  static defaultProps = {
    className: "VictoryAccessibilityGroup"
  };

  render() {
    const { desc, children, className, descId, tabIndex } = this.props;

    return desc ? (
      <g aria-label={this.props["aria-label"]} className={className} tabIndex={tabIndex}>
        <desc aria-describedby={this.props["aria-describedby"]} id={descId}>
          {desc}
        </desc>
        {children}
      </g>
    ) : (
      <g aria-label={this.props["aria-label"]} className={className} tabIndex={tabIndex}>
        {children}
      </g>
    );
  }
}

export default VictoryAccessibilityGroup;
