import { Link } from "react-router";
import React from "react";
import Radium from "radium";

import { VictorySettings } from "formidable-landers";

@Radium
class Sidebar extends React.Component {

  getSidebarStyles() {
    return {
      base: {
        margin: 0,
        padding: "0 1rem",
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
        color: VictorySettings.navy
      },
      selectedItem: {
        color: VictorySettings.navy
      },
      selectedLink: {
        color: VictorySettings.red,
        fontWeight: "bold"
      },
      link: {
        boxShadow: "none",
        color: VictorySettings.darkSand,
        fontWeight: "normal",
        ":hover": {
          color: VictorySettings.red
        }
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
        <Link to="/" className="Link--unstyled">
          <img width="40px" src="static/icon-victory.svg" alt="Victory Homepage" />
        </Link>
        <ul style={sidebarStyles.defaultList}>
          <li style={[
            sidebarStyles.defaultItem,
            sidebarStyles.selectedItem,
            sidebarStyles.link,
            sidebarStyles.selectedLink
          ]}>
            Getting started
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="https://formidablelabs.github.io/victory-axis" style={sidebarStyles.link} key="link1">
              VictoryAxis
            </a>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="https://formidablelabs.github.io/victory-bar" style={sidebarStyles.link} key="link2">
              VictoryBar
            </a>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="https://formidablelabs.github.io/victory-chart" style={sidebarStyles.link} key="link3">
              VictoryChart
            </a>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="https://formidablelabs.github.io/victory-line" style={sidebarStyles.link} key="link4">
              VictoryLine
            </a>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="https://formidablelabs.github.io/victory-pie" style={sidebarStyles.link} key="link5">
              VictoryPie
            </a>
          </li>
          <li style={sidebarStyles.defaultItem}>
            <a href="https://formidablelabs.github.io/victory-scatter" style={sidebarStyles.link} key="link6">
              VictoryScatter
            </a>
          </li>
        </ul>
      </nav>
    );
  /* eslint-enable max-len */
  }
}

export default Sidebar;
