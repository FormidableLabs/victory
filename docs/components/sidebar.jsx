import { Link } from "react-router";
import React from "react";
import Radium from "radium";

/* eslint-disable new-cap */
const RadiumLink = Radium(Link);
/* eslint-enable new-cap */

import settings from "../settings";

// For now, these sidebar items include only those components that have been updated
// with a fix to make their `docs.jsx` exportable--
// e.g., https://github.com/FormidableLabs/victory-pie/pull/22/files
//
// As additional components become available, include them by:
//  1.) Bumping version # in `package.json`, removing old package, reinstalling
//  2.) Commenting them back in here
//  3.) Comenting them back in in `component-docs`
//  4.) Commenting back in their routes in `webpack.config.static`

const sidebarItems = [
  { text: "Getting started", slug: "/" },
  // { text: "Victory Axis", slug: "/victory-axis" },
  // { text: "Victory Chart", slug: "/victory-chart" },
  // { text: "Victory Pie", slug: "/victory-pie" },
  { text: "Victory Bar", slug: "/victory-bar" },
  { text: "Victory Line", slug: "/victory-line" },
  { text: "Victory Scatter", slug: "/victory-scatter"}
];

@Radium
class Sidebar extends React.Component {

  getSidebarStyles() {
    return {
      base: {
        margin: 0,
        padding: "0 1rem 0 0",
        "@media (min-width: 70em)": {
          flex: "0 0 12em"
        }
      },
      defaultList: {
        margin: "0",
        padding: "6px",
        listStyle: "none"
      },
      defaultItem: {
        marginTop: "0.3em",
        position: "relative",
        lineHeight: 1.4
      },
      openList: {
        margin: "0",
        padding: "0 0 0 1rem",
        listStyle: "none",
        fontSize: "0.9rem",
        color: settings.navy
      },
      selectedItem: {
        color: settings.navy
      },
      selectedLink: {
        color: settings.red,
        fontWeight: "bold"
      },
      link: {
        boxShadow: "none",
        color: settings.darkSand,
        fontWeight: "normal",

        ":hover": {
          color: settings.red
        }
      }
    };
  }

  _renderSidebarList() {
    const sidebarStyles = this.getSidebarStyles();

    return (
      <ul style={sidebarStyles.defaultList}>
        {sidebarItems.map((item) => {
          const isSelected = item.slug === this.props.active;
          const liStyles = isSelected ?
            [sidebarStyles.defaultItem, sidebarStyles.selectedItem] :
            sidebarStyles.defaultItem;
          const linkStyles = isSelected ?
            [sidebarStyles.link, sidebarStyles.selectedLink] :
            sidebarStyles.link;

          return (
            <li style={liStyles} key={item.slug}>
              <RadiumLink to={`docs${item.slug}`} style={linkStyles}>
                {item.text}
              </RadiumLink>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { base } = this.getSidebarStyles();

    return (
      <nav
        className="Nav"
        style={base}>
        <Link to="/" className="Link--unstyled">
          <img width="40px" src="static/icon-victory.svg" alt="Victory Homepage" />
        </Link>
        {this._renderSidebarList()}
      </nav>
    );
  }
}

Sidebar.propTypes = {
  active: React.PropTypes.string
};

export default Sidebar;
