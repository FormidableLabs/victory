import React from "react";
import PropTypes from "prop-types";
import { withRouteData } from "react-static";
import { Redirect } from "react-router";
import createPath from "../helpers/path-helpers";

const RedirectPage = props => {
  return <Redirect to={createPath(props.redirect)} />;
};

RedirectPage.propTypes = {
  redirect: PropTypes.string.isRequired
};

export default withRouteData(RedirectPage);
