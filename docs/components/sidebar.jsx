import React from "react";
import Radium from "radium";

import settings from "../settings";

@Radium
class Sidebar extends React.Component {

  getSidebarStyles() {
    return {
      base: {
        margin: 0,
        padding: "0 1rem",
        "@media (min-width: 768px)": {
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
        fontWeight: "normal"
      }
    };
  }

  render() {
    const sidebarStyles = this.getSidebarStyles();

    /* eslint-disable max-len */
    return (
      <nav
        className="Nav"
        style={sidebarStyles.base}>
        <img width="40" src="/static/icon-victory.svg" />
        <ul style={sidebarStyles.defaultList}>
          <li style={sidebarStyles.defaultItem}>
            <a href="#" style={sidebarStyles.link}>Installation</a>
          </li>
          <li style={[sidebarStyles.defaultItem, sidebarStyles.selectedItem]}>
            <a href="#" style={[sidebarStyles.link, sidebarStyles.selectedLink]}>Story time</a>
            <ul style={sidebarStyles.openList}>
              <li style={sidebarStyles.defaultItem}>
                <a href="#" style={[sidebarStyles.link, sidebarStyles.selectedLink]}>Part I</a>
              </li>
              <li style={sidebarStyles.defaultItem}>
                <a href="#" style={sidebarStyles.link}>Part II</a>
              </li>
            </ul>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="#" style={sidebarStyles.link}>Victory Chart</a>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="#" style={sidebarStyles.link}>Victory Pie</a>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="#" style={sidebarStyles.link}>Victory Scatter</a>
          </li>
        </ul>
      </nav>
    );
  /* eslint-enable max-len */
  }
}

export default Sidebar;
