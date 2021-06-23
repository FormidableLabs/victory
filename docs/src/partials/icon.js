import React from "react";
import PropTypes from "prop-types";

// Icons

import IconInternalLink from "../../static/icon-internal.svg";
import IconExternalLink from "../../static/icon-external.svg";
import IconBack from "../../static/icon-back.svg";
import IconBarrier from "../../static/icon-barrier.svg";

// Q: Can these icons get added to the links generated in READMEs?
// https://github.com/FormidableLabs/victory-docs/issues/7

class Icon extends React.Component {
  getStyles() {
    return {
      base: {
        margin: 0,
        padding: 0,
        width: "15px",
        height: "15px",
        display: "inline-block",
        verticalAlign: "-4px"
      }
    };
  }
  render() {
    const styles = this.getStyles();
    const { glyph, style, ...otherProps } = this.props;
    switch (glyph) {
      case "back":
        return (
          <span
            {...otherProps}
            style={{
              ...styles.base,
              ...style,
              background: `url("${IconBack}")`
            }}
          />
        );
      case "coming-soon":
        return (
          <span
            {...otherProps}
            style={{
              ...styles.base,
              ...style,
              background: `url("${IconBarrier}")`
            }}
          />
        );
      case "external-link":
        return (
          <span
            {...otherProps}
            style={{
              ...styles.base,
              ...style,
              background: `url("${IconExternalLink}")`
            }}
          />
        );
      case "internal-link":
        return (
          <span
            {...otherProps}
            style={{
              ...styles.base,
              ...style,
              background: `url("${IconInternalLink}")`
            }}
          />
        );
      default:
        return <span />;
    }
  }
}

Icon.propTypes = {
  glyph: PropTypes.oneOf([
    "back",
    "coming-soon",
    "external-link",
    "internal-link"
  ]),
  style: PropTypes.object
};

Icon.defaultProps = {
  glyph: "link"
};

export default Icon;
