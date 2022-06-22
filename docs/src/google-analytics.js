import React from "react";
import PropTypes from "prop-types";

let Analytics = {};

if (typeof document !== "undefined") {
  Analytics = require("react-router-ga").default;
} else {
  Analytics = React.Fragment;
}

const GoogleAnalytics = ({ children, ...rest }) => {
  if (typeof document !== "undefined") {
    // fragment doesn't like it when you try to give it attributes
    return <Analytics {...rest}>{children}</Analytics>;
  }
  return <Analytics>{children}</Analytics>;
};

GoogleAnalytics.propTypes = {
  children: PropTypes.element,
};

export default GoogleAnalytics;
