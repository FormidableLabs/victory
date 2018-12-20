import React from "react";
import PropTypes from "prop-types";

export default class ClipPath extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    clipId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  render() {
    const { children, clipId } = this.props;
    return (
      <defs>
        <clipPath id={clipId}>{children}</clipPath>
      </defs>
    );
  }
}
