import React from "react";
import PropTypes from "prop-types";

class VictoryAccessibleGroup extends React.Component {
  static displayName = "VictoryAccessibleGroup";
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
    className: "VictoryAccessibleGroup"
  };

  render() {
    const { desc, children, className, descId, tabIndex } = this.props;

    return desc ? (
      <g
        aria-label={this.props["aria-label"]}
        aria-describedby={this.props["aria-describedby"]}
        className={className}
        tabIndex={tabIndex}
      >
        <desc id={descId}>{desc}</desc>
        {children}
      </g>
    ) : (
      <g
        aria-label={this.props["aria-label"]}
        aria-describedby={this.props["aria-describedby"]}
        className={className}
        tabIndex={tabIndex}
      >
        {children}
      </g>
    );
  }
}

export default VictoryAccessibleGroup;
